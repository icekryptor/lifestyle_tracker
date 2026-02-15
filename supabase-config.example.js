// Supabase Configuration Template
// 
// 1. Copy this file and rename it to: supabase-config.js
// 2. Replace the placeholder values below with your actual Supabase credentials
// 3. Find your credentials at: https://app.supabase.com → Project Settings → API

const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
