-- Add policy to allow admins to manage profile images for any user
BEGIN;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can upload their own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Profile images are publicly accessible" ON storage.objects;

-- Create new policies that include admin access
CREATE POLICY "Users can upload their own profile image or admins can upload any"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'profile-images' AND (
    auth.uid()::text = (storage.foldername(name))[1] OR
    public.is_admin()
  )
);

CREATE POLICY "Users can update their own profile image or admins can update any"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'profile-images' AND (
    auth.uid()::text = (storage.foldername(name))[1] OR
    public.is_admin()
  )
);

CREATE POLICY "Users can delete their own profile image or admins can delete any"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'profile-images' AND (
    auth.uid()::text = (storage.foldername(name))[1] OR
    public.is_admin()
  )
);

-- Recreate the public access policy for viewing
CREATE POLICY "Profile images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-images');

COMMIT; 