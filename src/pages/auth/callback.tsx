import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import FirstTimeSetupForm from '@/components/auth/FirstTimeSetupForm';

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
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session from the URL hash
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (!session) {
          throw new Error('No session found');
        }

        // Get the user's profile
        const { data: profile, error: profileError } = await serviceRoleClient
          .from('user_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        // Check if we need to show the setup modal for existing profiles
        if (!profile?.last_password_change) {
          setUserId(session.user.id);
          setCurrentUsername(profile?.username || session.user.email?.split('@')[0] || '');
          setShowSetupModal(true);
        } else {
          // Redirect to appropriate dashboard based on role
          const { data: roles, error: rolesError } = await serviceRoleClient
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id);

          if (rolesError) {
            throw rolesError;
          }

          if (roles?.some(r => r.role === 'admin')) {
            router.push('/admin/dashboard');
          } else {
            router.push('/user/dashboard');
          }
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred during authentication');
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [router]);

  const handleSetupComplete = () => {
    setShowSetupModal(false);
    router.push('/user/dashboard');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {showSetupModal && userId && currentUsername && (
        <FirstTimeSetupForm
          isOpen={showSetupModal}
          onClose={handleSetupComplete}
          userId={userId}
          currentUsername={currentUsername}
        />
      )}
    </>
  );
} 