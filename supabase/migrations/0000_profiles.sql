-- Migration to refine triggers and RLS for the existing public.profiles table.
-- This assumes public.profiles table ALREADY EXISTS.

BEGIN; -- Start a transaction

-- Step 1: Drop the existing new user trigger and its function,
-- and the updated_at trigger and its function, so we can recreate them cleanly.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

DROP TRIGGER IF EXISTS handle_profile_updated_at ON public.profiles; -- Corrected name from your script
-- If your trigger was named handle_profiles_updated_at (plural profiles), use that:
-- DROP TRIGGER IF EXISTS handle_profiles_updated_at ON public.profiles;
DROP FUNCTION IF EXISTS public.moddatetime();


-- Step 2: Recreate the `updated_at` trigger function and trigger
CREATE OR REPLACE FUNCTION public.moddatetime()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_profile_updated_at -- Use a consistent name
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.moddatetime();


-- Step 3: Recreate the `handle_new_user` trigger function (Simplified Version)
-- This version only inserts the user's ID.
-- 'role' will use its table DEFAULT 'user'.
-- first_name, last_name, username, etc., will be NULL by default.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; -- SECURITY DEFINER is crucial

-- Step 4: Recreate the trigger that fires after a new user is inserted in auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- Step 5: Reset and Apply Basic RLS Policies
-- (This section is optional but recommended if you want to ensure a clean RLS setup)

-- First, remove existing RLS policies on public.profiles to avoid conflicts.
-- This is a more aggressive reset; be cautious if you have complex custom policies you want to keep.
-- You might need to list specific policy names if this generic drop doesn't work or is too broad.
DO $$
DECLARE
    policy_name TEXT;
BEGIN
    FOR policy_name IN (SELECT policyname FROM pg_policies WHERE tablename = 'profiles' AND schemaname = 'public')
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(policy_name) || ' ON public.profiles;';
    END LOOP;
END$$;

-- Ensure RLS is enabled (it should be from your Step 1, but good to re-confirm)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile.
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can insert their own profile (primarily for the trigger's operation,
-- as the trigger runs with definer's rights but this policy acts as a safeguard/intent).
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own profile.
-- IMPORTANT: This basic policy allows users to update ANY field in their profile
-- except those restricted by database column constraints (like 'id').
-- You SHOULD refine this to restrict which columns users can update.
-- e.g., users should not update their 'role' directly.
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Example of a more restrictive update policy (if you want to implement this later):
-- DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
-- CREATE POLICY "Users can update specific profile details"
--   ON public.profiles FOR UPDATE
--   USING (auth.uid() = id)
--   WITH CHECK (
--     auth.uid() = id AND
--     id = OLD.id AND         -- Cannot change their own ID
--     role = OLD.role AND     -- Cannot change their own role
--     created_at = OLD.created_at -- Cannot change created_at
--     -- Allow changes to first_name, last_name, username, phone_number, location, profile_picture_url
--     -- No specific check needed for these if they are allowed to change;
--     -- the USING clause already restricts it to their own row.
--   );

COMMENT ON POLICY "Users can view their own profile" ON public.profiles IS 'Allows users to read their own profile data.';
COMMENT ON POLICY "Users can insert their own profile" ON public.profiles IS 'Allows users to create their own profile entry (primarily for trigger).';
COMMENT ON POLICY "Users can update their own profile" ON public.profiles IS 'Allows users to update their own profile data. Consider restricting columns.';


COMMIT; -- End transaction