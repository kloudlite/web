import { Search } from '@jengaicons/react';
import { TextInput } from 'kl-design-system/atoms/input';
import Tab from 'kl-design-system/atoms/tabs';
import { useEffect, useState } from 'react';
import { PageMapItem } from 'nextra';
import { useRouter } from 'next/router';
import { usePagination } from 'kl-design-system/molecule/pagination';
import useConfig from '~/app/utils/use-config';
import { DEFAULT_LOCALE } from '~/app/utils/constants';
import { cn } from '~/app/utils/commons';
import consts from '~/app/utils/const';
import SectionWrapper from '../website/section-wrapper';
import { GraphExtended, GraphItem } from '../graph';
import { Block } from '../commons';
import Pagination from '../website/pagination';
import { ExploringItem } from '../website/home/keep-exploring';

const tabs = [
  {
    label: 'Overview',
    value: 'overview',
  },
  {
    label: 'Engineering',
    value: 'engineering',
  },
  {
    label: 'Community',
    value: 'community',
  },
];

const tabItems = {
  overview: consts.homeNew.exploring,
  engineering: consts.homeNew.exploring,
  community: consts.homeNew.exploring,
};

const ListDetailItem = ({
  frontMatter,
}: {
  frontMatter: Record<string, any> | undefined;
}) => {
  const { locale = DEFAULT_LOCALE } = useRouter();
  return (
    <>
      <div className="wb-bodyLg md:wb-w-[180px] wb-capitalize wb-text-text-soft wb-hidden md:wb-block">
        {frontMatter?.category}
      </div>
      <div className="wb-bodyLg wb-w-[200px] wb-text-text-soft wb-hidden md:wb-block">
        {new Date(frontMatter?.date).toLocaleDateString(locale, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </div>
      <div className="wb-flex wb-flex-col wb-gap-md md:wb-hidden">
        <div className="wb-bodyLg wb-w-[180px] wb-capitalize wb-text-text-soft">
          {frontMatter?.category}
        </div>
        <div className="wb-bodyLg wb-w-[200px] wb-text-text-soft">
          {new Date(frontMatter?.date).toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>
      </div>
    </>
  );
};
const BlogHome = () => {
  const [tab, setTab] = useState<'overview' | 'engineering' | 'community'>(
    'overview'
  );

  const config = useConfig();

  const { page, pageNumber, setPageNumber, itemsPerPage, setItems, items } =
    usePagination({
      items: [] as any,
      itemsPerPage: 10,
    });

  useEffect(() => {
    const blogPage = config.config.pageOpts?.pageMap.find(
      (p) => p.kind === 'Folder' && p.route === '/blog'
    );

    const blogPosts =
      blogPage?.kind === 'Folder'
        ? blogPage.children.filter(
            (f) => f.kind === 'MdxPage' && f.frontMatter && !f.frontMatter.draft
          ) || ([] as PageMapItem[])
        : ([] as PageMapItem[]);
    // @ts-ignore
    setItems(
      blogPosts.sort((a: any, b: any) => {
        // @ts-ignore
        return new Date(b?.frontMatter?.date) - new Date(a?.frontMatter?.date);
      })
    );
  }, [config]);

  return (
    <div className="wb-flex wb-flex-col">
      <div className="wb-py-6xl md:wb-py-8xl lg:wb-py-10xl wb-flex wb-flex-col">
        <div className="wb-flex wb-flex-col wb-gap-3xl">
          <h1 className="wb-heading4xl-marketing lg:wb-heading5xl-marketing wb-text-text-default">
            Blog
          </h1>
          <p className="wb-bodyXl lg:wb-bodyXXl wb-text-text-soft">
            The one stop shop for latest tech trends, tools, insights, and
            analysis
          </p>
        </div>
        <div className="wb-flex wb-flex-col wb-gap-3xl md:wb-gap-0 md:wb-flex-row md:wb-items-center wb-justify-between wb-pt-5xl 3xl:wb-pt-8xl">
          <div className="-wb-ml-xl md:wb-ml-0">
            <Tab.Root size="sm" value={tab} onChange={setTab}>
              {tabs.map((t) => (
                <Tab.Tab key={t.value} label={t.label} value={t.value} />
              ))}
            </Tab.Root>
          </div>
          <div className="wb-w-full md:wb-w-[330px]">
            <TextInput placeholder="Search" prefixIcon={<Search />} />
          </div>
        </div>
        <SectionWrapper className="wb-flex wb-flex-col" noPadding>
          <GraphExtended>
            <div className="wb-grid wb-grid-cols-1 md:wb-grid-cols-3 wb-gap-5xl">
              {tabItems[tab].map((ti) => {
                return (
                  <GraphItem key={ti.label}>
                    <ExploringItem {...ti} />
                  </GraphItem>
                );
              })}
            </div>
          </GraphExtended>
          <Block
            title="Latest blogs"
            titleClass="md:!wb-heading3xl-marketing lg:!wb-heading3xl-marketing xl:!wb-heading3xl-marketing 2xl:!wb-heading3xl-marketing 3xl:wb-heading3xl-marketing wb-text-start"
          >
            <div className="wb-grid wb-grid-cols-1 md:wb-grid-rows-[64px_auto_64px] lg:wb-grid-rows-[64px_640px_64px]">
              <div className="wb-hidden md:wb-block">
                <GraphItem>
                  <div className="wb-flex wb-flex-row wb-items-center wb-py-xl wb-px-5xl wb-h-8xl wb-headingMd wb-text-text-default wb-bg-surface-basic-active">
                    <span className="wb-flex-1">Name</span>
                    <span className="wb-w-[180px]">Category</span>
                    <span className="wb-w-[200px]">Published date</span>
                  </div>
                </GraphItem>
              </div>
              <GraphItem className="md:wb-min-h-[640px] wb-flex wb-flex-col wb-bg-surface-basic-subdued">
                {page.map((bp: any, index: any) => {
                  if (bp.kind !== 'MdxPage') {
                    return null;
                  }
                  return (
                    <a
                      href={bp.route}
                      key={bp.name}
                      className="flex flex-col wb-gap-3xl hover:wb-bg-surface-basic-hovered"
                    >
                      <div
                        className={cn(
                          'flex wb-pt-3xl md:wb-py-xl wb-px-3xl md:wb-px-5xl wb-flex wb-flex-col  wb-gap-3xl md:wb-gap-2xl md:wb-flex-row md:wb-items-center lg:wb-h-8xl md:wb-line-clamp-1 wb-transition-all',
                          index === page.length - 1 ? 'wb-pb-3xl' : ''
                        )}
                      >
                        <div className="wb-flex-1 wb-bodyLg wb-text-text-default lg:wb-line-clamp-1">
                          {bp.frontMatter?.title}
                        </div>
                        <ListDetailItem frontMatter={bp.frontMatter} />
                      </div>
                      {index < page.length - 1 && (
                        <div className="md:wb-hidden wb-h-[1.5px] wb-bg-border-dark" />
                      )}
                    </a>
                  );
                })}
              </GraphItem>
              <GraphItem className="wb-px-5xl wb-py-xl wb-flex wb-flex-row wb-items-center wb-bg-surface-basic-subdued">
                <div className="wb-bodyLg wb-text-text-strong wb-flex-1">
                  1-{items.length < 10 ? items.length : 3} of {items.length}
                </div>
                <div className="wb-flex wb-flex-row wb-items-center wb-gap-md">
                  <Pagination
                    totalItems={items.length}
                    onPageChanged={setPageNumber}
                    currentPage={pageNumber}
                    itemsPerPage={itemsPerPage}
                  />
                </div>
              </GraphItem>
            </div>
          </Block>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default BlogHome;
