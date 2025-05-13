import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import UpdateUsernameForm from '@/components/auth/UpdateUsernameForm';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
  padding: 1rem;
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

// Add the normalizeEmail function at the top of the file
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

export default function AuthCallback() {
  const router = useRouter();
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Wait for session to be valid
        const sessionValid = await waitForValidSession();
        if (!sessionValid) {
          console.error('Session validation failed');
          router.push('/login');
          return;
        }

        // Get the session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error('Session error:', sessionError);
          router.push('/login');
          return;
        }
        if (!session) {
          console.error('No session found');
          router.push('/login');
          return;
        }

        // Get the user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
          console.error('User error:', userError);
          router.push('/login');
          return;
        }
        if (!user) {
          console.error('No user found');
          router.push('/login');
          return;
        }

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

        // Check if this is a Google sign-in
        const isGoogleUser = user.app_metadata?.provider === 'google';
        console.log('Is Google user:', isGoogleUser);

        // Get user metadata from auth
        const userMetadata = user.user_metadata || {};
        const fullName = userMetadata.full_name || '';
        const firstName = userMetadata.first_name || fullName.split(' ')[0] || '';
        const lastName = userMetadata.last_name || fullName.split(' ').slice(1).join(' ') || '';
        const username = userMetadata.username || null;

        // Normalize email for Google users
        let emailToUse = user.email;
        if (isGoogleUser && user.email) {
          emailToUse = normalizeEmail(user.email);
          console.log('Original email:', user.email);
          console.log('Normalized email:', emailToUse);
        }

        // Check if user exists in users table with normalized email
        const { data: existingUser, error: checkError } = await serviceRoleClient
          .from('users')
          .select('id')
          .eq('email', emailToUse)
          .single();

        if (checkError && checkError.code !== 'PGRST116') {
          console.error('Error checking existing user:', checkError);
          router.push('/login');
          return;
        }

        // Only insert if user doesn't exist
        if (!existingUser) {
          const { error: userError } = await serviceRoleClient
            .from('users')
            .insert({
              id: user.id,
              email: emailToUse,
              full_name: fullName,
              is_active: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });

          if (userError) {
            console.error('User creation error:', userError);
            router.push('/login');
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
          router.push('/login');
          return;
        }

        // Add role if it doesn't exist
        if (!existingRole) {
          const { error: roleError } = await serviceRoleClient
            .from('user_roles')
            .insert({
              user_id: user.id,
              role: 'user',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });

          if (roleError) {
            console.error('Role creation error:', roleError);
            router.push('/login');
            return;
          }
        }

        // Get user's profile data
        const { data: profile, error: profileError } = await serviceRoleClient
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Profile error:', profileError);
          router.push('/login');
          return;
        }

        // Check if username is taken by another user
        if (username) {
          const { data: existingUsername, error: usernameError } = await serviceRoleClient
            .from('user_profiles')
            .select('username')
            .eq('username', username)
            .neq('user_id', user.id)
            .single();

          if (usernameError && usernameError.code !== 'PGRST116') {
            console.error('Username check error:', usernameError);
            router.push('/login');
            return;
          }

          if (existingUsername) {
            // Username is taken, show the update form
            setUserId(user.id);
            setShowUsernameForm(true);
            setIsLoading(false);
            return;
          }
        }

        // Create or update profile
        const avatarUrl = user.user_metadata?.avatar_url;
        const highQualityAvatarUrl = avatarUrl ? avatarUrl.replace('=s96-c', '=s400-c') : null;

        const profileData = {
          user_id: user.id,
          username: username || profile?.username || null,
          first_name: firstName || profile?.first_name || '',
          last_name: lastName || profile?.last_name || '',
          last_password_change: profile?.last_password_change || null,
          profile_picture: highQualityAvatarUrl || profile?.profile_picture || null,
          created_at: profile?.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        if (!profile) {
          // Create new profile
          const { error: profileError } = await serviceRoleClient
            .from('user_profiles')
            .insert(profileData);

          if (profileError) {
            console.error('Profile creation error:', profileError);
            router.push('/login');
            return;
          }
        } else {
          // Update existing profile
          const { error: profileError } = await serviceRoleClient
            .from('user_profiles')
            .update(profileData)
            .eq('user_id', user.id);

          if (profileError) {
            console.error('Profile update error:', profileError);
            router.push('/login');
            return;
          }
        }

        // Verify session is still valid before redirecting
        const finalSessionCheck = await isSessionValid();
        if (!finalSessionCheck) {
          console.error('Final session check failed');
          router.push('/login');
          return;
        }

        // Debug log the query parameters
        console.log('Callback query params:', router.query);

        // Get the from parameter and redirectTo URL
        const fromParam = router.query.from as string;
        const redirectTo = router.query.redirectTo as string;

        // Debug log the parameters
        console.log('From param:', fromParam);
        console.log('RedirectTo:', redirectTo);

        // List of valid modal types
        const validModalTypes = [
          'blueprint-modal',
          'cost-savings-modal',
          'tools-modal',
          'readiness-modal',
          'resources-modal',
          'role-builder-modal',
          'quote-modal',
          'courses-modal'
        ];

        // Check if we came from a modal
        const isFromModal = fromParam && validModalTypes.includes(fromParam);

        // Handle redirects based on modal status
        if (isFromModal) {
          console.log('User came from modal:', fromParam);
          // If coming from a modal, redirect back to the original page
          if (redirectTo) {
            console.log('Redirecting to:', redirectTo);
            router.push(redirectTo);
          } else {
            console.log('No redirectTo URL, going to home');
            router.push('/');
          }
        } else {
          console.log('Not from modal, going to dashboard');
          // For non-modal sign-ins, redirect to dashboard
          router.push('/user/dashboard');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        router.push('/login');
      }
    };

    if (router.isReady) {
      handleCallback();
    }
  }, [router.isReady, showUsernameForm]);

  const handleUsernameUpdateSuccess = async () => {
    // After successful username update, proceed with normal redirect
    setShowUsernameForm(false);
    setIsLoading(true);

    // Get the from parameter and redirectTo URL
    const fromParam = router.query.from as string;
    const redirectTo = router.query.redirectTo as string;

    // List of valid modal types
    const validModalTypes = [
      'blueprint-modal',
      'cost-savings-modal',
      'tools-modal',
      'readiness-modal',
      'resources-modal',
      'role-builder-modal',
      'quote-modal',
      'courses-modal'
    ];

    // Check if we came from a modal
    const isFromModal = fromParam && validModalTypes.includes(fromParam);

    // Handle redirects based on modal status
    if (isFromModal) {
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push('/');
      }
    } else {
      router.push('/user/dashboard');
    }
  };

  if (showUsernameForm && userId) {
    return (
      <FormWrapper>
        <UpdateUsernameForm
          userId={userId}
          onSuccess={handleUsernameUpdateSuccess}
          onError={(error) => {
            console.error('Username update error:', error);
          }}
        />
      </FormWrapper>
    );
  }

  return (
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>
  );
} 