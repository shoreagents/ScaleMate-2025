-- Drop existing triggers
DROP TRIGGER IF EXISTS update_last_password_change_insert_trigger ON auth.users;
DROP TRIGGER IF EXISTS update_last_password_change_update_trigger ON auth.users;

-- Create new function to update last_password_change
CREATE OR REPLACE FUNCTION update_last_password_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Only update last_password_change if the user has a password set
    IF NEW.encrypted_password IS NOT NULL THEN
        UPDATE public.user_profiles
        SET last_password_change = NOW()
        WHERE user_id = NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create new trigger for updating last_password_change on INSERT
CREATE TRIGGER update_last_password_change_insert_trigger
    AFTER INSERT
    ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION update_last_password_change();

-- Create new trigger for updating last_password_change on UPDATE
CREATE TRIGGER update_last_password_change_update_trigger
    AFTER UPDATE OF encrypted_password
    ON auth.users
    FOR EACH ROW
    WHEN (OLD.encrypted_password IS DISTINCT FROM NEW.encrypted_password)
    EXECUTE FUNCTION update_last_password_change();

-- Update existing users to set last_password_change to NULL if they don't have a password
UPDATE public.user_profiles
SET last_password_change = NULL
WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE encrypted_password IS NULL
);

-- Add comment to explain the function
COMMENT ON FUNCTION update_last_password_change() IS 'Updates the last_password_change timestamp in the user_profiles table only when a user has a password set'; 