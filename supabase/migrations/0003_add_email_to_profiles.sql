BEGIN; -- Start transaction

-- Drop the profiles_with_email view if it exists
DROP VIEW IF EXISTS public.profiles_with_email;

-- Add email column to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS email TEXT;

-- Create a function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM auth.users u
        JOIN public.profiles p ON p.id = u.id
        WHERE u.id = auth.uid()
        AND p.role = 'admin'
    );
END;
$$;

-- Create a function to sync email from auth.users to profiles
CREATE OR REPLACE FUNCTION public.sync_user_email()
RETURNS TRIGGER AS $$
BEGIN
    -- Update email in profiles when it changes in auth.users
    UPDATE public.profiles
    SET email = NEW.email
    WHERE id = NEW.id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to sync email on auth.users changes
DROP TRIGGER IF EXISTS sync_user_email_trigger ON auth.users;
CREATE TRIGGER sync_user_email_trigger
    AFTER INSERT OR UPDATE OF email
    ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.sync_user_email();

-- Backfill existing profiles with emails from auth.users
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id
AND p.email IS NULL;

-- Add comment to the email column
COMMENT ON COLUMN public.profiles.email IS 'User email address, synced from auth.users';

-- Add comment to the trigger function
COMMENT ON FUNCTION public.sync_user_email IS 'Trigger function to keep profiles.email in sync with auth.users.email';

-- Add unique constraint to email in profiles if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_constraint 
        WHERE conname = 'profiles_email_unique'
    ) THEN
        ALTER TABLE public.profiles
        ADD CONSTRAINT profiles_email_unique UNIQUE (email);
    END IF;
END $$;

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can manage user roles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Add policy to allow admins to manage everything
CREATE POLICY "Admin full access"
ON public.profiles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Add policy to allow users to view and update their own profile
CREATE POLICY "User self access"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "User self update"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id AND NOT public.is_admin())
WITH CHECK (auth.uid() = id AND NOT public.is_admin());

COMMIT; -- End transaction 