// ── Activity & Calorie Expenditure Calculations ──

/**
 * Calculate calories burned from steps
 * 
 * Average calorie burn per step varies by:
 * - Body weight (heavier = more calories)
 * - Walking pace (faster = more calories)
 * - Terrain (hills = more calories)
 * 
 * General formula: 0.04-0.05 calories per step for average adult
 * We'll use a middle ground of 0.045 calories per step
 */
function calculateStepCalories(steps) {
  const caloriesPerStep = 0.045;
  return Math.round(steps * caloriesPerStep);
}

/**
 * Calculate calories burned during gym session
 * 
 * Estimates based on activity intensity:
 * - Light: 3-4 calories/min (stretching, yoga, light weights)
 * - Moderate: 5-7 calories/min (steady cardio, moderate weights)
 * - Intense: 8-12 calories/min (HIIT, heavy lifting, running)
 * 
 * We'll use moderate intensity as default: 6 cal/min
 */
function calculateGymCalories(minutes, intensity = 'moderate') {
  const caloriesPerMin = {
    light: 3.5,
    moderate: 6,
    intense: 10
  };
  
  return Math.round(minutes * (caloriesPerMin[intensity] || caloriesPerMin.moderate));
}

/**
 * Analyze daily step goal progress
 * Recommended: 10,000 steps/day (WHO guideline)
 */
function analyzeSteps(steps) {
  const goal = 10000;
  const percentage = Math.round((steps / goal) * 100);
  
  let rating, feedback;
  
  if (steps >= 12000) {
    rating = 'excellent';
    feedback = 'Outstanding! You exceeded the daily recommendation.';
  } else if (steps >= 10000) {
    rating = 'great';
    feedback = 'Perfect! You hit the 10k steps goal.';
  } else if (steps >= 7500) {
    rating = 'good';
    feedback = 'Good progress! Keep pushing towards 10k.';
  } else if (steps >= 5000) {
    rating = 'fair';
    feedback = 'Decent start, but aim for at least 7,500 steps.';
  } else {
    rating = 'low';
    feedback = 'Try to move more throughout the day.';
  }
  
  return { steps, goal, percentage, rating, feedback, calories: calculateStepCalories(steps) };
}

/**
 * Calculate total daily activity summary
 */
function calculateDailySummary(data) {
  const steps = data.steps || 0;
  const gymMinutes = data.gymSessions?.reduce((sum, s) => sum + s.minutes, 0) || 0;
  const gymCalories = data.gymSessions?.reduce((sum, s) => sum + s.calories, 0) || 0;
  const stepCalories = calculateStepCalories(steps);
  
  return {
    steps,
    gymMinutes,
    totalCalories: stepCalories + gymCalories,
    stepCalories,
    gymCalories
  };
}
