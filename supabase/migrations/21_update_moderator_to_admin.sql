-- Update all moderator roles to admin roles
UPDATE user_roles
SET role = 'admin'
WHERE role = 'moderator';

-- First drop the existing view
DROP VIEW IF EXISTS user_details;

-- Create the view with the correct column order
CREATE VIEW user_details AS
SELECT 
    u.id as user_id,
    u.email,
    u.created_at,
    u.last_sign_in_at,
    p.first_name,
    p.last_name,
    p.phone,
    p.gender,
    p.username,
    p.profile_picture,
    p.last_password_change,
    ARRAY_AGG(ur.role) as roles
FROM auth.users u
LEFT JOIN user_profiles p ON u.id = p.id
LEFT JOIN user_roles ur ON u.id = ur.user_id
GROUP BY u.id, u.email, u.created_at, u.last_sign_in_at, p.first_name, p.last_name, p.phone, p.gender, p.username, p.profile_picture, p.last_password_change;

-- Add a comment to document the change
COMMENT ON TABLE user_roles IS 'Updated all moderator roles to admin roles on 2024-04-09'; 