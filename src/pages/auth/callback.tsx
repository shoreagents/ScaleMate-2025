import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import FirstLoginModal from '@/components/auth/FirstLoginModal';

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

// Add this function at the top level
async function generateUniqueUsername(baseUsername: string, serviceRoleClient: any): Promise<string> {
  // Clean the base username
  const cleanBase = baseUsername
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '') // Remove invalid characters
    .substring(0, 20); // Limit length

  let username = cleanBase;
  let counter = 1;
  const maxAttempts = 100; // Prevent infinite loops
  
  while (counter <= maxAttempts) {
    const { data, error } = await serviceRoleClient
      .from('user_profiles')
      .select('username')
      .eq('username', username)
      .single();

    if (error && error.code === 'PGRST116') {
      // Username is available
      return username;
    }

    // Username exists, try with a number
    // Format: base123 (max 20 chars total)
    const numberStr = counter.toString();
    const maxBaseLength = 20 - numberStr.length;
    username = `${cleanBase.substring(0, maxBaseLength)}${numberStr}`;
    counter++;
  }

  // If we've tried 100 times, generate a random string
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${cleanBase.substring(0, 12)}${randomStr}`;
}

export default function AuthCallback() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFirstLoginModal, setShowFirstLoginModal] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');

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
        setUserEmail(session.user.email || '');

        try {
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
            const baseUsername = session.user.email?.split('@')[0] || '';
            const username = await generateUniqueUsername(baseUsername, serviceRoleClient);
            
            const { error: createProfileError } = await serviceRoleClient
              .from('user_profiles')
              .insert({
                user_id: session.user.id,
                username: username,
                first_name: session.user.user_metadata.full_name?.split(' ')[0] || '',
                last_name: session.user.user_metadata.full_name?.split(' ').slice(1).join(' ') || '',
                is_google_user: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              });

            if (createProfileError) {
              console.error('Create profile error:', createProfileError);
              throw createProfileError;
            }
            console.log('Profile created successfully');

            // Show first login modal for Google users
            if (session.user.app_metadata.provider === 'google') {
              setShowFirstLoginModal(true);
              setIsLoading(false);
              return;
            }
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

  const handleFirstLoginComplete = () => {
    setShowFirstLoginModal(false);
    router.push('/user/dashboard');
  };

  // If there's an error, show it and redirect to login after a delay
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        router.push(`/login?error=${encodeURIComponent(error)}`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error, router]);

  return (
    <>
      <LoadingSpinner />
      <FirstLoginModal
        isOpen={showFirstLoginModal}
        onClose={() => {}} // Disable closing
        onComplete={handleFirstLoginComplete}
        email={userEmail}
      />
    </>
  );
} 