-- Add is_google_user flag to user_profiles table
ALTER TABLE user_profiles
ADD COLUMN is_google_user BOOLEAN DEFAULT FALSE;

-- Update existing Google users
UPDATE user_profiles
SET is_google_user = TRUE
WHERE user_id IN (
  SELECT id FROM auth.users
  WHERE raw_app_meta_data->>'provider' = 'google'
); 