import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

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

export default function AuthCallback() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }
        
        if (!session) {
          console.error('No session found');
          setError('Authentication failed');
          return;
        }

        console.log('Session found:', session.user.id);

        try {
          // Update last_login in users table
          const { error: updateLoginError } = await serviceRoleClient
            .from('users')
            .update({ last_login: new Date().toISOString() })
            .eq('id', session.user.id);

          if (updateLoginError) {
            console.error('Error updating last_login:', updateLoginError);
            // Don't throw error here, continue with the flow
          }

          // Get user's role using service role client
          const { data: roles, error: rolesError } = await serviceRoleClient
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id);

          if (rolesError) {
            console.error('Roles error:', rolesError);
            throw rolesError;
          }

          console.log('Roles check:', roles);

          // Check if user profile exists using service role client
          const { data: profile, error: profileError } = await serviceRoleClient
            .from('user_profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Profile error:', profileError);
            throw profileError;
          }

          // Check if user needs to set up password
          if (!profile?.last_password_change) {
            console.log('User needs to set up password');
            router.push('/auth/setup-password');
            return;
          }

          console.log('Profile check:', profile);

          // Check if user exists in users table using service role client
          const { data: existingUser, error: userCheckError } = await serviceRoleClient
            .from('users')
            .select('id')
            .eq('id', session.user.id)
            .single();

          if (userCheckError && userCheckError.code !== 'PGRST116') {
            console.error('User check error:', userCheckError);
            throw userCheckError;
          }

          console.log('User check:', existingUser);

          // Create user in users table if doesn't exist
          if (!existingUser) {
            console.log('Creating new user');
            const { error: createUserError } = await serviceRoleClient
              .from('users')
              .insert({
                id: session.user.id,
                email: session.user.email,
                full_name: session.user.user_metadata.full_name || '',
                is_active: true
              });

            if (createUserError) {
              console.error('Create user error:', createUserError);
              throw createUserError;
            }
            console.log('User created successfully');
          }

          // Only create profile if it doesn't exist
          if (!profile) {
            console.log('Creating new profile');
            const { error: createProfileError } = await serviceRoleClient
              .from('user_profiles')
              .insert({
                user_id: session.user.id,
                username: session.user.email?.split('@')[0],
                first_name: session.user.user_metadata.full_name?.split(' ')[0] || '',
                last_name: session.user.user_metadata.full_name?.split(' ').slice(1).join(' ') || ''
              });

            if (createProfileError) {
              console.error('Create profile error:', createProfileError);
              throw createProfileError;
            }
            console.log('Profile created successfully');
          }

          // If roles don't exist, create default user role
          if (!roles || roles.length === 0) {
            console.log('Creating new role');
            const { error: createRoleError } = await serviceRoleClient
              .from('user_roles')
              .insert({
                user_id: session.user.id,
                role: 'user'
              });

            if (createRoleError) {
              console.error('Create role error:', createRoleError);
              throw createRoleError;
            }

            // Verify the role was created
            const { data: verifyRoles, error: verifyError } = await serviceRoleClient
              .from('user_roles')
              .select('role')
              .eq('user_id', session.user.id);

            if (verifyError || !verifyRoles || verifyRoles.length === 0) {
              console.error('Verify role error:', verifyError);
              throw new Error('Failed to verify role creation');
            }

            console.log('Role created and verified successfully');
            router.push('/user/dashboard');
            return;
          }

          // Redirect based on role
          const userRoles = roles.map(r => r.role);
          console.log('User roles for redirect:', userRoles);
          if (userRoles.includes('admin') || userRoles.includes('moderator')) {
            console.log('Redirecting to admin dashboard');
            router.push('/admin/dashboard');
          } else {
            console.log('Redirecting to user dashboard');
            router.push('/user/dashboard');
          }
        } catch (innerError) {
          console.error('Inner operation error:', innerError);
          throw innerError;
        }
      } catch (error) {
        console.error('Callback error:', error);
        // Log more detailed error information
        if (error instanceof Error) {
          console.error('Error name:', error.name);
          console.error('Error message:', error.message);
          console.error('Error stack:', error.stack);
        }
        
        // Only redirect to login for critical errors
        if (error instanceof Error && error.message.includes('duplicate key')) {
          setError('Account already exists. Please sign in with your password.');
        } else if (error instanceof Error && error.message.includes('network')) {
          setError('Network error. Please try again.');
        } else {
          setError('Something went wrong. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [router]);

  // If there's an error, show it and redirect to login after a delay
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        router.push(`/login?error=${encodeURIComponent(error)}`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error, router]);

  return <LoadingSpinner />;
} 