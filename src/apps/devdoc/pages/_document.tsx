import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html
        lang="en"
        className="wb-bg-surface-basic-subdued dark:wb-bg-surface-darktheme-basic-subdued"
      >
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
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('wb-dark', 'dark')
                    document.querySelector('html').classList.remove('wb-bg-surface-basic-subdued')
                    document.querySelector('html').classList.add('wb-bg-surface-darktheme-basic-subdued')
// document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0B1120')
                  } else {
                    document.documentElement.classList.remove('wb-dark', 'dark')
                    document.querySelector('html').classList.add('wb-bg-surface-basic-subdued')
                    document.querySelector('html').classList.remove('wb-bg-surface-darktheme-basic-subdued')
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
