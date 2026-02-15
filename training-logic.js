// ── Training & Exercise Logic ──

/**
 * Exercise categories and their primary muscle groups
 */
const EXERCISE_CATEGORIES = {
  push: {
    name: 'Push',
    muscles: ['Chest', 'Shoulders', 'Triceps'],
    color: 'bg-red-100 text-red-800'
  },
  pull: {
    name: 'Pull',
    muscles: ['Back', 'Biceps'],
    color: 'bg-blue-100 text-blue-800'
  },
  legs: {
    name: 'Legs',
    muscles: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
    color: 'bg-green-100 text-green-800'
  },
  core: {
    name: 'Core',
    muscles: ['Abs', 'Obliques', 'Lower Back'],
    color: 'bg-yellow-100 text-yellow-800'
  },
  cardio: {
    name: 'Cardio',
    muscles: ['Cardiovascular System'],
    color: 'bg-purple-100 text-purple-800'
  },
  other: {
    name: 'Other',
    muscles: [],
    color: 'bg-gray-100 text-gray-800'
  }
};

/**
 * Calorie expenditure constants (calories per kg per rep)
 * Based on exercise intensity and compound vs isolation movements
 * 
 * Research-based estimates:
 * - Compound movements (squats, deadlifts, bench): 0.32 cal/kg/rep
 * - Medium compound (rows, overhead press): 0.24 cal/kg/rep
 * - Isolation movements (curls, extensions): 0.12 cal/kg/rep
 */
const CALORIE_CONSTANTS = {
  // Compound movements - high calorie burn
  compound: 0.32,
  // Medium movements - moderate calorie burn
  medium: 0.24,
  // Isolation movements - lower calorie burn
  isolation: 0.12
};

/**
 * Exercise calorie burn classification
 * Maps common exercise names to their burn rate category
 */
const EXERCISE_BURN_RATES = {
  // Compound - High burn
  'squat': 'compound',
  'deadlift': 'compound',
  'bench press': 'compound',
  'front squat': 'compound',
  'back squat': 'compound',
  'sumo deadlift': 'compound',
  'clean': 'compound',
  'snatch': 'compound',
  'thruster': 'compound',
  
  // Medium - Moderate burn
  'overhead press': 'medium',
  'row': 'medium',
  'barbell row': 'medium',
  'dumbbell row': 'medium',
  'shoulder press': 'medium',
  'military press': 'medium',
  'pull up': 'medium',
  'chin up': 'medium',
  'dip': 'medium',
  'lunge': 'medium',
  'leg press': 'medium',
  
  // Isolation - Lower burn
  'bicep curl': 'isolation',
  'tricep extension': 'isolation',
  'lateral raise': 'isolation',
  'leg curl': 'isolation',
  'leg extension': 'isolation',
  'calf raise': 'isolation',
  'fly': 'isolation',
  'shrug': 'isolation'
};

/**
 * Determine calorie constant for an exercise
 * @param {string} exerciseName - Name of the exercise
 * @returns {number} - Calorie constant (cal/kg/rep)
 */
function getCalorieConstant(exerciseName) {
  const nameLower = exerciseName.toLowerCase();
  
  // Check if exercise name contains any known patterns
  for (const [pattern, category] of Object.entries(EXERCISE_BURN_RATES)) {
    if (nameLower.includes(pattern)) {
      return CALORIE_CONSTANTS[category];
    }
  }
  
  // Default to medium if unknown
  return CALORIE_CONSTANTS.medium;
}

/**
 * Calculate calories burned in a single set
 * Formula: constant × weight × reps
 * @param {number} weight - Weight lifted in kg
 * @param {number} reps - Number of repetitions
 * @param {string} exerciseName - Name of the exercise
 * @returns {number} - Calories burned
 */
function calculateSetCalories(weight, reps, exerciseName) {
  const constant = getCalorieConstant(exerciseName);
  return constant * weight * reps;
}

/**
 * Calculate total calories for an exercise (all sets)
 * @param {Array} sets - Array of set objects {weight, reps}
 * @param {string} exerciseName - Name of the exercise
 * @returns {number} - Total calories burned
 */
function calculateExerciseCalories(sets, exerciseName) {
  return sets.reduce((total, set) => {
    return total + calculateSetCalories(set.weight || 0, set.reps || 0, exerciseName);
  }, 0);
}

/**
 * Calculate total workout calories
 * @param {Array} exercises - Array of workout exercises with sets
 * @returns {number} - Total calories burned in workout
 */
function calculateWorkoutCalories(exercises) {
  return exercises.reduce((total, exercise) => {
    return total + calculateExerciseCalories(exercise.sets || [], exercise.exerciseName);
  }, 0);
}

/**
 * Calculate total volume for an exercise
 * Volume = weight × reps × sets
 */
function calculateVolume(weight, reps, sets) {
  return weight * reps * sets;
}

/**
 * Calculate estimated 1RM (One Rep Max) using Brzycki formula
 * 1RM = weight × (36 / (37 - reps))
 */
function calculate1RM(weight, reps) {
  if (reps === 1) return weight;
  if (reps > 10) return weight; // Formula less accurate beyond 10 reps
  return Math.round(weight * (36 / (37 - reps)));
}

/**
 * Analyze workout performance
 */
function analyzeWorkout(exercises, durationMins) {
  const totalSets = exercises.reduce((sum, ex) => sum + (ex.sets || 0), 0);
  const totalVolume = exercises.reduce((sum, ex) => {
    return sum + calculateVolume(ex.weight || 0, ex.reps || 0, ex.sets || 0);
  }, 0);

  let rating, feedback;
  
  if (durationMins < 20) {
    rating = 'short';
    feedback = 'Quick session. Great for maintenance or active recovery.';
  } else if (durationMins <= 45) {
    rating = 'optimal';
    feedback = 'Ideal workout duration for strength and hypertrophy.';
  } else if (durationMins <= 75) {
    rating = 'long';
    feedback = 'Extended session. Make sure recovery is adequate.';
  } else {
    rating = 'very_long';
    feedback = 'Very long session. Watch for overtraining signs.';
  }

  return {
    durationMins,
    totalExercises: exercises.length,
    totalSets,
    totalVolume,
    rating,
    feedback
  };
}

/**
 * Format workout duration
 */
function formatWorkoutDuration(mins) {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}
