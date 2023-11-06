import Head from 'next/head';
import type { NextraThemeLayoutProps } from 'nextra';
import { MDXProvider } from 'nextra/mdx';
import { useEffect, useMemo } from 'react';
import Header from '~/components/header';
import { Button } from 'kl-design-system/atoms/button';
import { ArrowSquareOut } from '@jengaicons/react';
import { useFSRoute } from 'nextra/hooks';
import { normalizePages } from 'nextra/normalize-pages';
import { useRouter } from 'next/router';
import Footer from '~/components/footer';
import Container from '~/components/container';
import NavFooter from '~/components/nav-footer';
import { NavLinks } from '~/components/nav-links';
import { DEFAULT_LOCALE } from '~/utiltities/constants';
import { cn } from '~/utiltities/commons';
import useMenu from '~/utiltities/use-menu';
import { Sidebar } from '~/components/ssidebar';
import createComponents from './mdx-components';
import { BackToTop } from '~/components/back-to-top';
import { TOC } from '~/components/toc';
import { ActiveAnchorProvider } from '~/utiltities/active-anchor';
import { Breadcrumb } from '~/components/breadcrum';

export default function Layout({ children, pageOpts }: NextraThemeLayoutProps) {
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

  console.log(activeThemeContext);

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
        <Container className="min-h-[calc(100vh-76px)]">
          <Sidebar
            docsDirectories={docsDirectories}
            fullDirectories={directories}
            headings={headings}
            asPopover={hideSidebar}
            includePlaceholder
          />
          {!hideSidebar && (
            <nav className="order-last w-[226px] max-w-[226px] min-w-[226px] py-6xl sticky top-[76px] self-start hidden  lg:block">
              <TOC headings={headings} />
            </nav>
          )}
          <article className="flex-1">
            <main
              className={cn(
                'md:p-6xl w-full min-w-0 min-h-[calc(100vh-101px)] flex flex-col',
                !hideSidebar ? 'max-w-[72rem]' : ''
              )}
            >
              <MDXProvider components={createComponents}>
                {activeThemeContext.layout !== 'full' && (
                  <Breadcrumb activePath={activePath} />
                )}
                <div className="flex-1">{children}</div>
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
}
