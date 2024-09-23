import '../style.css';
import 'kl-design-system/index.css';
import type { AppProps } from 'next/app';
import '../public/arduino-light.min.css';
import { Viewport } from 'next';
import { ToastContainer } from 'kl-design-system/molecule/toast';
import useConfig, { ConfigProvider } from '~/app/utils/use-config';
import { SearchProvider } from '~/app/utils/use-search';
import { MenuProvider } from '~/app/utils/use-menu';
import ThemeProvider from '~/app/utils/useTheme';
import FirebaseProvider from '~/app/utils/useFirebase';
import 'react-toastify/dist/ReactToastify.css';
import config, { authUrl } from '~/app/utils/config';
import { useEffect } from 'react';
import axios from 'axios';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const fetchProviders = async () => {
  try {
    const res = await axios({
      url: `${authUrl}/api`,
      method: 'post',
      withCredentials: false,
      data: {
        method: 'loginPageInitUrls',
        args: [{}],
      },
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        connection: 'keep-alive',
      },
    });
    if (res.data?.data) {
      return res.data.data;
    }
    return null;
  } catch (e) {
    return null;
  }
};

const getUser = async () => {
  try {
    const res = await axios({
      url: `${authUrl}/api`,
      method: 'post',
      withCredentials: true,
      data: {
        method: 'whoAmI',
        args: [{}],
      },
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        connection: 'keep-alive',
      },
    });
    if (res.data?.data) {
      return res.data.data;
    }
    return null;
  } catch (e) {
    return null;
  }
};

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;

  const { setConfig } = useConfig();
  useEffect(() => {
    setConfig((prev) => ({ ...prev, userApiLoading: true }));
    (async () => {
      const user = await getUser();
      setConfig((prev) => ({ ...prev, user, userApiLoading: false }));
    })();

    (async () => {
      const prov = await fetchProviders();
      setConfig((prev) => ({ ...prev, oathProviders: prov }));
    })();
  }, []);

  return <Component {...pageProps} />;
};

export default function App(props: AppProps) {
  return (
    <SearchProvider>
      <ConfigProvider config={config}>
        <FirebaseProvider>
          <ToastContainer position="bottom-left" />
          <MenuProvider>
            <ThemeProvider>
              <MyApp {...props} />
            </ThemeProvider>
          </MenuProvider>
        </FirebaseProvider>
      </ConfigProvider>
    </SearchProvider>
  );
}
