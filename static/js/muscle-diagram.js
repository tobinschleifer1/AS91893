const muscleData = {
  front: {
    muscles: [
      {
        name: "Pectoralis Major",
        x: "45%", y: "25%",
        description: "Primary chest muscle responsible for pushing movements and arm adduction",
        location: "Upper chest area, spanning from sternum to shoulder",
        exercises: "Bench Press, Push-ups, Chest Flyes, Dips"
      },
      {
        name: "Deltoids (left)",
        x: "37%", y: "25%",
        description: "Front shoulder muscles for arm elevation and forward movement",
        location: "Front of the shoulder joint",
        exercises: "Shoulder Press, Front Raises, Arnold Press"
      },
      {
        name: "Deltoids (right)",
        x: "63%", y: "25%",
        description: "Front shoulder muscles for arm elevation and forward movement",
        location: "Front of the shoulder joint",
        exercises: "Shoulder Press, Front Raises, Arnold Press"
      },
      {
        name: "Biceps Brachii",
        x: "35%", y: "32%",
        description: "Primary arm muscle for elbow flexion and forearm supination",
        location: "Front of the upper arm",
        exercises: "Bicep Curls, Hammer Curls, Chin-ups"
      },
      
      {
        name: "Rectus Abdominis",
        x: "50%", y: "40%",
        description: "Main abdominal muscle for trunk flexion and core stability",
        location: "Center of the abdomen",
        exercises: "Crunches, Planks, Hanging Leg Raises, Sit-ups"
      },
      
      {
        name: "External Obliques",
        x: "58%", y: "38%",
        description: "Side abdominal muscles for trunk rotation and lateral flexion",
        location: "Sides of the abdomen",
        exercises: "Russian Twists, Side Planks, Bicycle Crunches"
      },
      {
        name: "Forearms",
        x: "32%", y: "40%",
        description: "Lower arm muscles for grip strength and wrist movement",
        location: "Front of the forearm",
        exercises: "Wrist Curls, Farmer's Walks, Grip Strengtheners"
      },
      
      {
        name: "Quadriceps",
        x: "43%", y: "55%",
        description: "Large thigh muscles for knee extension and hip flexion",
        location: "Front of the thigh",
        exercises: "Squats, Lunges, Leg Press, Leg Extensions"
      },
      
      
      {
        name: "Tibialis ",
        x: "41%", y: "80%",
        description: "Shin muscle for dorsiflexion and foot inversion",
        location: "Front of the lower leg",
        exercises: "Toe Raises, Heel Walks, Resistance Band Dorsiflexion"
      }
    ]
  },
  side: {
    muscles: [
      {
        name: "Deltoids (Lateral)",
        x: "45%", y: "25%",
        description: "Side shoulder muscles for arm abduction",
        location: "Side of the shoulder joint",
        exercises: "Lateral Raises, Shoulder Press, Upright Rows"
      },
      {
        name: "Serratus Anterior",
        x: "53%", y: "32%",
        description: "Muscle for scapular protraction and upward rotation",
        location: "Side of the rib cage",
        exercises: "Push-ups Plus, Scapular Wall Slides, Punches"
      },
      
      {
        name: "Triceps (Lateral)",
        x: "46%", y: "32%",
        description: "Back arm muscles visible from side",
        location: "Back of the upper arm",
        exercises: "Tricep Dips, Extensions, Close-grip Push-ups"
      },
      
      {
        name: "Gluteus Maximus",
        x: "45%", y: "50%",
        description: "Largest buttock muscle for hip extension and stabilization",
        location: "Posterior hip region",
        exercises: "Squats, Hip Thrusts, Deadlifts, Glute Bridges"
      },
      
      {
        name: "Hamstrings (Lateral)",
        x: "45%", y: "62%",
        description: "Back thigh muscles visible from side",
        location: "Back of the thigh",
        exercises: "Romanian Deadlifts, Hamstring Curls"
      },
      
    ]
  },
  back: {
    muscles: [
      {
        name: "Trapezius (Upper)",
        x: "50%", y: "20%",
        description: "Upper back muscle for shoulder elevation and scapular retraction",
        location: "Upper back and neck region",
        exercises: "Shrugs, Upright Rows, Face Pulls"
      },
      
      {
        name: "Deltoids (Posterior)",
        x: "62%", y: "25%",
        description: "Rear shoulder muscles for arm extension and external rotation",
        location: "Back of the shoulder joint",
        exercises: "Reverse Flyes, Rear Delt Raises, Face Pulls"
      },
      {
        name: "Trapezius (Middle)",
        x: "50%", y: "25%",
        description: "Middle back muscle for scapular retraction",
        location: "Middle back between shoulder blades",
        exercises: "Rows, Scapular Retractions, Reverse Flyes"
      },
      {
        name: "Rhomboids",
        x: "42%", y: "28%",
        description: "Deep back muscles for scapular retraction",
        location: "Between the shoulder blades",
        exercises: "Rows, Scapular Retractions, Reverse Flyes"
      },
      
      {
        name: "Latissimus Dorsi",
        x: "45%", y: "38%",
        description: "Large back muscles for arm adduction and pulling",
        location: "Sides of the back, extending to lower back",
        exercises: "Pull-ups, Lat Pulldowns, Rows"
      },
      
      {
        name: "Triceps",
        x: "32%", y: "32%",
        description: "Back arm muscles for elbow extension",
        location: "Back of the upper arm",
        exercises: "Tricep Dips, Close-grip Push-ups, Tricep Extensions"
      },
      
      {
        name: "Erector Spinae",
        x: "50%", y: "45%",
        description: "Deep back muscles for spinal extension and posture",
        location: "Along the spine",
        exercises: "Deadlifts, Back Extensions, Good Mornings"
      },
      
      {
        name: "Gluteus Maximus",
        x: "56%", y: "52%",
        description: "Largest buttock muscle for hip extension",
        location: "Buttocks region",
        exercises: "Squats, Hip Thrusts, Deadlifts, Glute Bridges"
      },
      
      {
        name: "Hamstrings",
        x: "56%", y: "65%",
        description: "Back thigh muscles for knee flexion and hip extension",
        location: "Back of the thigh",
        exercises: "Romanian Deadlifts, Hamstring Curls, Good Mornings"
      },
      
      {
        name: "Gastrocnemius",
        x: "58%", y: "85%",
        description: "Main calf muscle for plantar flexion",
        location: "Back of the lower leg",
        exercises: "Calf Raises, Jump Rope, Running"
      }
    ]
  }
};

