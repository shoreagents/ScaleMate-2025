-- Migration to create and set up the profiles table with triggers and RLS

BEGIN; -- Start a transaction

-- Step 1: Create the profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    username TEXT UNIQUE,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    phone_number TEXT,
    location TEXT,
    profile_picture_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Step 2: Create the updated_at trigger function
CREATE OR REPLACE FUNCTION public.moddatetime()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Create the updated_at trigger
CREATE TRIGGER handle_profile_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.moddatetime();

-- Step 4: Create the handle_new_user trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, first_name, last_name)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'first_name',
        NEW.raw_user_meta_data->>'last_name'
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 5: Create the new user trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 6: Set up RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Remove any existing policies
DO $$
DECLARE
    policy_name TEXT;
BEGIN
    FOR policy_name IN (SELECT policyname FROM pg_policies WHERE tablename = 'profiles' AND schemaname = 'public')
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(policy_name) || ' ON public.profiles;';
    END LOOP;
END$$;

-- Create RLS policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Add policy comments
COMMENT ON POLICY "Users can view their own profile" ON public.profiles IS 'Allows users to read their own profile data.';
COMMENT ON POLICY "Users can insert their own profile" ON public.profiles IS 'Allows users to create their own profile entry (primarily for trigger).';
COMMENT ON POLICY "Users can update their own profile" ON public.profiles IS 'Allows users to update their own profile data with restrictions on protected fields.';

-- Add table comments
COMMENT ON TABLE public.profiles IS 'Stores user profile information.';
COMMENT ON COLUMN public.profiles.id IS 'References the auth.users id.';
COMMENT ON COLUMN public.profiles.first_name IS 'User''s first name.';
COMMENT ON COLUMN public.profiles.last_name IS 'User''s last name.';
COMMENT ON COLUMN public.profiles.username IS 'Unique username for the user.';
COMMENT ON COLUMN public.profiles.role IS 'User role (user or admin).';
COMMENT ON COLUMN public.profiles.phone_number IS 'User''s phone number.';
COMMENT ON COLUMN public.profiles.location IS 'User''s location.';
COMMENT ON COLUMN public.profiles.profile_picture_url IS 'URL to user''s profile picture.';
COMMENT ON COLUMN public.profiles.created_at IS 'Timestamp when the profile was created.';
COMMENT ON COLUMN public.profiles.updated_at IS 'Timestamp when the profile was last updated.';

COMMIT; -- End transaction