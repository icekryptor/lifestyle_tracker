// Seed data for common dishes and exercises
// This can be called to populate a new user's library with examples

const SAMPLE_DISHES = [
  // Meat products
  { name: 'Chicken Breast', brand: null, category: 'meat', protein: 31, carbs: 0, fats: 3.6, photo: null },
  { name: 'Beef Steak', brand: null, category: 'meat', protein: 26, carbs: 0, fats: 15, photo: null },
  { name: 'Ground Turkey', brand: null, category: 'meat', protein: 27, carbs: 0, fats: 8, photo: null },
  { name: 'Pork Chop', brand: null, category: 'meat', protein: 25, carbs: 0, fats: 14, photo: null },
  { name: 'Bacon', brand: null, category: 'meat', protein: 37, carbs: 1.4, fats: 42, photo: null },
  
  // Fish
  { name: 'Salmon Fillet', brand: null, category: 'fish', protein: 25, carbs: 0, fats: 13, photo: null },
  { name: 'Tuna', brand: null, category: 'fish', protein: 29, carbs: 0, fats: 6, photo: null },
  { name: 'Cod', brand: null, category: 'fish', protein: 18, carbs: 0, fats: 0.7, photo: null },
  { name: 'Shrimp', brand: null, category: 'fish', protein: 24, carbs: 0.2, fats: 0.3, photo: null },
  { name: 'Mackerel', brand: null, category: 'fish', protein: 19, carbs: 0, fats: 14, photo: null },
  
  // Dairy
  { name: 'Greek Yogurt', brand: null, category: 'dairy', protein: 10, carbs: 3.6, fats: 0.4, photo: null },
  { name: 'Cottage Cheese', brand: null, category: 'dairy', protein: 11, carbs: 3.4, fats: 4.3, photo: null },
  { name: 'Whole Milk', brand: null, category: 'dairy', protein: 3.4, carbs: 5, fats: 3.6, photo: null },
  { name: 'Cheddar Cheese', brand: null, category: 'dairy', protein: 25, carbs: 1.3, fats: 33, photo: null },
  { name: 'Eggs', brand: null, category: 'dairy', protein: 13, carbs: 1.1, fats: 11, photo: null },
  
  // Grains
  { name: 'Brown Rice (cooked)', brand: null, category: 'grains', protein: 2.6, carbs: 23, fats: 0.9, photo: null },
  { name: 'Oatmeal', brand: null, category: 'grains', protein: 17, carbs: 66, fats: 7, photo: null },
  { name: 'Whole Wheat Bread', brand: null, category: 'grains', protein: 13, carbs: 41, fats: 3.4, photo: null },
  { name: 'Quinoa (cooked)', brand: null, category: 'grains', protein: 4.4, carbs: 21, fats: 1.9, photo: null },
  { name: 'Whole Wheat Pasta', brand: null, category: 'grains', protein: 13, carbs: 75, fats: 2.5, photo: null },
  
  // Vegetables
  { name: 'Broccoli', brand: null, category: 'vegetables', protein: 2.8, carbs: 7, fats: 0.4, photo: null },
  { name: 'Spinach', brand: null, category: 'vegetables', protein: 2.9, carbs: 3.6, fats: 0.4, photo: null },
  { name: 'Sweet Potato', brand: null, category: 'vegetables', protein: 1.6, carbs: 20, fats: 0.1, photo: null },
  { name: 'Avocado', brand: null, category: 'vegetables', protein: 2, carbs: 8.5, fats: 15, photo: null },
  { name: 'Bell Pepper', brand: null, category: 'vegetables', protein: 1, carbs: 6, fats: 0.3, photo: null },
  { name: 'Tomato', brand: null, category: 'vegetables', protein: 0.9, carbs: 3.9, fats: 0.2, photo: null },
  
  // Fruits
  { name: 'Banana', brand: null, category: 'fruits', protein: 1.1, carbs: 23, fats: 0.3, photo: null },
  { name: 'Apple', brand: null, category: 'fruits', protein: 0.3, carbs: 14, fats: 0.2, photo: null },
  { name: 'Orange', brand: null, category: 'fruits', protein: 0.9, carbs: 12, fats: 0.1, photo: null },
  { name: 'Blueberries', brand: null, category: 'fruits', protein: 0.7, carbs: 14, fats: 0.3, photo: null },
  { name: 'Strawberries', brand: null, category: 'fruits', protein: 0.7, carbs: 8, fats: 0.3, photo: null },
  
  // Pastry
  { name: 'Croissant', brand: null, category: 'pastry', protein: 8, carbs: 46, fats: 21, photo: null },
  { name: 'Bagel', brand: null, category: 'pastry', protein: 10, carbs: 53, fats: 1.5, photo: null },
  { name: 'Donut', brand: null, category: 'pastry', protein: 4.6, carbs: 51, fats: 20, photo: null },
  { name: 'Muffin', brand: null, category: 'pastry', protein: 6, carbs: 51, fats: 18, photo: null },
  { name: 'Pancakes', brand: null, category: 'pastry', protein: 6, carbs: 28, fats: 9, photo: null },
  
  // Snacks
  { name: 'Almonds', brand: null, category: 'snacks', protein: 21, carbs: 22, fats: 49, photo: null },
  { name: 'Peanut Butter', brand: null, category: 'snacks', protein: 25, carbs: 20, fats: 50, photo: null },
  { name: 'Protein Bar', brand: null, category: 'snacks', protein: 20, carbs: 40, fats: 8, photo: null },
  { name: 'Dark Chocolate', brand: null, category: 'snacks', protein: 7.8, carbs: 46, fats: 43, photo: null },
  { name: 'Granola', brand: null, category: 'snacks', protein: 10, carbs: 68, fats: 15, photo: null },
  
  // Drinks
  { name: 'Protein Shake', brand: null, category: 'drinks', protein: 25, carbs: 5, fats: 3, photo: null },
  { name: 'Coffee (black)', brand: null, category: 'drinks', protein: 0.3, carbs: 0, fats: 0, photo: null },
  { name: 'Green Tea', brand: null, category: 'drinks', protein: 0, carbs: 0, fats: 0, photo: null },
  { name: 'Orange Juice', brand: null, category: 'drinks', protein: 0.7, carbs: 10, fats: 0.2, photo: null },
  { name: 'Almond Milk', brand: null, category: 'drinks', protein: 0.4, carbs: 0.3, fats: 1.1, photo: null }
];

