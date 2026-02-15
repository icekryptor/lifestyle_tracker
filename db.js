// Database layer - Supabase integration
// This replaces localStorage with Supabase database

// Check if user is logged in
async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Session check
async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
    return null;
  }
  return user;
}

// ── User Profile ──
async function getUserProfile() {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No profile yet
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
}

async function saveUserProfile(profile) {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      email: user.email,
      name: profile.name,
      date_of_birth: profile.date_of_birth,
      height: profile.height,
      weight: profile.weight,
      sex: profile.sex,
      activity_level: profile.activity_level,
      target_weight: profile.target_weight,
      target_body_fat: profile.target_body_fat,
      current_body_fat: profile.current_body_fat,
      current_water: profile.current_water,
      current_muscle: profile.current_muscle,
      current_bone: profile.current_bone
    })
    .select();

  if (error) {
    console.error('Error saving profile:', error);
    return null;
  }

  return data[0];
}

// ── Sleep Data ──
async function getSleepData() {
  const user = await getCurrentUser();
  if (!user) return {};

  const { data, error } = await supabase
    .from('sleep_entries')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching sleep data:', error);
    return {};
  }

  // Convert array to object keyed by date
  const result = {};
  data.forEach(entry => {
    result[entry.date] = {
      bedtime: entry.bedtime,
      wakeTime: entry.wake_time,
      durationMins: entry.duration_mins,
      rating: entry.rating,
      breakdown: entry.breakdown
    };
  });
  return result;
}

async function setSleepData(dateKey, sleepEntry) {
  const user = await getCurrentUser();
  if (!user) return;

  const { data, error } = await supabase
    .from('sleep_entries')
    .upsert({
      user_id: user.id,
      date: dateKey,
      bedtime: sleepEntry.bedtime,
      wake_time: sleepEntry.wakeTime,
      duration_mins: sleepEntry.durationMins,
      rating: sleepEntry.rating,
      breakdown: sleepEntry.breakdown
    }, { onConflict: 'user_id,date' });

  if (error) {
    console.error('Error saving sleep data:', error);
  }
}

async function deleteSleepData(dateKey) {
  const user = await getCurrentUser();
  if (!user) return;

  const { error } = await supabase
    .from('sleep_entries')
    .delete()
    .eq('user_id', user.id)
    .eq('date', dateKey);

  if (error) {
    console.error('Error deleting sleep data:', error);
  }
}

// ── Activity Data ──
async function getActivityData() {
  const user = await getCurrentUser();
  if (!user) return {};

  const { data, error } = await supabase
    .from('activity_entries')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching activity data:', error);
    return {};
  }

  const result = {};
  data.forEach(entry => {
    result[entry.date] = {
      steps: entry.steps,
      gymSessions: entry.gym_sessions
    };
  });
  return result;
}

async function setActivityData(dateKey, activityEntry) {
  const user = await getCurrentUser();
  if (!user) return;

  const { error } = await supabase
    .from('activity_entries')
    .upsert({
      user_id: user.id,
      date: dateKey,
      steps: activityEntry.steps || 0,
      gym_sessions: activityEntry.gymSessions || []
    }, { onConflict: 'user_id,date' });

  if (error) {
    console.error('Error saving activity data:', error);
  }
}

async function deleteActivityData(dateKey) {
  const user = await getCurrentUser();
  if (!user) return;

  const { error } = await supabase
    .from('activity_entries')
    .delete()
    .eq('user_id', user.id)
    .eq('date', dateKey);

  if (error) {
    console.error('Error deleting activity data:', error);
  }
}

// ── Nutrition Data ──
async function getNutritionData() {
  const user = await getCurrentUser();
  if (!user) return {};

  const { data, error } = await supabase
    .from('nutrition_entries')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching nutrition data:', error);
    return {};
  }

  const result = {};
  data.forEach(entry => {
    result[entry.date] = {
      meals: entry.meals
    };
  });
  return result;
}

async function setNutritionData(dateKey, nutritionEntry) {
  const user = await getCurrentUser();
  if (!user) return;

  const { error } = await supabase
    .from('nutrition_entries')
    .upsert({
      user_id: user.id,
      date: dateKey,
      meals: nutritionEntry.meals || {}
    }, { onConflict: 'user_id,date' });

  if (error) {
    console.error('Error saving nutrition data:', error);
  }
}

async function deleteNutritionData(dateKey) {
  const user = await getCurrentUser();
  if (!user) return;

  const { error } = await supabase
    .from('nutrition_entries')
    .delete()
    .eq('user_id', user.id)
    .eq('date', dateKey);

  if (error) {
    console.error('Error deleting nutrition data:', error);
  }
}

// ── Dishes Library ──
async function getDishes() {
  const user = await getCurrentUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('dishes')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false }); // Most recent first

  if (error) {
    console.error('Error fetching dishes:', error);
    return [];
  }

  return data.map(d => ({
    id: d.id,
    name: d.name,
    brand: d.brand || null,
    category: d.category || 'other',
    photo: d.photo || null,
    protein: parseFloat(d.protein) || 0,
    carbs: parseFloat(d.carbs) || 0,
    fats: parseFloat(d.fats) || 0,
    calories: parseInt(d.calories) || 0
  }));
}

