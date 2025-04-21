-- Drop all versions of the functions
DROP FUNCTION IF EXISTS public.update_user_profile(UUID, TEXT, TEXT, TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.update_user_profile(UUID, TEXT, TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.update_user_profile(UUID, TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.update_user_profile(UUID, TEXT, TEXT);

-- Drop the enable_user_roles_rls function with its exact signature
DROP FUNCTION IF EXISTS public.enable_user_roles_rls(TEXT, TEXT, UUID);

-- Create the update_user_profile function with a unique signature
CREATE OR REPLACE FUNCTION public.update_user_profile_v2(
    p_user_id UUID,
    p_first_name TEXT,
    p_last_name TEXT,
    p_phone TEXT,
    p_gender TEXT,
    p_username TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Update the user profile
    UPDATE public.user_profiles
    SET 
        first_name = COALESCE(p_first_name, first_name),
        last_name = COALESCE(p_last_name, last_name),
        phone = COALESCE(p_phone, phone),
        gender = COALESCE(p_gender, gender),
        username = COALESCE(p_username, username),
        updated_at = NOW()
    WHERE user_id = p_user_id;

    -- If no rows were updated, insert a new profile
    IF NOT FOUND THEN
        INSERT INTO public.user_profiles (
            user_id,
            first_name,
            last_name,
            phone,
            gender,
            username,
            created_at,
            updated_at
        )
        VALUES (
            p_user_id,
            p_first_name,
            p_last_name,
            p_phone,
            p_gender,
            p_username,
            NOW(),
            NOW()
        );
    END IF;
END;
$$;

-- Create the enable_user_roles_rls function
CREATE OR REPLACE FUNCTION public.enable_user_roles_rls(
    p_action TEXT,
    p_new_role TEXT,
    p_target_user_id UUID
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Check if the current user is an admin
    IF NOT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid()
        AND role = 'admin'
    ) THEN
        RAISE EXCEPTION 'Only admins can manage roles';
    END IF;

    -- Perform the requested action
    CASE p_action
        WHEN 'insert' THEN
            INSERT INTO public.user_roles (user_id, role)
            VALUES (p_target_user_id, p_new_role);
        WHEN 'update' THEN
            UPDATE public.user_roles
            SET role = p_new_role
            WHERE user_id = p_target_user_id;
        WHEN 'delete' THEN
            DELETE FROM public.user_roles
            WHERE user_id = p_target_user_id;
        ELSE
            RAISE EXCEPTION 'Invalid action: %', p_action;
    END CASE;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.update_user_profile_v2 TO authenticated;
GRANT EXECUTE ON FUNCTION public.enable_user_roles_rls TO authenticated;

-- Add comments
COMMENT ON FUNCTION public.update_user_profile_v2 IS 'Updates or creates a user profile with the provided information';
COMMENT ON FUNCTION public.enable_user_roles_rls IS 'Enables RLS for user roles management'; 