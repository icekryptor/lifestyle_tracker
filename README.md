# Lifestyle Tracker with Supabase

A personal lifestyle tracking app for monitoring sleep, nutrition, and physical activity with cloud sync via Supabase.

## 🚀 Quick Start

### Prerequisites
- A Supabase account (free at [supabase.com](https://supabase.com))
- A web browser
- (Optional) A local web server or just open the HTML files directly

### Setup Instructions

#### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Fill in:
   - **Name:** lifestyle-tracker
   - **Database Password:** (create a strong password and save it)
   - **Region:** Choose closest to you
4. Wait ~2 minutes for provisioning

#### 2. Get Your Credentials
1. In Supabase dashboard, go to **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (the long string)

#### 3. Configure Your App
1. Copy `supabase-config.example.js` to `supabase-config.js`
2. Open `supabase-config.js` and paste your credentials:
```javascript
const SUPABASE_URL = 'your-project-url';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

#### 4. Set Up Database
1. In Supabase dashboard, click **SQL Editor**
2. Click **+ New Query**
3. Copy ALL contents from `supabase-schema.sql`
4. Paste into the editor
5. Click **Run** (or Cmd/Ctrl + Enter)
6. You should see: ✅ Success. No rows returned

#### 5. Launch Your App
1. Open `login.html` in your browser
2. Create an account (any email/password works)
3. Sign in and start tracking!

## 📁 Project Structure

```
lifestyle_tracker/
├── index.html                      # Main dashboard
├── login.html                      # Authentication page
├── sleep.html                      # Sleep tracker
├── activity.html                   # Activity & gym tracker
├── nutrition.html                  # Nutrition & meal tracker
├── app.js                          # Shared utilities
├── db.js                           # Supabase database functions
├── sleep-logic.js                  # Sleep analysis logic
├── activity-logic.js               # Activity calculations
├── nutrition-logic.js              # Nutrition analysis
├── style.css                       # Styles
├── supabase-config.js              # Your credentials (DO NOT COMMIT)
├── supabase-config.example.js      # Template for config
├── supabase-schema.sql             # Database setup script
├── SUPABASE_SETUP.md              # Detailed setup guide
└── .gitignore                      # Protects your credentials
```

## ✨ Features

### Sleep Tracking
- Log bedtime and wake time
- Circadian rhythm analysis
- Sleep quality scoring
- Duration, bedtime, and wake time breakdown
- Calendar view of sleep history

### Activity Tracking
- Daily step counter with calorie calculation
- Gym session logging (with intensity levels)
- Total calorie expenditure
- Step goal progress (10,000 steps/day)

### Nutrition Tracking
- 4 meals per day (Breakfast, Lunch, Dinner, Supper)
- Macro tracking (protein, carbs, fats, fiber)
- Calorie auto-calculation
- Photo upload for meals
- Custom dish library (save frequently eaten foods)
- Quick-add from saved dishes
- Meal-specific macro recommendations
- Calendar view of nutrition history

## 🔒 Security

- **Row Level Security (RLS):** Only you can see your data
- **Encryption:** Data encrypted in transit and at rest
- **Privacy:** Your data stays in your Supabase project
- **Auth:** Email/password authentication via Supabase Auth

## 🌐 Cross-Device Sync

Your data automatically syncs across:
- Desktop browsers
- Mobile browsers  
- Tablets
- Any device where you log in

## ⚠️ Important Security Notes

1. **Never commit** `supabase-config.js` to GitHub
2. It's already in `.gitignore` - keep it there
3. The anon key is safe for public use (protected by RLS)
4. Your database password is only for Supabase dashboard access

## 🔧 Troubleshooting

### "Failed to fetch" or network errors
- Check your Supabase URL and key in `supabase-config.js`
- Make sure you ran the SQL schema
- Check browser console (F12) for specific errors

### Can't see data after login
- Verify RLS policies were created (SQL should have run without errors)
- Check Supabase dashboard → Table Editor to see if tables exist

### Email confirmation required
- You can log in immediately without confirming
- To disable: Supabase Settings → Authentication → Disable "Enable email confirmations"

### Still using localhost storage?
- Make sure you're including the new script tags in your HTML files
- Check that `db.js` and `supabase-config.js` are being loaded
- Open browser console to see any JavaScript errors

## 📊 Data Export

Your data is in Supabase and can be exported anytime:
1. Go to Supabase dashboard
2. Click **Table Editor**
3. Select a table
4. Click **Export** (top right)
5. Choose CSV or JSON format

## 🚀 Future Enhancements

Ideas for next features:
- [ ] AI nutrition recognition from meal photos
- [ ] Auto-fill dish nutrition from food databases
- [ ] Weekly/monthly reports and insights
- [ ] Goals and streaks
- [ ] Export to Apple Health / Google Fit
- [ ] Reminders and notifications
- [ ] Progressive Web App (install on phone)
- [ ] Dark mode
- [ ] Data visualization charts

## 📝 Migration from localStorage

If you have existing data in your browser's localStorage:

1. Before setting up Supabase, open your old app
2. Open browser console (F12)
3. Run: `console.log(JSON.stringify(localStorage))`
4. Copy the output and save it
5. After Supabase setup, I can help write a migration script

## 🤝 Need Help?

If you run into issues:
1. Check the browser console (F12) for errors
2. Review `SUPABASE_SETUP.md` for detailed troubleshooting
3. Check Supabase docs: [supabase.com/docs](https://supabase.com/docs)
4. Contact me for assistance

## 📄 License

Personal use only. Built with Supabase, TailwindCSS, and vanilla JavaScript.

---

**Enjoy tracking your lifestyle! 🌟**
