-- Start transaction
BEGIN;

-- Create admin role for dev.shoreagents@gmail.com
DO $$
DECLARE
    v_user_id uuid;
BEGIN
    -- Get the user ID
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE email = 'dev.shoreagents@gmail.com';

    IF v_user_id IS NOT NULL THEN
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