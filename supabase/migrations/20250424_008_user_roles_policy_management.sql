-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON user_roles;
DROP POLICY IF EXISTS "Enable insert for admins" ON user_roles;
DROP POLICY IF EXISTS "Enable update for admins" ON user_roles;
DROP POLICY IF EXISTS "Enable delete for admins" ON user_roles;

-- Create a function to check admin status without recursion
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
    LIMIT 1
  );
END;
$$;

-- Create simplified policies
CREATE POLICY "Enable read access for authenticated users"
ON user_roles
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for admins"
ON user_roles
FOR INSERT
TO authenticated
WITH CHECK (is_admin());

CREATE POLICY "Enable update for admins"
ON user_roles
FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Enable delete for admins"
ON user_roles
FOR DELETE
TO authenticated
USING (is_admin());

-- Update the enable_user_roles_rls function
CREATE OR REPLACE FUNCTION enable_user_roles_rls(
  p_action text,
  p_new_role text DEFAULT NULL,
  p_target_user_id uuid DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if user exists
  IF p_target_user_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_target_user_id) THEN
    RAISE EXCEPTION 'User does not exist';
  END IF;

  -- Check if current user is admin
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Only admins can manage roles';
  END IF;

  -- Perform the requested action
  CASE p_action
    WHEN 'insert' THEN
      IF p_target_user_id IS NULL OR p_new_role IS NULL THEN
        RAISE EXCEPTION 'Target user ID and role are required for insert';
      END IF;
      INSERT INTO user_roles (user_id, role, created_at)
      VALUES (p_target_user_id, p_new_role, NOW());
    WHEN 'update' THEN
      IF p_target_user_id IS NULL OR p_new_role IS NULL THEN
        RAISE EXCEPTION 'Target user ID and role are required for update';
      END IF;
      UPDATE user_roles
      SET role = p_new_role
      WHERE user_id = p_target_user_id;
    WHEN 'delete' THEN
      IF p_target_user_id IS NULL THEN
        RAISE EXCEPTION 'Target user ID is required for delete';
      END IF;
      DELETE FROM user_roles
      WHERE user_id = p_target_user_id;
    ELSE
      RAISE EXCEPTION 'Invalid action: %', p_action;
  END CASE;
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION enable_user_roles_rls(text, text, uuid) TO authenticated;

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema'; 