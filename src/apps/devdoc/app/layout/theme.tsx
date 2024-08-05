import Head from 'next/head';
import type { NextraThemeLayoutProps } from 'nextra';
import { MDXProvider } from 'nextra/mdx';
import { useEffect, useMemo } from 'react';
import { useFSRoute } from 'nextra/hooks';
import { Item, normalizePages } from 'nextra/normalize-pages';
import { useRouter } from 'next/router';
import { ArrowUpLg } from '@jengaicons/react';
import axios from 'axios';
import Footer from '~/app/components/footer';
import Container from '~/app/components/container';
import { NavLinks } from '~/app/components/nav-links';
import { TOC } from '~/app/components/toc';
import { Breadcrumb } from '~/app/components/breadcrum';
import { Sidebar } from '~/app/components/sidebar';
import HeaderSecondary from '~/app/components/header-secondary';
import { DEFAULT_LOCALE } from '~/app/utils/constants';
import { cn } from '~/app/utils/commons';
import useMenu from '~/app/utils/use-menu';
import { ActiveAnchorProvider } from '~/app/utils/active-anchor';
import config, { basePath, siteDesc } from '~/app/utils/config';
import { createComponents } from './mdx-components';
import { BlogHeader, BlogTags } from '../components/blog-utils';
import { CompanyPanel } from '../components/company-utils';
import { BackToTop } from '../components/back-to-top';
import useConfig from '../utils/use-config';
import ShareMenu from '../components/share-menu';
import Wrapper from '../components/wrapper';
import { GraphItem } from '../components/graph';
import { ExploringItem } from '../components/website/home/keep-exploring';
import consts from '../utils/const';
import { Block } from '../components/commons';
import { Flexsearch } from '../components/flexsearch';

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