async function addDish(dish) {
  const user = await getCurrentUser();
  if (!user) return;

  const { data, error } = await supabase
    .from('dishes')
    .insert({
      user_id: user.id,
      name: dish.name,
      brand: dish.brand || null,
      category: dish.category || 'other',
      photo: dish.photo || null,
      protein: dish.protein,
      carbs: dish.carbs,
      fats: dish.fats,
      calories: dish.calories
    })
    .select();

  if (error) {
    console.error('Error adding dish:', error);
    console.error('Error details:', error.message, error.details, error.hint);
    return null;
  }

  return data[0];
}

async function updateDish(dishId, dish) {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('dishes')
    .update({
      name: dish.name,
      brand: dish.brand || null,
      category: dish.category || 'other',
      photo: dish.photo || null,
      protein: dish.protein,
      carbs: dish.carbs,
      fats: dish.fats,
      calories: dish.calories,
      updated_at: new Date().toISOString()
    })
    .eq('id', dishId)
    .eq('user_id', user.id)
    .select();

  if (error) {
    console.error('Error updating dish:', error);
    console.error('Error details:', error.message, error.details, error.hint);
    return null;
  }

  return data[0];
}

async function deleteDish(dishId) {
  const user = await getCurrentUser();
  if (!user) return;

  const { error } = await supabase
    .from('dishes')
    .delete()
    .eq('id', dishId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting dish:', error);
  }
}

// ── Exercise Library ──
async function getExercises() {
  const user = await getCurrentUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('user_id', user.id)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }

  return data.map(ex => ({
    id: ex.id,
    name: ex.name,
    category: ex.category,
    equipment: ex.equipment,
    notes: ex.notes
  }));
}

async function addExercise(exercise) {
  const user = await getCurrentUser();
  if (!user) return;

  const { data, error } = await supabase
    .from('exercises')
    .insert({
      user_id: user.id,
      name: exercise.name,
      category: exercise.category,
      equipment: exercise.equipment || null,
      notes: exercise.notes || null
    })
    .select();

  if (error) {
    console.error('Error adding exercise:', error);
    return null;
  }

  return data[0];
}

async function updateExercise(exerciseId, exercise) {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('exercises')
    .update({
      name: exercise.name,
      category: exercise.category,
      equipment: exercise.equipment || null,
      notes: exercise.notes || null,
      updated_at: new Date().toISOString()
    })
    .eq('id', exerciseId)
    .eq('user_id', user.id)
    .select();

  if (error) {
    console.error('Error updating exercise:', error);
    return null;
  }

  return data[0];
}

async function deleteExercise(exerciseId) {
  const user = await getCurrentUser();
  if (!user) return;

  const { error } = await supabase
    .from('exercises')
    .delete()
    .eq('id', exerciseId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting exercise:', error);
  }
}

// ── Workout Tracking ──
async function getWorkouts() {
  const user = await getCurrentUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching workouts:', error);
    return [];
  }

  return data;
}

async function getWorkoutByDate(dateKey) {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', user.id)
    .eq('date', dateKey)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows returned
    console.error('Error fetching workout:', error);
    return null;
  }

  return data;
}

async function saveWorkout(workout) {
  const user = await getCurrentUser();
  if (!user) return null;

  const workoutData = {
    user_id: user.id,
    date: workout.date,
    start_time: workout.startTime,
    end_time: workout.endTime,
    duration_mins: workout.durationMins,
    exercises: workout.exercises,
    notes: workout.notes || null
  };

  if (workout.id) {
    // Update existing workout
    const { data, error } = await supabase
      .from('workouts')
      .update(workoutData)
      .eq('id', workout.id)
      .eq('user_id', user.id)
      .select();

    if (error) {
      console.error('Error updating workout:', error);
      return null;
    }

    return data[0];
  } else {
    // Insert new workout
    const { data, error } = await supabase
      .from('workouts')
      .insert(workoutData)
      .select();

    if (error) {
      console.error('Error saving workout:', error);
      return null;
    }

    return data[0];
  }
}

async function deleteWorkout(workoutId) {
  const user = await getCurrentUser();
  if (!user) return;

  const { error } = await supabase
    .from('workouts')
    .delete()
    .eq('id', workoutId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting workout:', error);
  }
}

// ── Generic Data Access (for backwards compatibility with existing code) ──
let dataCache = {
  sleep: {},
  activity: {},
  nutrition: {}
};

async function getData(type) {
  switch(type) {
    case 'sleep':
      dataCache.sleep = await getSleepData();
      return dataCache.sleep;
    case 'activity':
      dataCache.activity = await getActivityData();
      return dataCache.activity;
    case 'nutrition':
      dataCache.nutrition = await getNutritionData();
      return dataCache.nutrition;
    default:
      return {};
  }
}

async function setData(type, data) {
  // Update cache
  dataCache[type] = data;
  
  // This function expects the full data object for a type
  // We'll need to save each entry individually
  // For now, we'll just cache it and let individual save functions handle it
}

function getTodayData(type) {
  const key = todayKey();
  return dataCache[type]?.[key] || null;
}
