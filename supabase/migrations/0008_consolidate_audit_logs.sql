-- Drop all possible versions of update_user_profile_v2 first
DROP FUNCTION IF EXISTS public.update_user_profile_v2(UUID, JSONB);
DROP FUNCTION IF EXISTS public.update_user_profile_v2(UUID, JSONB, TEXT);
DROP FUNCTION IF EXISTS public.update_user_profile_v2(UUID, JSONB, TEXT, TEXT);

-- Create the function with explicit parameter types
CREATE OR REPLACE FUNCTION public.update_user_profile_v2(
    target_user_id UUID,
    update_data JSONB,
    p_new_role TEXT DEFAULT NULL,
    p_new_password TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
    v_current_user_role TEXT;
    v_target_user_role TEXT;
    v_old_data JSONB;
    v_allowed_fields TEXT[] := ARRAY[
        'first_name', 'last_name', 'username', 'phone_number',
        'location', 'profile_picture_url', 'gender'
    ];
    v_protected_fields TEXT[] := ARRAY[
        'id', 'email', 'role', 'created_at', 'updated_at',
        'last_sign_in_at', 'is_verified', 'verification_token',
        'reset_token', 'reset_token_expires_at'
    ];
    v_update_fields JSONB;
    v_field TEXT;
    v_value JSONB;
    v_audit_details JSONB;
    v_allowed_roles TEXT[] := ARRAY['user', 'admin', 'moderator', 'developer', 'author'];
    v_salt TEXT;
BEGIN
    -- Get current user's role
    SELECT role INTO v_current_user_role
    FROM public.profiles
    WHERE id = auth.uid();

    -- Validate current user is admin
    IF v_current_user_role != 'admin' THEN
        RAISE EXCEPTION 'Only admins can update user profiles';
    END IF;

    -- Get target user's current role and data
    SELECT role, to_jsonb(p.*) INTO v_target_user_role, v_old_data
    FROM public.profiles p
    WHERE p.id = target_user_id;

    -- Validate target user exists
    IF v_target_user_role IS NULL THEN
        RAISE EXCEPTION 'Target user not found';
    END IF;

    -- Prevent changing own role or password
    IF auth.uid() = target_user_id THEN
        IF p_new_role IS NOT NULL THEN
            RAISE EXCEPTION 'Admins cannot change their own role';
        END IF;
        IF p_new_password IS NOT NULL THEN
            RAISE EXCEPTION 'Admins must use the regular password change flow for their own account';
        END IF;
    END IF;

    -- Validate and prepare update data
    v_update_fields := '{}'::JSONB;
    
    -- Process each field in update_data
    FOR v_field, v_value IN SELECT * FROM jsonb_each(update_data)
    LOOP
        -- Check if field is protected
        IF v_field = ANY(v_protected_fields) THEN
            RAISE EXCEPTION 'Field "%" is protected and cannot be updated', v_field;
        END IF;

        -- Check if field is allowed
        IF v_field = ANY(v_allowed_fields) THEN
            -- Validate field value
            IF v_value IS NULL THEN
                RAISE EXCEPTION 'Field "%" cannot be set to null', v_field;
            END IF;

            -- Special handling for username
            IF v_field = 'username' THEN
                IF EXISTS (
                    SELECT 1 FROM public.profiles
                    WHERE username = v_value#>>'{}'
                    AND id != target_user_id
                ) THEN
                    RAISE EXCEPTION 'Username is already taken';
                END IF;
            END IF;

            -- Special handling for gender
            IF v_field = 'gender' THEN
                IF v_value#>>'{}' NOT IN ('male', 'female', 'other', 'prefer_not_to_say') THEN
                    RAISE EXCEPTION 'Invalid gender value. Must be one of: male, female, other, prefer_not_to_say';
                END IF;
            END IF;

            v_update_fields := v_update_fields || jsonb_build_object(v_field, v_value);
        ELSE
            RAISE EXCEPTION 'Field "%" is not allowed to be updated', v_field;
        END IF;
    END LOOP;

    -- Validate new role if provided
    IF p_new_role IS NOT NULL THEN
        IF p_new_role NOT IN (SELECT unnest(v_allowed_roles)) THEN
            RAISE EXCEPTION 'Invalid role. Must be one of: %', array_to_string(v_allowed_roles, ', ');
        END IF;
    END IF;

    -- Validate new password if provided
    IF p_new_password IS NOT NULL AND length(p_new_password) < 6 THEN
        RAISE EXCEPTION 'Password must be at least 6 characters long';
    END IF;

    -- Prepare audit details
    v_audit_details := jsonb_build_object(
        'target_user_id', target_user_id,
        'target_user_role', v_target_user_role,
        'updated_fields', v_update_fields
    );

    -- Add role change to audit if applicable
    IF p_new_role IS NOT NULL AND p_new_role != v_target_user_role THEN
        v_audit_details := v_audit_details || jsonb_build_object(
            'role_change', jsonb_build_object(
                'old_role', v_target_user_role,
                'new_role', p_new_role
            )
        );
    END IF;

    -- Add password change to audit if applicable
    IF p_new_password IS NOT NULL THEN
        v_audit_details := v_audit_details || jsonb_build_object(
            'password_changed', true
        );
    END IF;

    -- Log the update in admin_audit_log
    INSERT INTO public.admin_audit_log (
        admin_id,
        action,
        details,
        ip_address
    ) VALUES (
        auth.uid(),
        'UPDATE_USER_PROFILE',
        v_audit_details,
        current_setting('request.headers', true)::json->>'x-forwarded-for'
    );

    -- Update the profile
    UPDATE public.profiles
    SET
        first_name = COALESCE(v_update_fields->>'first_name', first_name),
        last_name = COALESCE(v_update_fields->>'last_name', last_name),
        username = COALESCE(v_update_fields->>'username', username),
        phone_number = COALESCE(v_update_fields->>'phone_number', phone_number),
        location = COALESCE(v_update_fields->>'location', location),
        profile_picture_url = COALESCE(v_update_fields->>'profile_picture_url', profile_picture_url),
        gender = COALESCE(v_update_fields->>'gender', gender),
        role = COALESCE(p_new_role, role),
        updated_at = NOW()
    WHERE id = target_user_id;

    -- Update password if provided
    IF p_new_password IS NOT NULL THEN
        -- Generate salt first to ensure proper type handling
        SELECT gen_salt('bf', 8) INTO v_salt;
        UPDATE auth.users
        SET encrypted_password = crypt(p_new_password::text, v_salt)
        WHERE id = target_user_id;
    END IF;

    -- Return updated profile data
    RETURN jsonb_build_object(
        'success', true,
        'message', 'Profile updated successfully',
        'updated_fields', v_update_fields,
        'role_updated', p_new_role IS NOT NULL,
        'password_updated', p_new_password IS NOT NULL
    );

EXCEPTION
    WHEN OTHERS THEN
        -- Log the error in admin_audit_log
        INSERT INTO public.admin_audit_log (
            admin_id,
            action,
            details,
            ip_address
        ) VALUES (
            auth.uid(),
            'ERROR',
            jsonb_build_object(
                'error_message', SQLERRM,
                'error_state', SQLSTATE,
                'function', 'update_user_profile_v2',
                'target_user_id', target_user_id,
                'update_data', update_data,
                'new_role', p_new_role,
                'has_password_update', p_new_password IS NOT NULL
            ),
            current_setting('request.headers', true)::json->>'x-forwarded-for'
        );

        -- Re-raise the error
        RAISE;
END;
$$;

-- Add comment to the function
COMMENT ON FUNCTION public.update_user_profile_v2 IS 'Securely updates a user profile, including role and password changes if provided. Only admins can update other users profiles.';

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.update_user_profile_v2 TO authenticated;

-- Drop the now-redundant functions
DROP FUNCTION IF EXISTS public.admin_update_user_password;
DROP FUNCTION IF EXISTS public.enable_user_roles_rls;

-- Drop the now-redundant triggers
DROP TRIGGER IF EXISTS prevent_password_update ON auth.users;
DROP TRIGGER IF EXISTS prevent_role_update ON public.profiles;
DROP FUNCTION IF EXISTS public.prevent_direct_password_update;
DROP FUNCTION IF EXISTS public.prevent_direct_role_update; 