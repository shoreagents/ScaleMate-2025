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

  // Helper function to handle errors
  const handleError = (error: any, message: string) => {
    console.error(message, error);
    router.push('/login?error=' + encodeURIComponent(message));
  };

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          handleError(null, 'Authentication failed. Please try again.');
          return;
        }

        // Get user's roles
        const { data: roles, error: rolesError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (rolesError || !roles || roles.length === 0) {
          handleError(null, 'User has no valid role assigned. Please contact support.');
          return;
        }

        const userRoles = roles.map(r => r.role);
        let redirectUrl = '/';

        // Check for admin or moderator role first
        if (userRoles.includes('admin') || userRoles.includes('moderator')) {
          redirectUrl = '/admin/dashboard';
        } else if (userRoles.includes('user')) {
          redirectUrl = '/user/dashboard';
        } else {
          handleError(null, 'User has no valid role assigned. Please contact support.');
          return;
        }

        // Use router.replace for smoother transition
        await router.replace(redirectUrl);

      } catch (err) {
        console.error('Direct auth callback error:', err);
        handleError(err, 'An unexpected error occurred. Please try again.');
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