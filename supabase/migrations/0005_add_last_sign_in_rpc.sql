-- Create a function to get last sign-in times for users
CREATE OR REPLACE FUNCTION public.get_user_last_sign_in(user_ids UUID[])
RETURNS TABLE (
    id UUID,
    last_sign_in_at TIMESTAMPTZ
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id,
        u.last_sign_in_at
    FROM auth.users u
    WHERE u.id = ANY(user_ids);
END;
$$;

-- Add comment
COMMENT ON FUNCTION public.get_user_last_sign_in IS 'Returns last sign-in times for a list of user IDs';

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_last_sign_in TO authenticated; 