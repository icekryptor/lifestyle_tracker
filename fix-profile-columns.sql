-- Fix for profile save/load issue
-- Run this in Supabase SQL Editor to ensure the goal_speed column exists

DO $$ 
BEGIN
  -- Add goal_speed column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'goal_speed'
  ) THEN
    ALTER TABLE profiles ADD COLUMN goal_speed text DEFAULT 'moderate';
    RAISE NOTICE 'Added goal_speed column';
  ELSE
    RAISE NOTICE 'goal_speed column already exists';
  END IF;
END $$;

-- Verify the column exists
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND column_name IN ('activity_level', 'goal_speed')
ORDER BY column_name;
