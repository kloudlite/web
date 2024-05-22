import '../style.css';
import 'kl-design-system/index.css';
import type { AppProps } from 'next/app';
import '../public/arduino-light.min.css';
import { Viewport } from 'next';
import { ToastContainer } from 'kl-design-system/molecule/toast';
import { SearchProvider } from '~/app/utils/use-search';
import { MenuProvider } from '~/app/utils/use-menu';
import ThemeProvider from '~/app/utils/useTheme';
import FirebaseProvider from '~/app/utils/useFirebase';
import 'react-toastify/dist/ReactToastify.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider>
      <ToastContainer position="bottom-left" />
      <MenuProvider>
        <SearchProvider>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </SearchProvider>
      </MenuProvider>
    </FirebaseProvider>
  );
}
