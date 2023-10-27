import 'kl-design-system/index.css';
import type { AppProps } from 'next/app';
import '../style.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
