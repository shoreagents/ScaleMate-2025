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

        // Check if user profile exists
        const { data: profile, error: profileError } = await serviceRoleClient
          .from('user_profiles')
          .select('username')
          .eq('user_id', user.id)
          .single();

        // If no profile exists, create one for Google sign-in users
        if (profileError || !profile?.username) {
          // Check if this is a Google sign-in
          const isGoogleUser = user.app_metadata?.provider === 'google';
          
          if (isGoogleUser) {
            // Create a username from email (remove domain and special chars)
            const username = user.email?.split('@')[0].replace(/[^a-zA-Z0-9]/g, '') || '';
            
            // Create user profile
            const { error: createProfileError } = await serviceRoleClient
              .from('user_profiles')
              .insert({
                user_id: user.id,
                username: username,
                first_name: user.user_metadata?.full_name?.split(' ')[0] || '',
                last_name: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              });

            if (createProfileError) {
              console.error('Error creating user profile:', createProfileError);
              // Don't return here as we still want to redirect to modal
            }
          } else {
            handleError(null, 'User profile not found. Please contact support.');
            return;
          }
        }

        // After profile check, handle role assignment
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
            console.error('Error assigning default role:', assignRoleError);
            // Don't return here as we still want to redirect to modal
          }

          // Set roles to default after assignment
          userRoles = ['user'];
        } else {
          userRoles = roles.map(r => r.role);
        }

        // After successful setup, redirect back to the modal page
        const redirectUrl = new URL(redirectTo, window.location.origin);
        redirectUrl.searchParams.set('showModal', fromParam);
        redirectUrl.searchParams.set('authSuccess', 'true');
        redirectUrl.searchParams.set('userRole', userRoles[0] || 'user');

        // Use router.replace instead of window.location.href to prevent full page reload
        await router.replace(redirectUrl.toString(), undefined, { shallow: true });

        // After redirect, restore scroll position if it exists
        const scrollY = sessionStorage.getItem('scrollPosition');
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY));
          sessionStorage.removeItem('scrollPosition');
        }

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