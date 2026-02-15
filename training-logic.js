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
