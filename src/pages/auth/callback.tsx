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
        if (!session) {
          console.error('No session found');
          router.push('/');
          return;
        }

        const user = session.user;
        console.log('User metadata:', user.user_metadata);
        console.log('Avatar URL from metadata:', user.user_metadata.avatar_url);

        // Check if user exists in users table
        const { data: existingUser, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (userError && userError.code !== 'PGRST116') {
          console.error('Error checking user:', userError);
          throw userError;
        }

        if (!existingUser) {
          console.log('Creating new user in users table');
          // Create user in users table
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: user.id,
              email: user.email,
              role: 'user'
            });

          if (insertError) {
            console.error('Error creating user:', insertError);
            throw insertError;
          }
        }

        // Check if user has a profile
        const { data: existingProfile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error checking profile:', profileError);
          throw profileError;
        }

        if (!existingProfile) {
          console.log('Creating new profile with Google data');
          // Create new profile with Google data
          const { data: newProfile, error: insertError } = await supabase
            .from('user_profiles')
            .insert({
              user_id: user.id,
              username: user.email?.split('@')[0] || '',
              first_name: user.user_metadata.full_name?.split(' ')[0] || '',
              last_name: user.user_metadata.full_name?.split(' ').slice(1).join(' ') || '',
              profile_picture: user.user_metadata.avatar_url || null,
              last_password_change: null
            })
            .select()
            .single();

          if (insertError) {
            console.error('Error creating profile:', insertError);
            throw insertError;
          }

          console.log('New profile created:', newProfile);
          setCurrentUsername(newProfile.username);
          setShowSetupModal(true);
        } else {
          console.log('Existing profile found:', existingProfile);
          // Update profile picture if it's missing
          if (!existingProfile.profile_picture && user.user_metadata.avatar_url) {
            console.log('Updating missing profile picture');
            const { error: updateError } = await supabase
              .from('user_profiles')
              .update({ profile_picture: user.user_metadata.avatar_url })
              .eq('user_id', user.id);

            if (updateError) {
              console.error('Error updating profile picture:', updateError);
              throw updateError;
            }
            console.log('Profile picture updated successfully');
          }

          setCurrentUsername(existingProfile.username);
          if (existingProfile.last_password_change === null) {
            setShowSetupModal(true);
          } else {
            router.push('/user/dashboard');
          }
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setError('An error occurred during authentication. Please try again.');
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