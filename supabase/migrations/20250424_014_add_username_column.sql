-- Add username column to user_profiles table if it doesn't exist
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS username VARCHAR(255) UNIQUE;

-- Create or replace function to generate a default username
CREATE OR REPLACE FUNCTION generate_default_username()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.username IS NULL THEN
        NEW.username := LOWER(
            CONCAT(
                NEW.first_name,
                '.',
                NEW.last_name,
                '.',
                SUBSTRING(CAST(NEW.user_id AS TEXT), 1, 8)
            )
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if it exists and recreate it
DROP TRIGGER IF EXISTS set_default_username ON user_profiles;
CREATE TRIGGER set_default_username
BEFORE INSERT ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION generate_default_username();

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own username" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own username" ON user_profiles;

-- Add RLS policy for username
CREATE POLICY "Users can view their own username"
ON user_profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own username"
ON user_profiles FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Drop index if it exists and recreate it
DROP INDEX IF EXISTS idx_user_profiles_username;
CREATE INDEX idx_user_profiles_username ON user_profiles(username); 