#!/usr/bin/env node
/**
 * Build script: Creates public/ output for Vercel and generates supabase-config.js.
 * Add SUPABASE_URL and SUPABASE_ANON_KEY in Vercel Environment Variables.
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');

// Files to copy to public/
const staticFiles = [
  'index.html', 'login.html', 'sleep.html', 'activity.html', 'nutrition.html',
  'style.css', 'app.js', 'db.js',
  'sleep-logic.js', 'activity-logic.js', 'nutrition-logic.js',
];

// Ensure public exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy static files
for (const file of staticFiles) {
  const src = path.join(root, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(publicDir, file));
  }
}

// Generate supabase-config.js
const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_ANON_KEY || '';

if (!url || !key) {
  console.warn('Warning: SUPABASE_URL or SUPABASE_ANON_KEY not set. Database will not work.');
}

const config = `// Auto-generated at build time
var SUPABASE_URL = '${url}';
var SUPABASE_ANON_KEY = '${key}';
supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
`;

fs.writeFileSync(path.join(publicDir, 'supabase-config.js'), config, 'utf8');
console.log('Built public/ with supabase-config.js');
