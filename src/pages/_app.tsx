import '@/styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProfileProvider, useProfile } from '@/contexts/ProfileContext';
import Header from '@/components/layout/Header';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';

// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

// Create a client
const queryClient = new QueryClient();

// Routes that should not show the header
const NO_HEADER_ROUTES = [
  '/login',
  '/signup',
  '/auth/callback',
  '/auth/callback/direct',
  '/user/dashboard',
  '/admin/dashboard'
];

function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { setProfilePicture } = useProfile();

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('profile_picture_url')
            .eq('id', session.user.id)
            .single();
          
          if (profile?.profile_picture_url) {
            setProfilePicture(profile.profile_picture_url);
          }
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchProfilePicture();
  }, [setProfilePicture]);

  const shouldShowHeader = !NO_HEADER_ROUTES.some(route => 
    router.pathname.startsWith(route)
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          {shouldShowHeader && (
            <Header />
          )}
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default function App(props: AppProps) {
  return (
    <ProfileProvider>
      <AppContent {...props} />
    </ProfileProvider>
  );
} 