-- Create a view that combines user_profiles and user_roles data
CREATE OR REPLACE VIEW public.user_details AS
SELECT 
    u.id as user_id,
    u.email,
    u.created_at as user_created_at,
    u.last_sign_in_at,
    up.first_name,
    up.last_name,
    up.phone,
    up.gender,
    up.created_at as profile_created_at,
    up.updated_at as profile_updated_at,
    array_agg(ur.role) as roles,
    array_agg(ur.permissions) as permissions
FROM auth.users u
LEFT JOIN public.user_profiles up ON u.id = up.user_id
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
GROUP BY 
    u.id,
    u.email,
    u.created_at,
    u.last_sign_in_at,
    up.first_name,
    up.last_name,
    up.phone,
    up.gender,
    up.created_at,
    up.updated_at;

-- Create an index to improve performance
CREATE INDEX IF NOT EXISTS idx_user_details_user_id ON auth.users(id);

-- Enable RLS on the view
ALTER VIEW public.user_details SET (security_invoker = on);

-- Create policies for the view
CREATE POLICY "Users can view their own details"
ON public.user_details
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all user details"
ON public.user_details
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid()
        AND role = 'admin'
    )
);

-- Grant necessary permissions
GRANT SELECT ON public.user_details TO authenticated;

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema'; 