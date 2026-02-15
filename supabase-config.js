// Supabase Configuration
// The anon key is a PUBLIC key - it's safe to commit.
// Row Level Security (RLS) protects your data, not this key.

var SUPABASE_URL = 'https://iidnbhvivmnmmlrycpit.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZG5iaHZpdm1ubW1scnljcGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5OTY2NjMsImV4cCI6MjA4NjU3MjY2M30.uddq2MpJ2Xgspf9-DIzr4dz17f8bR8b52_j1iukjww0';

supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
