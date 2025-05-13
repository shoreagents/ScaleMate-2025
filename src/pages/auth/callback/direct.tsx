import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
  gap: 1rem;
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  text-align: center;
  max-width: 400px;
  padding: 1rem;
  background: #fee2e2;
  border-radius: 0.5rem;
  border: 1px solid #fecaca;
`;

// Reuse helper functions from the original callback
const isSessionValid = async (): Promise<boolean> => {
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

const waitForValidSession = async (maxAttempts = 30): Promise<boolean> => {
  for (let i = 0; i < maxAttempts; i++) {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      // Additional check to ensure session is fully established
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        return true;
      }
    }
    // Wait 1 second between attempts
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return false;
};

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

export default function DirectAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Helper function to handle errors - just log them
        const handleError = (error: any, message: string) => {
          console.error(message, error);
        };

        // Wait for session to be valid
        const sessionValid = await waitForValidSession();
        if (!sessionValid) {
          handleError(null, 'Session validation failed. Please try again.');
          return;
        }

        // Get the session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          handleError(sessionError, 'Session error. Please try again.');
          return;
        }
        if (!session) {
          handleError(null, 'No session found. Please try again.');
          return;
        }

        // Get the user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
          handleError(userError, 'User error. Please try again.');
          return;
        }
        if (!user) {
          handleError(null, 'No user found. Please try again.');
          return;
        }

        // Create service role client for admin operations
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

        // Check if user profile exists
        const { data: profile, error: profileError } = await serviceRoleClient
          .from('user_profiles')
          .select('username, profile_picture')
          .eq('user_id', user.id)
          .single();

        // If no profile exists, create one for Google sign-in users
        if (profileError || !profile?.username) {
          // Check if this is a Google sign-in
          const isGoogleUser = user.app_metadata?.provider === 'google';
          
          if (isGoogleUser) {
            // Get high quality profile picture from Google
            const avatarUrl = user.user_metadata?.avatar_url;
            const highQualityAvatarUrl = avatarUrl ? avatarUrl.replace('=s96-c', '=s400-c') : null;

            // Normalize email for Gmail addresses
            const email = user.email;
            const normalizedEmail = email ? normalizeEmail(email) : null;

            // Always update auth user's email to normalized version for Google users
            if (normalizedEmail && normalizedEmail !== email) {
              const { error: updateError } = await serviceRoleClient.auth.admin.updateUserById(
                user.id,
                { email: normalizedEmail }
              );
              if (updateError) {
                console.error('Error updating user email:', updateError);
              }
            }

            // Create user profile without username
            const { error: profileError } = await supabase
              .from('user_profiles')
              .insert({
                user_id: user.id,
                first_name: user.user_metadata?.full_name?.split(' ')[0] || '',
                last_name: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
                profile_picture: highQualityAvatarUrl
              });

            if (profileError) {
              console.error('Error creating user profile:', profileError);
              throw new Error('Error creating user profile. Please contact support.');
            }
          } else {
            handleError(null, 'User profile not found. Please contact support.');
            return;
          }
        } else if (user.app_metadata?.provider === 'google' && !profile.profile_picture) {
          // If profile exists but no profile picture, update it with Google's picture
          const avatarUrl = user.user_metadata?.avatar_url;
          const highQualityAvatarUrl = avatarUrl ? avatarUrl.replace('=s96-c', '=s400-c') : null;
          
          if (highQualityAvatarUrl) {
            const { error: updateError } = await serviceRoleClient
              .from('user_profiles')
              .update({
                profile_picture: highQualityAvatarUrl,
                updated_at: new Date().toISOString()
              })
              .eq('user_id', user.id);

            if (updateError) {
              console.error('Error updating profile picture:', updateError);
              // Don't return here as this is not critical
            }
          }
        }

        // Get user's role
        const { data: roles, error: roleError } = await serviceRoleClient
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        let userRoles: string[];

        // If no roles exist, assign default 'user' role
        if (roleError || !roles || roles.length === 0) {
          // Try to assign default role
          const { error: assignRoleError } = await serviceRoleClient
            .from('user_roles')
            .insert({
              user_id: user.id,
              role: 'user',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });

          if (assignRoleError) {
            handleError(assignRoleError, 'Error assigning default role. Please contact support.');
            return;
          }

          // Set roles to default after assignment
          userRoles = ['user'];
        } else {
          userRoles = roles.map(r => r.role);
        }

        // Determine redirect URL based on role
        let redirectUrl = '';
        if (userRoles.includes('admin')) {
          redirectUrl = '/admin/dashboard';
        } else if (userRoles.includes('moderator')) {
          redirectUrl = '/admin/dashboard';
        } else if (userRoles.includes('user')) {
          redirectUrl = '/user/dashboard';
        } else {
          handleError(null, 'User has no valid role assigned. Please contact support.');
          return;
        }

        // Use router.replace instead of window.location.href for smoother transition
        await router.replace(redirectUrl);

      } catch (err) {
        console.error('Direct auth callback error:', err);
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