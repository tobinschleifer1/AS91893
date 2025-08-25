// Muscle data object containing information for all three anatomical views
const muscleData = {
  // Front view of the human body
  front: {
    muscles: [
      {
        // Muscle identification and positioning
        name: "Pectoralis Major",
        x: "45%", y: "25%", // Position coordinates for the clickable dot (percentage-based)
        description: "Primary chest muscle responsible for pushing movements and arm adduction",
        location: "Upper chest area, spanning from sternum to shoulder",
        exercises: "Bench Press, Push-ups, Chest Flyes, Dips"
      },
      {
        // Left shoulder muscle from front view
        name: "Deltoids (left)",
        x: "37%", y: "25%", // Positioned on the left side of the body image
        description: "Front shoulder muscles for arm elevation and forward movement",
        location: "Front of the shoulder joint",
        exercises: "Shoulder Press, Front Raises, Arnold Press"
      },
      {
        // Right shoulder muscle from front view
        name: "Deltoids (right)",
        x: "63%", y: "25%", // Positioned on the right side of the body image
        description: "Front shoulder muscles for arm elevation and forward movement",
        location: "Front of the shoulder joint",
        exercises: "Shoulder Press, Front Raises, Arnold Press"
      },
      {
        // Primary arm muscle visible from front
        name: "Biceps Brachii",
        x: "35%", y: "32%", // Positioned on the upper arm area
        description: "Primary arm muscle for elbow flexion and forearm supination",
        location: "Front of the upper arm",
        exercises: "Bicep Curls, Hammer Curls, Chin-ups"
      },
      {
        // Main abdominal muscle (six-pack area)
        name: "Rectus Abdominis",
        x: "50%", y: "40%", // Centered on the abdomen
        description: "Main abdominal muscle for trunk flexion and core stability",
        location: "Center of the abdomen",
        exercises: "Crunches, Planks, Hanging Leg Raises, Sit-ups"
      },
      {
        // Side abdominal muscles
        name: "External Obliques",
        x: "58%", y: "38%", // Positioned on the side of the abdomen
        description: "Side abdominal muscles for trunk rotation and lateral flexion",
        location: "Sides of the abdomen",
        exercises: "Russian Twists, Side Planks, Bicycle Crunches"
      },
      {
        // Lower arm muscles for grip strength
        name: "Forearms",
        x: "32%", y: "40%", // Positioned on the forearm area
        description: "Lower arm muscles for grip strength and wrist movement",
        location: "Front of the forearm",
        exercises: "Wrist Curls, Farmer's Walks, Grip Strengtheners"
      },
      {
        // Front thigh muscles
        name: "Quadriceps",
        x: "43%", y: "55%", // Positioned on the front thigh area
        description: "Large thigh muscles for knee extension and hip flexion",
        location: "Front of the thigh",
        exercises: "Squats, Lunges, Leg Press, Leg Extensions"
      },
      {
        // Shin muscles
        name: "Tibialis ",
        x: "41%", y: "80%", // Positioned on the lower leg/shin area
        description: "Shin muscle for dorsiflexion and foot inversion",
        location: "Front of the lower leg",
        exercises: "Toe Raises, Heel Walks, Resistance Band Dorsiflexion"
      }
    ]
  },
  
  // Side view of the human body
  side: {
    muscles: [
      {
        // Side view of shoulder muscles
        name: "Deltoids (Lateral)",
        x: "45%", y: "25%", // Centered position for side view
        description: "Side shoulder muscles for arm abduction",
        location: "Side of the shoulder joint",
        exercises: "Lateral Raises, Shoulder Press, Upright Rows"
      },
      {
        // Muscle along the ribs for scapular movement
        name: "Serratus Anterior",
        x: "53%", y: "32%", // Positioned along the rib cage area
        description: "Muscle for scapular protraction and upward rotation",
        location: "Side of the rib cage",
        exercises: "Push-ups Plus, Scapular Wall Slides, Punches"
      },
      {
        // Back arm muscles visible from side view
        name: "Triceps (Lateral)",
        x: "46%", y: "32%", // Positioned on the back of the upper arm
        description: "Back arm muscles visible from side",
        location: "Back of the upper arm",
        exercises: "Tricep Dips, Extensions, Close-grip Push-ups"
      },
      {
        // Main buttock muscle from side view
        name: "Gluteus Maximus",
        x: "45%", y: "50%", // Positioned in the hip/buttock region
        description: "Largest buttock muscle for hip extension and stabilization",
        location: "Posterior hip region",
        exercises: "Squats, Hip Thrusts, Deadlifts, Glute Bridges"
      },
      {
        // Back thigh muscles visible from side
        name: "Hamstrings (Lateral)",
        x: "45%", y: "62%", // Positioned on the back thigh area
        description: "Back thigh muscles visible from side",
        location: "Back of the thigh",
        exercises: "Romanian Deadlifts, Hamstring Curls"
      }
    ]
  },
  
  // Back view of the human body
  back: {
    muscles: [
      {
        // Upper neck and shoulder area muscle
        name: "Trapezius (Upper)",
        x: "50%", y: "20%", // Centered at the top of the back
        description: "Upper back muscle for shoulder elevation and scapular retraction",
        location: "Upper back and neck region",
        exercises: "Shrugs, Upright Rows, Face Pulls"
      },
      {
        // Rear shoulder muscles
        name: "Deltoids (Posterior)",
        x: "62%", y: "25%", // Positioned on the back of the shoulder
        description: "Rear shoulder muscles for arm extension and external rotation",
        location: "Back of the shoulder joint",
        exercises: "Reverse Flyes, Rear Delt Raises, Face Pulls"
      },
      {
        // Middle portion of the trapezius muscle
        name: "Trapezius (Middle)",
        x: "50%", y: "25%", // Centered between the shoulder blades
        description: "Middle back muscle for scapular retraction",
        location: "Middle back between shoulder blades",
        exercises: "Rows, Scapular Retractions, Reverse Flyes"
      },
      {
        // Deep muscles between shoulder blades
        name: "Rhomboids",
        x: "42%", y: "28%", // Positioned between the shoulder blades
        description: "Deep back muscles for scapular retraction",
        location: "Between the shoulder blades",
        exercises: "Rows, Scapular Retractions, Reverse Flyes"
      },
      {
        // Large wing-like back muscles
        name: "Latissimus Dorsi",
        x: "45%", y: "38%", // Positioned on the sides of the back
        description: "Large back muscles for arm adduction and pulling",
        location: "Sides of the back, extending to lower back",
        exercises: "Pull-ups, Lat Pulldowns, Rows"
      },
      {
        // Back arm muscles from rear view
        name: "Triceps",
        x: "32%", y: "32%", // Positioned on the back of the upper arm
        description: "Back arm muscles for elbow extension",
        location: "Back of the upper arm",
        exercises: "Tricep Dips, Close-grip Push-ups, Tricep Extensions"
      },
      {
        // Deep spinal support muscles
        name: "Erector Spinae",
        x: "50%", y: "45%", // Positioned along the spine
        description: "Deep back muscles for spinal extension and posture",
        location: "Along the spine",
        exercises: "Deadlifts, Back Extensions, Good Mornings"
      },
      {
        // Main buttock muscle from back view
        name: "Gluteus Maximus",
        x: "56%", y: "52%", // Positioned in the buttock region
        description: "Largest buttock muscle for hip extension",
        location: "Buttocks region",
        exercises: "Squats, Hip Thrusts, Deadlifts, Glute Bridges"
      },
      {
        // Back thigh muscles from rear view
        name: "Hamstrings",
        x: "56%", y: "65%", // Positioned on the back of the thigh
        description: "Back thigh muscles for knee flexion and hip extension",
        location: "Back of the thigh",
        exercises: "Romanian Deadlifts, Hamstring Curls, Good Mornings"
      },
      {
        // Main calf muscle
        name: "Gastrocnemius",
        x: "58%", y: "85%", // Positioned on the back of the lower leg
        description: "Main calf muscle for plantar flexion",
        location: "Back of the lower leg",
        exercises: "Calf Raises, Jump Rope, Running"
      }
    ]
  }
};

