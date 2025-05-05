-- Create user_activity table
CREATE TABLE IF NOT EXISTS public.user_activity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own activity" ON public.user_activity;
DROP POLICY IF EXISTS "Admins can view any user's activity" ON public.user_activity;
DROP POLICY IF EXISTS "Users can insert their own activity" ON public.user_activity;

-- Create RLS Policies
CREATE POLICY "Users can view their own activity"
    ON public.user_activity
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view any user's activity"
    ON public.user_activity
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_roles.user_id = auth.uid()
            AND user_roles.role = 'admin'
        )
    );

CREATE POLICY "Users can insert their own activity"
    ON public.user_activity
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create function to log profile changes
CREATE OR REPLACE FUNCTION log_profile_change(
    p_user_id UUID,
    p_type VARCHAR,
    p_description TEXT
) RETURNS void AS $$
BEGIN
    INSERT INTO public.user_activity (
        user_id,
        type,
        description
    ) VALUES (
        p_user_id,
        p_type,
        p_description
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add comment to explain the table
COMMENT ON TABLE public.user_activity IS 'Tracks user activity including profile changes'; 