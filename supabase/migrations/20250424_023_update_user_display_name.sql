-- Drop existing function if it exists
DROP FUNCTION IF EXISTS public.update_user_display_name();

-- Create function to update display name
CREATE OR REPLACE FUNCTION public.update_user_display_name()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the display name in auth.users
    UPDATE auth.users
    SET raw_user_meta_data = jsonb_set(
        COALESCE(raw_user_meta_data, '{}'::jsonb),
        '{display_name}',
        to_jsonb(COALESCE(NEW.first_name || ' ' || NEW.last_name, NEW.first_name, NEW.last_name, ''))
    )
    WHERE id = NEW.user_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_user_display_name_trigger ON public.user_profiles;

-- Create trigger to update display name when user profile is updated
CREATE TRIGGER update_user_display_name_trigger
    AFTER INSERT OR UPDATE OF first_name, last_name
    ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_user_display_name();

-- Update existing user profiles
UPDATE auth.users u
SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{display_name}',
    to_jsonb(COALESCE(p.first_name || ' ' || p.last_name, p.first_name, p.last_name, ''))
)
FROM public.user_profiles p
WHERE u.id = p.user_id; 