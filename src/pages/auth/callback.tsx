import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #F9FAFB;
`;

const LoadingCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  max-width: 400px;
  width: 90%;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #6B7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: #DC2626;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('Completing sign in...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        setStatus('Verifying authentication...');
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          throw error;
        }

        if (!user) {
          throw new Error('No user found after authentication');
        }

        setStatus('Checking user profile...');
        // Check if user profile exists
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError;
        }

        // If profile doesn't exist, create one
        if (!profile) {
          setStatus('Creating user profile...');
          const { error: createProfileError } = await supabase.rpc('update_user_profile_v2', {
            p_user_id: user.id,
            p_username: user.email?.split('@')[0] || '',
            p_first_name: user.user_metadata?.full_name?.split(' ')[0] || '',
            p_last_name: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
            p_phone: null,
            p_gender: null
          });

          if (createProfileError) {
            throw createProfileError;
          }
        }

        setStatus('Checking user roles...');
        // Get user's role
        const { data: roles, error: rolesError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (rolesError) {
          throw rolesError;
        }

        setStatus('Redirecting to dashboard...');
        // Redirect based on role
        if (roles && roles.length > 0) {
          const userRoles = roles.map(r => r.role);
          if (userRoles.includes('admin') || userRoles.includes('moderator')) {
            router.push('/admin/dashboard');
          } else if (userRoles.includes('user')) {
            router.push('/user/dashboard');
          } else {
            router.push('/user/dashboard');
          }
        } else {
          router.push('/user/dashboard');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setError(error instanceof Error ? error.message : 'Authentication failed');
        setStatus('Authentication failed');
        
        // Wait 3 seconds before redirecting to login
        setTimeout(() => {
          router.push('/login?error=Authentication failed');
        }, 3000);
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <LoadingContainer>
      <LoadingCard>
        <Title>{status}</Title>
        <Message>Please wait while we set up your account.</Message>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoadingCard>
    </LoadingContainer>
  );
} 