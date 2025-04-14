-- Function to create user_roles table
CREATE OR REPLACE FUNCTION create_user_roles_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    permissions TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, role)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to enable RLS
CREATE OR REPLACE FUNCTION enable_user_roles_rls()
RETURNS void AS $$
BEGIN
  ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create policies
CREATE OR REPLACE FUNCTION create_user_roles_policies()
RETURNS void AS $$
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
  DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
  DROP POLICY IF EXISTS "Initial admin setup" ON public.user_roles;

  -- Create new policies
  CREATE POLICY "Admins can manage all roles"
    ON public.user_roles
    FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid()
        AND role = 'admin'
      )
    );

  CREATE POLICY "Users can view their own roles"
    ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION create_user_roles_table() TO authenticated;
GRANT EXECUTE ON FUNCTION enable_user_roles_rls() TO authenticated;
GRANT EXECUTE ON FUNCTION create_user_roles_policies() TO authenticated;

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS update_user_roles_updated_at ON public.user_roles;
DROP FUNCTION IF EXISTS public.update_updated_at();

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

-- Create function to execute SQL (for migrations)
CREATE OR REPLACE FUNCTION public.exec_sql(sql text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.update_updated_at() TO authenticated;
GRANT EXECUTE ON FUNCTION public.exec_sql(text) TO authenticated;

-- Remove the temporary policy if it exists
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_roles' 
        AND policyname = 'Initial admin setup'
    ) THEN
        DROP POLICY "Initial admin setup" ON public.user_roles;
    END IF;
END $$;

-- Verify the policies
SELECT * FROM pg_policies WHERE tablename = 'user_roles';-- Function to create user_roles table
CREATE OR REPLACE FUNCTION create_user_roles_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    permissions TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, role)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to enable RLS
CREATE OR REPLACE FUNCTION enable_user_roles_rls()
RETURNS void AS $$
BEGIN
  ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create policies
CREATE OR REPLACE FUNCTION create_user_roles_policies()
RETURNS void AS $$
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
  DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
  DROP POLICY IF EXISTS "Initial admin setup" ON public.user_roles;

  -- Create new policies
  CREATE POLICY "Admins can manage all roles"
    ON public.user_roles
    FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid()
        AND role = 'admin'
      )
    );

  CREATE POLICY "Users can view their own roles"
    ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION create_user_roles_table() TO authenticated;
GRANT EXECUTE ON FUNCTION enable_user_roles_rls() TO authenticated;
GRANT EXECUTE ON FUNCTION create_user_roles_policies() TO authenticated;

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS update_user_roles_updated_at ON public.user_roles;
DROP FUNCTION IF EXISTS public.update_updated_at();

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

-- Create function to execute SQL (for migrations)
CREATE OR REPLACE FUNCTION public.exec_sql(sql text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.update_updated_at() TO authenticated;
GRANT EXECUTE ON FUNCTION public.exec_sql(text) TO authenticated;

-- Remove the temporary policy if it exists
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_roles' 
        AND policyname = 'Initial admin setup'
    ) THEN
        DROP POLICY "Initial admin setup" ON public.user_roles;
    END IF;
END $$;

-- Verify the policies
SELECT * FROM pg_policies WHERE tablename = 'user_roles';