# Navigation comment for development - shows working directory for this Flask app
# cd C:\Users\tobyf\Desktop\91893\workout_tracker

# Import necessary modules for Flask web application
import os
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, session, flash
from database_models import db, User, UserExercise, WorkoutExercise
from werkzeug.security import generate_password_hash, check_password_hash

# Directory structure setup for Flask application
# Get the absolute path to the parent directory of this script
base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
# Define template directory (where HTML files are stored)
template_dir = os.path.join(base_dir, 'templates')
# Define static directory (where CSS, JS, images are stored)
static_dir = os.path.join(base_dir, 'static')

# Initialize Flask application with custom template and static directories
app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
# Secret key for session management and security (should be environment variable in production)
app.secret_key = 'super_secret_key'

# Database configuration
# SQLite database located in parent directory as 'a.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../a.db'
# Disable modification tracking for performance
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Initialize database with Flask app
db.init_app(app)

# Create all database tables if they don't exist
with app.app_context():
    db.create_all()

# Custom template filter to format Unix timestamps into readable dates
@app.template_filter('datetimeformat')
def datetimeformat(value):
    """Convert Unix timestamp to formatted date string"""
    return datetime.fromtimestamp(int(value)).strftime('%Y-%m-%d %H:%M')

# Root route - redirects to login page
@app.route('/')
def index():
    """Default route that redirects users to login"""
    return redirect(url_for('login'))

# User authentication route
@app.route('/login', methods=['GET', 'POST'])
def login():
    """Handle user login with username and password"""
    if request.method == 'POST':
        # Extract form data
        username = request.form['username']
        password = request.form['password']
        
        # Query database for user with matching username
        user = User.query.filter_by(Username=username).first()
        
        # Verify user exists and password is correct
        if user and check_password_hash(user.password_hash, password):
            # Store user ID in session for future requests
            session['user_id'] = user.ID
            return redirect(url_for('home'))
        else:
            # Display error message for invalid credentials
            flash('Invalid username or password')
    
    # Render login page template for GET requests or failed POST
    return render_template('login_page.html')

# Password recovery route using recovery phrase
@app.route('/forgot_password', methods=['GET', 'POST'])
def forgot_password():
    """Handle password recovery using username and recovery phrase"""
    if request.method == 'POST':
        # Extract and clean form data
        username = request.form.get('username', '').strip()
        recovery_phrase = request.form.get('recovery_phrase', '').strip()

        # Validate that both fields are provided
        if not username or not recovery_phrase:
            flash('Please enter both username and recovery phrase.')
            return redirect(url_for('forgot_password'))

        # Find user by username
        user = User.query.filter_by(Username=username).first()

        # Verify user exists and recovery phrase matches
        if user and user.recovery_phrase == recovery_phrase:
            # Log user in directly using recovery phrase
            session['user_id'] = user.ID
            flash('Logged in using recovery phrase.')
            return redirect(url_for('home'))
        else:
            flash('Invalid username or recovery phrase.')
            return redirect(url_for('forgot_password'))

    # Render recovery page for GET requests
    return render_template('forgot_password.html')

# User registration route
@app.route('/create_account', methods=['GET', 'POST'])
def create_account():
    """Handle new user account creation"""
    if request.method == 'POST':
        # Extract form data
        username = request.form['username']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        recovery_phrase = request.form['recovery_phrase']

        # Password length validation
        if len(password) < 6:
            flash('Password must be at least 6 characters long')
            return redirect(url_for('create_account'))

        # Password confirmation validation
        if password != confirm_password:
            flash('Passwords do not match')
            return redirect(url_for('create_account'))

        # Check if username already exists
        existing_user = User.query.filter_by(Username=username).first()
        if existing_user:
            flash('Username already exists')
            return redirect(url_for('create_account'))

        # Create new user with hashed password
        hashed_password = generate_password_hash(password)
        new_user = User(Username=username, password_hash=hashed_password, recovery_phrase=recovery_phrase)
        
        # Add to database
        db.session.add(new_user)
        db.session.commit()

        # Automatically log in the new user
        session['user_id'] = new_user.ID
        return redirect(url_for('profile_settings'))

    # Render account creation page
    return render_template('create_account.html')

