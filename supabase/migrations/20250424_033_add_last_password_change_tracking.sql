-- Add last_password_change column to user_profiles table
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS last_password_change TIMESTAMP WITH TIME ZONE;

-- Update RLS policies to allow users to update their own last_password_change
CREATE POLICY "Users can update their own last_password_change"
ON user_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Notify PostgREST to reload the schema
NOTIFY pgrst, 'reload schema'; 