let currentView = 'front';

function showView(view) {
  currentView = view;
  const img = document.getElementById("muscle-image");
  const imageWrapper = document.querySelector(".image-wrapper");
  
  // Update active button
  document.querySelectorAll('.view-toggle button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`${view}-btn`).classList.add('active');
  
  // Change image using data attributes
  img.src = img.dataset[view];
  
  // Remove existing dots
  document.querySelectorAll('.muscle-dot').forEach(dot => dot.remove());
  
  // Add new dots for current view
  muscleData[view].muscles.forEach((muscle, index) => {
    const dot = document.createElement('div');
    dot.className = 'muscle-dot';
    dot.style.left = muscle.x;
    dot.style.top = muscle.y;
    dot.onclick = () => showPopup(muscle);
    
    imageWrapper.appendChild(dot);
  });
}

function showPopup(muscle) {
  document.getElementById("muscle-name").textContent = muscle.name;
  document.getElementById("muscle-description").textContent = muscle.description;
  document.getElementById("muscle-location").textContent = muscle.location;
  document.getElementById("muscle-exercises").textContent = muscle.exercises;
  
  document.getElementById("muscle-popup").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("muscle-popup").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
}

// Initialize with front view when page loads
document.addEventListener('DOMContentLoaded', function() {
  showView("front");
});