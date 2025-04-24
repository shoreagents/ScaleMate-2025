-- Drop existing foreign key constraints
ALTER TABLE IF EXISTS public.user_profiles
    DROP CONSTRAINT IF EXISTS user_profiles_user_id_fkey;

ALTER TABLE IF EXISTS public.user_roles
    DROP CONSTRAINT IF EXISTS user_roles_user_id_fkey;

ALTER TABLE IF EXISTS public.teams
    DROP CONSTRAINT IF EXISTS teams_owner_id_fkey;

ALTER TABLE IF EXISTS public.team_members
    DROP CONSTRAINT IF EXISTS team_members_user_id_fkey,
    DROP CONSTRAINT IF EXISTS team_members_team_id_fkey;

-- Re-add foreign key constraints with CASCADE
ALTER TABLE public.user_profiles
    ADD CONSTRAINT user_profiles_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

ALTER TABLE public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

ALTER TABLE public.teams
    ADD CONSTRAINT teams_owner_id_fkey
    FOREIGN KEY (owner_id)
    REFERENCES auth.users(id)
    ON DELETE SET NULL;

ALTER TABLE public.team_members
    ADD CONSTRAINT team_members_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE,
    ADD CONSTRAINT team_members_team_id_fkey
    FOREIGN KEY (team_id)
    REFERENCES public.teams(id)
    ON DELETE CASCADE;

-- Create trigger function to handle user deletion
CREATE OR REPLACE FUNCTION handle_user_deletion()
RETURNS TRIGGER AS $$
BEGIN
    -- Delete from users table
    DELETE FROM public.users WHERE id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to handle user deletion
DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;
CREATE TRIGGER on_auth_user_deleted
    AFTER DELETE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_user_deletion(); 