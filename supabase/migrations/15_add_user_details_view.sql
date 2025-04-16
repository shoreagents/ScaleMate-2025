-- Drop existing view if it exists
DROP VIEW IF EXISTS user_details;

-- Create user_details view
CREATE VIEW user_details AS
SELECT 
    ur.user_id,
    au.email,
    up.first_name,
    up.last_name,
    up.phone,
    up.gender,
    au.created_at,
    au.last_sign_in_at,
    ARRAY[ur.role] as roles
FROM 
    user_roles ur
JOIN 
    auth.users au ON ur.user_id = au.id
LEFT JOIN 
    user_profiles up ON ur.user_id = up.user_id;

-- Add comment to the view
COMMENT ON VIEW user_details IS 'Combined view of user roles and profiles for easier querying'; 