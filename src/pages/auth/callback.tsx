import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  text-align: center;
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 77, 79, 0.1);
  border-radius: 4px;
`;

// Helper function to check if session is properly set
const isSessionValid = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) return false;
    if (!session) return false;
    
    // Verify we can get the user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) return false;
    if (!user) return false;

    // Verify session is persisted
    const persistedSession = await supabase.auth.getSession();
    if (!persistedSession.data.session) return false;

    return true;
  } catch (err) {
    console.error('Session validation error:', err);
    return false;
  }
};

// Helper function to wait for session to be valid and persisted
const waitForValidSession = async (maxAttempts = 10) => {
  for (let i = 0; i < maxAttempts; i++) {
    if (await isSessionValid()) {
      // Double check session is persisted
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        return true;
      }
    }
    // Wait 200ms between attempts
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  return false;
};

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Wait for session to be valid
        const sessionValid = await waitForValidSession();
        if (!sessionValid) {
          setError('Failed to establish session. Please try again.');
          return;
        }

        // Get the session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error('Session error:', sessionError);
          setError('Failed to get session. Please try again.');
          return;
        }
        if (!session) {
          console.error('No session found');
          setError('No session found. Please try signing in again.');
          return;
        }

        // Get the user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
          console.error('User error:', userError);
          setError('Failed to get user. Please try again.');
          return;
        }
        if (!user) {
          console.error('No user found');
          setError('No user found. Please try signing in again.');
          return;
        }

        // Check if this is a Google sign-in
        const isGoogleUser = user.app_metadata?.provider === 'google';
        console.log('Is Google user:', isGoogleUser);

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

        // Check if user exists in users table
        const { data: existingUser, error: checkError } = await serviceRoleClient
          .from('users')
          .select('id')
          .eq('id', user.id)
          .single();

        if (checkError && checkError.code !== 'PGRST116') {
          console.error('Error checking existing user:', checkError);
          setError('Failed to check existing user. Please try again.');
          return;
        }

        // Only insert if user doesn't exist
        if (!existingUser) {
          const { error: userError } = await serviceRoleClient
            .from('users')
            .insert({
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || '',
              is_active: true
            });

          if (userError) {
            console.error('User creation error:', userError);
            setError('Failed to create user record. Please try again.');
            return;
          }
        }

        // Check if role exists
        const { data: existingRole, error: roleCheckError } = await serviceRoleClient
          .from('user_roles')
          .select('user_id')
          .eq('user_id', user.id)
          .single();

        if (roleCheckError && roleCheckError.code !== 'PGRST116') {
          console.error('Error checking existing role:', roleCheckError);
          setError('Failed to check existing role. Please try again.');
          return;
        }

        // Add role if it doesn't exist
        if (!existingRole) {
          const { error: roleError } = await serviceRoleClient
            .from('user_roles')
            .insert({
              user_id: user.id,
              role: 'user'
            });

          if (roleError) {
            console.error('Role creation error:', roleError);
            setError('Failed to assign user role. Please try again.');
            return;
          }
        }

        // Get user's profile data
        const { data: profile, error: profileError } = await serviceRoleClient
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Profile error:', profileError);
          setError('Failed to get profile. Please try again.');
          return;
        }

        // Create profile if it doesn't exist
        if (!profile) {
          const avatarUrl = user.user_metadata?.avatar_url;
          const highQualityAvatarUrl = avatarUrl ? avatarUrl.replace('=s96-c', '=s400-c') : null;

          const profileData = {
            user_id: user.id,
            username: null,
            first_name: user.user_metadata?.full_name?.split(' ')[0] || '',
            last_name: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
            last_password_change: null,
            profile_picture: highQualityAvatarUrl || null
          };

          const { error: profileError } = await serviceRoleClient
            .from('user_profiles')
            .insert(profileData);

          if (profileError) {
            console.error('Profile creation error:', profileError);
            setError('Failed to create profile. Please try again.');
            return;
          }
        }

        // Verify session is still valid before redirecting
        const finalSessionCheck = await isSessionValid();
        if (!finalSessionCheck) {
          setError('Session validation failed before redirect. Please try again.');
          return;
        }

        // Check if we came from a modal
        const fromBlueprintModal = router.query.from === 'blueprint-modal';
        const fromCostSavingsModal = router.query.from === 'cost-savings-modal';
        const fromToolsModal = router.query.from === 'tools-modal';
        const redirectTo = router.query.redirectTo as string;

        // Check if setup is needed
        const needsSetup = !profile?.username;

        // Now handle redirects after setup is complete
        if (fromBlueprintModal || fromCostSavingsModal || fromToolsModal) {
          // If we came from a modal, redirect back to the same page
          if (redirectTo) {
            router.push(redirectTo);
          } else {
            router.push('/');
          }
        } else {
          if (needsSetup) {
            router.push('/user/dashboard');
          } else {
            // Only add showDownloadModal parameter if user came from a modal
            if (isGoogleUser) {
              if (fromBlueprintModal) {
                router.push('/user/dashboard?showBlueprintModal=true');
              } else if (fromCostSavingsModal) {
                router.push('/user/dashboard?showCostSavingsModal=true');
              } else if (redirectTo) {
                // If we have a redirectTo parameter, use it
                router.push(redirectTo);
              } else {
                router.push('/user/dashboard');
              }
            } else {
              router.push('/user/dashboard');
            }
          }
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    };

    if (router.isReady) {
      handleCallback();
    }
  }, [router.isReady]);

  return (
    <LoadingContainer>
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <LoadingSpinner />
      )}
    </LoadingContainer>
  );
} 