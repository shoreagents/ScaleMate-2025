-- Create a function to automatically assign user role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert a new user role for the newly created user
  INSERT INTO public.user_roles (user_id, role, created_at)
  VALUES (NEW.id, 'user', NOW());
  
  RETURN NEW;
END;
$$;

-- Create a function to handle role deletion
CREATE OR REPLACE FUNCTION public.handle_role_deletion()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Delete all roles associated with the user
  DELETE FROM public.user_roles
  WHERE user_id = OLD.id;
  
  RETURN OLD;
END;
$$;

-- Create triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS on_user_roles_deleted ON public.user_roles;
CREATE TRIGGER on_user_roles_deleted
  AFTER DELETE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_role_deletion();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_role_deletion() TO authenticated;
GRANT INSERT, DELETE ON public.user_roles TO authenticated;

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema'; 