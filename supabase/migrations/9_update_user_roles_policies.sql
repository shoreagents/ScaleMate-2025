-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.user_roles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.user_roles;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.user_roles;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.user_roles;

-- Create new policies that allow all authenticated users to manage roles
CREATE POLICY "Enable read access for authenticated users" ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.user_roles
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON public.user_roles
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users" ON public.user_roles
    FOR DELETE
    TO authenticated
    USING (true);

-- Create a service role function to manage roles
CREATE OR REPLACE FUNCTION public.enable_user_roles_rls(
    p_action text,
    p_new_role text,
    p_target_user_id uuid
) RETURNS void AS $$
BEGIN
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.enable_user_roles_rls(text, text, uuid) TO authenticated;

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema'; 