-- Add profile_picture column to user_profiles table if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'profile_picture'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN profile_picture TEXT;
    END IF;
END $$;

-- Add comment to the column
COMMENT ON COLUMN user_profiles.profile_picture IS 'URL of the user''s profile picture in the storage bucket';

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema'; 