const SAMPLE_EXERCISES = [
  // Strength
  { name: 'Barbell Bench Press', category: 'strength', equipment: 'barbell', notes: 'Keep shoulder blades retracted, control the descent' },
  { name: 'Barbell Squat', category: 'strength', equipment: 'barbell', notes: 'Break at hips first, keep chest up, knees out' },
  { name: 'Deadlift', category: 'strength', equipment: 'barbell', notes: 'Neutral spine, drive through heels, lock out at top' },
  { name: 'Overhead Press', category: 'strength', equipment: 'barbell', notes: 'Brace core, press vertically, full lockout' },
  { name: 'Dumbbell Row', category: 'strength', equipment: 'dumbbell', notes: 'Pull elbow back, squeeze shoulder blade at top' },
  { name: 'Leg Press', category: 'strength', equipment: 'machine', notes: 'Full range of motion, feet shoulder-width' },
  { name: 'Lat Pulldown', category: 'strength', equipment: 'cable', notes: 'Pull to upper chest, control the negative' },
  
  // Cardio
  { name: 'Running', category: 'cardio', equipment: null, notes: 'Track distance and time for progression' },
  { name: 'Cycling', category: 'cardio', equipment: null, notes: 'Adjust resistance for intensity variations' },
  { name: 'Jump Rope', category: 'cardio', equipment: null, notes: 'Great for HIIT, track rounds and time' },
  { name: 'Rowing Machine', category: 'cardio', equipment: 'machine', notes: 'Focus on form: legs, core, then arms' },
  { name: 'Elliptical', category: 'cardio', equipment: 'machine', notes: 'Low impact option for steady state cardio' },
  { name: 'Stair Climber', category: 'cardio', equipment: 'machine', notes: 'Keep upright posture, avoid leaning forward' },
  
  // Flexibility
  { name: 'Hamstring Stretch', category: 'flexibility', equipment: null, notes: 'Hold 30 seconds each side, keep knee straight' },
  { name: 'Hip Flexor Stretch', category: 'flexibility', equipment: null, notes: 'Lunge position, push hips forward' },
  { name: 'Shoulder Dislocations', category: 'flexibility', equipment: 'bands', notes: 'Use resistance band or PVC pipe' },
  { name: 'Cat-Cow Stretch', category: 'flexibility', equipment: null, notes: 'Mobilize spine, hold each position 5 seconds' },
  { name: 'Pigeon Pose', category: 'flexibility', equipment: null, notes: 'Great for hip mobility, hold 1-2 minutes' },
  { name: 'Child\'s Pose', category: 'flexibility', equipment: null, notes: 'Recovery position, focus on breathing' },
  
  // Olympic
  { name: 'Power Clean', category: 'olympic', equipment: 'barbell', notes: 'Explosive triple extension, catch in front rack' },
  { name: 'Snatch', category: 'olympic', equipment: 'barbell', notes: 'Wide grip, overhead catch, requires mobility' },
  { name: 'Clean and Jerk', category: 'olympic', equipment: 'barbell', notes: 'Two-phase lift: clean to rack, jerk overhead' },
  { name: 'Hang Clean', category: 'olympic', equipment: 'barbell', notes: 'Start from hang position, focus on hip drive' },
  { name: 'Push Press', category: 'olympic', equipment: 'barbell', notes: 'Use leg drive to assist overhead press' },
  
  // Calisthenics
  { name: 'Pull-ups', category: 'calisthenics', equipment: 'bodyweight', notes: 'Full range: dead hang to chin over bar' },
  { name: 'Push-ups', category: 'calisthenics', equipment: 'bodyweight', notes: 'Maintain plank position, full range of motion' },
  { name: 'Dips', category: 'calisthenics', equipment: 'bodyweight', notes: 'Lower until arms at 90 degrees, press up' },
  { name: 'Pistol Squats', category: 'calisthenics', equipment: 'bodyweight', notes: 'Single leg squat, requires balance and strength' },
  { name: 'Muscle-ups', category: 'calisthenics', equipment: 'bodyweight', notes: 'Advanced: transition from pull-up to dip' },
  { name: 'Handstand Push-ups', category: 'calisthenics', equipment: 'bodyweight', notes: 'Can use wall for support initially' },
  { name: 'L-Sit', category: 'calisthenics', equipment: 'bodyweight', notes: 'Core exercise, hold legs parallel to ground' },
  
  // Sports
  { name: 'Basketball', category: 'sports', equipment: null, notes: 'Full game or drills, track duration' },
  { name: 'Soccer', category: 'sports', equipment: null, notes: 'Game or practice, great for cardio and agility' },
  { name: 'Swimming', category: 'sports', equipment: null, notes: 'Low impact full body workout, track laps' },
  { name: 'Tennis', category: 'sports', equipment: null, notes: 'Singles or doubles, track sets and time' },
  { name: 'Boxing Training', category: 'sports', equipment: null, notes: 'Bag work, mitt work, or sparring' },
  { name: 'Volleyball', category: 'sports', equipment: null, notes: 'Team sport, great for explosiveness' }
];

