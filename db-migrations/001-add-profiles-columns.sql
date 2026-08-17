-- Migration: Add missing columns to profiles table
-- Run these in your Supabase SQL editor or psql connected to the DB.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS username text,
  ADD COLUMN IF NOT EXISTS salutation text,
  ADD COLUMN IF NOT EXISTS name text,
  ADD COLUMN IF NOT EXISTS address text,
  ADD COLUMN IF NOT EXISTS pincode text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS state text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Ensure username uniqueness
CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_key ON public.profiles(username);

-- If you prefer email as primary identifier, ensure email exists and is indexed
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS email text;
CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_key ON public.profiles(email);
