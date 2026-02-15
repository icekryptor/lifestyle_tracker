# Supabase Setup Guide

## Quick Setup (5 minutes)

### 1. Copy Your Supabase Credentials

In your Supabase dashboard:
1. Go to **Settings** → **API**
2. Copy your **Project URL**
3. Copy your **anon public** key

### 2. Update Config File

Open `supabase-config.js` and replace:

```javascript
const SUPABASE_URL = 'YOUR_PROJECT_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';
```

With your actual credentials.

### 3. Run Database Schema

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **+ New Query**
3. Copy the entire contents of `supabase-schema.sql`
4. Paste into the SQL editor
5. Click **Run** (or press Cmd/Ctrl + Enter)

You should see: ✅ Success. No rows returned

### 4. Test Your App

1. Open `login.html` in your browser
2. Create an account (use any email/password)
3. Sign in and start using the app!

## What Changed?

### ✅ Data Storage
- **Before:** localStorage (browser only)
- **Now:** Supabase PostgreSQL (cloud database)

### ✅ Cross-Device Sync
- Your data now syncs across all your devices automatically
- Just sign in from any device to access your data

### ✅ Security
- Row Level Security (RLS) enabled
- You can only see your own data
- Data is encrypted in transit and at rest

### ✅ Backup
- Supabase automatically backs up your database
- You can export data anytime from the dashboard

## File Structure

```
lifestyle_tracker/
├── login.html                  # New: Login/signup page
├── supabase-config.js          # New: Your credentials (DO NOT COMMIT)
├── supabase-schema.sql         # New: Database setup script
├── db.js                       # New: Database functions
├── index.html                  # Updated: Now requires login
├── sleep.html                  # Updated: Uses Supabase
├── activity.html               # Updated: Uses Supabase
├── nutrition.html              # Updated: Uses Supabase
└── ... (other files)
```

## Important Notes

### Security
- **Never commit** `supabase-config.js` with your real credentials to GitHub
- Add it to `.gitignore` if you're using version control
- The anon key is safe for public use (it's protected by RLS policies)

### Email Confirmation
- Supabase may send a confirmation email on signup
- You can still log in immediately without confirming
- To disable email confirmation: Settings → Authentication → Email Auth → Disable "Enable email confirmations"

## Troubleshooting

### "Failed to fetch" error
- Check that your Supabase URL and key are correct in `supabase-config.js`
- Make sure you ran the SQL schema

### Can't see data after login
- Make sure Row Level Security policies were created (check SQL ran successfully)
- Open browser console (F12) to see any error messages

### Need to reset?
- Go to Supabase dashboard → Table Editor
- Delete all data from tables
- Or delete and recreate the project

## Migration from localStorage (Optional)

If you have existing data in localStorage you want to keep:

1. Open browser console (F12) on your old app
2. Run: `console.log(JSON.stringify(localStorage))`
3. Copy the output
4. Contact me and I'll help you write a migration script!

## Next Steps

Want to add more features?
- Export data to CSV/JSON
- Share stats with friends
- Weekly/monthly reports
- Reminders and notifications
- Progressive Web App (install on phone)

Let me know what you'd like to add next!
