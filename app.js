// ── Shared utilities for Lifestyle Tracker ──

const STORAGE_KEYS = {
  sleep: 'lifestyle_sleep',
  nutrition: 'lifestyle_nutrition',
  activity: 'lifestyle_activity'
};

// Date utilities
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getDayKey(offset) {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getDayLabel(offset) {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatDate(str) {
  const d = new Date(str);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function timeNow() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// Storage utilities are provided by db.js (Supabase).
// getData, setData, getTodayData must be loaded via db.js BEFORE this file or inline scripts.

// Sleep utilities
function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function formatDuration(totalMins) {
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function calcSleepMinutes(bedtime, wakeTime) {
  let bed = timeToMinutes(bedtime);
  let wake = timeToMinutes(wakeTime);
  if (wake <= bed) wake += 24 * 60;
  return wake - bed;
}

// Rating labels (shared across pages)
const RATING_LABELS = { great: 'Great', optimal: 'Optimal', suboptimal: 'Suboptimal' };
