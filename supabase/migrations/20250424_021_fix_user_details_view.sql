-- Drop the existing view
DROP VIEW IF EXISTS public.user_details;

-- Create the fixed user_details view
CREATE VIEW public.user_details AS
SELECT
    u.id as user_id,
    u.email,
    u.created_at as account_created_at,
    u.last_sign_in_at,
    up.first_name,
    up.last_name,
    up.username,
    up.profile_picture_url,
    up.created_at as profile_created_at,
    up.updated_at as profile_updated_at,
    up.last_password_change,
    string_agg(ur.role, ', ') as roles
FROM
    auth.users u
    LEFT JOIN public.user_profiles up ON u.id = up.user_id
    LEFT JOIN public.user_roles ur ON u.id = ur.user_id
GROUP BY
    u.id,
    u.email,
    u.created_at,
    u.last_sign_in_at,
    up.first_name,
    up.last_name,
    up.username,
    up.profile_picture_url,
    up.created_at,
    up.updated_at,
    up.last_password_change;

-- Add RLS policies
ALTER VIEW public.user_details SET (security_invoker = true);

-- Add comment
COMMENT ON VIEW public.user_details IS 'Detailed view of user information including profile and roles';

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema'; 