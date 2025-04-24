-- Start transaction
BEGIN;

-- Drop existing views and functions first
DROP VIEW IF EXISTS public.user_details;

-- Drop triggers first
DROP TRIGGER IF EXISTS update_user_display_name_trigger ON public.user_profiles;

-- Then drop functions
DROP FUNCTION IF EXISTS public.update_user_display_name();
DROP FUNCTION IF EXISTS public.update_user_profile_v2(uuid, text, text, text, text);

-- Drop existing policies first
DO $$ 
BEGIN
    -- Drop policies from user_profiles if they exist
    DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
    DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;
    DROP POLICY IF EXISTS "Admins can update all profiles" ON public.user_profiles;
EXCEPTION 
    WHEN undefined_table THEN 
        -- If table doesn't exist, create it
        CREATE TABLE IF NOT EXISTS public.user_profiles (
            id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
            user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
            first_name text,
            last_name text,
            username text UNIQUE,
            profile_picture_url text,
            created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
            last_password_change timestamp with time zone DEFAULT CURRENT_TIMESTAMP
        );
END $$;

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
    ON public.user_profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
    ON public.user_profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
    ON public.user_profiles
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid()
            AND ur.role = 'admin'
        )
    );

CREATE POLICY "Admins can update all profiles"
    ON public.user_profiles
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid()
            AND ur.role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid()
            AND ur.role = 'admin'
        )
    );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_timestamp_updated_at();

-- Create display name update function
CREATE OR REPLACE FUNCTION public.update_user_display_name()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE auth.users
    SET raw_user_meta_data = 
        jsonb_set(
            COALESCE(raw_user_meta_data, '{}'::jsonb),
            '{display_name}',
            to_jsonb(CONCAT(NEW.first_name, ' ', NEW.last_name))
        )
    WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create display name update trigger
DROP TRIGGER IF EXISTS update_user_display_name_trigger ON public.user_profiles;
CREATE TRIGGER update_user_display_name_trigger
    AFTER INSERT OR UPDATE OF first_name, last_name ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_user_display_name();

-- Create user profile update function
CREATE OR REPLACE FUNCTION public.update_user_profile_v2(
    user_id uuid,
    first_name text,
    last_name text,
    username text,
    profile_picture_url text
)
RETURNS json AS $$
DECLARE
    profile_exists boolean;
    username_taken boolean;
    result json;
BEGIN
    -- Check if user exists
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = user_id) THEN
        RETURN json_build_object(
            'success', false,
            'message', 'User does not exist'
        );
    END IF;

    -- Check if username is taken by another user
    SELECT EXISTS (
        SELECT 1 
        FROM public.user_profiles 
        WHERE username = update_user_profile_v2.username 
        AND user_id != update_user_profile_v2.user_id
    ) INTO username_taken;

    IF username_taken THEN
        RETURN json_build_object(
            'success', false,
            'message', 'Username is already taken'
        );
    END IF;

    -- Check if profile exists
    SELECT EXISTS (
        SELECT 1 FROM public.user_profiles WHERE user_id = update_user_profile_v2.user_id
    ) INTO profile_exists;

    IF profile_exists THEN
        -- Update existing profile
        UPDATE public.user_profiles
        SET 
            first_name = COALESCE(update_user_profile_v2.first_name, first_name),
            last_name = COALESCE(update_user_profile_v2.last_name, last_name),
            username = COALESCE(update_user_profile_v2.username, username),
            profile_picture_url = COALESCE(update_user_profile_v2.profile_picture_url, profile_picture_url),
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = update_user_profile_v2.user_id;
    ELSE
        -- Insert new profile
        INSERT INTO public.user_profiles (
            user_id,
            first_name,
            last_name,
            username,
            profile_picture_url
        ) VALUES (
            user_id,
            first_name,
            last_name,
            username,
            profile_picture_url
        );
    END IF;

    RETURN json_build_object(
        'success', true,
        'message', 'Profile updated successfully'
    );
END;
$$ language 'plpgsql';

-- Create user details view
CREATE OR REPLACE VIEW public.user_details AS
SELECT 
    u.id,
    u.email,
    u.created_at as account_created_at,
    up.first_name,
    up.last_name,
    up.username,
    up.profile_picture_url,
    up.created_at as profile_created_at,
    up.updated_at as profile_updated_at,
    up.last_password_change,
    string_agg(DISTINCT ur.role, ', ') as roles
FROM auth.users u
LEFT JOIN public.user_profiles up ON u.id = up.user_id
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
GROUP BY 
    u.id,
    u.email,
    u.created_at,
    up.first_name,
    up.last_name,
    up.username,
    up.profile_picture_url,
    up.created_at,
    up.updated_at,
    up.last_password_change;

-- Add comment to view
COMMENT ON VIEW public.user_details IS 'Detailed view of user information including profiles and roles';

-- Set RLS on view
ALTER VIEW public.user_details SET (security_invoker = true);

-- Update existing user display names
UPDATE auth.users u
SET raw_user_meta_data = 
    jsonb_set(
        COALESCE(raw_user_meta_data, '{}'::jsonb),
        '{display_name}',
        to_jsonb(CONCAT(up.first_name, ' ', up.last_name))
    )
FROM public.user_profiles up
WHERE u.id = up.user_id
AND up.first_name IS NOT NULL
AND up.last_name IS NOT NULL;

COMMIT; 