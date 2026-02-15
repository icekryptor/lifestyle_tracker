#!/usr/bin/env node
/**
 * Build script: Generates supabase-config.js from environment variables.
 * Used when deploying to Vercel - add SUPABASE_URL and SUPABASE_ANON_KEY in Vercel dashboard.
 */

const fs = require('fs');
const path = require('path');

const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_ANON_KEY || '';

if (!url || !key) {
  console.warn('Warning: SUPABASE_URL or SUPABASE_ANON_KEY not set. Database will not work.');
  console.warn('Add these in Vercel: Project Settings → Environment Variables');
}

const config = `// Auto-generated at build time - do not edit
// Set SUPABASE_URL and SUPABASE_ANON_KEY in Vercel Environment Variables

var SUPABASE_URL = '${url}';
var SUPABASE_ANON_KEY = '${key}';

supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
`;

const outPath = path.join(__dirname, '..', 'supabase-config.js');
fs.writeFileSync(outPath, config, 'utf8');
console.log('Generated supabase-config.js');
