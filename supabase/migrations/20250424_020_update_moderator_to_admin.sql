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
    u.created_at as account_created_at,
    u.last_sign_in_at,
    p.first_name,
    p.last_name,
    p.username,
    p.profile_picture_url,
    p.created_at as profile_created_at,
    p.updated_at as profile_updated_at,
    p.last_password_change,
    string_agg(r.role, ', ') as roles
FROM
    auth.users u
    LEFT JOIN public.user_profiles p ON u.id = p.user_id
    LEFT JOIN public.user_roles r ON u.id = r.user_id
GROUP BY
    u.id,
    u.email,
    u.created_at,
    u.last_sign_in_at,
    p.first_name,
    p.last_name,
    p.username,
    p.profile_picture_url,
    p.created_at,
    p.updated_at,
    p.last_password_change;

-- Add a comment to document the change
COMMENT ON TABLE user_roles IS 'Updated all moderator roles to admin roles on 2024-04-09'; 