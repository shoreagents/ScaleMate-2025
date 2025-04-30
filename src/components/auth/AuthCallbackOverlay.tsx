import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import FirstTimeSetupForm from './FirstTimeSetupForm';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import styled from 'styled-components';

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  text-align: center;
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 77, 79, 0.1);
  border-radius: 4px;
`;

export default function AuthCallbackOverlay() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          setError('Failed to get session. Please try again.');
          return;
        }

        if (!session) {
          console.error('No session found');
          setError('No session found. Please try again.');
          return;
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('User error:', userError);
          setError('Failed to get user. Please try again.');
          return;
        }

        if (!user) {
          console.error('No user found');
          setError('No user found. Please try again.');
          return;
        }

        // Get user's profile data
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Profile error:', profileError);
          setError('Failed to get profile. Please try again.');
          return;
        }

        // Check if user needs setup
        const needsSetup = !profile?.username || !profile?.password_set;
        
        if (needsSetup) {
          setCurrentUsername(profile?.username || '');
          setShowSetupModal(true);
        } else {
          // User is already set up, redirect to dashboard
          setUser(user);
          router.push('/user/dashboard');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    };

    handleCallback();
  }, [router, setUser]);

  if (error) {
    return (
      <OverlayContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </OverlayContainer>
    );
  }

  if (showSetupModal) {
    return (
      <OverlayContainer>
        <FirstTimeSetupForm
          onClose={() => {
            setShowSetupModal(false);
            router.push('/user/dashboard');
          }}
          currentUsername={currentUsername}
        />
      </OverlayContainer>
    );
  }

  return (
    <OverlayContainer>
      <LoadingSpinner />
    </OverlayContainer>
  );
} 