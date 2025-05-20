import '@/styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const shouldShowHeader = !NO_HEADER_ROUTES.some(route => 
    router.pathname.startsWith(route)
  );

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#F9FAFB'
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '4px solid #E5E7EB',
          borderTop: '4px solid #3B82F6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
          {shouldShowHeader && <Header />}
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
    </QueryClientProvider>
  );
} 