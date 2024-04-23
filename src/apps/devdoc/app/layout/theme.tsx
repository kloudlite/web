import Head from 'next/head';
import type { NextraThemeLayoutProps } from 'nextra';
import { MDXProvider } from 'nextra/mdx';
import { ReactNode, useEffect, useMemo } from 'react';
import { useFSRoute } from 'nextra/hooks';
import { Item, normalizePages } from 'nextra/normalize-pages';
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
import { Button } from 'kl-design-system/atoms/button';
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

const CompanyElement = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className="flex flex-col gap-lg">
      <div className="headingMd text-surface-tertiary-default">{name}</div>
      <div className="bodyMd text-surface-tertiary-default">{value}</div>
    </div>
  );
};

const CompanyPanel = ({
  frontMatter,
}: {
  frontMatter: {
    [key: string]: any;
  };
}) => {
  return (
    <div className="flex flex-col gap-3xl rounded-lg border border-border-default bg-surface-basic-subdued px-3xl pt-3xl pb-5xl">
      <CompanyElement name="Company name" value={frontMatter?.companyName} />
      <CompanyElement name="About" value={frontMatter?.companyAbout} />
      <CompanyElement name="Industry" value={frontMatter?.companyIndustry} />
      <CompanyElement name="Solutions" value={frontMatter?.companySolutions} />
      <div className="h-xs bg-border-default w-full" />
      <div className="flex flex-col gap-xl">
        <div className="headingMd text-surface-tertiary-default">
          Ready to get started?
        </div>
        <div>
          <Button variant="tertiary" content="Contact sales" />
        </div>
      </div>
    </div>
  );
};

const findPageType = (activePath: Item[], names: string[]) => {
  return (
    activePath.length > 0 &&
    activePath[activePath.length - 1].kind === 'MdxPage' &&
    activePath[activePath.length - 1].route !== activePath[0].route &&
    [...names].includes(activePath[0].name)
  );
};

const BlogHeader = ({
  frontMatter,
  timestamp,
  author = true,
}: {
  frontMatter: {
    [key: string]: any;
  };
  timestamp: string | ReactNode;
  author?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-5xl pt-2xl">
      <div className="flex flex-col gap-xl">
        <h1 className="heading3xl text-text-strong">
          {frontMatter.title || frontMatter.companyName}
        </h1>
        <p className="bodyLg text-text-strong">
          {frontMatter.describe || frontMatter.companyDescription}
        </p>
      </div>
      {author && (
        <Profile
          responsive={false}
          name={`Written by ${frontMatter.author}`}
          subtitle={timestamp}
        />
      )}
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

  if (findPageType(activePath, ['blog', 'help-and-support'])) {
    pageType = 'blog';
  }

  if (findPageType(activePath, ['docs'])) {
    pageType = 'docs';
  }

  if (findPageType(activePath, ['customer-stories'])) {
    pageType = 'customer-stories';
  }



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
            ['blog', 'customer-stories'].includes(pageType)
              ? 'py-6xl md:!py-8xl'
              : ''
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
          {pageType === 'customer-stories' && (
            <div className="order-last w-[300px] max-w-[300px] min-w-[300px] sticky top-[20%] self-start hidden lg:block pb-2xl">
              <CompanyPanel frontMatter={frontMatter} />
            </div>
          )}
          <article
            className={cn(
              'flex-1',
              activeThemeContext.layout === 'raw' ? '' : 'pt-xl'
            )}
          >
            <main
              className={cn(
                ' w-full min-w-0 min-h-[calc(100vh-101px)] flex flex-col ',
                showSidebar ? 'max-w-[72rem]' : '',
                activeThemeContext.layout === 'raw' ? '' : 'gap-6xl',
                pageType === 'docs'
                  ? 'py-6xl xl:px-3xl 3xl:!px-7xl lg:!max-w-[394px] xl:!max-w-[510px] 2xl:!max-w-[650px] 3xl:!max-w-[938px]'
                  : '',
                ['blog', 'customer-stories'].includes(pageType)
                  ? 'lg:!pr-8xl xl:!pr-10xl 2xl:!pr-11xl 3xl:!pr-15xl'
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
                  {['blog', 'customer-stories'].includes(pageType) &&
                    (frontMatter?.title || frontMatter?.companyName) && (
                      <BlogHeader
                        author={pageType !== 'customer-stories'}
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
