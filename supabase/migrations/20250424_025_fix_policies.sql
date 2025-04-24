-- Start transaction
BEGIN;

-- Drop existing policies
DO $$ 
DECLARE
    policy_exists boolean;
BEGIN
    -- Drop and recreate "Users can view their own profile" policy
    SELECT EXISTS (
        SELECT 1 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'user_profiles' 
        AND policyname = 'Users can view their own profile'
    ) INTO policy_exists;
    
    IF policy_exists THEN
        DROP POLICY "Users can view their own profile" ON public.user_profiles;
    END IF;
    
    CREATE POLICY "Users can view their own profile"
        ON public.user_profiles
        FOR SELECT
        TO authenticated
        USING (auth.uid() = user_id);

    -- Drop and recreate "Users can update their own profile" policy
    SELECT EXISTS (
        SELECT 1 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'user_profiles' 
        AND policyname = 'Users can update their own profile'
    ) INTO policy_exists;
    
    IF policy_exists THEN
        DROP POLICY "Users can update their own profile" ON public.user_profiles;
    END IF;
    
    CREATE POLICY "Users can update their own profile"
        ON public.user_profiles
        FOR UPDATE
        TO authenticated
        USING (auth.uid() = user_id)
        WITH CHECK (auth.uid() = user_id);

    -- Drop and recreate "Admins can view all profiles" policy
    SELECT EXISTS (
        SELECT 1 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'user_profiles' 
        AND policyname = 'Admins can view all profiles'
    ) INTO policy_exists;
    
    IF policy_exists THEN
        DROP POLICY "Admins can view all profiles" ON public.user_profiles;
    END IF;
    
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

    -- Drop and recreate "Admins can update all profiles" policy
    SELECT EXISTS (
        SELECT 1 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'user_profiles' 
        AND policyname = 'Admins can update all profiles'
    ) INTO policy_exists;
    
    IF policy_exists THEN
        DROP POLICY "Admins can update all profiles" ON public.user_profiles;
    END IF;
    
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

EXCEPTION WHEN undefined_table THEN
    -- If the table doesn't exist, we can't do anything
    RAISE NOTICE 'Table user_profiles does not exist';
END $$;

COMMIT; 