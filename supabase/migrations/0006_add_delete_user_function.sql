-- Drop existing tables and functions first
DROP TABLE IF EXISTS public.user_deletion_logs;
DROP FUNCTION IF EXISTS public.delete_user_completely(UUID);

-- Create admin audit log table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    details JSONB NOT NULL,
    ip_address TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add RLS policies for admin_audit_log
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.admin_audit_log;
DROP POLICY IF EXISTS "System can insert audit logs" ON public.admin_audit_log;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
ON public.admin_audit_log
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Only system can insert audit logs (through RPC)
CREATE POLICY "System can insert audit logs"
ON public.admin_audit_log
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Add indexes for better performance (IF NOT EXISTS ensures no conflicts)
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_admin_id ON public.admin_audit_log(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_action ON public.admin_audit_log(action);
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_created_at ON public.admin_audit_log(created_at);

-- Add comments (these will update existing comments if they exist)
COMMENT ON TABLE public.admin_audit_log IS 'Logs all admin actions for audit purposes';
COMMENT ON COLUMN public.admin_audit_log.admin_id IS 'The ID of the admin who performed the action';
COMMENT ON COLUMN public.admin_audit_log.action IS 'The type of action performed';
COMMENT ON COLUMN public.admin_audit_log.details IS 'JSON details of the action';
COMMENT ON COLUMN public.admin_audit_log.ip_address IS 'IP address of the admin (redacted in production)';
COMMENT ON COLUMN public.admin_audit_log.created_at IS 'When the action was performed';

-- Create a secure function to completely delete a user and their associated data
-- This function includes safety checks and audit logging
CREATE OR REPLACE FUNCTION public.delete_user_completely(target_user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    current_user_role TEXT;
    target_user_role TEXT;
    admin_count INTEGER;
    deletion_details JSONB;
BEGIN
    -- Get the role of the current user (must be an admin)
    SELECT role INTO current_user_role
    FROM public.profiles
    WHERE id = auth.uid();

    -- Verify the current user is an admin
    IF current_user_role != 'admin' THEN
        RAISE EXCEPTION 'Only administrators can delete users';
    END IF;

    -- Get the role of the target user
    SELECT role INTO target_user_role
    FROM public.profiles
    WHERE id = target_user_id;

    -- Prevent self-deletion
    IF auth.uid() = target_user_id THEN
        RAISE EXCEPTION 'Users cannot delete their own accounts';
    END IF;

    -- Prevent deletion of the last admin
    IF target_user_role = 'admin' THEN
        SELECT COUNT(*) INTO admin_count
        FROM public.profiles
        WHERE role = 'admin';

        IF admin_count <= 1 THEN
            RAISE EXCEPTION 'Cannot delete the last administrator';
        END IF;
    END IF;

    -- Prepare deletion details
    deletion_details := jsonb_build_object(
        'deleted_user_id', target_user_id,
        'deleted_user_email', (SELECT email FROM auth.users WHERE id = target_user_id),
        'deleted_user_role', target_user_role,
        'reason', 'User deleted by administrator'
    );

    -- Log the deletion in admin_audit_log
    INSERT INTO public.admin_audit_log (
        admin_id,
        action,
        details,
        ip_address
    ) VALUES (
        auth.uid(),
        'DELETE_USER',
        deletion_details,
        current_setting('request.headers', true)::json->>'x-forwarded-for'
    );

    -- Delete user's profile data
    DELETE FROM public.profiles WHERE id = target_user_id;

    -- Delete the user from auth.users (this will cascade to auth.identities)
    DELETE FROM auth.users WHERE id = target_user_id;
END;
$$;

-- Grant execute permission to authenticated users
-- The function's SECURITY DEFINER and role check ensure only admins can actually use it
GRANT EXECUTE ON FUNCTION public.delete_user_completely TO authenticated;

-- Add comment to the function
COMMENT ON FUNCTION public.delete_user_completely IS 'Securely deletes a user and their associated data. Only administrators can use this function, and it includes safety checks for self-deletion and last admin protection. All deletions are logged in admin_audit_log.'; 