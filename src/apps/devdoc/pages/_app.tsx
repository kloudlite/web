import '../style.css';
import 'kl-design-system/index.css';
import type { AppProps } from 'next/app';
import '../public/arduino-light.min.css';
import { Viewport } from 'next';
import { ToastContainer } from 'kl-design-system/molecule/toast';
import { ConfigProvider } from '~/app/utils/use-config';
import { SearchProvider } from '~/app/utils/use-search';
import { MenuProvider } from '~/app/utils/use-menu';
import ThemeProvider from '~/app/utils/useTheme';
import FirebaseProvider from '~/app/utils/useFirebase';
import 'react-toastify/dist/ReactToastify.css';
import config from '~/app/utils/config';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <ConfigProvider config={config}>
        <FirebaseProvider>
          <ToastContainer position="bottom-left" />
          <MenuProvider>
            <ThemeProvider>
              <Component {...pageProps} />
            </ThemeProvider>
          </MenuProvider>
        </FirebaseProvider>
      </ConfigProvider>
    </SearchProvider>
  );
}