# Main dashboard route
@app.route('/home')
def home():
    """Display user's workout history and dashboard"""
    # Check if user is logged in
    if 'user_id' not in session:
        return redirect(url_for('login'))

    # Get current user data
    user = User.query.get(session['user_id'])

    # Retrieve all workout logs for the user, ordered by most recent first
    logs = (
        UserExercise.query
        .filter_by(user_id=user.ID)
        .order_by(UserExercise.date_completed.desc())
        .all()
    )

    # Group exercises by workout session
    grouped = {}
    for log in logs:
        # Get all exercises for this workout session
        exercises = WorkoutExercise.query.filter_by(user_exercise_id=log.ID).all()
        grouped[log.date_completed] = {
            "meta": log,        # Workout metadata (duration, intensity, etc.)
            "exercises": exercises  # List of exercises in this workout
        }

    return render_template('home_page.html', user=user, grouped_workouts=grouped)

# User logout route
@app.route('/logout')
def logout():
    """Clear user session and redirect to login"""
    session.clear()
    return redirect(url_for('login'))

# Workout logging route
@app.route('/log_workout', methods=['GET', 'POST'])
def log_workout():
    """Handle workout logging with exercises, sets, reps, and weights"""
    # Authentication check
    if 'user_id' not in session:
        return redirect(url_for('login'))

    if request.method == 'POST':
        try:
            # Extract workout metadata
            user_id = session['user_id']
            exercise_names = request.form.getlist('exercise_name[]')
            sets = list(map(int, request.form.getlist('sets[]')))
            reps = list(map(int, request.form.getlist('reps[]')))
            weights = list(map(float, request.form.getlist('weights[]')))
            weight_units = request.form.getlist('weight_units[]')
            intensity = int(request.form['intensity'])
            duration = int(request.form['duration'])
            notes = request.form['notes']
            timestamp = int(datetime.now().timestamp())

            # Input validation - Exercise name length
            if any(len(name) > 50 for name in exercise_names):
                flash("Each exercise name must be under 50 characters.")
                return redirect(url_for('log_workout'))
            
            # Input validation - Notes length
            if len(notes) > 200:
                flash("Notes must be under 200 characters.")
                return redirect(url_for('log_workout'))

            # Input validation - Workout duration
            if not (1 <= duration <= 300):
                flash("Workout duration must be between 1 and 300 minutes.")
                return redirect(url_for('log_workout'))
            
            # Input validation - Weight values
            if not all(1 <= w <= 500 for w in weights):
                flash("Each weight must be between 1 and 500.")
                return redirect(url_for('log_workout'))

            # Create workout session record
            log = UserExercise(
                user_id=user_id,
                duration=duration,
                intensity=intensity,
                date_completed=timestamp,
                calories_burned=intensity * duration,  # Simple calorie calculation
                notes=notes
            )
            db.session.add(log)
            db.session.flush()  # Get the ID without committing

            # Create individual exercise records for this workout
            for i in range(len(exercise_names)):
                exercise = WorkoutExercise(
                    user_exercise_id=log.ID,    # Link to workout session
                    name=exercise_names[i],
                    sets=sets[i],
                    reps=reps[i],
                    weight=weights[i],
                    unit=weight_units[i]
                )
                db.session.add(exercise)

            # Commit all changes to database
            db.session.commit()
            flash("Workout logged successfully!")
            return redirect(url_for('home'))

        except Exception as e:
            # Handle any database or processing errors
            flash(f"Error: {str(e)}")
            return redirect(url_for('log_workout'))

    # Render workout logging form
    return render_template('log_workout.html')

