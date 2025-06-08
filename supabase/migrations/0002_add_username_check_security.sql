-- Create table to track username check attempts
CREATE TABLE IF NOT EXISTS public.username_check_log (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    username_checked TEXT NOT NULL,
    check_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add RLS policies for the log table
ALTER TABLE public.username_check_log ENABLE ROW LEVEL SECURITY;

-- Users can only see their own check logs
CREATE POLICY "Users can only see their own check logs"
ON public.username_check_log
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- System can insert check logs
CREATE POLICY "System can insert check logs"
ON public.username_check_log
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Add index for faster rate limit checks
CREATE INDEX IF NOT EXISTS idx_username_check_log_user_time 
ON public.username_check_log (user_id, check_time);

-- Drop the existing function to recreate it with rate limiting
DROP FUNCTION IF EXISTS public.check_username_exists;

-- Recreate the function with rate limiting
CREATE OR REPLACE FUNCTION public.check_username_exists(
    username_to_check TEXT,
    current_user_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    username_exists BOOLEAN;
    check_count INTEGER;
    rate_limit INTEGER := 10; -- 10 checks per minute
    rate_window INTERVAL := INTERVAL '1 minute';
BEGIN
    -- Input validation
    IF username_to_check IS NULL OR current_user_id IS NULL THEN
        RAISE EXCEPTION 'Invalid input parameters';
    END IF;

    -- Check rate limit
    SELECT COUNT(*) INTO check_count
    FROM public.username_check_log
    WHERE user_id = current_user_id
    AND check_time > NOW() - rate_window;
    
    IF check_count >= rate_limit THEN
        RAISE EXCEPTION 'Rate limit exceeded. Please try again in % seconds.', 
            EXTRACT(EPOCH FROM (
                rate_window - (NOW() - MIN(check_time))
            ))::INTEGER;
    END IF;
    
    -- Log the check attempt
    INSERT INTO public.username_check_log (user_id, username_checked, check_time)
    VALUES (current_user_id, username_to_check, NOW());
    
    -- Check if username exists for any user except the current user
    SELECT EXISTS (
        SELECT 1 
        FROM public.profiles 
        WHERE LOWER(username) = LOWER(username_to_check)
        AND id != current_user_id
    ) INTO username_exists;
    
    RETURN username_exists;
EXCEPTION
    WHEN OTHERS THEN
        -- Log the error but don't expose details to the client
        RAISE LOG 'Error in check_username_exists: %', SQLERRM;
        RAISE EXCEPTION 'An error occurred while checking username availability';
END;
$$;

-- Add comment to the function
COMMENT ON FUNCTION public.check_username_exists IS 'Checks if a username exists for any user except the current user. Includes rate limiting and logging. Bypasses RLS for username availability checks.';

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.check_username_exists TO authenticated;

-- Create a cleanup function to remove old logs
CREATE OR REPLACE FUNCTION public.cleanup_username_check_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Delete logs older than 24 hours
    DELETE FROM public.username_check_log
    WHERE check_time < NOW() - INTERVAL '24 hours';
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.cleanup_username_check_logs TO authenticated;

-- Create a comment for the cleanup function
COMMENT ON FUNCTION public.cleanup_username_check_logs IS 'Cleans up username check logs older than 24 hours.';

-- Create a scheduled job to run cleanup daily (if pg_cron is available)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
        PERFORM cron.schedule(
            'cleanup-username-check-logs',  -- job name
            '0 0 * * *',                   -- run at midnight every day
            'SELECT public.cleanup_username_check_logs()'  -- SQL command
        );
    END IF;
END $$; 