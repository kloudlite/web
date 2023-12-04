import Head from 'next/head';
import type { NextraThemeLayoutProps } from 'nextra';
import { MDXProvider } from 'nextra/mdx';
import { useEffect, useMemo } from 'react';
import Header from '~/components/header';
import { useFSRoute } from 'nextra/hooks';
import { normalizePages } from 'nextra/normalize-pages';
import { useRouter } from 'next/router';
import config from 'config';
import Footer from '~/components/footer';
import Container from '~/components/container';
import { NavLinks } from '~/components/nav-links';
import { DEFAULT_LOCALE } from '~/utiltities/constants';
import { cn } from '~/utiltities/commons';
import useMenu from '~/utiltities/use-menu';
import { TOC } from '~/components/toc';
import { ActiveAnchorProvider } from '~/utiltities/active-anchor';
import { Breadcrumb } from '~/components/breadcrum';
import { ConfigProvider } from '~/utiltities/use-config';
import { Sidebar } from '~/components/sidebar';
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
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <ActiveAnchorProvider>
        {activeThemeContext.layout !== 'raw' && (
          <Header navitems={topLevelNavbarItems} activePath={activePath} />
        )}
        <Container
          className="min-h-[calc(100vh-76px)]"
          layout={activeThemeContext.layout}
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
          <article className="flex-1 overflow-x-hidden">
            <main
              className={cn(
                ' w-full min-w-0 min-h-[calc(100vh-101px)] flex flex-col gap-6xl',
                !hideSidebar ? 'max-w-[72rem]' : '',
                { 'md:p-6xl': activeThemeContext.layout === 'default' }
              )}
            >
              <MDXProvider components={createComponents}>
                <div className="flex-1">
                  <div className="mb-2xl">
                    {activeThemeContext.layout !== 'full' && (
                      <Breadcrumb activePath={activePath} />
                    )}
                  </div>
                  {children}
                </div>
                <div className="bodyLg text-text-strong">
                  {activeThemeContext.timestamp &&
                  pageOpts.timestamp &&
                  activeThemeContext.layout !== 'full'
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
        <Footer />
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
