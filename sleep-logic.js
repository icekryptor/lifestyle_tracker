// ── Advanced Sleep Analysis with Circadian Rhythm Science ──

/**
 * Comprehensive sleep analysis based on circadian rhythm science
 * 
 * Key hormones and their timing:
 * - Melatonin: Peaks around 21:00-23:00 (best for sleep onset)
 * - Cortisol: Lowest at midnight, rises before wake (06:00-07:00 optimal)
 * - Growth hormone: Released during deep sleep (first 3-4 hours)
 * - Body temperature: Lowest around 04:00-05:00
 */

function analyzeSleep(bedtime, wakeTime) {
  const durationMins = calcSleepMinutes(bedtime, wakeTime);
  const breakdown = {
    duration: analyzeDuration(durationMins),
    bedtime: analyzeBedtime(bedtime),
    wake: analyzeWakeTime(wakeTime)
  };

  // Calculate overall rating
  const avgScore = (breakdown.duration.score + breakdown.bedtime.score + breakdown.wake.score) / 3;
  let rating;
  if (avgScore >= 80) rating = 'great';
  else if (avgScore >= 60) rating = 'optimal';
  else rating = 'suboptimal';

  return {
    bedtime,
    wakeTime,
    durationMins,
    rating,
    breakdown
  };
}

/**
 * Analyze sleep duration
 * 
 * Sleep cycles: ~90 minutes each
 * Optimal: 7.5-8 hours (5 cycles)
 * Good: 7-9 hours (4.5-6 cycles)
 */
function analyzeDuration(durationMins) {
  const hours = durationMins / 60;
  let score = 0;
  let feedback = '';

  // Ideal duration: 7.5-8 hours
  if (hours >= 7.5 && hours <= 8) {
    score = 100;
    feedback = 'Perfect! 7.5-8h aligns with 5 complete sleep cycles (90 min each).';
  }
  // Very good: 7-7.5 or 8-8.5 hours
  else if ((hours >= 7 && hours < 7.5) || (hours > 8 && hours <= 8.5)) {
    score = 90;
    feedback = 'Excellent duration. You\'re getting enough deep and REM sleep.';
  }
  // Good: 6.5-7 or 8.5-9 hours
  else if ((hours >= 6.5 && hours < 7) || (hours > 8.5 && hours <= 9)) {
    score = 75;
    feedback = 'Good duration, though closer to 7.5-8h optimizes sleep cycle completion.';
  }
  // Acceptable: 6-6.5 or 9-9.5 hours
  else if ((hours >= 6 && hours < 6.5) || (hours > 9 && hours <= 9.5)) {
    score = 60;
    feedback = 'Acceptable, but you may miss out on optimal hormone synthesis cycles.';
  }
  // Too short: 5-6 hours
  else if (hours >= 5 && hours < 6) {
    score = 40;
    feedback = 'Too short. You\'re likely missing crucial REM sleep and recovery time.';
  }
  // Very short: < 5 hours
  else if (hours < 5) {
    score = 20;
    feedback = 'Critically short. Chronic sleep debt affects cognition and immune function.';
  }
  // Too long: > 9.5 hours
  else {
    score = 50;
    feedback = 'Oversleeping can cause grogginess and disrupt your natural rhythm.';
  }

  return { score, feedback, hours };
}

/**
 * Analyze bedtime alignment with circadian rhythm
 * 
 * Melatonin production:
 * - Starts rising: ~20:00-21:00
 * - Peaks: 21:00-23:00 (optimal bedtime window)
 * - Declines: After midnight
 * 
 * Core body temperature drops between 21:00-22:00, signaling sleep readiness
 */
