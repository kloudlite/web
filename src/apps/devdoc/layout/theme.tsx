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
import Select from 'react-select-test';
import createComponents from './mdx-components';
import 'react-select-test/index.css';

export function mapper<A, B>(
  array: A[],
  transform: (value: A, index: number) => B
): B[] {
  let _;
  return array.map(transform);
}

const _f = async () => {
  const x = await (
    await fetch('https://jsonplaceholder.typicode.com/photos')
  ).json();
  const k = mapper(x, (d: any) => ({
    label: `${d.title}`,
    value: `${d.id}`,
    extra: { a: 'h', url: d.thumbnailUrl },
  }));
  return [...k, ...k, ...k];
};

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
                'md:p-6xl w-full min-w-0 min-h-[calc(100vh-101px)] flex flex-col gap-6xl',
                !hideSidebar ? 'max-w-[72rem]' : ''
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
                <Select
                  options={_f}
                  value={undefined}
                  onChange={(e) => {
                    console.log(e);
                  }}
                />
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
