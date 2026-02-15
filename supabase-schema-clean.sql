-- Lifestyle Tracker Database Schema for Supabase
-- SAFE TO RUN MULTIPLE TIMES - Will drop and recreate everything

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Drop existing policies (safe even if they don't exist)
drop policy if exists "Users can view own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;
drop policy if exists "Users can insert own profile" on profiles;
drop policy if exists "Users can view own sleep data" on sleep_entries;
drop policy if exists "Users can insert own sleep data" on sleep_entries;
drop policy if exists "Users can update own sleep data" on sleep_entries;
drop policy if exists "Users can delete own sleep data" on sleep_entries;
drop policy if exists "Users can view own activity data" on activity_entries;
drop policy if exists "Users can insert own activity data" on activity_entries;
drop policy if exists "Users can update own activity data" on activity_entries;
drop policy if exists "Users can delete own activity data" on activity_entries;
drop policy if exists "Users can view own nutrition data" on nutrition_entries;
drop policy if exists "Users can insert own nutrition data" on nutrition_entries;
drop policy if exists "Users can update own nutrition data" on nutrition_entries;
drop policy if exists "Users can delete own nutrition data" on nutrition_entries;
drop policy if exists "Users can view own dishes" on dishes;
drop policy if exists "Users can insert own dishes" on dishes;
drop policy if exists "Users can update own dishes" on dishes;
drop policy if exists "Users can delete own dishes" on dishes;

-- Create tables (if not exists)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists sleep_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  date date not null,
  bedtime text not null,
  wake_time text not null,
  duration_mins integer not null,
  rating text not null,
  breakdown jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, date)
);

create table if not exists activity_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  date date not null,
  steps integer default 0,
  gym_sessions jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, date)
);

create table if not exists nutrition_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  date date not null,
  meals jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, date)
);

create table if not exists dishes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  protein numeric(5,1) not null,
  carbs numeric(5,1) not null,
  fats numeric(5,1) not null,
  calories integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists exercises (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  category text not null, -- push, pull, legs, core, cardio, other
  equipment text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Drop existing policies for exercises (now that table exists)
drop policy if exists "Users can view own exercises" on exercises;
drop policy if exists "Users can insert own exercises" on exercises;
drop policy if exists "Users can update own exercises" on exercises;
drop policy if exists "Users can delete own exercises" on exercises;

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table sleep_entries enable row level security;
alter table activity_entries enable row level security;
alter table nutrition_entries enable row level security;
alter table dishes enable row level security;
alter table exercises enable row level security;

-- Create policies
-- Profiles policies
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- Sleep policies
create policy "Users can view own sleep data"
  on sleep_entries for select
  using (auth.uid() = user_id);

create policy "Users can insert own sleep data"
  on sleep_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update own sleep data"
  on sleep_entries for update
  using (auth.uid() = user_id);

create policy "Users can delete own sleep data"
  on sleep_entries for delete
  using (auth.uid() = user_id);

-- Activity policies
create policy "Users can view own activity data"
  on activity_entries for select
  using (auth.uid() = user_id);

create policy "Users can insert own activity data"
  on activity_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update own activity data"
  on activity_entries for update
  using (auth.uid() = user_id);

create policy "Users can delete own activity data"
  on activity_entries for delete
  using (auth.uid() = user_id);

-- Nutrition policies
create policy "Users can view own nutrition data"
  on nutrition_entries for select
  using (auth.uid() = user_id);

create policy "Users can insert own nutrition data"
  on nutrition_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update own nutrition data"
  on nutrition_entries for update
  using (auth.uid() = user_id);

create policy "Users can delete own nutrition data"
  on nutrition_entries for delete
  using (auth.uid() = user_id);

-- Dishes policies
create policy "Users can view own dishes"
  on dishes for select
  using (auth.uid() = user_id);

create policy "Users can insert own dishes"
  on dishes for insert
  with check (auth.uid() = user_id);

create policy "Users can update own dishes"
  on dishes for update
  using (auth.uid() = user_id);

create policy "Users can delete own dishes"
  on dishes for delete
  using (auth.uid() = user_id);

-- Exercises policies
create policy "Users can view own exercises"
  on exercises for select
  using (auth.uid() = user_id);

create policy "Users can insert own exercises"
  on exercises for insert
  with check (auth.uid() = user_id);

create policy "Users can update own exercises"
  on exercises for update
  using (auth.uid() = user_id);

create policy "Users can delete own exercises"
  on exercises for delete
  using (auth.uid() = user_id);

-- Create indexes (if not exists is implicit for indexes)
create index if not exists sleep_entries_user_date_idx on sleep_entries(user_id, date desc);
create index if not exists activity_entries_user_date_idx on activity_entries(user_id, date desc);
create index if not exists nutrition_entries_user_date_idx on nutrition_entries(user_id, date desc);
create index if not exists dishes_user_idx on dishes(user_id);
create index if not exists exercises_user_idx on exercises(user_id);

-- Drop existing triggers (safe)
drop trigger if exists update_profiles_updated_at on profiles;
drop trigger if exists update_sleep_entries_updated_at on sleep_entries;
drop trigger if exists update_activity_entries_updated_at on activity_entries;
drop trigger if exists update_nutrition_entries_updated_at on nutrition_entries;
drop trigger if exists update_dishes_updated_at on dishes;
drop trigger if exists update_exercises_updated_at on exercises;

-- Drop and recreate function
drop function if exists update_updated_at_column();
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers
create trigger update_profiles_updated_at before update on profiles
  for each row execute procedure update_updated_at_column();

create trigger update_sleep_entries_updated_at before update on sleep_entries
  for each row execute procedure update_updated_at_column();

create trigger update_activity_entries_updated_at before update on activity_entries
  for each row execute procedure update_updated_at_column();

create trigger update_nutrition_entries_updated_at before update on nutrition_entries
  for each row execute procedure update_updated_at_column();

create trigger update_dishes_updated_at before update on dishes
  for each row execute procedure update_updated_at_column();

create trigger update_exercises_updated_at before update on exercises
  for each row execute procedure update_updated_at_column();
