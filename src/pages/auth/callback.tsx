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

// Add the normalizeEmail function at the top of the file
const normalizeEmail = (email: string): string => {
  if (!email) return '';
  
  // Convert to lowercase and trim
  const normalized = email.toLowerCase().trim();
  
  // Split into local and domain parts
  const [localPart, domain] = normalized.split('@');
  
  if (!domain) return normalized;
  
  // Handle Gmail addresses
  if (domain === 'gmail.com') {
    // Remove dots and everything after + in the local part
    const cleanLocal = localPart.replace(/\./g, '').split('+')[0];
    return `${cleanLocal}@gmail.com`;
  }
  
  return normalized;
};

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Wait for session to be valid
        const sessionValid = await waitForValidSession();
        if (!sessionValid) {
          return;
        }

        // Get the session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error('Session error:', sessionError);
          return;
        }
        if (!session) {
          console.error('No session found');
          return;
        }

        // Get the user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
          console.error('User error:', userError);
          return;
        }
        if (!user) {
          console.error('No user found');
          return;
        }

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

        // Check if this is a Google sign-in
        const isGoogleUser = user.app_metadata?.provider === 'google';
        console.log('Is Google user:', isGoogleUser);

        // Normalize email for Google users
        let emailToUse = user.email;
        if (isGoogleUser && user.email) {
          emailToUse = normalizeEmail(user.email);
          console.log('Original email:', user.email);
          console.log('Normalized email:', emailToUse);
        }

        // Check if user exists in users table with normalized email
        const { data: existingUser, error: checkError } = await serviceRoleClient
          .from('users')
          .select('id')
          .eq('email', emailToUse)
          .single();

        if (checkError && checkError.code !== 'PGRST116') {
          console.error('Error checking existing user:', checkError);
          return;
        }

        // Only insert if user doesn't exist
        if (!existingUser) {
          const { error: userError } = await serviceRoleClient
            .from('users')
            .insert({
              id: user.id,
              email: emailToUse, // Use normalized email
              full_name: user.user_metadata?.full_name || '',
              is_active: true
            });

          if (userError) {
            console.error('User creation error:', userError);
            return;
          }

          // After creating the user record, update the email in auth if needed
          if (emailToUse !== user.email) {
            try {
              const { error: updateError } = await supabase.auth.updateUser({
                email: emailToUse
              });
              if (updateError) {
                console.error('Error updating email:', updateError);
                // Try to update the email in the users table directly
                const { error: dbError } = await serviceRoleClient
                  .from('users')
                  .update({ email: emailToUse })
                  .eq('id', user.id);
                if (dbError) {
                  console.error('Error updating email in users table:', dbError);
                }
              }
            } catch (err) {
              console.error('Error during email update:', err);
            }
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
              return;
            }
          }

        // Verify session is still valid before redirecting
        const finalSessionCheck = await isSessionValid();
        if (!finalSessionCheck) {
          return;
        }

        // Debug log the query parameters
        console.log('Callback query params:', router.query);

        // Get the from parameter and redirectTo URL
        const fromParam = router.query.from as string;
        const redirectTo = router.query.redirectTo as string;

        // Debug log the parameters
        console.log('From param:', fromParam);
        console.log('RedirectTo:', redirectTo);

        // List of valid modal types
        const validModalTypes = [
          'blueprint-modal',
          'cost-savings-modal',
          'tools-modal',
          'readiness-modal',
          'resources-modal',
          'role-builder-modal',
          'quote-modal',
          'courses-modal'
        ];

        // Check if we came from a modal
        const isFromModal = fromParam && validModalTypes.includes(fromParam);

        // Handle redirects based on modal status
        if (isFromModal) {
          console.log('User came from modal:', fromParam);
          // If coming from a modal, redirect back to the original page
          if (redirectTo) {
            console.log('Redirecting to:', redirectTo);
            router.push(redirectTo);
          } else {
            console.log('No redirectTo URL, going to home');
            router.push('/');
          }
        } else {
          console.log('Not from modal, going to dashboard');
          // For non-modal sign-ins, redirect to dashboard
              router.push('/user/dashboard');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
      }
    };

    if (router.isReady) {
      handleCallback();
    }
  }, [router.isReady]);

  return (
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>
  );
} 