const _ProductHuntStatus = () => {
  return (
    <div className="wb-flex wb-flex-col wb-hidden">
      <div className="wb-p-2xl wb-bg-surface-primary-default wb-text-center text-text-on-primary">
        Kloudlite is live on Product Hunt! &nbsp;
        <a
          target="_blank"
          href="https://www.producthunt.com/posts/kloudlite"
          className="hover:wb-bodyLg-underline wb-underline-offset-4"
        >
          Check out the launch and share your feedback!
        </a>
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

const isDocPage = (route: string) => route.includes('/docs');

const Main = ({ children, pageOpts }: NextraThemeLayoutProps) => {
  const { title, frontMatter, pageMap, headings, route } = pageOpts;

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
    [pageMap, locale, defaultLocale, fsPath],
  );

  const {
    flatDocsDirectories,
    activeIndex,
    activePath,
    activeThemeContext,
    docsDirectories,
    directories,
  } = pageData;

  const showSidebar = activeThemeContext.sidebar;
  const showToc = activeThemeContext.toc || false;
  const showBreadcrum = activeThemeContext?.breadcrumb;

  let pageType = 'normal';

  if (findPageType(activePath, ['blog'])) {
    pageType = 'blog';
  }

  if (isDocPage(route)) {
    pageType = 'docs';
  }

  if (findPageType(activePath, ['customer-stories'])) {
    pageType = 'customer-stories';
  }

  return (
    <div className="wb-bg-surface-basic-subdued wb-min-h-screen wb-antialiased">
      <Head>
        <title>{title === 'Index' ? config.siteTitle : title}</title>
        <meta
          name="description"
          content={frontMatter.description || siteDesc}
        />
        <meta name="og:image" content={`${basePath}${frontMatter.image}`} />
        <meta property="og:title" content={frontMatter.title || 'Kloudlite'} />
        <meta
          property="og:description"
          content={frontMatter.description || 'Kloudlite'}
        />

        {/* twitter metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KloudLite" />
        <meta
          name="twitter:creator"
          content={frontMatter.author || 'Kloudlite'}
        />
        <meta
          name="twitter:image"
          content={`${basePath}${frontMatter.image}`}
        />
        <meta
          name="twitter:description"
          content={frontMatter.description || 'Kloudlite'}
        />
      </Head>
      <ActiveAnchorProvider>
        <HeaderSecondary {...config?.headerSecondary} activePath={activePath} />
        <Container
          className={cn(
            'wb-min-h-[calc(100vh-76px)] wb-flex-row',
            activeThemeContext.layout === 'default'
              ? 'lg:wb-m-auto lg:!wb-max-w-[896px] wb-w-full wb-px-3xl md:!wb-px-5xl lg:!wb-px-8xl xl:!wb-px-11xl 2xl:!wb-px-12xl xl:!wb-max-w-[1024px] 2xl:!wb-max-w-[1120px] 3xl:!wb-min-w-[1408px] lg:!wb-box-content'
              : 'wb-max-w-none',
            ['blog', 'customer-stories'].includes(pageType)
              ? 'wb-py-6xl md:!wb-py-8xl'
              : '',
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
            <nav className="wb-order-last wb-w-[230px] wb-max-w-[230px] wb-min-w-[226px] wb-sticky wb-top-0 wb-self-start wb-hidden lg:wb-block">
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
              activeThemeContext.layout === 'raw' ? '' : 'lg:wb-pt-xl',
            )}
          >
            <main
              className={cn(
                'wb-w-full wb-min-w-0 wb-min-h-[calc(100vh-101px)] wb-flex wb-flex-col',
                showSidebar ? 'wb-max-w-[72rem]' : '',
                activeThemeContext.layout === 'raw' ? '' : 'gap-6xl',
                pageType === 'docs'
                  ? 'wb-py-3xl lg:wb-py-6xl xl:wb-px-3xl 3xl:!wb-px-7xl lg:!wb-max-w-[394px] xl:!wb-max-w-[510px] 2xl:!wb-max-w-[650px] 3xl:!wb-max-w-[938px]'
                  : '',
                ['customer-stories'].includes(pageType)
                  ? 'lg:!wb-pr-8xl xl:!wb-pr-10xl 2xl:!wb-pr-11xl 3xl:!wb-pr-15xl'
                  : '',
                ['blog'].includes(pageType)
                  ? 'md:wb-px-5xl lg:wb-px-8xl xl:!wb-px-11xl 2xl:!wb-px-12xl 3xl:!wb-px-14xl'
                  : '',
              )}
            >
              <MDXProvider
                components={createComponents({
                  isRawLayout: activeThemeContext.layout === 'raw',
                  isBlog: pageType === 'blog',
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

                {frontMatter.tags && (
                  <div className="wb-pt-5xl wb-flex wb-flex-col wb-gap-5xl md:wb-flex-row md:wb-items-center md:wb-justify-between">
                    <BlogTags tags={frontMatter.tags || []} />
                    <ShareMenu frontmatter={frontMatter} />
                  </div>
                )}

                {!['blog', 'customer-stories'].includes(pageType) &&
                activeThemeContext.timestamp &&
                pageOpts.timestamp &&
                activeThemeContext.layout !== 'raw' ? (
                  <div className="wb-bodyLg wb-text-text-strong wb-py-xl md:wb-py-6xl">
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
          {['blog'].includes(pageType) && (
            <div className="wb-z-50 wb-fixed wb-bottom-3xl wb-right-3xl md:wb-bottom-8xl md:wb-right-8xl">
              <BackToTop
                className="wb-shadow-darktheme-popover !wb-hidden"
                variant="basic"
                content="Back to top"
                prefix={<ArrowUpLg />}
                suffix={<div />}
                size="md"
              />
            </div>
          )}
        </Container>
        {['blog'].includes(pageType) && (
          <Wrapper>
            <Block
              title="Read more..."
              titleClass="md:!wb-heading3xl-marketing lg:!wb-heading3xl-marketing xl:!wb-heading3xl-marketing 2xl:!wb-heading3xl-marketing 3xl:!wb-heading3xl-marketing wb-text-start"
              titleContainerClass="wb-relative wb-z-[99] md:wb-top-[28px]"
            >
              <div className="wb-grid wb-grid-cols-1 md:wb-grid-cols-3 wb-gap-5xl">
                {consts.homeNew.exploring.map((ti) => {
                  return (
                    <GraphItem key={ti.label}>
                      <ExploringItem {...ti} />
                    </GraphItem>
                  );
                })}
              </div>
            </Block>
          </Wrapper>
        )}
        <Footer config={config} />
      </ActiveAnchorProvider>
      <Flexsearch />
    </div>
  );
};

export const fetchProviders = async () => {
  try {
    const res = await axios({
      url: `${process.env.AUTH_URL}/api` || 'https://auth.kloudlite.io/api',
      method: 'post',
      withCredentials: false,
      data: {
        method: 'loginPageInitUrls',
        args: [{}],
      },
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        connection: 'keep-alive',
      },
    });
    if (res.data?.data) {
      return res.data.data;
    }
    return null;
  } catch (e) {
    return null;
  }
};

const getUser = async () => {
  try {
    const res = await axios({
      url: `${process.env.AUTH_URL}/api` || 'https://auth.kloudlite.io/api',
      method: 'post',
      withCredentials: true,
      data: {
        method: 'whoAmI',
        args: [{}],
      },
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        connection: 'keep-alive',
      },
    });
    if (res.data?.data) {
      return res.data.data;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export default function Layout(props: NextraThemeLayoutProps) {
  const { pageOpts } = props;
  const { setConfig } = useConfig();
  useEffect(() => {
    setConfig((prev) => ({ ...prev, userApiLoading: true }));
    (async () => {
      const user = await getUser();
      setConfig((prev) => ({ ...prev, user, userApiLoading: false }));
    })();

    (async () => {
      const prov = await fetchProviders();
      setConfig((prev) => ({ ...prev, oathProviders: prov }));
    })();

    setConfig((prev) => ({ ...prev, pageOpts }));
  }, []);

  return <Main {...props} />;
}
