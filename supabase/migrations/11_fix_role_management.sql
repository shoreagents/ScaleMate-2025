-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.user_roles;
DROP POLICY IF EXISTS "Enable insert for admins only" ON public.user_roles;
DROP POLICY IF EXISTS "Enable update for admins only" ON public.user_roles;
DROP POLICY IF EXISTS "Enable delete for admins only" ON public.user_roles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.user_roles;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.user_roles;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.user_roles;

-- Create new policies that allow only admins to manage roles
CREATE POLICY "Enable read access for authenticated users" ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Enable insert for admins only" ON public.user_roles
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

CREATE POLICY "Enable update for admins only" ON public.user_roles
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

CREATE POLICY "Enable delete for admins only" ON public.user_roles
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

-- Create the function with admin-only restriction
CREATE OR REPLACE FUNCTION public.enable_user_roles_rls(
    p_action text,
    p_new_role text,
    p_target_user_id uuid
) RETURNS void AS $$
DECLARE
    v_current_user_id uuid;
    v_is_admin boolean;
    v_target_user_exists boolean;
BEGIN
    -- Get current user's ID
    v_current_user_id := auth.uid();
    
    -- Check if current user is admin
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = v_current_user_id
        AND role = 'admin'
    ) INTO v_is_admin;
    
    IF NOT v_is_admin THEN
        RAISE EXCEPTION 'Only admin users can manage roles';
    END IF;
    
    -- Check if target user exists in auth.users
    SELECT EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = p_target_user_id
    ) INTO v_target_user_exists;
    
    IF NOT v_target_user_exists THEN
        RAISE EXCEPTION 'Target user not found';
    END IF;
    
    -- Perform the requested action
    CASE p_action
        WHEN 'insert' THEN
            -- For insert, we don't need to check if the role exists
            INSERT INTO public.user_roles (user_id, role)
            VALUES (p_target_user_id, p_new_role);
        WHEN 'update' THEN
            -- For update, check if the user has any roles
            IF NOT EXISTS (
                SELECT 1 FROM public.user_roles
                WHERE user_id = p_target_user_id
            ) THEN
                -- If no roles exist, insert a new one
                INSERT INTO public.user_roles (user_id, role)
                VALUES (p_target_user_id, p_new_role);
            ELSE
                -- If roles exist, update them
                UPDATE public.user_roles
                SET role = p_new_role
                WHERE user_id = p_target_user_id;
            END IF;
        WHEN 'delete' THEN
            DELETE FROM public.user_roles
            WHERE user_id = p_target_user_id;
        ELSE
            RAISE EXCEPTION 'Invalid action: %', p_action;
    END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.enable_user_roles_rls(text, text, uuid) TO authenticated;

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema'; 