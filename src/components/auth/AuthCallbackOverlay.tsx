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
  const [userId, setUserId] = useState<string | null>(null);

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

        // Check if this is a Google sign-up
        const isGoogleUser = user.app_metadata?.provider === 'google';
        console.log('Is Google user:', isGoogleUser);

        // Get user's profile data from the correct table
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
          console.error('Profile error:', profileError);
          setError('Failed to get profile. Please try again.');
          return;
        }

        // If no profile exists and this is a Google user, create one
        if (!profile && isGoogleUser) {
          const { error: createProfileError } = await supabase
            .from('user_profiles')
            .insert({
              user_id: user.id,
              username: user.email?.split('@')[0] || '',
              first_name: user.user_metadata?.full_name?.split(' ')[0] || '',
              last_name: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
              last_password_change: new Date().toISOString()
            });

          if (createProfileError) {
            console.error('Profile creation error:', createProfileError);
            setError('Failed to create user profile. Please try again.');
            return;
          }
        }

        // Check if user has a role
        const { data: userRole, error: roleError } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (roleError && roleError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
          console.error('Role check error:', roleError);
          setError('Failed to check user role. Please try again.');
          return;
        }

        // If no role exists, create a default 'user' role
        if (!userRole) {
          const { error: createRoleError } = await supabase
            .from('user_roles')
            .insert({
              user_id: user.id,
              role: 'user'
            });

          if (createRoleError) {
            console.error('Role creation error:', createRoleError);
            setError('Failed to create user role. Please try again.');
            return;
          }
        }

        // Check if user needs setup
        const needsSetup = !profile?.username || !profile?.last_password_change;
        
        if (needsSetup) {
          setUserId(user.id);
          setCurrentUsername(profile?.username || '');
          setShowSetupModal(true);
        } else {
          // User is already set up
          setUser(user);
          setShowSetupModal(false);
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

  if (showSetupModal && userId) {
    return (
      <OverlayContainer>
        <FirstTimeSetupForm
          isOpen={showSetupModal}
          onClose={() => {
            setShowSetupModal(false);
            setUser(null); // Reset user to trigger a refresh
          }}
          userId={userId}
          currentUsername={currentUsername || ''}
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