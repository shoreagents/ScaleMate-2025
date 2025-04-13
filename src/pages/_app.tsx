import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showHeader = !router.pathname.startsWith('/admin');

  return (
    <ThemeProvider theme={theme}>
      {showHeader && <Header />}
      <Component {...pageProps} />
    </ThemeProvider>
  );
} 