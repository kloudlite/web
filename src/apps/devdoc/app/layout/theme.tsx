import Head from 'next/head';
import type { NextraThemeLayoutProps } from 'nextra';
import { MDXProvider } from 'nextra/mdx';
import { useEffect, useMemo } from 'react';
import { useFSRoute } from 'nextra/hooks';
import { normalizePages } from 'nextra/normalize-pages';
import { useRouter } from 'next/router';
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

const Main = ({ children, pageOpts }: NextraThemeLayoutProps) => {
  const { title, frontMatter, pageMap, headings } = pageOpts;
  const { state } = useMenu();

  useEffect(() => {
    document.body.style.overflow = state ? 'hidden' : '';
  }, [state]);

  const { locale = DEFAULT_LOCALE, defaultLocale } = useRouter();
  const fsPath = useFSRoute();

  const {
    flatDocsDirectories,
    activeIndex,
    topLevelNavbarItems,
    activePath,
    activeType,
    activeThemeContext,
    docsDirectories,
    directories,
  } = useMemo(
    () =>
      normalizePages({
        list: pageMap,
        locale,
        defaultLocale,
        route: fsPath,
      }),
    [pageMap, locale, defaultLocale, fsPath]
  );

  const hideSidebar = activeType === 'page';

  return (
    <div className="bg-surface-basic-subdued min-h-screen antialiased">
      <Head>
        <title>{title}</title>
        <meta name="og:image" content={frontMatter.image} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/inter.woff2"
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
      </Head>
      <ActiveAnchorProvider>
        {activeThemeContext.layout !== 'raw' ? (
          <Header navitems={topLevelNavbarItems} activePath={activePath} />
        ) : (
          <HeaderSecondary {...config?.headerSecondary} />
        )}

        <Container
          className={cn(
            'min-h-[calc(100vh-76px)] flex-row',
            activeThemeContext.layout === 'default'
              ? 'max-w-[1440px]'
              : 'max-w-none'
          )}
        >
          <Sidebar
            docsDirectories={docsDirectories}
            fullDirectories={directories}
            headings={headings}
            asPopover={hideSidebar}
            includePlaceholder
          />
          {!hideSidebar && (
            <nav className="order-last w-[226px] max-w-[226px] min-w-[226px] sticky top-[calc(var(--kl-navbar-height))] self-start hidden lg:block">
              <TOC headings={headings} />
            </nav>
          )}
          <article className="flex-1 overflow-x-hidden pt-xl">
            <main
              className={cn(
                ' w-full min-w-0 min-h-[calc(100vh-101px)] flex flex-col gap-6xl',
                !hideSidebar ? 'max-w-[72rem]' : '',
                { 'md:p-6xl': activeThemeContext.layout === 'default' }
              )}
            >
              <MDXProvider
                components={createComponents({
                  isRawLayout: activeThemeContext.layout === 'raw',
                })}
              >
                <div className="flex-1">
                  {activeThemeContext.layout !== 'raw' && (
                    <div className="mb-2xl">
                      <Breadcrumb activePath={activePath} />
                    </div>
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

                {!hideSidebar && (
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
