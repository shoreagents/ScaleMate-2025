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
        // Get the session from the URL
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        if (!session) {
          setError('No session found. Please try signing in again.');
          return;
        }

        // Get the user profile
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching profile:', profileError);
          throw profileError;
        }

        // Check if this is a Google sign-in
        const isGoogleUser = session.user.app_metadata.provider === 'google';

        // Get the from parameter to determine where the user came from
        const fromBlueprintModal = router.query.from === 'blueprint-modal';
        const fromCostSavingsModal = router.query.from === 'cost-savings-modal';
        const fromToolsModal = router.query.from === 'tools-modal';
        const redirectTo = router.query.redirectTo as string;

        // Verify session is still valid before redirecting
        const finalSessionCheck = await isSessionValid();
        if (!finalSessionCheck) {
          setError('Session validation failed before redirect. Please try again.');
          return;
        }

        if (fromBlueprintModal || fromCostSavingsModal || fromToolsModal) {
          // If we came from a modal, redirect back to the same page
          // The modal will be reopened automatically
          if (redirectTo) {
            router.push(redirectTo);
          } else {
            router.push('/');
          }
        } else {
          // Check if setup is needed
          const needsSetup = !profile?.username;
          
          if (needsSetup) {
            router.push('/user/dashboard');
          } else {
            // Only add showDownloadModal parameter if user came from a modal
            if (isGoogleUser) {
              if (fromBlueprintModal) {
                router.push('/user/dashboard?showBlueprintModal=true');
              } else if (fromCostSavingsModal) {
                router.push('/user/dashboard?showCostSavingsModal=true');
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