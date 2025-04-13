-- Drop existing policies
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Allow authenticated users to insert their own roles" ON public.user_roles;

-- Create a policy that allows users to view their own roles
CREATE POLICY "Users can view their own roles"
    ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Create a policy that allows users to insert their own roles
CREATE POLICY "Allow authenticated users to insert their own roles"
    ON public.user_roles
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Create a policy that allows admins to manage all roles
CREATE POLICY "Admins can manage all roles"
    ON public.user_roles
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur
            WHERE ur.user_id = auth.uid()
            AND ur.role = 'admin'
            AND ur.permissions @> ARRAY['*']
        )
    );

-- Create a temporary bypass policy for initial admin setup
CREATE POLICY "Initial admin setup"
    ON public.user_roles
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Verify the policies
SELECT * FROM pg_policies WHERE tablename = 'user_roles'; 