-- Drop the existing user_details view
DROP VIEW IF EXISTS user_details;

-- Recreate the user_details view with profile_picture
CREATE OR REPLACE VIEW user_details AS
SELECT 
    u.id as user_id,
    u.email,
    up.first_name,
    up.last_name,
    up.phone,
    up.gender,
    up.username,
    up.profile_picture,
    u.created_at,
    u.last_sign_in_at,
    array_agg(ur.role) as roles
FROM auth.users u
LEFT JOIN user_profiles up ON u.id = up.user_id
LEFT JOIN user_roles ur ON u.id = ur.user_id
GROUP BY u.id, u.email, up.first_name, up.last_name, up.phone, up.gender, up.username, up.profile_picture, u.created_at, u.last_sign_in_at;

-- Add comment to explain the view
COMMENT ON VIEW user_details IS 'View combining user authentication, profile, and role information'; 