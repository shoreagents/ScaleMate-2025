import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import FirstTimeGoogleUser from '@/components/auth/FirstTimeGoogleUser';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.lg};
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 2rem;
  text-align: center;
`;

export default function SetupPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        if (!session) {
          // No session, redirect to login
          router.push('/login');
          return;
        }

        // Check if user has already set a password
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('last_password_change')
          .eq('user_id', session.user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        if (profile?.last_password_change) {
          // User already has a password, redirect to dashboard
          router.push('/user/dashboard');
          return;
        }

        // User needs to set password
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking user:', error);
        setError('An error occurred. Please try again.');
        setIsLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (isLoading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Card>
          <Title>Error</Title>
          <Subtitle>{error}</Subtitle>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Title>Complete Your Account Setup</Title>
        <Subtitle>
          Please choose a username and set up your password to secure your account.
        </Subtitle>
        <FirstTimeGoogleUser
          onSuccess={() => {
            // Success is handled in the component
          }}
          onError={(error) => {
            setError(error);
          }}
        />
      </Card>
    </Container>
  );
} 