function analyzeBedtime(bedtime) {
  const mins = timeToMinutes(bedtime);
  let score = 0;
  let feedback = '';

  // Perfect: 21:30-22:30 (1290-1350)
  if (mins >= 1290 && mins <= 1350) {
    score = 100;
    feedback = 'Perfect timing! Melatonin peaks and core body temp drops now.';
  }
  // Ideal: 21:00-21:30 or 22:30-23:00 (1260-1290, 1350-1380)
  else if ((mins >= 1260 && mins < 1290) || (mins > 1350 && mins <= 1380)) {
    score = 90;
    feedback = 'Excellent! You\'re aligning with your natural melatonin curve.';
  }
  // Good: 20:30-21:00 or 23:00-23:30 (1230-1260, 1380-1410)
  else if ((mins >= 1230 && mins < 1260) || (mins > 1380 && mins <= 1410)) {
    score = 75;
    feedback = 'Good timing, though melatonin synthesis is most active 21:00-23:00.';
  }
  // Acceptable: 20:00-20:30 or 23:30-00:00 (1200-1230, 1410-1440)
  else if ((mins >= 1200 && mins < 1230) || (mins > 1410 && mins <= 1440)) {
    score = 60;
    feedback = 'Acceptable, but closer to 21:30-22:30 optimizes melatonin response.';
  }
  // Early: Before 20:00
  else if (mins < 1200) {
    score = 50;
    feedback = 'Too early. Melatonin hasn\'t peaked yet; you may struggle to fall asleep.';
  }
  // Late: 00:00-02:00 (0-120 or 1440+)
  else if (mins <= 120 || mins > 1440) {
    score = 40;
    feedback = 'Past midnight disrupts cortisol\'s natural rise pattern for morning alertness.';
  }
  // Very late: After 02:00 (120+)
  else {
    score = 20;
    feedback = 'Very late. You\'re missing the deepest sleep window (first 3-4 hours).';
  }

  return { score, feedback };
}

/**
 * Analyze wake time alignment with circadian rhythm
 * 
 * Cortisol awakening response (CAR):
 * - Cortisol rises 30-45 min before natural wake
 * - Peak: 30-60 min after waking
 * - Optimal wake window: 06:00-07:00
 * 
 * Body temperature rises from 04:00 onwards, signaling wake readiness
 */
function analyzeWakeTime(wakeTime) {
  const mins = timeToMinutes(wakeTime);
  let score = 0;
  let feedback = '';

  // Perfect: 06:00-06:30 (360-390)
  if (mins >= 360 && mins <= 390) {
    score = 100;
    feedback = 'Perfect! Cortisol rises naturally now, priming alertness and energy.';
  }
  // Ideal: 05:30-06:00 or 06:30-07:00 (330-360, 390-420)
  else if ((mins >= 330 && mins < 360) || (mins > 390 && mins <= 420)) {
    score = 90;
    feedback = 'Excellent timing with your cortisol awakening response (CAR).';
  }
  // Good: 05:00-05:30 or 07:00-07:30 (300-330, 420-450)
  else if ((mins >= 300 && mins < 330) || (mins > 420 && mins <= 450)) {
    score = 75;
    feedback = 'Good, though waking 06:00-06:30 better aligns with natural cortisol rise.';
  }
  // Acceptable: 04:30-05:00 or 07:30-08:00 (270-300, 450-480)
  else if ((mins >= 270 && mins < 300) || (mins > 450 && mins <= 480)) {
    score = 60;
    feedback = 'Acceptable, but slightly off peak cortisol timing for sustained energy.';
  }
  // Too early: Before 04:30 (< 270)
  else if (mins < 270) {
    score = 40;
    feedback = 'Very early. You\'re waking before body temp and cortisol start rising.';
  }
  // Late: 08:00-09:00 (480-540)
  else if (mins > 480 && mins <= 540) {
    score = 50;
    feedback = 'Late wake. Your cortisol peak has passed, which can cause morning sluggishness.';
  }
  // Very late: After 09:00 (> 540)
  else {
    score = 30;
    feedback = 'Very late. This disrupts your circadian rhythm and can reduce evening melatonin.';
  }

  return { score, feedback };
}