# User profile settings route
@app.route('/profile_settings', methods=['GET', 'POST'])
def profile_settings():
    """Handle user profile updates including goals and password changes"""
    # Authentication check
    if 'user_id' not in session:
        return redirect(url_for('login'))

    user = User.query.get(session['user_id'])

    if request.method == 'POST':
        try:
            # Update weight goals if provided
            if request.form.get('current_weight'):
                user.current_weight = float(request.form['current_weight'])
            if request.form.get('goal_weight'):
                user.goal_weight = float(request.form['goal_weight'])
            user.weight_updated = datetime.now().strftime('%Y-%m-%d %H:%M')

            # Update bench press goals if provided
            if request.form.get('bench_current'):
                user.bench_current = int(request.form['bench_current'])
            if request.form.get('bench_goal'):
                user.bench_goal = int(request.form['bench_goal'])

            # Update squat goals if provided
            if request.form.get('squat_current'):
                user.squat_current = int(request.form['squat_current'])
            if request.form.get('squat_goal'):
                user.squat_goal = int(request.form['squat_goal'])

            # Update deadlift goals if provided
            if request.form.get('deadlift_current'):
                user.deadlift_current = int(request.form['deadlift_current'])
            if request.form.get('deadlift_goal'):
                user.deadlift_goal = int(request.form['deadlift_goal'])

            # Handle password update if requested
            new_pass = request.form.get('new_password')
            confirm_pass = request.form.get('confirm_password')
            if new_pass or confirm_pass:
                # Validate password confirmation
                if new_pass != confirm_pass:
                    flash("Passwords do not match.")
                    return redirect(url_for('profile_settings'))
                # Validate password length
                if len(new_pass) < 6:
                    flash("Password must be at least 6 characters.")
                    return redirect(url_for('profile_settings'))
                # Hash and store new password
                user.password_hash = generate_password_hash(new_pass)

            # Save all changes
            db.session.commit()
            flash("Profile updated successfully!")

        except Exception as e:
            # Handle any processing errors
            flash(f"Error updating profile: {str(e)}")

        return redirect(url_for('home'))

    # Render profile settings page
    return render_template('profile_settings.html', user=user)

# Theme selection route
@app.route('/theme')
def theme():
    """Display theme selection page"""
    # Authentication check
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return render_template('theme.html')

# AI Chatbot route
@app.route('/chatbot')
def chatbot():
    """Display AI fitness chatbot interface"""
    # Authentication check
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return render_template('chatbot.html')

# About page route (public access)
@app.route('/about')
def about():
    """Display application information page"""
    return render_template('about.html')

# Interactive muscle anatomy route (public access)
@app.route('/muscles')
def muscles():
    """Display interactive muscle diagram educational tool"""
    return render_template('muscle-diagram.html')

# Initial profile setup route (for new users)
@app.route('/profile_setup', methods=['GET', 'POST'])
def profile_setup():
    """Handle initial profile setup for new users"""
    # Authentication check
    if 'user_id' not in session:
        return redirect(url_for('login'))

    user = User.query.get(session['user_id'])

    if request.method == 'POST':
        try:
            # Extract weight values
            current = float(request.form.get('current_weight'))
            goal = float(request.form.get('goal_weight'))

            # Validate weight ranges (0-300 kg seems reasonable)
            if not (0 < current <= 300 and 0 < goal <= 300):
                flash('Weight must be between 0 and 300 kg.')
                return redirect(url_for('profile_setup'))

            # Update user profile
            user.current_weight = current
            user.goal_weight = goal
            user.weight_updated = datetime.now().strftime('%Y-%m-%d %H:%M')
            db.session.commit()
            flash("Profile updated successfully!")
            return redirect(url_for('home'))

        except ValueError:
            # Handle invalid number inputs
            flash('Invalid number input.')
            return redirect(url_for('profile_setup'))

    return render_template('profile_setup.html', user=user)

# Quick profile update route (POST only)
@app.route('/update_profile', methods=['POST'])
def update_profile():
    """Handle quick profile updates from home page"""
    # Authentication check
    if 'user_id' not in session:
        return redirect(url_for('login'))

    user = User.query.get(session['user_id'])

    try:
        # Update weight values
        user.current_weight = float(request.form['current_weight'])
        user.goal_weight = float(request.form['goal_weight'])

        # Validate weight ranges
        if not (0 < user.current_weight <= 300 and 0 < user.goal_weight <= 300):
            flash('Weight must be between 0 and 300 kg.')
            return redirect(url_for('home'))

        # Update timestamp and save
        user.weight_updated = datetime.now().strftime('%Y-%m-%d %H:%M')
        db.session.commit()
        flash("Profile updated successfully!")
    except ValueError:
        # Handle invalid weight inputs
        flash("Invalid weight input.")
    
    return redirect(url_for('home'))

# Application entry point
if __name__ == '__main__':
    # Run Flask development server with debug mode enabled
    app.run(debug=False)
    # Print server URL (though this won't execute due to blocking run() call)
    print("\n🔥 Flask is running at http://127.0.0.1:5000")