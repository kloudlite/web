import '../style.css';
import 'kl-design-system/index.css';
import type { AppProps } from 'next/app';
import '../public/arduino-light.min.css';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { useEffect } from 'react';
import { SearchProvider } from '~/app/utils/use-search';
import { MenuProvider } from '~/app/utils/use-menu';
import ThemeProvider from '~/app/utils/useTheme';
import { Viewport } from 'next';
import config from '../.firebaseConfig';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const app = initializeApp(config);
  useEffect(() => {
    getAnalytics(app);
  }, []);
  return (
    <MenuProvider>
      <div
        className="loading-overlay"
        style={{ position: 'absolute', inset: 0, background: 'white' }}
      />
      <SearchProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </SearchProvider>
    </MenuProvider>
  );
}
