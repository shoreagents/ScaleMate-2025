-- Start transaction
BEGIN;

-- First, drop ALL existing policies to ensure clean slate
DROP POLICY IF EXISTS "Allow authenticated users to view roles" ON user_roles;
DROP POLICY IF EXISTS "Allow admins to manage roles" ON user_roles;
DROP POLICY IF EXISTS "Users can see their own roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can see all roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON user_roles;
DROP POLICY IF EXISTS "Initial admin setup" ON user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON user_roles;
DROP POLICY IF EXISTS "Allow authenticated users to insert their own roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;

-- Revoke permissions that might be using the function
DO $$
BEGIN
    EXECUTE 'REVOKE ALL ON FUNCTION public.is_admin() FROM authenticated';
EXCEPTION
    WHEN undefined_function THEN NULL;
END $$;

-- Drop any existing admin check function
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;
DROP FUNCTION IF EXISTS is_admin(uuid) CASCADE;

-- Create a simpler admin check function that doesn't use recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  -- First try to get the role directly from the JWT claim
  IF current_setting('request.jwt.claims', true)::jsonb->>'role' = 'admin' THEN
    RETURN true;
  END IF;
  
  -- Fallback to database check without recursion
  RETURN EXISTS (
    SELECT 1
    FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure RLS is enabled
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Create a basic policy for all authenticated users to view roles
CREATE POLICY "Allow authenticated users to view roles"
ON user_roles
FOR SELECT
USING (
  -- Users can see their own roles
  auth.uid() = user_id
  OR
  -- Admins can see all roles
  (SELECT public.is_admin())
);

-- Create a single policy for admin write operations
CREATE POLICY "Allow admins to manage roles"
ON user_roles
FOR ALL
USING (
  (SELECT public.is_admin())
)
WITH CHECK (
  (SELECT public.is_admin())
);

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT ALL ON TABLE user_roles TO authenticated;

-- Create an index to improve performance of role checks
DROP INDEX IF EXISTS idx_user_roles_user_id_role;
CREATE INDEX idx_user_roles_user_id_role ON user_roles(user_id, role);

COMMIT;

-- Verify the changes
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'user_roles'; 