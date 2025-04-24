-- Start transaction
BEGIN;

-- Create user profile for the admin user
DO $$
DECLARE
    v_user_id uuid;
BEGIN
    -- Get the user ID
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE email = 'dev.shoreagents@gmail.com';

    IF v_user_id IS NOT NULL THEN
        -- Create user profile
        INSERT INTO public.user_profiles (
            user_id,
            first_name,
            last_name,
            username,
            profile_picture_url,
            created_at,
            updated_at,
            last_password_change
        )
        VALUES (
            v_user_id,
            'Admin',
            'User',
            'admin',
            NULL,
            NOW(),
            NOW(),
            NOW()
        )
        ON CONFLICT (user_id) DO NOTHING;

        -- Create admin role
        INSERT INTO public.user_roles (
            user_id,
            role,
            created_at
        )
        VALUES (
            v_user_id,
            'admin',
            NOW()
        )
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
END $$;

COMMIT; 