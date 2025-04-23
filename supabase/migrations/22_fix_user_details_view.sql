-- Drop the existing view
DROP VIEW IF EXISTS public.user_details;

-- Create the fixed user_details view
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
    up.profile_picture,
    up.last_password_change,
    ARRAY_AGG(ur.role) as roles
FROM auth.users u
LEFT JOIN public.user_profiles up ON u.id = up.user_id
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
GROUP BY 
    u.id,
    u.email,
    u.created_at,
    u.last_sign_in_at,
    up.first_name,
    up.last_name,
    up.phone,
    up.gender,
    up.username,
    up.profile_picture,
    up.last_password_change;

-- Add comment to the view
COMMENT ON VIEW public.user_details IS 'View of user data from auth.users, user_profiles, and user_roles tables';

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema'; 