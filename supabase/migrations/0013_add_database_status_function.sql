-- Create a function to check database health status
CREATE OR REPLACE FUNCTION public.get_database_status()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_status JSONB;
    v_db_size BIGINT;
    v_active_connections INTEGER;
    v_max_connections INTEGER;
    v_uptime INTERVAL;
BEGIN
    -- Get database size
    SELECT pg_database_size(current_database()) INTO v_db_size;
    
    -- Get connection info
    SELECT 
        count(*)::INTEGER,
        current_setting('max_connections')::INTEGER
    INTO v_active_connections, v_max_connections
    FROM pg_stat_activity
    WHERE datname = current_database();
    
    -- Get database uptime
    SELECT 
        now() - pg_postmaster_start_time() 
    INTO v_uptime;
    
    -- Check if critical tables exist and are accessible
    v_status := jsonb_build_object(
        'success', true,
        'timestamp', now(),
        'database', jsonb_build_object(
            'name', current_database(),
            'size_bytes', v_db_size,
            'size_human', pg_size_pretty(v_db_size),
            'active_connections', v_active_connections,
            'max_connections', v_max_connections,
            'connection_usage_percent', round((v_active_connections::float / v_max_connections::float) * 100, 2),
            'uptime', v_uptime::text,
            'version', version()
        ),
        'tables', jsonb_build_object(
            'profiles', EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles'),
            'admin_audit_log', EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'admin_audit_log'),
            'username_check_log', EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'username_check_log')
        ),
        'functions', jsonb_build_object(
            'is_admin', EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'is_admin' AND pronamespace = 'public'::regnamespace),
            'update_user_profile_v2', EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_user_profile_v2' AND pronamespace = 'public'::regnamespace),
            'delete_user_completely', EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'delete_user_completely' AND pronamespace = 'public'::regnamespace)
        )
    );
    
    -- Add any errors encountered during checks
    EXCEPTION WHEN OTHERS THEN
        v_status := jsonb_build_object(
            'success', false,
            'timestamp', now(),
            'error', jsonb_build_object(
                'message', SQLERRM,
                'code', SQLSTATE
            )
        );
    
    RETURN v_status;
END;
$$;

-- Add comment to the function
COMMENT ON FUNCTION public.get_database_status IS 'Returns the current health status of the database, including size, connections, uptime, and critical table/function existence checks.';

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_database_status TO authenticated; 