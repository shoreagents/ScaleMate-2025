-- Add last_password_change column to user_profiles table
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS last_password_change TIMESTAMP WITH TIME ZONE;

-- Add comment to explain the column
COMMENT ON COLUMN user_profiles.last_password_change IS 'Timestamp of when the user last changed their password'; 