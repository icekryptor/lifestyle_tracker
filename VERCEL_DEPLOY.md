# Deploying to Vercel

## Why database wasn't working

`supabase-config.js` is in `.gitignore` (it contains your credentials), so it was **never deployed** to Vercel. The app tried to load it and got 404 → Supabase never initialized.

## Fix: Use Vercel Environment Variables

The build script generates `supabase-config.js` at deploy time from your env vars.

### 1. Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. **Settings** → **Environment Variables**
3. Add these two variables:

| Name | Value |
|------|-------|
| `SUPABASE_URL` | `https://your-project.supabase.co` |
| `SUPABASE_ANON_KEY` | Your anon/public key from Supabase |

4. Apply to **Production**, **Preview**, and **Development**
5. Save

### 2. Redeploy

Trigger a new deployment (e.g. push a commit, or **Deployments** → **Redeploy**).

The build will run `npm run build`, which generates `supabase-config.js` with your credentials. Database operations will then work.

### 3. (Optional) Add Vercel URL to Supabase

If you still have issues, add your Vercel URL to Supabase:

1. Supabase Dashboard → **Authentication** → **URL Configuration**
2. Add your Vercel URL to **Redirect URLs** (e.g. `https://your-app.vercel.app/**`)
