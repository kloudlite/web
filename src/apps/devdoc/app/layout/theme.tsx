import Head from 'next/head';
import type { NextraThemeLayoutProps } from 'nextra';
import { MDXProvider } from 'nextra/mdx';
import { ReactNode, useEffect, useMemo } from 'react';
import { useFSRoute } from 'nextra/hooks';
import { normalizePages } from 'nextra/normalize-pages';
import { useRouter } from 'next/router';
import Profile from 'kl-design-system/molecule/profile';
import Footer from '~/app/components/footer';
import Container from '~/app/components/container';
import { NavLinks } from '~/app/components/nav-links';
import { TOC } from '~/app/components/toc';
import { Breadcrumb } from '~/app/components/breadcrum';
import { Sidebar } from '~/app/components/sidebar';
import HeaderSecondary from '~/app/components/header-secondary';
import Header from '~/app/components/header';
import { DEFAULT_LOCALE } from '~/app/utils/constants';
import { cn } from '~/app/utils/commons';
import useMenu from '~/app/utils/use-menu';
import { ActiveAnchorProvider } from '~/app/utils/active-anchor';
import { ConfigProvider } from '~/app/utils/use-config';
import config from '~/app/utils/config';
import { createComponents } from './mdx-components';

function GitTimestamp({ timestamp }: { timestamp: Date }) {
  const { locale = DEFAULT_LOCALE } = useRouter();
  return (
    <>
      Last updated on{' '}
      <time dateTime={timestamp.toISOString()}>
        {timestamp.toLocaleDateString(locale, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </time>
    </>
  );
}

const BlogHeader = ({
  frontMatter,
  timestamp,
}: {
  frontMatter: {
    [key: string]: any;
  };
  timestamp: string | ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-5xl pt-2xl">
      <div className="flex flex-col gap-xl">
        <h1 className="heading3xl text-text-strong">{frontMatter.title}</h1>
        <p className="bodyLg text-text-strong">{frontMatter.describe}</p>
      </div>
      <Profile name={`Written by ${frontMatter.author}`} subtitle={timestamp} />
    </div>
  );
};

const Main = ({ children, pageOpts }: NextraThemeLayoutProps) => {
  const { title, frontMatter, pageMap, headings } = pageOpts;
  const { state } = useMenu();

  useEffect(() => {
    document.body.style.overflow = state ? 'hidden' : '';
  }, [state]);

  const { locale = DEFAULT_LOCALE, defaultLocale } = useRouter();
  const fsPath = useFSRoute();

  const pageData = useMemo(
    () =>
      normalizePages({
        list: pageMap,
        locale,
        defaultLocale,
        route: fsPath,
      }),
    [pageMap, locale, defaultLocale, fsPath]
  );

  const {
    flatDocsDirectories,
    activeIndex,
    activePath,
    activeThemeContext,
    docsDirectories,
    directories,
  } = pageData;

  const tempActiveThemeContext: typeof activeThemeContext & {
    header?: 'primary' | 'secondary';
  } = activeThemeContext;
  const showSidebar = activeThemeContext.sidebar;
  const headerType = tempActiveThemeContext?.header || 'secondary';
  const showToc = activeThemeContext.toc || false;
  const showBreadcrum = activeThemeContext?.breadcrumb;

  let pageType = 'normal';

  if (
    activePath.length > 0 &&
    activePath[activePath.length - 1].kind === 'MdxPage' &&
    activePath[activePath.length - 1].route !== activePath[0].route &&
    ['blog', 'help-and-support'].includes(activePath[0].name)
  ) {
    pageType = 'blog';
  }

  if (
    activePath.length > 0 &&
    activePath[activePath.length - 1].kind === 'MdxPage' &&
    activePath[activePath.length - 1].route !== activePath[0].route &&
    ['docs'].includes(activePath[0].name)
  ) {
    pageType = 'docs';
  }

  console.log(pageData);

  return (
    <div className="bg-surface-basic-subdued min-h-screen antialiased">
      <Head>
        <title>{title === 'Index' ? config.siteTitle : title}</title>
        <meta name="og:image" content={frontMatter.image} />
        <link rel="shortcut icon" href="/favicon.ico" />
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

        {/** Hubspot* */}
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js.hs-scripts.com/22566314.js"
        />
      </Head>
      <ActiveAnchorProvider>
        {headerType === 'primary' ? (
          <Header navitems={config?.headerPrimary} activePath={activePath} />
        ) : (
          // @ts-ignore
          <HeaderSecondary
            {...config?.headerSecondary}
            activePath={activePath}
          />
        )}

        <Container
          className={cn(
            'min-h-[calc(100vh-76px)] flex-row',
            activeThemeContext.layout === 'default'
              ? 'lg:m-auto lg:!max-w-[896px] w-full px-3xl md:!px-5xl lg:!px-8xl xl:!px-11xl 2xl:!px-12xl xl:!max-w-[1024px] 2xl:!max-w-[1120px] 3xl:!min-w-[1408px] lg:!box-content'
              : 'max-w-none',
            pageType === 'blog' ? 'py-8xl' : ''
          )}
        >
          <Sidebar
            docsDirectories={docsDirectories}
            fullDirectories={directories}
            headings={headings}
            asPopover={!showSidebar}
            rawLayout={activeThemeContext.layout === 'raw'}
            includePlaceholder
          />
          {showToc && (
            <nav className="order-last w-[230px] max-w-[230px] min-w-[226px] sticky top-[calc(var(--kl-navbar-height))] self-start hidden lg:block">
              <TOC headings={headings} />
            </nav>
          )}
          <article
            className={cn(
              'flex-1',
              activeThemeContext.layout === 'raw' ? '' : 'pt-xl'
            )}
          >
            <main
              className={cn(
                ' w-full min-w-0 min-h-[calc(100vh-101px)] flex flex-col',
                showSidebar ? 'max-w-[72rem]' : '',
                activeThemeContext.layout === 'raw' ? '' : 'gap-6xl',
                pageType === 'docs' ? 'py-6xl px-7xl' : '',
                pageType === 'blog'
                  ? 'lg:!pr-8xl xl:!pr-10xl 2xl:!pr-11xl 3xl:pr-15xl'
                  : ''
              )}
            >
              <MDXProvider
                components={createComponents({
                  isRawLayout: activeThemeContext.layout === 'raw',
                })}
              >
                <div className="flex-1">
                  {activeThemeContext.layout !== 'raw' && showBreadcrum && (
                    <div className="mb-2xl">
                      <Breadcrumb activePath={activePath} />
                    </div>
                  )}
                  {pageType === 'blog' && frontMatter?.title && (
                    <BlogHeader
                      frontMatter={frontMatter}
                      timestamp={
                        pageOpts.timestamp
                          ? GitTimestamp({
                              timestamp: new Date(pageOpts.timestamp),
                            })
                          : ''
                      }
                    />
                  )}
                  {children}
                </div>
                <div className="bodyLg text-text-strong">
                  {activeThemeContext.timestamp &&
                  pageOpts.timestamp &&
                  activeThemeContext.layout !== 'raw'
                    ? GitTimestamp({ timestamp: new Date(pageOpts.timestamp) })
                    : null}
                </div>

                {showSidebar && (
                  <NavLinks
                    flatDirectories={flatDocsDirectories}
                    currentIndex={activeIndex}
                  />
                )}
              </MDXProvider>
            </main>
          </article>
        </Container>
        <Footer config={config} />
      </ActiveAnchorProvider>
    </div>
  );
};

export default function Layout(props: NextraThemeLayoutProps) {
  const { pageOpts } = props;
  return (
    <ConfigProvider pageOpts={pageOpts} config={config}>
      <Main {...props} />
    </ConfigProvider>
  );
}
