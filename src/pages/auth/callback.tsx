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
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (!session) throw new Error('No session found');

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) throw new Error('No user found');

        // Check if user exists in users table
        const { data: existingUser, error: userCheckError } = await serviceRoleClient
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (userCheckError && userCheckError.code !== 'PGRST116') {
          throw userCheckError;
        }

        // If user doesn't exist, create them
        if (!existingUser) {
          const { error: insertError } = await serviceRoleClient
            .from('users')
            .insert([
              {
                id: user.id,
                email: user.email,
                created_at: new Date().toISOString(),
                last_password_change: null
              }
            ]);
          if (insertError) throw insertError;
        }

        // Get user profile
        const { data: profile, error: profileError } = await serviceRoleClient
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError;
        }

        // If profile doesn't exist, create it
        if (!profile) {
          const { error: insertError } = await serviceRoleClient
            .from('user_profiles')
            .insert([
              {
                user_id: user.id,
                email: user.email,
                created_at: new Date().toISOString(),
                profile_picture: user.user_metadata?.avatar_url || null
              }
            ]);
          if (insertError) throw insertError;
        } else if (user.user_metadata?.avatar_url && !profile.profile_picture) {
          // Update profile picture if it's not set
          const { error: updateError } = await serviceRoleClient
            .from('user_profiles')
            .update({ profile_picture: user.user_metadata.avatar_url })
            .eq('user_id', user.id);
          if (updateError) throw updateError;
        }

        // Set current username for setup modal
        setCurrentUsername(profile?.username || '');
        setUserId(user.id);

        // Show setup modal if needed
        if (!existingUser || !profile?.username) {
          setShowSetupModal(true);
        } else {
          // Redirect to appropriate dashboard
          const { data: { user: currentUser } } = await supabase.auth.getUser();
          if (currentUser?.user_metadata?.role === 'admin') {
            router.push('/admin/dashboard');
          } else {
            router.push('/user/dashboard');
          }
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setError('Failed to complete authentication. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [router]);

  const handleSetupComplete = () => {
    console.log('Setup completed, redirecting to dashboard');
    setShowSetupModal(false);
    router.push('/user/dashboard');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log('Render state:', { showSetupModal, userId, currentUsername });

  return (
    <>
      {showSetupModal && userId && currentUsername !== null && (
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