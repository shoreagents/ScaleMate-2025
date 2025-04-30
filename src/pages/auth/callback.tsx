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

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

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

        // Get user's profile data
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Profile error:', profileError);
          setError('Failed to get profile. Please try again.');
          return;
        }

        // For Google users, create profile and role if they don't exist
        if (isGoogleUser) {
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

          // Check if user exists in users table
          const { data: existingUser, error: checkError } = await serviceRoleClient
            .from('users')
            .select('id')
            .eq('id', user.id)
            .single();

          if (checkError && checkError.code !== 'PGRST116') {
            console.error('Error checking existing user:', checkError);
            setError('Failed to check existing user');
            return;
          }

          // Only insert if user doesn't exist
          if (!existingUser) {
            const { error: userError } = await serviceRoleClient
              .from('users')
              .insert({
                id: user.id,
                email: user.email,
                full_name: user.user_metadata?.full_name || '',
                is_active: true
              });

            if (userError) {
              console.error('User creation error:', userError);
              setError('Failed to create user record');
              return;
            }
          }

          // Create profile if it doesn't exist
          if (!profile) {
            const { error: profileError } = await serviceRoleClient
              .from('user_profiles')
              .insert({
                user_id: user.id,
                username: null, // Don't set username until setup is completed
                first_name: user.user_metadata?.full_name?.split(' ')[0] || '',
                last_name: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
                last_password_change: null // Don't set last_password_change until setup is completed
              });

            if (profileError) {
              console.error('Profile creation error:', profileError);
              setError('Failed to create user profile');
              return;
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
            setError('Failed to check existing role');
            return;
          }

          // Only insert if role doesn't exist
          if (!existingRole) {
            const { error: roleError } = await serviceRoleClient
              .from('user_roles')
              .insert({
                user_id: user.id,
                role: 'user'
              });

            if (roleError) {
              console.error('Role assignment error:', roleError);
              setError('Failed to assign user role');
              return;
            }
          }
        }

        // Check if setup is needed
        const needsSetup = !profile?.username;
        
        if (needsSetup) {
          // Redirect to setup page
          router.push('/auth/setup');
        } else {
          // Redirect to dashboard
          router.push('/dashboard');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    };

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <LoadingContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </LoadingContainer>
    );
  }

  return (
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>
  );
} 