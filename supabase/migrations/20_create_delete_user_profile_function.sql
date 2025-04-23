-- Create a function to delete user profiles
CREATE OR REPLACE FUNCTION public.delete_user_profile(p_user_id uuid)
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
    RAISE EXCEPTION 'Only admins can delete user profiles';
  END IF;

  -- Delete the user profile
  DELETE FROM public.user_profiles
  WHERE user_id = p_user_id;
END;
$$;

-- Create a function to completely delete a user
CREATE OR REPLACE FUNCTION public.delete_user_completely(p_user_id uuid)
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
    RAISE EXCEPTION 'Only admins can delete users';
  END IF;

  -- Delete user roles
  DELETE FROM public.user_roles
  WHERE user_id = p_user_id;

  -- Delete user profile
  DELETE FROM public.user_profiles
  WHERE user_id = p_user_id;

  -- Delete user from auth.users
  DELETE FROM auth.users
  WHERE id = p_user_id;
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.delete_user_profile(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_user_completely(uuid) TO authenticated;

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema'; 