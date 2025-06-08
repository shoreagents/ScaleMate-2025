BEGIN;

-- Drop the existing role check constraint
ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Add the new role check constraint with all allowed roles
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('user', 'admin', 'moderator', 'developer', 'author'));

-- Update the comment on the role column to reflect the change
COMMENT ON COLUMN public.profiles.role IS 'User role (user, admin, moderator, developer, or author)';

COMMIT; 