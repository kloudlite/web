import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" className="wb-group/html">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Sriracha&display=swap"
            rel="stylesheet"
          />

          <link
            rel="preload"
            href="/fonts/Inter-variable.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter-variable-Italic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/familjen.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          {/* <link */}
          {/*   rel="preload" */}
          {/*   href="/fonts/sriracha.woff2" */}
          {/*   as="font" */}
          {/*   type="font/woff2" */}
          {/*   crossOrigin="anonymous" */}
          {/* /> */}

          {/** Hubspot* */}
          <script
            type="text/javascript"
            id="hs-script-loader"
            async
            defer
            src="//js.hs-scripts.com/22566314.js"
          />
          <script
            // @ts-ignore
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.querySelector('html').setAttribute('data-theme', 'dark')
                  } else {
                    document.querySelector('html').setAttribute('data-theme', 'light')                  
                  }
                } catch (_) {}
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script> </script>
        </body>
      </Html>
    );
  }
}
