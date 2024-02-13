import '../style.css';
import 'kl-design-system/index.css';
import type { AppProps } from 'next/app';
import '../public/arduino-light.min.css';
import { MenuProvider } from '~/app/utils/use-menu';
import { SearchProvider } from '~/app/utils/use-search';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { useEffect } from 'react';
import config from '../.firebaseConfig';

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
        <Component {...pageProps} />
      </SearchProvider>
    </MenuProvider>
  );
}
