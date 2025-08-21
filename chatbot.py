from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import json
import re
from urllib.parse import quote
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

class WorkoutChatbot:
    def __init__(self):
        # Rate limiting for web searches
        self.last_search_time = 0
        self.min_search_interval = 2  # seconds between searches
        
        # Your existing workout responses
        self.workout_responses = {
            'beginner': "For beginners, I recommend starting with:\n\n• 3 days per week of full-body workouts\n• Focus on bodyweight exercises: push-ups, squats, lunges, planks\n• Start with 2-3 sets of 8-12 reps\n• Include 20-30 minutes of cardio\n• Rest days are crucial for recovery!\n\nWould you like a specific beginner routine?",
            'chest': "Great chest exercises include:\n\n• Push-ups (all variations)\n• Bench press\n• Dumbbell flyes\n• Dips\n• Incline/decline variations\n\nTip: Focus on controlled movements and full range of motion. Aim for 3-4 sets of 8-12 reps.",
            'legs': "Effective leg exercises:\n\n• Squats (bodyweight, goblet, barbell)\n• Lunges (forward, reverse, walking)\n• Deadlifts\n• Calf raises\n• Step-ups\n\nLegs are your largest muscle group - train them 2x per week for best results!",
            'back': "Build a strong back with:\n\n• Pull-ups/chin-ups\n• Rows (bent-over, seated, single-arm)\n• Lat pulldowns\n• Deadlifts\n• Face pulls\n\nRemember: A strong back improves posture and prevents injury!",
            'arms': "Effective arm exercises:\n\n• Bicep curls\n• Tricep dips\n• Hammer curls\n• Overhead press\n• Close-grip push-ups\n\nTrain arms 2-3x per week, but don't neglect compound movements!",
            'abs': "Core strengthening exercises:\n\n• Planks (front, side)\n• Dead bugs\n• Russian twists\n• Mountain climbers\n• Bicycle crunches\n\nYour core is worked in most compound exercises too!",
            'protein': "Protein is essential for muscle building!\n\n• Aim for 0.8-1g per lb of body weight\n• Best sources: lean meats, fish, eggs, dairy, beans\n• Spread intake throughout the day\n• Post-workout protein helps recovery\n\nNeed specific meal ideas?",
            'nutrition': "Nutrition fundamentals:\n\n• Eat in a slight caloric surplus to build muscle\n• Include protein, carbs, and healthy fats\n• Stay hydrated (half your body weight in oz)\n• Time carbs around workouts\n• Focus on whole foods\n\nWhat are your specific nutrition goals?",
            'rest': "Recovery is when gains happen!\n\n• Get 7-9 hours of quality sleep\n• Take 1-2 rest days per week\n• Listen to your body\n• Light activity on rest days is okay\n• Stretching and foam rolling help\n\nRemember: You don't grow in the gym, you grow during recovery!",
            'sleep': "Sleep is crucial for fitness:\n\n• 7-9 hours per night is optimal\n• Growth hormone peaks during deep sleep\n• Poor sleep hurts performance and recovery\n• Keep bedroom cool and dark\n• Avoid screens before bed\n\nStruggling with sleep? I can share more tips!",
            'cardio': "Cardio options for every fitness level:\n\n• Walking/jogging\n• Swimming\n• Cycling\n• HIIT workouts\n• Dancing\n• Sports\n\nAim for 150 minutes of moderate cardio per week, or 75 minutes of vigorous activity!",
            'hiit': "HIIT (High-Intensity Interval Training) benefits:\n\n• Burns calories efficiently\n• Improves cardiovascular health\n• Can be done in 15-30 minutes\n• Boosts metabolism for hours after\n• Example: 30 sec work, 30 sec rest, repeat 10-20 rounds\n\nGreat for busy schedules!",
            'motivation': "Staying motivated tips:\n\n• Set specific, measurable goals\n• Track your progress\n• Find a workout buddy\n• Reward yourself for milestones\n• Remember why you started\n• Focus on how exercise makes you feel\n\nConsistency beats perfection every time!",
            'stretching': "Stretching benefits:\n\n• Improves flexibility and range of motion\n• Reduces injury risk\n• Helps with recovery\n• Do dynamic stretches before workouts\n• Static stretches after workouts\n\nAim for 10-15 minutes of stretching daily!"
        }

    def can_search(self):
        """Check if enough time has passed since last search (rate limiting)"""
        current_time = time.time()
        if current_time - self.last_search_time >= self.min_search_interval:
            self.last_search_time = current_time
            return True
        return False

    def search_web_multi_source(self, query):
        """Try multiple free search APIs for better results"""
        if not self.can_search():
            return self.get_fallback_response(query)
        
        fitness_query = f"{query} fitness workout exercise health"
        
        # Try DuckDuckGo first
        try:
            result = self.search_duckduckgo(fitness_query, query)
            if result and "I was unable to search" not in result:
                return result
        except Exception as e:
            print(f"DuckDuckGo search failed: {e}")

        # Try Wikipedia search as backup
        try:
            result = self.search_wikipedia(fitness_query, query)
            if result and "I was unable to search" not in result:
                return result
        except Exception as e:
            print(f"Wikipedia search failed: {e}")

        # If all searches fail
        return self.handle_search_failure(query)

    def search_duckduckgo(self, fitness_query, original_query):
        """Enhanced DuckDuckGo search with better result processing"""
        try:
            search_url = f"https://api.duckduckgo.com/?q={quote(fitness_query)}&format=json&no_html=1&skip_disambig=1"
            
            response = requests.get(search_url, timeout=8, headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            })
            
            if response.status_code != 200:
                return None
                
            data = response.json()
            
            # Process Abstract
            if data.get('AbstractText') and len(data['AbstractText']) > 50:
                abstract = data['AbstractText']
                if self.is_fitness_related(abstract):
                    return self.format_search_response(abstract, original_query, "research")
            
            # Process Definition
            if data.get('Definition') and len(data['Definition']) > 30:
                definition = data['Definition']
                if self.is_fitness_related(definition):
                    return self.format_search_response(definition, original_query, "definition")
            
            # Process Related Topics
            if data.get('RelatedTopics'):
                relevant_topics = []
                for topic in data['RelatedTopics'][:3]:
                    if isinstance(topic, dict) and topic.get('Text'):
                        text = topic['Text']
                        if self.is_fitness_related(text) and len(text) > 30:
                            # Clean up the text
                            text = re.sub(r'^[^-]+-', '', text).strip()
                            relevant_topics.append(text)
                
                if relevant_topics:
                    combined_info = self.combine_topic_info(relevant_topics)
                    return self.format_search_response(combined_info, original_query, "topics")
            
            return None
            
        except Exception as e:
            print(f"DuckDuckGo search error: {e}")
            return None

    def search_wikipedia(self, query, original_query):
        """Search Wikipedia for fitness-related information"""
        try:
            # Wikipedia API search
            search_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{quote(query)}"
            
            response = requests.get(search_url, timeout=8, headers={
                'User-Agent': 'WorkoutChatbot/1.0'
            })
            
            if response.status_code == 200:
                data = response.json()
                if data.get('extract') and len(data['extract']) > 50:
                    extract = data['extract']
                    if self.is_fitness_related(extract):
                        return self.format_search_response(extract, original_query, "Wikipedia")
            
            # Try Wikipedia search API if direct page doesn't work
            search_url = f"https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch={quote(query)}&srlimit=3"
            
            response = requests.get(search_url, timeout=8)
            if response.status_code == 200:
                data = response.json()
                pages = data.get('query', {}).get('search', [])
                
                for page in pages:
                    if self.is_fitness_related(page.get('snippet', '')):
                        snippet = re.sub(r'<[^>]+>', '', page['snippet'])  # Remove HTML tags
                        return self.format_search_response(snippet, original_query, "Wikipedia")
            
            return None
            
        except Exception as e:
            print(f"Wikipedia search error: {e}")
            return None

    def combine_topic_info(self, topics):
        """Combine multiple topic information into coherent text"""
        if len(topics) == 1:
            return topics[0]
        
        # Take the most relevant parts from each topic
        combined = []
        for topic in topics:
            # Take first sentence or up to 100 characters
            sentences = topic.split('.')
            if sentences:
                first_sentence = sentences[0].strip()
                if len(first_sentence) > 20:
                    combined.append(first_sentence)
        
        return '. '.join(combined[:2]) + '.' if combined else topics[0]

    def format_search_response(self, content, original_query, source_type):
        """Format search results to match conversational tone"""
        # Clean up content
        content = re.sub(r'\s+', ' ', content).strip()
        content = content[:400]  # Limit length
        
        # Add conversational framing based on query type
        query_lower = original_query.lower()
        
        if any(word in query_lower for word in ['how to', 'how do', 'what is', 'explain']):
            intro = f"Great question about {original_query}! Here's what I found:\n\n"
        elif any(word in query_lower for word in ['best', 'good', 'effective']):
            intro = f"Looking for the best approach to {original_query}? Here's some helpful info:\n\n"
        elif any(word in query_lower for word in ['should i', 'can i', 'is it']):
            intro = f"Regarding your question about {original_query}:\n\n"
        else:
            intro = f"Here's what I found about {original_query}:\n\n"
        
        # Format the main content
        formatted_content = f"🔍 {intro}{content}"
        
        # Add encouraging follow-up
        if 'exercise' in query_lower or 'workout' in query_lower:
            follow_up = "\n\nWould you like specific exercise recommendations or form tips to get started?"
        elif 'nutrition' in query_lower or 'diet' in query_lower:
            follow_up = "\n\nWant some specific meal ideas or nutrition timing advice?"
        else:
            follow_up = "\n\nIs there anything specific about this topic you'd like to dive deeper into?"
        
        return formatted_content + follow_up

    def is_fitness_related(self, text):
        """Enhanced fitness relevance checker"""
        if not text or len(text) < 20:
            return False
            
        fitness_keywords = [
            'exercise', 'workout', 'training', 'fitness', 'muscle', 'strength',
            'cardio', 'nutrition', 'protein', 'diet', 'health', 'bodybuilding',
            'weight', 'gym', 'athlete', 'sport', 'recovery', 'calories',
            'vitamin', 'supplement', 'yoga', 'running', 'swimming', 'cycling',
            'metabolism', 'endurance', 'flexibility', 'balance', 'wellness'
        ]
        
        text_lower = text.lower()
        keyword_count = sum(1 for keyword in fitness_keywords if keyword in text_lower)
        
        # Need at least 2 fitness keywords or specific fitness phrases
        return keyword_count >= 2 or any(phrase in text_lower for phrase in [
            'physical activity', 'body weight', 'heart rate', 'muscle mass',
            'weight loss', 'weight gain', 'body fat', 'lean muscle'
        ])

    def handle_search_failure(self, query):
        """Handle when all web searches fail"""
        return (f"I was unable to search for current information about '{query}' right now. "
                f"This could be due to network issues or search limitations.\n\n"
                f"I'd recommend:\n"
                f"• Trying a different, more specific question\n"
                f"• Asking a certified fitness professional\n"
                f"• Checking reputable fitness websites like Mayo Clinic or WebMD\n\n"
                f"Is there another fitness topic I can help you with using my built-in knowledge?")

    def get_fallback_response(self, query):
        """Enhanced fallback response"""
        return self.generate_contextual_response(query)

    def generate_contextual_response(self, query):
        """Generate contextual fitness response based on query type"""
        query_lower = query.lower()
        
        if any(word in query_lower for word in ['exercise', 'workout', 'training']):
            return f"For exercises related to '{query}':\n\nBased on fitness principles, focus on:\n• Proper form and technique\n• Progressive overload\n• Adequate rest between sets\n• Full range of motion\n• Consistent training schedule\n\nWould you like specific exercise recommendations or form tips?"
        
        elif any(word in query_lower for word in ['diet', 'nutrition', 'food', 'eat']):
            return f"Regarding nutrition for '{query}':\n\nNutrition fundamentals include:\n• Whole, unprocessed foods\n• Adequate protein intake\n• Proper hydration\n• Meal timing around workouts\n• Sustainable eating habits\n\nWould you like specific meal ideas or nutrition timing advice?"
        
        elif any(word in query_lower for word in ['lose', 'weight', 'fat', 'cutting']):
            return f"For weight management related to '{query}':\n\nKey principles include:\n• Creating a moderate caloric deficit\n• Combining resistance and cardio training\n• Prioritizing protein to preserve muscle\n• Tracking progress beyond just the scale\n• Sustainable lifestyle changes\n\nWhat specific aspect would you like to know more about?"
        
        elif any(word in query_lower for word in ['muscle', 'build', 'gain', 'bulk']):
            return f"For muscle building regarding '{query}':\n\nEssential factors include:\n• Progressive overload in training\n• Adequate protein intake (0.8-1g per lb)\n• Sufficient calories for growth\n• Quality sleep for recovery\n• Consistent training stimulus\n\nWould you like specific training or nutrition recommendations?"
        
        else:
            return f"I'd be happy to help with '{query}'!\n\nFor the most current information, I recommend:\n• Consulting with certified fitness professionals\n• Checking reputable health websites\n• Speaking with your healthcare provider for personalized advice\n\nIs there a more specific fitness question I can help you with?"

    def generate_response(self, user_message):
        """Main response generation method with enhanced logic"""
        message = user_message.lower()
        
        # Check local responses first (highest priority)
        for keyword, response in self.workout_responses.items():
            if keyword in message:
                return response
        
        # Pattern matching for common questions
        if 'how many' in message and ('reps' in message or 'sets' in message):
            return "Great question! Here are general guidelines:\n\n• Strength: 3-5 sets of 3-6 reps (heavy weight)\n• Muscle building: 3-4 sets of 8-12 reps\n• Endurance: 2-3 sets of 12-20 reps\n• Beginners: Start with 2-3 sets of 8-12 reps\n\nAdjust based on your goals and experience level!"
        
        if any(phrase in message for phrase in ['lose weight', 'fat loss', 'cutting']):
            return "For weight loss, focus on:\n\n• Caloric deficit (burn more than you eat)\n• Combine cardio + strength training\n• High-intensity interval training (HIIT)\n• Track your food intake\n• Be consistent and patient\n\nRemember: You can't out-train a bad diet! Nutrition is 70% of weight loss."
        
        if any(phrase in message for phrase in ['gain muscle', 'build muscle', 'bulking']):
            return "To build muscle effectively:\n\n• Progressive overload (gradually increase weight/reps)\n• Eat in a caloric surplus\n• Get adequate protein (0.8-1g per lb bodyweight)\n• Train each muscle group 2x per week\n• Get plenty of sleep\n• Stay consistent!\n\nPatience is key - muscle growth takes time!"
        
        # If no local response found, try web search
        return self.search_web_multi_source(user_message)

# Initialize chatbot
chatbot = WorkoutChatbot()

@app.route('/')
def home():
    return render_template('chatbot.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        
        # Generate response
        response = chatbot.generate_response(user_message)
        
        return jsonify({
            'response': response,
            'success': True
        })
        
    except Exception as e:
        print(f"Chat error: {e}")
        return jsonify({
            'error': 'Sorry, I encountered an error processing your request.',
            'success': False
        }), 500

if __name__ == '__main__':
    print("Starting Enhanced Workout Chatbot Server...")
    print("Access the chatbot at: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)