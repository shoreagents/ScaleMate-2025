import '@/styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/router';
import { AuthProvider } from '@/contexts/AuthContext';
import { DownloadBlueprintModal, DownloadModalProvider } from '@/components/quote/DownloadBlueprintModal';

// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showHeader = !router.pathname.startsWith('/admin') && 
                    !router.pathname.startsWith('/user') && 
                    router.pathname !== '/login' &&
                    router.pathname !== '/signup' &&
                    router.pathname !== '/auth/callback';

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <DownloadModalProvider>
        {showHeader && <Header />}
        <Component {...pageProps} />
          <DownloadBlueprintModal />
        </DownloadModalProvider>
      </ThemeProvider>
    </AuthProvider>
  );
} 