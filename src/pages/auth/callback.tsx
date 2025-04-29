import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import FirstTimeSetupForm from '@/components/auth/FirstTimeSetupForm';

// Create a client with service role key for admin operations
const serviceRoleClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export default function AuthCallback() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }

        if (!session) {
          router.push('/login');
          return;
        }

        // Check if this is a Google sign-up
        const isGoogleUser = session.user.app_metadata?.provider === 'google';
        console.log('Is Google user:', isGoogleUser);

        // Check if user exists in users table
        const { data: existingUser, error: userError } = await serviceRoleClient
          .from('users')
          .select('id')
          .eq('id', session.user.id)
          .single();

        if (userError && userError.code !== 'PGRST116') {
          console.error('User check error:', userError);
          throw userError;
        }

        // Create user in users table if doesn't exist
        if (!existingUser) {
          console.log('Creating new user');
          const { error: createUserError } = await serviceRoleClient
            .from('users')
            .insert({
              id: session.user.id,
              email: session.user.email,
              full_name: session.user.user_metadata.full_name || '',
              is_active: true
            });

          if (createUserError) {
            console.error('Create user error:', createUserError);
            throw createUserError;
          }
          console.log('User created successfully');
        }

        // Check if profile exists and get current username
        const { data: profile, error: profileError } = await serviceRoleClient
          .from('user_profiles')
          .select('username, last_password_change')
          .eq('user_id', session.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Profile check error:', profileError);
          throw profileError;
        }

        // Only create profile if it doesn't exist
        if (!profile) {
          console.log('Creating new profile');
          try {
            const { error: createProfileError } = await serviceRoleClient
              .from('user_profiles')
              .insert({
                user_id: session.user.id,
                username: null, // Don't assign a username automatically
                first_name: session.user.user_metadata.full_name?.split(' ')[0] || '',
                last_name: session.user.user_metadata.full_name?.split(' ').slice(1).join(' ') || '',
                last_password_change: null
              });

            if (createProfileError) {
              console.error('Create profile error:', createProfileError);
              throw createProfileError;
            }
            console.log('Profile created successfully');

            // Assign default 'user' role
            const { error: roleError } = await serviceRoleClient
              .from('user_roles')
              .insert({
                user_id: session.user.id,
                role: 'user'
              });

            if (roleError) {
              console.error('Role assignment error:', roleError);
              throw roleError;
            }
            console.log('Role assigned successfully');

            // After creating profile and assigning role, show setup modal for Google users
            if (isGoogleUser) {
              setUserId(session.user.id);
              setCurrentUsername(''); // Start with empty username
              setShowSetupModal(true);
              return; // Exit early to prevent further checks
            }
          } catch (err) {
            console.error('Error during profile creation:', err);
            throw err;
          }
        }

        // Check if we need to show the setup modal for existing profiles
        if (isGoogleUser && !profile?.last_password_change) {
          setUserId(session.user.id);
          setCurrentUsername(profile?.username || ''); // Use existing username or empty string
          setShowSetupModal(true);
          return; // Exit early to prevent further checks
        }

        // Only redirect if we don't need to show the setup modal
        const { data: roles, error: rolesError } = await serviceRoleClient
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id);

        if (rolesError) {
          console.error('Roles check error:', rolesError);
          throw rolesError;
        }

        if (roles?.some(r => r.role === 'admin')) {
          router.push('/admin/dashboard');
        } else {
          router.push('/user/dashboard');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred during authentication');
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [router]);

  const handleSetupComplete = () => {
    setShowSetupModal(false);
    router.push('/user/dashboard');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {showSetupModal && userId && currentUsername && (
        <FirstTimeSetupForm
          isOpen={showSetupModal}
          onClose={handleSetupComplete}
          userId={userId}
          currentUsername={currentUsername}
        />
      )}
    </>
  );
} 