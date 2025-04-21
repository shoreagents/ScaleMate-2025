-- Drop the view if it exists
DROP VIEW IF EXISTS public.user_details;

-- Create a view that combines user_profiles and user_roles data
CREATE VIEW public.user_details AS
SELECT 
    u.id as user_id,
    u.email,
    u.created_at,
    u.last_sign_in_at,
    up.first_name,
    up.last_name,
    up.phone,
    up.gender,
    up.username,
    array_agg(ur.role) as roles,
    array_agg(ur.permissions) as permissions
FROM auth.users u
LEFT JOIN public.user_profiles up ON u.id = up.user_id
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE 
    -- Users can only see their own data
    u.id = auth.uid()
    OR
    -- Admins can see all data
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid()
        AND role = 'admin'
    )
GROUP BY 
    u.id,
    u.email,
    u.created_at,
    u.last_sign_in_at,
    up.first_name,
    up.last_name,
    up.phone,
    up.gender,
    up.username;

-- Enable security barrier on the view
ALTER VIEW public.user_details SET (security_barrier = on);

-- Grant necessary permissions
GRANT SELECT ON public.user_details TO authenticated;

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';

-- Add comment to help with debugging
COMMENT ON VIEW public.user_details IS 'View of user data from auth.users, user_profiles, and user_roles tables'; 