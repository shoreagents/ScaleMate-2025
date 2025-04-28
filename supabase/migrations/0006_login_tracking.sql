-- Create function to update last_login
CREATE OR REPLACE FUNCTION update_last_login()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.users
    SET last_login = NOW()
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for updating last_login
DROP TRIGGER IF EXISTS update_last_login_trigger ON auth.users;
CREATE TRIGGER update_last_login_trigger
    AFTER INSERT OR UPDATE OF last_sign_in_at
    ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION update_last_login();

-- Create function to update last_password_change
CREATE OR REPLACE FUNCTION update_last_password_change()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.user_profiles
    SET last_password_change = NOW()
    WHERE user_id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for updating last_password_change on INSERT
DROP TRIGGER IF EXISTS update_last_password_change_insert_trigger ON auth.users;
CREATE TRIGGER update_last_password_change_insert_trigger
    AFTER INSERT
    ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION update_last_password_change();

-- Create trigger for updating last_password_change on UPDATE
DROP TRIGGER IF EXISTS update_last_password_change_update_trigger ON auth.users;
CREATE TRIGGER update_last_password_change_update_trigger
    AFTER UPDATE OF encrypted_password
    ON auth.users
    FOR EACH ROW
    WHEN (OLD.encrypted_password IS DISTINCT FROM NEW.encrypted_password)
    EXECUTE FUNCTION update_last_password_change();

-- Update existing users with current timestamp for last_password_change
UPDATE public.user_profiles
SET last_password_change = NOW()
WHERE last_password_change IS NULL;

-- Add comments to explain the functions
COMMENT ON FUNCTION update_last_login() IS 'Updates the last_login timestamp in the users table when a user signs in';
COMMENT ON FUNCTION update_last_password_change() IS 'Updates the last_password_change timestamp in the user_profiles table when a user changes their password or is first created'; 