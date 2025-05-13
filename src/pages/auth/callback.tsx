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

// Update the generateRandomUsername function to use full name
const generateRandomUsername = (firstName: string, lastName: string): string => {
  // Clean and normalize the name parts
  const cleanName = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const first = cleanName(firstName);
  const last = cleanName(lastName);
  
  // Generate a random number between 10-99
  const randomNum = Math.floor(Math.random() * 90) + 10;
  
  // Combine parts: first + last + randomNum
  // If the combined length is too long, truncate to fit within 20 chars (including randomNum)
  const maxNameLength = 18; // 20 - 2 (for randomNum)
  const combined = `${first}${last}`;
  const truncated = combined.length > maxNameLength 
    ? combined.slice(0, maxNameLength)
    : combined;
  
  return `${truncated}${randomNum}`;
};

// Add this function at the top level of the file, before the component
const generateRandomUsernameOriginal = (): string => {
  const adjectives = ['happy', 'clever', 'brave', 'swift', 'bright', 'calm', 'eager', 'fair', 'kind', 'lively'];
  const nouns = ['panda', 'tiger', 'eagle', 'dolphin', 'wolf', 'fox', 'bear', 'lion', 'hawk', 'owl'];
  const randomNum = Math.floor(Math.random() * 1000);
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdj}${randomNoun}${randomNum}`;
};

// Add this function to check username availability
const isUsernameAvailable = async (serviceRoleClient: any, username: string): Promise<boolean> => {
  const { data } = await serviceRoleClient
    .from('user_profiles')
    .select('username')
    .eq('username', username)
    .single();
  return !data;
};

// Update the generateUniqueUsername function to accept name parameters
const generateUniqueUsername = async (serviceRoleClient: any, firstName: string, lastName: string): Promise<string> => {
  let username = generateRandomUsername(firstName, lastName);
  let isAvailable = await isUsernameAvailable(serviceRoleClient, username);
  
  // Keep track of attempts to avoid infinite loops
  let attempts = 0;
  const maxAttempts = 10;
  
  while (!isAvailable && attempts < maxAttempts) {
    username = generateRandomUsername(firstName, lastName);
    isAvailable = await isUsernameAvailable(serviceRoleClient, username);
    attempts++;
  }
  
  // If we still couldn't find a unique username, fall back to the original random generator
  if (!isAvailable) {
    const adjectives = ['happy', 'clever', 'brave', 'swift', 'bright', 'calm', 'eager', 'fair', 'kind', 'lively'];
    const nouns = ['panda', 'tiger', 'eagle', 'dolphin', 'wolf', 'fox', 'bear', 'lion', 'hawk', 'owl'];
    const randomNum = Math.floor(Math.random() * 1000);
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    username = `${randomAdj}${randomNoun}${randomNum}`;
  }
  
  return username;
};

export default function AuthCallback() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleCallback = async () => {
      // Prevent multiple navigation attempts
      if (isNavigating) {
        console.log('Navigation already in progress, skipping');
        return;
      }

      try {
        // Get the from parameter and redirectTo URL early
        const fromParam = router.query.from as string;
        const redirectTo = router.query.redirectTo as string;

        // Helper function to handle errors while preserving the flow
        const handleError = (error: any, message: string) => {
          console.error(message, error);
          if (fromParam && redirectTo) {
            // If we came from a modal, redirect back with error
            const redirectUrl = new URL(redirectTo, window.location.origin);
            redirectUrl.searchParams.set('showModal', fromParam);
            redirectUrl.searchParams.set('authError', message);
            window.location.href = redirectUrl.toString();
          } else {
            // Only go to login if we're not in a modal flow
            window.location.href = '/login';
          }
        };

        // Wait for session to be valid
        const sessionValid = await waitForValidSession();
        if (!sessionValid) {
          handleError(null, 'Session validation failed');
          return;
        }

        // Get the session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          handleError(sessionError, 'Session error');
          return;
        }
        if (!session) {
          handleError(null, 'No session found');
          return;
        }

        // Get the user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
          handleError(userError, 'User error');
          return;
        }
        if (!user) {
          handleError(null, 'No user found');
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
        let username = userMetadata.username || null;

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

        // Check if username is taken (if it exists)
        let needsUsernameUpdate = false;
        if (username) {
          const isAvailable = await isUsernameAvailable(serviceRoleClient, username);
          if (!isAvailable) {
            // Username is taken, generate a new one based on name
            username = await generateUniqueUsername(serviceRoleClient, firstName, lastName);
            needsUsernameUpdate = true;
          }
        } else {
          // No username provided, generate one based on name
          username = await generateUniqueUsername(serviceRoleClient, firstName, lastName);
          needsUsernameUpdate = true;
        }

        // Create or update profile
        const avatarUrl = user.user_metadata?.avatar_url;
        const highQualityAvatarUrl = avatarUrl ? avatarUrl.replace('=s96-c', '=s400-c') : null;

        const profileData = {
          user_id: user.id,
          username: username,
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

        // List of valid modal types
        const validModalTypes = [
          'modal', // Generic modal type
          'blueprint-modal',
          'cost-savings-modal',
          'tools-modal',
          'readiness-modal',
          'resources-modal',
          'role-builder-modal',
          'quote-modal',
          'courses-modal'
        ];

        // Check if we came from a modal (either generic 'modal' or specific modal type)
        const isFromModal = fromParam && (fromParam === 'modal' || validModalTypes.includes(fromParam));
        console.log('Is from modal:', isFromModal);
        console.log('Valid modal types:', validModalTypes);
        console.log('From param matches:', fromParam ? (fromParam === 'modal' || validModalTypes.includes(fromParam)) : false);

        // Handle redirects based on modal status and username update needs
        if (isFromModal) {
          console.log('User came from modal:', fromParam);
          // If coming from a modal, redirect back to the original page
          if (redirectTo) {
            console.log('Redirecting to:', redirectTo);
            try {
              const redirectUrl = new URL(redirectTo, window.location.origin);
              // Add parameters to show the modal after redirect
              redirectUrl.searchParams.set('showModal', fromParam);
              if (needsUsernameUpdate) {
                console.log('Setting showUsernameUpdate=true for modal redirect');
                redirectUrl.searchParams.set('showUsernameUpdate', 'true');
              }
              // Add a success parameter to trigger success state
              redirectUrl.searchParams.set('authSuccess', 'true');
              console.log('Final redirect URL:', redirectUrl.toString());
              window.location.href = redirectUrl.toString();
              return;
            } catch (err) {
              handleError(err, 'Error creating redirect URL');
              return;
            }
          } else {
            console.log('No redirectTo URL, going to home');
            const homeUrl = new URL('/', window.location.origin);
            homeUrl.searchParams.set('showModal', fromParam);
            homeUrl.searchParams.set('authSuccess', 'true');
            if (needsUsernameUpdate) {
              console.log('Setting showUsernameUpdate=true for home redirect');
              homeUrl.searchParams.set('showUsernameUpdate', 'true');
            }
            window.location.href = homeUrl.toString();
            return;
          }
        } else {
          console.log('Not from modal, going to dashboard');
          // For non-modal sign-ins, redirect to dashboard
          const dashboardUrl = new URL('/user/dashboard', window.location.origin);
          if (needsUsernameUpdate) {
            console.log('Setting showUsernameUpdate=true for dashboard redirect');
            dashboardUrl.searchParams.set('showUsernameUpdate', 'true');
          }
          console.log('Final dashboard URL:', dashboardUrl.toString());
          window.location.href = dashboardUrl.toString();
          return;
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        // Get the from parameter and redirectTo URL for error handling
        const fromParam = router.query.from as string;
        const redirectTo = router.query.redirectTo as string;
        
        if (fromParam && redirectTo) {
          // If we came from a modal, redirect back with error
          const redirectUrl = new URL(redirectTo, window.location.origin);
          redirectUrl.searchParams.set('showModal', fromParam);
          redirectUrl.searchParams.set('authError', 'Authentication failed');
          window.location.href = redirectUrl.toString();
        } else {
          // Only go to login if we're not in a modal flow
          window.location.href = '/login';
        }
        return;
      }
    };

    if (router.isReady && !isNavigating) {
      handleCallback();
    }
  }, [router.isReady, isNavigating]);

  return (
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>
  );
} 