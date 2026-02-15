-- Migration: Add category and photo columns to dishes table
-- Run this if you already have a dishes table without these columns

-- Add category column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'dishes' AND column_name = 'category'
  ) THEN
    ALTER TABLE dishes ADD COLUMN category text DEFAULT 'other';
  END IF;
END $$;

-- Add photo column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'dishes' AND column_name = 'photo'
  ) THEN
    ALTER TABLE dishes ADD COLUMN photo text;
  END IF;
END $$;

-- Add brand column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'dishes' AND column_name = 'brand'
  ) THEN
    ALTER TABLE dishes ADD COLUMN brand text;
  END IF;
END $$;

-- Add name, date_of_birth, height, weight, sex, etc. to profiles table if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'name'
  ) THEN
    ALTER TABLE profiles ADD COLUMN name text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'date_of_birth'
  ) THEN
    ALTER TABLE profiles ADD COLUMN date_of_birth date;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'height'
  ) THEN
    ALTER TABLE profiles ADD COLUMN height numeric(5,1);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'weight'
  ) THEN
    ALTER TABLE profiles ADD COLUMN weight numeric(5,1);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'sex'
  ) THEN
    ALTER TABLE profiles ADD COLUMN sex text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'activity_level'
  ) THEN
    ALTER TABLE profiles ADD COLUMN activity_level numeric(3,2) DEFAULT 1.2;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'target_weight'
  ) THEN
    ALTER TABLE profiles ADD COLUMN target_weight numeric(5,1);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'target_body_fat'
  ) THEN
    ALTER TABLE profiles ADD COLUMN target_body_fat numeric(4,1);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'current_body_fat'
  ) THEN
    ALTER TABLE profiles ADD COLUMN current_body_fat numeric(4,1);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'current_water'
  ) THEN
    ALTER TABLE profiles ADD COLUMN current_water numeric(4,1);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'current_muscle'
  ) THEN
    ALTER TABLE profiles ADD COLUMN current_muscle numeric(4,1);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'current_bone'
  ) THEN
    ALTER TABLE profiles ADD COLUMN current_bone numeric(4,1);
  END IF;
END $$;
