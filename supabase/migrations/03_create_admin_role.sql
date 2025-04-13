-- Create admin role
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'admin_role') THEN
        CREATE ROLE admin_role;
    END IF;
END $$;

-- Grant necessary permissions to admin_role
GRANT USAGE ON SCHEMA public TO admin_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO admin_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO admin_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO admin_role;

-- Create function to assign admin role to user
CREATE OR REPLACE FUNCTION public.assign_admin_role(user_id UUID)
RETURNS void AS $$
BEGIN
    -- First, ensure the user exists in auth.users
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = user_id) THEN
        RAISE EXCEPTION 'User does not exist';
    END IF;

    -- Grant the admin_role to the user
    EXECUTE format('GRANT admin_role TO %I', user_id::text);
    
    -- Update user_roles table
    IF EXISTS (SELECT 1 FROM user_roles WHERE user_id = $1) THEN
        UPDATE public.user_roles
        SET role = 'admin',
            permissions = ARRAY['*']
        WHERE user_id = $1;
    ELSE
        INSERT INTO public.user_roles (user_id, role, permissions)
        VALUES ($1, 'admin', ARRAY['*']);
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to revoke admin role
CREATE OR REPLACE FUNCTION public.revoke_admin_role(user_id UUID)
RETURNS void AS $$
BEGIN
    -- Revoke the admin_role from the user
    EXECUTE format('REVOKE admin_role FROM %I', user_id::text);
    
    -- Update user_roles table
    UPDATE public.user_roles
    SET role = 'user',
        permissions = ARRAY['read']
    WHERE user_id = $1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user has admin role
CREATE OR REPLACE FUNCTION public.has_admin_role(user_id UUID)
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM pg_user
        WHERE usesysid = $1::oid
        AND pg_has_role(usesysid, 'admin_role', 'member')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to list all admin users
CREATE OR REPLACE FUNCTION public.list_admin_users()
RETURNS TABLE (
    user_id UUID,
    email TEXT,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id,
        u.email,
        u.created_at
    FROM auth.users u
    WHERE EXISTS (
        SELECT 1 FROM user_roles ur
        WHERE ur.user_id = u.id
        AND ur.role = 'admin'
        AND ur.permissions @> ARRAY['*']
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Set up RLS policies for admin functions
ALTER FUNCTION public.assign_admin_role(UUID) SET search_path = public;
ALTER FUNCTION public.revoke_admin_role(UUID) SET search_path = public;
ALTER FUNCTION public.has_admin_role(UUID) SET search_path = public;
ALTER FUNCTION public.list_admin_users() SET search_path = public;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.assign_admin_role(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.revoke_admin_role(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_admin_role(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_admin_users() TO authenticated;-- Create admin role
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'admin_role') THEN
        CREATE ROLE admin_role;
    END IF;
END $$;

-- Grant necessary permissions to admin_role
GRANT USAGE ON SCHEMA public TO admin_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO admin_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO admin_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO admin_role;

-- Create function to assign admin role to user
CREATE OR REPLACE FUNCTION public.assign_admin_role(user_id UUID)
RETURNS void AS $$
BEGIN
    -- First, ensure the user exists in auth.users
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = user_id) THEN
        RAISE EXCEPTION 'User does not exist';
    END IF;

    -- Grant the admin_role to the user
    EXECUTE format('GRANT admin_role TO %I', user_id::text);
    
    -- Update user_roles table
    IF EXISTS (SELECT 1 FROM user_roles WHERE user_id = $1) THEN
        UPDATE public.user_roles
        SET role = 'admin',
            permissions = ARRAY['*']
        WHERE user_id = $1;
    ELSE
        INSERT INTO public.user_roles (user_id, role, permissions)
        VALUES ($1, 'admin', ARRAY['*']);
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to revoke admin role
CREATE OR REPLACE FUNCTION public.revoke_admin_role(user_id UUID)
RETURNS void AS $$
BEGIN
    -- Revoke the admin_role from the user
    EXECUTE format('REVOKE admin_role FROM %I', user_id::text);
    
    -- Update user_roles table
    UPDATE public.user_roles
    SET role = 'user',
        permissions = ARRAY['read']
    WHERE user_id = $1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user has admin role
CREATE OR REPLACE FUNCTION public.has_admin_role(user_id UUID)
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM pg_user
        WHERE usesysid = $1::oid
        AND pg_has_role(usesysid, 'admin_role', 'member')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to list all admin users
CREATE OR REPLACE FUNCTION public.list_admin_users()
RETURNS TABLE (
    user_id UUID,
    email TEXT,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id,
        u.email,
        u.created_at
    FROM auth.users u
    WHERE EXISTS (
        SELECT 1 FROM user_roles ur
        WHERE ur.user_id = u.id
        AND ur.role = 'admin'
        AND ur.permissions @> ARRAY['*']
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Set up RLS policies for admin functions
ALTER FUNCTION public.assign_admin_role(UUID) SET search_path = public;
ALTER FUNCTION public.revoke_admin_role(UUID) SET search_path = public;
ALTER FUNCTION public.has_admin_role(UUID) SET search_path = public;
ALTER FUNCTION public.list_admin_users() SET search_path = public;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.assign_admin_role(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.revoke_admin_role(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_admin_role(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_admin_users() TO authenticated;