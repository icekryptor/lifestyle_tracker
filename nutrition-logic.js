// ── Nutrition Logic and Macro Validation ──

/**
 * Calculate calories from macros
 * Protein: 4 cal/g
 * Carbs: 4 cal/g
 * Fats: 9 cal/g
 */
function calculateCalories(protein, carbs, fats) {
  return (protein * 4) + (carbs * 4) + (fats * 9);
}

/**
 * Ideal meal plan macros
 * Based on balanced nutrition and hormone optimization
 */
const IDEAL_MEAL_MACROS = {
  breakfast: {
    name: 'Breakfast',
    guidelines: 'Carbs, healthy fats & fiber',
    ideal: {
      carbs: { min: 40, max: 60, unit: '%' },     // 40-60% carbs
      fats: { min: 25, max: 40, unit: '%' },      // 25-40% healthy fats
      fiber: { min: 5, max: 10, unit: 'g' },      // 5-10g fiber
      protein: { min: 15, max: 30, unit: '%' }    // 15-30% protein
    }
  },
  lunch: {
    name: 'Lunch',
    guidelines: '30% protein, 70% carbs, 1 fruit',
    ideal: {
      protein: { min: 25, max: 35, unit: '%' },   // 25-35% protein
      carbs: { min: 60, max: 75, unit: '%' },     // 60-75% carbs
      fiber: { min: 5, max: 8, unit: 'g' }        // From fruit + veggies
    }
  },
  dinner: {
    name: 'Dinner',
    guidelines: '50% protein, 50% carbs + treat',
    ideal: {
      protein: { min: 45, max: 55, unit: '%' },   // 45-55% protein
      carbs: { min: 45, max: 55, unit: '%' },     // 45-55% carbs
      fats: { min: 10, max: 20, unit: '%' }       // Room for treat
    }
  },
  supper: {
    name: 'Supper',
    guidelines: '100% protein',
    ideal: {
      protein: { min: 80, max: 100, unit: '%' },  // 80-100% protein
      carbs: { max: 10, unit: '%' },              // Minimal carbs
      fats: { max: 20, unit: '%' }                // Minimal fats
    }
  }
};

/**
 * Analyze meal macros against ideal ratios
 * Returns score (0-100) and feedback
 */
function analyzeMeal(mealType, protein, carbs, fats, fiber) {
  const totalCals = calculateCalories(protein, carbs, fats);
  if (totalCals === 0) return { score: 0, feedback: 'No data entered' };

  const proteinCals = protein * 4;
  const carbsCals = carbs * 4;
  const fatsCals = fats * 9;

  const proteinPct = (proteinCals / totalCals) * 100;
  const carbsPct = (carbsCals / totalCals) * 100;
  const fatsPct = (fatsCals / totalCals) * 100;

  const ideal = IDEAL_MEAL_MACROS[mealType]?.ideal;
  if (!ideal) return { score: 50, feedback: 'Unknown meal type' };

  let score = 0;
  let feedback = [];

  // Check protein
  if (ideal.protein) {
    if (proteinPct >= ideal.protein.min && proteinPct <= ideal.protein.max) {
      score += 35;
      feedback.push(`✓ Protein optimal (${Math.round(proteinPct)}%)`);
    } else if (proteinPct < ideal.protein.min) {
      score += 15;
      feedback.push(`⚠ Protein low (${Math.round(proteinPct)}% vs ${ideal.protein.min}-${ideal.protein.max}%)`);
    } else {
      score += 20;
      feedback.push(`⚠ Protein high (${Math.round(proteinPct)}% vs ${ideal.protein.min}-${ideal.protein.max}%)`);
    }
  }

  // Check carbs
  if (ideal.carbs) {
    if (carbsPct >= ideal.carbs.min && carbsPct <= ideal.carbs.max) {
      score += 35;
      feedback.push(`✓ Carbs optimal (${Math.round(carbsPct)}%)`);
    } else if (carbsPct < ideal.carbs.min) {
      score += 15;
      feedback.push(`⚠ Carbs low (${Math.round(carbsPct)}% vs ${ideal.carbs.min}-${ideal.carbs.max}%)`);
    } else {
      score += 20;
      feedback.push(`⚠ Carbs high (${Math.round(carbsPct)}% vs ${ideal.carbs.min}-${ideal.carbs.max}%)`);
    }
  }

  // Check fats
  if (ideal.fats) {
    if (fatsPct >= ideal.fats.min && fatsPct <= ideal.fats.max) {
      score += 20;
      feedback.push(`✓ Fats optimal (${Math.round(fatsPct)}%)`);
    } else {
      score += 10;
      feedback.push(`⚠ Fats ${fatsPct < ideal.fats.min ? 'low' : 'high'} (${Math.round(fatsPct)}%)`);
    }
  }

  // Check fiber (if applicable)
  if (ideal.fiber && ideal.fiber.min) {
    if (fiber >= ideal.fiber.min && fiber <= ideal.fiber.max) {
      score += 10;
      feedback.push(`✓ Fiber good (${fiber}g)`);
    } else if (fiber < ideal.fiber.min) {
      score += 5;
      feedback.push(`⚠ Add more fiber (${fiber}g vs ${ideal.fiber.min}g+)`);
    }
  }

  return {
    score: Math.min(score, 100),
    feedback: feedback.join(' • '),
    macros: {
      proteinPct: Math.round(proteinPct),
      carbsPct: Math.round(carbsPct),
      fatsPct: Math.round(fatsPct)
    }
  };
}

/**
 * Analyze full day nutrition
 * Returns daily score and recommendations
 */
function analyzeDayNutrition(dayData) {
  if (!dayData || !dayData.meals) {
    return { score: 0, mealsLogged: 0, feedback: 'No meals logged today' };
  }

  const meals = dayData.meals;
  const mealCount = Object.keys(meals).length;

  let totalScore = 0;
  let scoredMeals = 0;

  // Score each meal
  ['breakfast', 'lunch', 'dinner', 'supper'].forEach(mealType => {
    if (meals[mealType]) {
      const meal = meals[mealType];
      const analysis = analyzeMeal(
        mealType,
        meal.protein || 0,
        meal.carbs || 0,
        meal.fats || 0,
        meal.fiber || 0
      );
      totalScore += analysis.score;
      scoredMeals++;
    }
  });

  const avgScore = scoredMeals > 0 ? totalScore / scoredMeals : 0;

  let feedback = '';
  if (mealCount === 4) {
    if (avgScore >= 80) feedback = 'Excellent! All meals logged and well-balanced.';
    else if (avgScore >= 60) feedback = 'Good day! Some meals could be better balanced.';
    else feedback = 'All meals logged but check macro balance.';
  } else if (mealCount >= 2) {
    feedback = `${mealCount}/4 meals logged. Try to complete all meals.`;
  } else if (mealCount === 1) {
    feedback = 'Only 1 meal logged. Log more meals for better tracking.';
  } else {
    feedback = 'No meals logged today.';
  }

  return {
    score: Math.round(avgScore),
    mealsLogged: mealCount,
    feedback
  };
}
