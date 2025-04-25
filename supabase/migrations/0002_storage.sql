-- Create a function to create storage policies
CREATE OR REPLACE FUNCTION create_storage_policy(
  bucket_name text,
  policy_name text,
  policy_definition text
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create the policy
  EXECUTE format(
    'CREATE POLICY %I ON storage.objects FOR ALL USING (%s)',
    policy_name,
    policy_definition
  );
END;
$$;

-- Create profile-pictures bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-pictures', 'profile-pictures', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for profile-pictures bucket
SELECT create_storage_policy(
  'profile-pictures',
  'Allow public read access',
  'bucket_id = ''profile-pictures'''
);

SELECT create_storage_policy(
  'profile-pictures',
  'Allow authenticated users to upload their own profile pictures',
  'bucket_id = ''profile-pictures'' AND auth.uid() = (storage.foldername(name))[1]::uuid'
);

SELECT create_storage_policy(
  'profile-pictures',
  'Allow users to update their own profile pictures',
  'bucket_id = ''profile-pictures'' AND auth.uid() = (storage.foldername(name))[1]::uuid'
);

SELECT create_storage_policy(
  'profile-pictures',
  'Allow users to delete their own profile pictures',
  'bucket_id = ''profile-pictures'' AND auth.uid() = (storage.foldername(name))[1]::uuid'
); 