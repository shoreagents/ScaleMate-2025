-- Drop the existing function first
DROP FUNCTION IF EXISTS public.delete_user_completely(UUID);

-- Create the updated function that handles username_check_log
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

    -- Prepare deletion details with explicit deletion process
    deletion_details := jsonb_build_object(
        'deleted_user_id', target_user_id,
        'deleted_user_email', (SELECT email FROM auth.users WHERE id = target_user_id),
        'deleted_user_role', target_user_role,
        'reason', 'User deleted by administrator',
        'deletion_process', jsonb_build_object(
            'steps', ARRAY[
                'Delete username check logs',
                'Delete user profile data',
                'Delete user auth data (including identities)'
            ],
            'security_notes', ARRAY[
                'Admin role verification required',
                'Self-deletion prevented',
                'Last admin protection enforced',
                'No password validation required - admin role is sufficient'
            ]
        )
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

    -- Delete username check logs first (to handle foreign key constraint)
    DELETE FROM public.username_check_log WHERE user_id = target_user_id;

    -- Delete user's profile data
    DELETE FROM public.profiles WHERE id = target_user_id;

    -- Delete the user from auth.users (this will cascade to auth.identities)
    DELETE FROM auth.users WHERE id = target_user_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.delete_user_completely TO authenticated;

-- Add comment to the function
COMMENT ON FUNCTION public.delete_user_completely IS 'Securely deletes a user and their associated data, including username check logs. Only administrators can use this function. Security is enforced through admin role verification, prevention of self-deletion, and last admin protection. No password validation is required as admin role is sufficient. All deletions are logged in admin_audit_log with detailed process information.'; 