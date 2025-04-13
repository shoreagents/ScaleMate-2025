-- First, let's check the current state
SELECT * FROM pg_policies WHERE tablename = 'user_roles';

-- Drop all existing policies except the service role bypass
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Initial admin setup" ON public.user_roles;
DROP POLICY IF EXISTS "Allow authenticated users to insert their own roles" ON public.user_roles;

-- Create a policy that allows authenticated users to insert their own roles
CREATE POLICY "Allow authenticated users to insert their own roles"
    ON public.user_roles
    FOR INSERT
    TO authenticated
    WITH CHECK (true);  -- Temporarily allow all authenticated users to insert

-- Create a policy that allows users to view their own roles
CREATE POLICY "Users can view their own roles"
    ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Create a policy that allows admins to manage all roles
CREATE POLICY "Admins can manage all roles"
    ON public.user_roles
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

-- Verify the policies
SELECT * FROM pg_policies WHERE tablename = 'user_roles';-- First, let's check the current state
SELECT * FROM pg_policies WHERE tablename = 'user_roles';

-- Drop all existing policies except the service role bypass
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Initial admin setup" ON public.user_roles;
DROP POLICY IF EXISTS "Allow authenticated users to insert their own roles" ON public.user_roles;

-- Create a policy that allows authenticated users to insert their own roles
CREATE POLICY "Allow authenticated users to insert their own roles"
    ON public.user_roles
    FOR INSERT
    TO authenticated
    WITH CHECK (true);  -- Temporarily allow all authenticated users to insert

-- Create a policy that allows users to view their own roles
CREATE POLICY "Users can view their own roles"
    ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Create a policy that allows admins to manage all roles
CREATE POLICY "Admins can manage all roles"
    ON public.user_roles
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

-- Verify the policies
SELECT * FROM pg_policies WHERE tablename = 'user_roles';