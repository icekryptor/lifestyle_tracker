// ── Profile & Body Metrics Logic ──

/**
 * Calculate age from date of birth
 * @param {string} dob - Date of birth in YYYY-MM-DD format
 * @returns {number} - Age in years
 */
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Calculate BMI (Body Mass Index)
 * Formula: weight (kg) / (height (m))²
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {number} - BMI value
 */
function calculateBMI(weight, height) {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

/**
 * Get BMI category based on WHO classification
 * @param {number} bmi - BMI value
 * @returns {string} - BMI category
 */
function getBMICategory(bmi) {
  if (bmi < 16) return 'Severe underweight';
  if (bmi < 17) return 'Moderate underweight';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  if (bmi < 35) return 'Obese Class I';
  if (bmi < 40) return 'Obese Class II';
  return 'Obese Class III';
}

/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
 * Most accurate modern formula
 * 
 * Male: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
 * Female: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
 * 
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} sex - 'male' or 'female'
 * @returns {number} - BMR in calories/day
 */
function calculateBMR(weight, height, age, sex) {
  const baseBMR = (10 * weight) + (6.25 * height) - (5 * age);
  
  if (sex === 'male') {
    return baseBMR + 5;
  } else {
    return baseBMR - 161;
  }
}

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 * TDEE = BMR × Activity Level
 * 
 * Activity levels:
 * 1.2 = Sedentary (little to no exercise)
 * 1.375 = Lightly active (exercise 1-3 days/week)
 * 1.55 = Moderately active (exercise 3-5 days/week)
 * 1.725 = Very active (exercise 6-7 days/week)
 * 1.9 = Extremely active (physical job + training)
 * 
 * @param {number} bmr - Basal Metabolic Rate
 * @param {number} activityLevel - Activity multiplier
 * @returns {number} - TDEE in calories/day
 */
function calculateTDEE(bmr, activityLevel) {
  return bmr * activityLevel;
}

/**
 * Calculate calorie strategy based on weight goal
 * 
 * Weight loss rates (per week):
 * - Extreme: 1kg/week (-1000 cal/day) - Not recommended
 * - Fast: 0.75kg/week (-750 cal/day)
 * - Moderate: 0.5kg/week (-500 cal/day) - Recommended
 * - Slow: 0.25kg/week (-250 cal/day)
 * 
 * Weight gain rates:
 * - Slow gain: 0.25kg/week (+250 cal/day) - Recommended for lean mass
 * - Moderate gain: 0.5kg/week (+500 cal/day)
 * 
 * @param {number} currentWeight - Current weight in kg
 * @param {number} targetWeight - Target weight in kg
 * @param {number} tdee - Total Daily Energy Expenditure
 * @returns {Object} - Strategy details
 */
function calculateCalorieStrategy(currentWeight, targetWeight, tdee) {
  const weightDiff = targetWeight - currentWeight;
  
  if (Math.abs(weightDiff) < 0.5) {
    // Maintain weight
    return {
      targetCalories: tdee,
      strategyName: 'Weight Maintenance',
      deficitInfo: 'Eating at maintenance to stay at current weight',
      weeklyWeightChange: 0,
      deficit: 0
    };
  } else if (weightDiff < 0) {
    // Weight loss
    const weightToLose = Math.abs(weightDiff);
    
    // Determine safe deficit
    let deficit, strategyName, weeklyLoss;
    
    if (weightToLose > 20) {
      // More aggressive for people with more to lose
      deficit = 750;
      weeklyLoss = 0.75;
      strategyName = 'Fast Weight Loss';
    } else if (weightToLose > 10) {
      deficit = 500;
      weeklyLoss = 0.5;
      strategyName = 'Moderate Weight Loss';
    } else {
      // Slow and steady for last few kg
      deficit = 250;
      weeklyLoss = 0.25;
      strategyName = 'Slow Weight Loss';
    }
    
    const targetCalories = Math.max(tdee - deficit, 1200); // Never go below 1200
    const actualDeficit = tdee - targetCalories;
    
    return {
      targetCalories,
      strategyName,
      deficitInfo: `${actualDeficit} cal/day deficit • ~${weeklyLoss}kg/week`,
      weeklyWeightChange: -weeklyLoss,
      deficit: actualDeficit
    };
  } else {
    // Weight gain
    const surplus = 250; // Slow lean mass gain
    const weeklyGain = 0.25;
    
    return {
      targetCalories: tdee + surplus,
      strategyName: 'Lean Mass Gain',
      deficitInfo: `${surplus} cal/day surplus • ~${weeklyGain}kg/week`,
      weeklyWeightChange: weeklyGain,
      deficit: -surplus
    };
  }
}

/**
 * Calculate timeline to reach goal weight
 * @param {number} currentWeight - Current weight in kg
 * @param {number} targetWeight - Target weight in kg
 * @param {number} weeklyWeightChange - Expected weekly weight change in kg
 * @returns {Object} - Timeline information
 */
function calculateGoalTimeline(currentWeight, targetWeight, weeklyWeightChange) {
  const weightDiff = Math.abs(targetWeight - currentWeight);
  
  if (Math.abs(weightDiff) < 0.5) {
    return {
      timelineText: 'At goal weight',
      progressText: 'Maintain current weight'
    };
  }
  
  if (weeklyWeightChange === 0) {
    return {
      timelineText: 'No change',
      progressText: 'Currently at maintenance calories'
    };
  }
  
  const weeksToGoal = Math.round(weightDiff / Math.abs(weeklyWeightChange));
  const monthsToGoal = Math.floor(weeksToGoal / 4);
  const remainingWeeks = weeksToGoal % 4;
  
  let timelineText = '';
  if (monthsToGoal > 0) {
    timelineText = `${monthsToGoal} month${monthsToGoal !== 1 ? 's' : ''}`;
    if (remainingWeeks > 0) {
      timelineText += ` ${remainingWeeks}w`;
    }
  } else {
    timelineText = `${weeksToGoal} week${weeksToGoal !== 1 ? 's' : ''}`;
  }
  
  const direction = targetWeight < currentWeight ? 'lose' : 'gain';
  const progressText = `${weightDiff.toFixed(1)}kg to ${direction}`;
  
  return {
    timelineText,
    progressText
  };
}

/**
 * Calculate ideal body weight ranges
 * Using BMI ranges (18.5-25) as healthy weight
 * @param {number} height - Height in cm
 * @returns {Object} - Min and max healthy weight
 */
function calculateIdealWeightRange(height) {
  const heightInMeters = height / 100;
  const minWeight = 18.5 * (heightInMeters * heightInMeters);
  const maxWeight = 25 * (heightInMeters * heightInMeters);
  
  return {
    min: Math.round(minWeight * 10) / 10,
    max: Math.round(maxWeight * 10) / 10
  };
}

/**
 * Estimate body fat percentage using BMI (rough estimate)
 * More accurate with impedance measurement
 * @param {number} bmi - BMI value
 * @param {number} age - Age in years
 * @param {string} sex - 'male' or 'female'
 * @returns {number} - Estimated body fat percentage
 */
function estimateBodyFat(bmi, age, sex) {
  if (sex === 'male') {
    return (1.20 * bmi) + (0.23 * age) - 16.2;
  } else {
    return (1.20 * bmi) + (0.23 * age) - 5.4;
  }
}
