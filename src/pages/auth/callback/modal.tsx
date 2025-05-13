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

// Helper functions
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

const waitForValidSession = async (maxAttempts = 10): Promise<boolean> => {
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

export default function ModalAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the from parameter and redirectTo URL
        const fromParam = router.query.from as string;
        const redirectTo = router.query.redirectTo as string;

        if (!fromParam || !redirectTo) {
          console.error('Invalid callback parameters');
          return;
        }

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

        // Check if user exists in users table
        const { data: existingUser, error: userCheckError } = await serviceRoleClient
          .from('users')
          .select('id, email, full_name')
          .eq('id', user.id)
          .single();

        // If user doesn't exist in users table, create it
        if (userCheckError || !existingUser) {
          console.log('Creating new user record for Google sign-up...', { userId: user.id });
          const { error: createUserError } = await serviceRoleClient
            .from('users')
            .insert({
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
              avatar_url: user.user_metadata?.avatar_url || null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              is_active: true
            });

          if (createUserError) {
            console.error('Error creating user record:', createUserError);
            // Continue anyway as the user might exist in auth but not in users table
          }
        }

        // Always check and create profile if needed
        console.log('Checking user profile...', { userId: user.id });
        const { data: profile, error: profileError } = await serviceRoleClient
          .from('user_profiles')
          .select('username')
          .eq('user_id', user.id)
          .single();

        // Create profile if it doesn't exist or has no username
        if (profileError || !profile?.username) {
          console.log('Creating new user profile...', { userId: user.id });
          
          // Extract name from Google metadata
          const firstName = user.user_metadata?.given_name || 
                          user.user_metadata?.name?.split(' ')[0] || 
                          user.email?.split('@')[0] || '';
          
          const lastName = user.user_metadata?.family_name || 
                         user.user_metadata?.name?.split(' ').slice(1).join(' ') || 
                         '';

          // Generate a username from email if not available in metadata
          const username = user.user_metadata?.username || 
                          user.email?.split('@')[0]?.toLowerCase() || 
                          `user${user.id.slice(0, 8)}`;

          const { error: createProfileError } = await serviceRoleClient
            .from('user_profiles')
            .insert({
              user_id: user.id,
              username: username,
              first_name: firstName,
              last_name: lastName,
              avatar_url: user.user_metadata?.avatar_url || null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });

          if (createProfileError) {
            console.error('Error creating user profile:', createProfileError);
            // Continue anyway as we want to try role assignment
          }
        }

        // Always check and create role if needed
        console.log('Checking user roles...', { userId: user.id });
        const { data: roles, error: roleError } = await serviceRoleClient
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        let userRoles: string[] = [];

        // Create role if none exists
        if (roleError || !roles || roles.length === 0) {
          console.log('Assigning default role...', { userId: user.id });
          const { error: assignRoleError } = await serviceRoleClient
            .from('user_roles')
            .insert({
              user_id: user.id,
              role: 'user',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });

          if (assignRoleError) {
            console.error('Error assigning default role:', assignRoleError);
            // Set default role anyway for redirect
            userRoles = ['user'];
          } else {
            userRoles = ['user'];
          }
        } else {
          userRoles = roles.map(r => r.role);
        }

        // Ensure we have at least one role for redirect
        if (userRoles.length === 0) {
          console.log('No roles found, using default role for redirect');
          userRoles = ['user'];
        }

        // Determine redirect URL based on role
        let redirectUrl = '';
        if (userRoles.includes('admin')) {
          redirectUrl = '/admin/dashboard';
        } else if (userRoles.includes('moderator')) {
          redirectUrl = '/admin/dashboard';
        } else {
          redirectUrl = '/user/dashboard';
        }

        // Add modal context to redirect URL
        const finalRedirectUrl = `${redirectUrl}?authSuccess=true&modal=true`;

        console.log('Redirecting user...', { userId: user.id, roles: userRoles, redirectUrl: finalRedirectUrl });
        window.location.href = finalRedirectUrl;
      } catch (err) {
        console.error('Modal auth callback error:', err);
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