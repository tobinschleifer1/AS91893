const muscleData = {
  front: {
    muscles: [
      {
        name: "Pectoralis Major",
        x: "50%", y: "30%",
        description: "Primary chest muscle responsible for pushing movements and arm adduction",
        location: "Upper chest area, spanning from sternum to shoulder",
        exercises: "Bench Press, Push-ups, Chest Flyes, Dips"
      },
      {
        name: "Deltoids (Anterior)",
        x: "30%", y: "25%",
        description: "Front shoulder muscles for arm elevation and forward movement",
        location: "Front of the shoulder joint",
        exercises: "Shoulder Press, Front Raises, Arnold Press"
      },
      {
        name: "Deltoids (Anterior)",
        x: "70%", y: "25%",
        description: "Front shoulder muscles for arm elevation and forward movement",
        location: "Front of the shoulder joint",
        exercises: "Shoulder Press, Front Raises, Arnold Press"
      },
      {
        name: "Biceps Brachii",
        x: "25%", y: "38%",
        description: "Primary arm muscle for elbow flexion and forearm supination",
        location: "Front of the upper arm",
        exercises: "Bicep Curls, Hammer Curls, Chin-ups"
      },
      {
        name: "Biceps Brachii",
        x: "75%", y: "38%",
        description: "Primary arm muscle for elbow flexion and forearm supination",
        location: "Front of the upper arm",
        exercises: "Bicep Curls, Hammer Curls, Chin-ups"
      },
      {
        name: "Rectus Abdominis",
        x: "50%", y: "45%",
        description: "Main abdominal muscle for trunk flexion and core stability",
        location: "Center of the abdomen",
        exercises: "Crunches, Planks, Hanging Leg Raises, Sit-ups"
      },
      {
        name: "External Obliques",
        x: "38%", y: "50%",
        description: "Side abdominal muscles for trunk rotation and lateral flexion",
        location: "Sides of the abdomen",
        exercises: "Russian Twists, Side Planks, Bicycle Crunches"
      },
      {
        name: "External Obliques",
        x: "62%", y: "50%",
        description: "Side abdominal muscles for trunk rotation and lateral flexion",
        location: "Sides of the abdomen",
        exercises: "Russian Twists, Side Planks, Bicycle Crunches"
      },
      {
        name: "Forearms",
        x: "18%", y: "55%",
        description: "Lower arm muscles for grip strength and wrist movement",
        location: "Front of the forearm",
        exercises: "Wrist Curls, Farmer's Walks, Grip Strengtheners"
      },
      {
        name: "Forearms",
        x: "82%", y: "55%",
        description: "Lower arm muscles for grip strength and wrist movement",
        location: "Front of the forearm",
        exercises: "Wrist Curls, Farmer's Walks, Grip Strengtheners"
      },
      {
        name: "Quadriceps",
        x: "43%", y: "75%",
        description: "Large thigh muscles for knee extension and hip flexion",
        location: "Front of the thigh",
        exercises: "Squats, Lunges, Leg Press, Leg Extensions"
      },
      {
        name: "Quadriceps",
        x: "57%", y: "75%",
        description: "Large thigh muscles for knee extension and hip flexion",
        location: "Front of the thigh",
        exercises: "Squats, Lunges, Leg Press, Leg Extensions"
      },
      {
        name: "Tibialis Anterior",
        x: "46%", y: "90%",
        description: "Shin muscle for dorsiflexion and foot inversion",
        location: "Front of the lower leg",
        exercises: "Toe Raises, Heel Walks, Resistance Band Dorsiflexion"
      },
      {
        name: "Tibialis Anterior",
        x: "54%", y: "90%",
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
        x: "30%", y: "20%",
        description: "Side shoulder muscles for arm abduction",
        location: "Side of the shoulder joint",
        exercises: "Lateral Raises, Shoulder Press, Upright Rows"
      },
      {
        name: "Serratus Anterior",
        x: "58%", y: "32%",
        description: "Muscle for scapular protraction and upward rotation",
        location: "Side of the rib cage",
        exercises: "Push-ups Plus, Scapular Wall Slides, Punches"
      },
      {
        name: "External Obliques",
        x: "52%", y: "42%",
        description: "Side abdominal muscles visible from lateral view",
        location: "Lateral aspect of the abdomen",
        exercises: "Side Planks, Wood Chops, Russian Twists"
      },
      {
        name: "Triceps (Lateral)",
        x: "22%", y: "35%",
        description: "Back arm muscles visible from side",
        location: "Back of the upper arm",
        exercises: "Tricep Dips, Extensions, Close-grip Push-ups"
      },
      {
        name: "Gluteus Medius",
        x: "48%", y: "52%",
        description: "Hip stabilizer muscle for abduction",
        location: "Upper lateral hip region",
        exercises: "Side-lying Hip Abduction, Clamshells, Monster Walks"
      },
      {
        name: "Gluteus Maximus",
        x: "42%", y: "58%",
        description: "Largest buttock muscle for hip extension and stabilization",
        location: "Posterior hip region",
        exercises: "Squats, Hip Thrusts, Deadlifts, Glute Bridges"
      },
      {
        name: "IT Band/Tensor Fasciae Latae",
        x: "50%", y: "65%",
        description: "Hip muscle and connective tissue for leg stabilization",
        location: "Lateral thigh area",
        exercises: "Side-lying Hip Abduction, Foam Rolling, Stretching"
      },
      {
        name: "Hamstrings (Lateral)",
        x: "45%", y: "72%",
        description: "Back thigh muscles visible from side",
        location: "Back of the thigh",
        exercises: "Romanian Deadlifts, Hamstring Curls"
      },
      {
        name: "Gastrocnemius",
        x: "38%", y: "85%",
        description: "Main calf muscle for plantar flexion",
        location: "Back of the lower leg",
        exercises: "Calf Raises, Jump Rope, Running"
      }
    ]
  },
  back: {
    muscles: [
      {
        name: "Trapezius (Upper)",
        x: "50%", y: "12%",
        description: "Upper back muscle for shoulder elevation and scapular retraction",
        location: "Upper back and neck region",
        exercises: "Shrugs, Upright Rows, Face Pulls"
      },
      {
        name: "Deltoids (Posterior)",
        x: "20%", y: "20%",
        description: "Rear shoulder muscles for arm extension and external rotation",
        location: "Back of the shoulder joint",
        exercises: "Reverse Flyes, Rear Delt Raises, Face Pulls"
      },
      {
        name: "Deltoids (Posterior)",
        x: "80%", y: "20%",
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
        name: "Rhomboids",
        x: "58%", y: "28%",
        description: "Deep back muscles for scapular retraction",
        location: "Between the shoulder blades",
        exercises: "Rows, Scapular Retractions, Reverse Flyes"
      },
      {
        name: "Latissimus Dorsi",
        x: "32%", y: "38%",
        description: "Large back muscles for arm adduction and pulling",
        location: "Sides of the back, extending to lower back",
        exercises: "Pull-ups, Lat Pulldowns, Rows"
      },
      {
        name: "Latissimus Dorsi",
        x: "68%", y: "38%",
        description: "Large back muscles for arm adduction and pulling",
        location: "Sides of the back, extending to lower back",
        exercises: "Pull-ups, Lat Pulldowns, Rows"
      },
      {
        name: "Triceps",
        x: "15%", y: "32%",
        description: "Back arm muscles for elbow extension",
        location: "Back of the upper arm",
        exercises: "Tricep Dips, Close-grip Push-ups, Tricep Extensions"
      },
      {
        name: "Triceps",
        x: "85%", y: "32%",
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
        x: "40%", y: "58%",
        description: "Largest buttock muscle for hip extension",
        location: "Buttocks region",
        exercises: "Squats, Hip Thrusts, Deadlifts, Glute Bridges"
      },
      {
        name: "Gluteus Maximus",
        x: "60%", y: "58%",
        description: "Largest buttock muscle for hip extension",
        location: "Buttocks region",
        exercises: "Squats, Hip Thrusts, Deadlifts, Glute Bridges"
      },
      {
        name: "Hamstrings",
        x: "38%", y: "70%",
        description: "Back thigh muscles for knee flexion and hip extension",
        location: "Back of the thigh",
        exercises: "Romanian Deadlifts, Hamstring Curls, Good Mornings"
      },
      {
        name: "Hamstrings",
        x: "62%", y: "70%",
        description: "Back thigh muscles for knee flexion and hip extension",
        location: "Back of the thigh",
        exercises: "Romanian Deadlifts, Hamstring Curls, Good Mornings"
      },
      {
        name: "Gastrocnemius",
        x: "40%", y: "85%",
        description: "Main calf muscle for plantar flexion",
        location: "Back of the lower leg",
        exercises: "Calf Raises, Jump Rope, Running"
      },
      {
        name: "Gastrocnemius",
        x: "60%", y: "85%",
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