-- Drop all versions of the functions
DROP FUNCTION IF EXISTS public.update_user_profile(UUID, TEXT, TEXT, TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.update_user_profile(UUID, TEXT, TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.update_user_profile(UUID, TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.update_user_profile(UUID, TEXT, TEXT);

-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS public.update_user_profile_v2(uuid, text, text, text, text, text);
DROP FUNCTION IF EXISTS public.update_user_profile_v2(uuid, text, text, text, text);
DROP FUNCTION IF EXISTS public.update_user_profile_v2(uuid, text, text, text);
DROP FUNCTION IF EXISTS public.update_user_profile_v2(uuid, text, text);

-- Create function to update user profile
CREATE OR REPLACE FUNCTION public.update_user_profile_v2(
    p_user_id uuid,
    p_first_name text DEFAULT NULL,
    p_last_name text DEFAULT NULL,
    p_username text DEFAULT NULL,
    p_profile_picture_url text DEFAULT NULL
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_username text;
    v_profile json;
BEGIN
    -- Check if user exists
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) THEN
        RAISE EXCEPTION 'User not found';
    END IF;

    -- If username is provided, check if it's unique
    IF p_username IS NOT NULL THEN
        IF EXISTS (
            SELECT 1 
            FROM public.user_profiles 
            WHERE username = p_username 
            AND user_id != p_user_id
        ) THEN
            RAISE EXCEPTION 'Username already taken';
        END IF;
    END IF;

    -- Update or insert user profile
    INSERT INTO public.user_profiles (
        user_id,
        first_name,
        last_name,
        username,
        profile_picture_url,
        updated_at
    )
    VALUES (
        p_user_id,
        COALESCE(p_first_name, ''),
        COALESCE(p_last_name, ''),
        COALESCE(p_username, ''),
        p_profile_picture_url,
        NOW()
    )
    ON CONFLICT (user_id)
    DO UPDATE SET
        first_name = COALESCE(EXCLUDED.first_name, user_profiles.first_name),
        last_name = COALESCE(EXCLUDED.last_name, user_profiles.last_name),
        username = COALESCE(EXCLUDED.username, user_profiles.username),
        profile_picture_url = COALESCE(EXCLUDED.profile_picture_url, user_profiles.profile_picture_url),
        updated_at = EXCLUDED.updated_at
    RETURNING json_build_object(
        'user_id', user_id,
        'first_name', first_name,
        'last_name', last_name,
        'username', username,
        'profile_picture_url', profile_picture_url,
        'updated_at', updated_at
    ) INTO v_profile;

    RETURN v_profile;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.update_user_profile_v2 TO authenticated;

-- Add comment
COMMENT ON FUNCTION public.update_user_profile_v2 IS 'Updates a user''s profile information'; 