async function seedUserData() {
  const user = await getCurrentUser();
  if (!user) {
    console.error('No user logged in');
    return { success: false, message: 'Please log in first' };
  }

  // Check if already seeding (prevent duplicate runs)
  if (window.isSeeding) {
    return { success: false, message: 'Already seeding data...' };
  }

  window.isSeeding = true;

  try {
    // Check if user already has data
    const existingDishes = await getDishes();
    const existingExercises = await getExercises();

    if (existingDishes.length > 0 || existingExercises.length > 0) {
      const confirm = window.confirm(
        `You already have ${existingDishes.length} dishes and ${existingExercises.length} exercises.\n\nDo you want to add sample data anyway?`
      );
      if (!confirm) {
        window.isSeeding = false;
        return { success: false, message: 'Seed cancelled by user' };
      }
    }

    let dishesAdded = 0;
    let exercisesAdded = 0;
    let errors = [];

    console.log('Starting to seed dishes...');
    // Add sample dishes
    for (const dish of SAMPLE_DISHES) {
      try {
        const calories = Math.round((dish.protein * 4) + (dish.carbs * 4) + (dish.fats * 9));
        const result = await addDish({ ...dish, calories });
        if (result) {
          dishesAdded++;
        } else {
          errors.push(`Failed to add dish: ${dish.name}`);
        }
      } catch (err) {
        errors.push(`Error adding dish ${dish.name}: ${err.message}`);
      }
    }

    console.log('Starting to seed exercises...');
    // Add sample exercises
    for (const exercise of SAMPLE_EXERCISES) {
      try {
        const result = await addExercise(exercise);
        if (result) {
          exercisesAdded++;
        } else {
          errors.push(`Failed to add exercise: ${exercise.name}`);
        }
      } catch (err) {
        errors.push(`Error adding exercise ${exercise.name}: ${err.message}`);
      }
    }

    console.log('Seeding complete:', { dishesAdded, exercisesAdded, errors });

    if (errors.length > 0) {
      console.error('Seeding errors:', errors);
    }

    window.isSeeding = false;

    return {
      success: true,
      message: `Successfully added ${dishesAdded} dishes and ${exercisesAdded} exercises!`,
      dishesAdded,
      exercisesAdded,
      errors
    };
  } catch (error) {
    window.isSeeding = false;
    console.error('Seed error:', error);
    return {
      success: false,
      message: `Error seeding data: ${error.message}`
    };
  }
}

// Auto-seed for new users (call this on first login)
async function checkAndSeedNewUser() {
  const user = await getCurrentUser();
  if (!user) return;

  // Check if we've already tried to seed for this session
  if (window.hasCheckedSeed) return;
  window.hasCheckedSeed = true;

  try {
    const existingDishes = await getDishes();
    const existingExercises = await getExercises();

    // If user has no data at all, they're likely new
    if (existingDishes.length === 0 && existingExercises.length === 0) {
      console.log('New user detected, seeding sample data...');
      const result = await seedUserData();
      if (result.success) {
        console.log(result.message);
        // Reload the page after seeding to show the new data
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    }
  } catch (error) {
    console.error('Error checking/seeding new user:', error);
  }
}