// Variable to track which anatomical view is currently being displayed
let currentView = 'front';

/**
 * Function to switch between different anatomical views (front, side, back)
 * @param {string} view - The view to display ('front', 'side', or 'back')
 */
function showView(view) {
  // Update the global variable to track current view
  currentView = view;
  
  // Get references to the main image element and its wrapper container
  const img = document.getElementById("muscle-image");
  const imageWrapper = document.querySelector(".image-wrapper");
  
  // Update the visual state of view toggle buttons
  // First, remove 'active' class from all buttons
  document.querySelectorAll('.view-toggle button').forEach(btn => btn.classList.remove('active'));
  // Then add 'active' class to the clicked button
  document.getElementById(`${view}-btn`).classList.add('active');
  
  // Change the displayed image using data attributes
  // The image element should have data-front, data-side, data-back attributes with image URLs
  img.src = img.dataset[view];
  
  // Clean up: remove all existing muscle dots from the previous view
  document.querySelectorAll('.muscle-dot').forEach(dot => dot.remove());
  
  // Create and position new clickable dots for the current view
  muscleData[view].muscles.forEach((muscle, index) => {
    // Create a new dot element for each muscle
    const dot = document.createElement('div');
    dot.className = 'muscle-dot'; // CSS class for styling the dots
    
    // Position the dot using the muscle's x,y coordinates
    dot.style.left = muscle.x;   // Horizontal position (percentage)
    dot.style.top = muscle.y;    // Vertical position (percentage)
    
    // Add click event to show muscle information popup
    dot.onclick = () => showPopup(muscle);
    
    // Add the dot to the image wrapper (positioned relative to the image)
    imageWrapper.appendChild(dot);
  });
}

/**
 * Function to display detailed information about a selected muscle
 * @param {Object} muscle - The muscle object containing name, description, location, exercises
 */
function showPopup(muscle) {
  // Populate the popup with muscle information
  // Update the muscle name in the popup header
  document.getElementById("muscle-name").textContent = muscle.name;
  // Update the detailed description
  document.getElementById("muscle-description").textContent = muscle.description;
  // Update the anatomical location information
  document.getElementById("muscle-location").textContent = muscle.location;
  // Update the recommended exercises
  document.getElementById("muscle-exercises").textContent = muscle.exercises;
  
  // Make the popup visible by removing the 'hidden' class
  document.getElementById("muscle-popup").classList.remove("hidden");
  // Show the background overlay (dims the rest of the page)
  document.querySelector(".overlay").classList.remove("hidden");
}

/**
 * Function to close the muscle information popup
 * Called when user clicks the close button or overlay
 */
function closePopup() {
  // Hide the popup by adding the 'hidden' class back
  document.getElementById("muscle-popup").classList.add("hidden");
  // Hide the background overlay
  document.querySelector(".overlay").classList.add("hidden");
}

// Initialize the application when the page finishes loading
document.addEventListener('DOMContentLoaded', function() {
  // Start with the front view displayed by default
  showView("front");
});