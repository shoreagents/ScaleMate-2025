-- Drop existing view if it exists
DROP VIEW IF EXISTS user_details;

-- Create user_details view
CREATE VIEW user_details AS
SELECT
    ur.user_id,
    au.email,
    up.first_name,
    up.last_name,
    up.username,
    up.profile_picture_url,
    up.created_at,
    up.updated_at,
    up.last_password_change,
    string_agg(ur.role, ', ') as roles
FROM
    auth.users au
    LEFT JOIN user_profiles up ON au.id = up.user_id
    LEFT JOIN user_roles ur ON au.id = ur.user_id
GROUP BY
    ur.user_id,
    au.email,
    up.first_name,
    up.last_name,
    up.username,
    up.profile_picture_url,
    up.created_at,
    up.updated_at,
    up.last_password_change;

-- Add comment to the view
COMMENT ON VIEW user_details IS 'Combined view of user roles and profiles for easier querying'; 