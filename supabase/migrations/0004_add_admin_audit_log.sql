-- Create admin audit log table
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    details JSONB NOT NULL,
    ip_address TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

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

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_admin_id ON public.admin_audit_log(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_action ON public.admin_audit_log(action);
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_created_at ON public.admin_audit_log(created_at);

-- Add comments
COMMENT ON TABLE public.admin_audit_log IS 'Logs all admin actions for audit purposes';
COMMENT ON COLUMN public.admin_audit_log.admin_id IS 'The ID of the admin who performed the action';
COMMENT ON COLUMN public.admin_audit_log.action IS 'The type of action performed';
COMMENT ON COLUMN public.admin_audit_log.details IS 'JSON details of the action';
COMMENT ON COLUMN public.admin_audit_log.ip_address IS 'IP address of the admin (redacted in production)';
COMMENT ON COLUMN public.admin_audit_log.created_at IS 'When the action was performed'; 