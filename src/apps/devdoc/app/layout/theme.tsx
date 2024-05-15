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
import { Chip } from 'kl-design-system/atoms/chips';
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
    <div className="wb-flex wb-flex-col wb-gap-5xl wb-pt-2xl wb-pb-xl">
      <div className="wb-flex wb-flex-col wb-gap-xl">
        <h1 className="wb-heading3xl wb-text-text-strong dark:wb-text-text-darktheme-strong">
          {frontMatter.title || frontMatter.companyName}
        </h1>
        <p className="wb-bodyLg wb-text-text-strong dark:wb-text-text-darktheme-strong">
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

const BlogTags = ({ tags = [] }: { tags: string[] }) => {
  return (
    <div className="flex flex-row items-center gap-lg">
      {tags.map((t) => (
        <Chip key={t} item={t} label={t} />
      ))}
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
    <div className="wb-bg-surface-basic-subdued dark:wb-bg-surface-darktheme-basic-subdued wb-min-h-screen wb-antialiased">
      <Head>
        <title>{title === 'Index' ? config.siteTitle : title}</title>
        <meta name="og:image" content={frontMatter.image} />
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
            'wb-min-h-[calc(100vh-76px)] wb-flex-row',
            activeThemeContext.layout === 'default'
              ? 'lg:wb-m-auto lg:!wb-max-w-[896px] wb-w-full wb-px-3xl md:!wb-px-5xl lg:!wb-px-8xl xl:!wb-px-11xl 2xl:!wb-px-12xl xl:!wb-max-w-[1024px] 2xl:!wb-max-w-[1120px] 3xl:!wb-min-w-[1408px] lg:!wb-box-content'
              : 'wb-max-w-none',
            ['blog', 'customer-stories'].includes(pageType)
              ? 'wb-py-6xl md:!wb-py-8xl'
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
          {!['blog', 'customer-stories'].includes(pageType) && showToc && (
            <nav className="wb-order-last wb-w-[230px] wb-max-w-[230px] wb-min-w-[226px] wb-sticky wb-top-[calc(var(--kl-navbar-height))] wb-self-start wb-hidden lg:wb-block">
              <TOC headings={headings} />
            </nav>
          )}
          {pageType === 'customer-stories' && (
            <div className="wb-order-last wb-w-[300px] wb-max-w-[300px] wb-min-w-[300px] wb-sticky wb-top-[20%] wb-self-start wb-hidden lg:wb-block wb-pb-2xl">
              <CompanyPanel frontMatter={frontMatter} />
            </div>
          )}
          <article
            className={cn(
              'wb-flex-1 wb-w-full',
              activeThemeContext.layout === 'raw' ? '' : 'wb-pt-xl'
            )}
          >
            <main
              className={cn(
                'wb-w-full wb-min-w-0 wb-min-h-[calc(100vh-101px)] wb-flex wb-flex-col',
                showSidebar ? 'wb-max-w-[72rem]' : '',
                activeThemeContext.layout === 'raw' ? '' : 'gap-6xl',
                pageType === 'docs'
                  ? 'wb-py-6xl xl:wb-px-3xl 3xl:!wb-px-7xl lg:!wb-max-w-[394px] xl:!wb-max-w-[510px] 2xl:!wb-max-w-[650px] 3xl:!wb-max-w-[938px]'
                  : '',
                ['customer-stories'].includes(pageType)
                  ? 'lg:!wb-pr-8xl xl:!wb-pr-10xl 2xl:!wb-pr-11xl 3xl:!wb-pr-15xl'
                  : '',
                ['blog'].includes(pageType)
                  ? 'lg:!wb-pr-8xl xl:!wb-pr-10xl 2xl:!wb-pr-11xl 3xl:!wb-px-14xl'
                  : ''
              )}
            >
              <MDXProvider
                components={createComponents({
                  isRawLayout: activeThemeContext.layout === 'raw',
                })}
              >
                <div className="wb-flex-1">
                  {activeThemeContext.layout !== 'raw' && showBreadcrum && (
                    <div className="wb-mb-2xl">
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

                <div className="wb-pt-5xl">
                  <BlogTags tags={frontMatter.tags || []} />
                </div>

                {!['blog', 'customer-stories'].includes(pageType) &&
                activeThemeContext.timestamp &&
                pageOpts.timestamp &&
                activeThemeContext.layout !== 'raw' ? (
                  <div className="wb-bodyLg wb-text-text-strong dark:wb-text-text-darktheme-strong">
                    {GitTimestamp({ timestamp: new Date(pageOpts.timestamp) })}
                  </div>
                ) : null}

                {!['blog', 'customer-stories'].includes(pageType) &&
                  showSidebar && (
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
