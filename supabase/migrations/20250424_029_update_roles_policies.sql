-- Start transaction
BEGIN;

-- Drop existing policies and functions
DROP POLICY IF EXISTS "Allow authenticated users to view roles" ON public.user_roles;
DROP FUNCTION IF EXISTS public.is_admin(uuid);
DROP FUNCTION IF EXISTS public.manage_user_role(text, text, uuid);
DROP FUNCTION IF EXISTS public.enable_user_roles_rls(text, text, uuid);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.user_roles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.user_roles;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.user_roles;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.user_roles;

-- Create new policies that allow both admins and moderators to manage roles
CREATE POLICY "Enable read access for authenticated users" ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Enable insert for admins and moderators" ON public.user_roles
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'moderator')
        )
    );

CREATE POLICY "Enable update for admins and moderators" ON public.user_roles
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'moderator')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'moderator')
        )
    );

CREATE POLICY "Enable delete for admins and moderators" ON public.user_roles
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'moderator')
        )
    );

-- Drop all versions of the function to ensure clean slate
DO $$
BEGIN
    -- Drop all overloaded versions of the function
    DROP FUNCTION IF EXISTS public.enable_user_roles_rls();
    DROP FUNCTION IF EXISTS public.enable_user_roles_rls(text);
    DROP FUNCTION IF EXISTS public.enable_user_roles_rls(text, text);
    DROP FUNCTION IF EXISTS public.enable_user_roles_rls(text, text, uuid);
EXCEPTION
    WHEN undefined_function THEN
        NULL;
END $$;

-- Create a service role function to manage roles
CREATE OR REPLACE FUNCTION public.enable_user_roles_rls_v2(
    p_action text,
    p_new_role text,
    p_target_user_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_current_user_id uuid;
    v_is_current_user_admin boolean;
BEGIN
    -- Get the current user's ID
    v_current_user_id := auth.uid();
    
    -- Check if the current user is an admin
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = v_current_user_id
        AND role = 'admin'
    ) INTO v_is_current_user_admin;
    
    -- Only proceed if the current user is an admin
    IF NOT v_is_current_user_admin THEN
        RAISE EXCEPTION 'Only admin users can manage roles';
    END IF;
    
    -- Handle different actions
    IF p_action = 'update' THEN
        -- Remove existing roles
        DELETE FROM public.user_roles
        WHERE user_id = p_target_user_id;
        
        -- Add new role
        INSERT INTO public.user_roles (user_id, role, created_at)
        VALUES (p_target_user_id, p_new_role, now());
        
    ELSIF p_action = 'delete' THEN
        -- Remove all roles
        DELETE FROM public.user_roles
        WHERE user_id = p_target_user_id;
        
    ELSE
        RAISE EXCEPTION 'Invalid action: %', p_action;
    END IF;
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.enable_user_roles_rls_v2(text, text, uuid) TO authenticated;
GRANT ALL ON public.user_roles TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Add a comment to help with schema caching
COMMENT ON FUNCTION public.enable_user_roles_rls_v2 IS 'Manages user roles with admin-only access';

-- Update the manage_user_role function to allow moderators
CREATE OR REPLACE FUNCTION public.manage_user_role_v2(
    p_action text,
    p_new_role text,
    p_target_user_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_current_user_id uuid;
    v_current_user_role text;
BEGIN
    -- Get current user's ID and role
    v_current_user_id := auth.uid();
    
    -- Check if current user is admin or moderator
    SELECT role INTO v_current_user_role
    FROM public.user_roles
    WHERE user_id = v_current_user_id
    AND role IN ('admin', 'moderator')
    LIMIT 1;
    
    IF v_current_user_role IS NULL THEN
        RAISE EXCEPTION 'Only admins and moderators can manage roles';
    END IF;
    
    -- If action is 'update' or 'delete', check if target user exists
    IF p_action IN ('update', 'delete') THEN
        IF NOT EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = p_target_user_id
        ) THEN
            RAISE EXCEPTION 'Target user not found';
        END IF;
    END IF;
    
    -- Perform the requested action
    CASE p_action
        WHEN 'insert' THEN
            INSERT INTO public.user_roles (user_id, role)
            VALUES (p_target_user_id, p_new_role);
        WHEN 'update' THEN
            UPDATE public.user_roles
            SET role = p_new_role
            WHERE user_id = p_target_user_id;
        WHEN 'delete' THEN
            DELETE FROM public.user_roles
            WHERE user_id = p_target_user_id;
        ELSE
            RAISE EXCEPTION 'Invalid action: %', p_action;
    END CASE;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.manage_user_role_v2(text, text, uuid) TO authenticated;

COMMIT; 