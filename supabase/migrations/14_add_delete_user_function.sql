-- Create a function to delete a user's roles
CREATE OR REPLACE FUNCTION public.delete_user_roles(user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if current user is admin
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Only admins can delete user roles';
  END IF;

  -- Delete all roles for the specified user
  DELETE FROM public.user_roles
  WHERE user_roles.user_id = delete_user_roles.user_id;
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.delete_user_roles(uuid) TO authenticated;

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema'; 