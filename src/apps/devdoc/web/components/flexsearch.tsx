/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
// flexsearch types are incorrect, they were overwritten in tsconfig.json
import FlexSearch from 'flexsearch';
import { useRouter } from 'next/router';
import type { SearchData } from 'nextra';
import type { KeyboardEvent, ReactElement, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import Popup from 'kl-design-system/molecule/popup';
import { Search, X } from '@jengaicons/react';
import Link from 'next/link';
import { IconButton } from 'kl-design-system/atoms/button';
import lodash from 'lodash';
import ListNavigate from './list-navigate';
import { HighlightMatches } from './highlight-matches';
import { DEFAULT_LOCALE } from '../utils/constants';
import { cn } from '../utils/commons';
import useSearch from '../utils/use-search';
import OptionList from 'kl-design-system/atoms/option-list';
import consts from '../utils/const';

type SearchResult = {
  children: ReactNode;
  category: ReactNode;
  id: string;
  prefix?: ReactNode;
  route: string;
};

// @ts-ignore
type SectionIndex = FlexSearch.Document<
  {
    id: string;
    url: string;
    title: string;
    pageId: string;
    content: string;
    display?: string;
  },
  ['title', 'content', 'url', 'display']
>;

// @ts-ignore
type PageIndex = FlexSearch.Document<
  {
    id: number;
    title: string;
    content: string;
  },
  ['title']
>;

type Result = {
  _page_rk: number;
  _section_rk: number;
  route: string;
  prefix: ReactNode;
  category: ReactNode;
  children: ReactNode;
};

// This can be global for better caching.
const indexes: {
  [locale: string]: [PageIndex, SectionIndex];
} = {};

// Caches promises that load the index
const loadIndexesPromises = new Map<string, Promise<void>>();

const loadIndexesImpl = async (
  basePath: string,
  locale: string,
): Promise<void> => {
  const response = await fetch(
    `${basePath}/_next/static/chunks/nextra-data-${locale}.json`,
  );
  const searchData = (await response.json()) as SearchData;

  const pageIndex: PageIndex = new FlexSearch.Document({
    cache: 100,
    tokenize: 'full',
    document: {
      id: 'id',
      index: 'content',
      store: ['title'],
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true,
    },
  });

  const sectionIndex: SectionIndex = new FlexSearch.Document({
    cache: 100,
    tokenize: 'full',
    document: {
      id: 'id',
      index: 'content',
      tag: 'pageId',
      store: ['title', 'content', 'url', 'display'],
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true,
    },
  });

  let pageId = 0;

  for (const [route, structurizedData] of Object.entries(searchData)) {
    let pageContent = '';
    ++pageId;

    for (const [key, content] of Object.entries(structurizedData.data)) {
      const [headingId, headingValue] = key.split('#');
      const url = route + (headingId ? `#${headingId}` : '');
      const title = headingValue || structurizedData.title;
      const paragraphs = content.split('\n');

      sectionIndex.add({
        id: url,
        url,
        title,
        pageId: `page_${pageId}`,
        content: title,
        ...(paragraphs[0] && { display: paragraphs[0] }),
      });

      for (let i = 0; i < paragraphs.length; i++) {
        sectionIndex.add({
          id: `${url}_${i}`,
          url,
          title,
          pageId: `page_${pageId}`,
          content: paragraphs[i],
        });
      }

      // Add the page itself.
      pageContent += ` ${title} ${content}`;
    }

    pageIndex.add({
      id: pageId,
      title: structurizedData.title,
      content: pageContent,
    });
  }

  indexes[locale] = [pageIndex, sectionIndex];
};

const loadIndexes = (basePath: string, locale: string): Promise<void> => {
  const key = `${basePath}@${locale}`;
  if (loadIndexesPromises.has(key)) {
    return loadIndexesPromises.get(key)!;
  }
  const promise = loadIndexesImpl(basePath, locale);
  loadIndexesPromises.set(key, promise);
  return promise;
};

const SuggestionItem = ({
  title,
  desc,
  link,
}: {
  title: string;
  desc: string;
  link: string;
}) => {
  return (
    <Link href={link}>
      <OptionList.OptionItemRaw className="wb-rounded">
        <div className="wb-flex wb-flex-col wb-gap-md">
          <span className="wb-bodyLg-medium wb-text-text-default">{title}</span>
          <span className="wb-bodyMd wb-text-text-soft">{desc}</span>
        </div>
      </OptionList.OptionItemRaw>
    </Link>
  );
};

export function Flexsearch(): ReactElement {
  const { locale = DEFAULT_LOCALE, basePath } = useRouter();
  const [loading, setLoading] = useState(false);
  const [_error, setError] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [search, setSearch] = useState('');

  const doSearch = (search: string) => {
    if (!search) return;
    const [pageIndex, sectionIndex] = indexes[locale];

    // Show the results for the top 5 pages
    const pageResults =
      pageIndex.search<true>(search, 5, {
        enrich: true,
        suggest: true,
      })[0]?.result || [];

    const results: Result[] = [];
    const pageTitleMatches: Record<number, number> = {};

    for (let i = 0; i < pageResults.length; i++) {
      const result = pageResults[i];
      pageTitleMatches[i] = 0;

      // Show the top 5 results for each page
      const sectionResults =
        sectionIndex.search<true>(search, 5, {
          enrich: true,
          suggest: true,
          tag: `page_${result.id}`,
        })[0]?.result || [];

      let isFirstItemOfPage = true;
      const occurred: Record<string, boolean> = {};

      for (let j = 0; j < sectionResults.length; j++) {
        const { doc } = sectionResults[j];
        const isMatchingTitle = doc.display !== undefined;
        if (isMatchingTitle) {
          pageTitleMatches[i]++;
        }
        const { url, title } = doc;
        const content = doc.display || doc.content;
        if (occurred[`${url}@${content}`]) continue;
        occurred[`${url}@${content}`] = true;
        results.push({
          _page_rk: i,
          _section_rk: j,
          route: url,
          category: null,
          prefix: isFirstItemOfPage && (
            <div
              className={cn(
                'wb-headingMd wb-mx-xl wb-pb-md wb-mb-md wb-border-b wb-border-border-default',
              )}
            >
              {result.doc.title}
            </div>
          ),
          children: (
            <>
              <div className="wb-text-base wb-bodyLg-medium wb-text-text-default">
                <HighlightMatches match={search} value={title} />
              </div>
              {content && (
                <div className="wb-excerpt wb-bodyMd wb-text-text-soft">
                  <HighlightMatches match={search} value={content} />
                </div>
              )}
            </>
          ),
        });
        isFirstItemOfPage = false;
      }
    }

    const groupedByCategory = lodash.groupBy(results, (item) => {
      if (item.route.startsWith('/docs')) return 'Docs';
      if (item.route.startsWith('/blog')) return 'Blogs';
      return 'All';
    });

    const sortedGroups = lodash.mapValues(groupedByCategory, (group, cat) => {
      const sortedGroup = group.sort((a, b) => {
        if (a._page_rk === b._page_rk) {
          return a._section_rk - b._section_rk;
        }
        if (pageTitleMatches[a._page_rk] !== pageTitleMatches[b._page_rk]) {
          return pageTitleMatches[b._page_rk] - pageTitleMatches[a._page_rk];
        }
        return a._page_rk - b._page_rk;
      });

      if (sortedGroup.length > 0) {
        sortedGroup[0].category = cat;
      }
      return sortedGroup;
    });

    const temp = {
      Docs: sortedGroups['Docs'] || [],
      Blogs: sortedGroups['Blogs'] || [],
    };

    const sortedArray = lodash.flatten(lodash.values(temp));

    setResults(
      sortedArray
        .map((res) => ({
          id: `${res._page_rk}_${res._section_rk}`,
          route: res.route,
          prefix: res.prefix,
          category: res.category,
          children: res.children,
        }))
        .filter(
          (f) => f.route.startsWith('/docs') || f.route.startsWith('/blog'),
        ),
    );
  };

  const preload = useCallback(
    async (active: boolean) => {
      if (active && !indexes[locale]) {
        setLoading(true);
        try {
          await loadIndexes(basePath, locale);
        } catch (e) {
          setError(true);
        }
        setLoading(false);
      }
    },
    [locale, basePath],
  );

  const handleChange = async (value: string) => {
    setSearch(value);
    if (loading) {
      return;
    }
    if (!indexes[locale]) {
      setLoading(true);
      try {
        await loadIndexes(basePath, locale);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    }
    doSearch(value);
  };

  const [keyEvent, setKeyEvent] = useState<KeyboardEvent<HTMLInputElement>>();
  const { show, setShow } = useSearch();

  useEffect(() => {
    if (show) {
      preload(true);
    } else {
      setResults([]);
      setSearch('');
    }
  }, [show]);

  return (
    <Popup.Root
      show={show}
      onOpenChange={(e) => {
        setShow(e);
      }}
    >
      <Popup.Content className="!wb-p-0">
        <div className="wb-flex wb-flex-col">
          <div className="wb-flex wb-flex-row wb-items-center wb-sticky wb-top-0 wb-bg-surface-basic-input wb-border-b wb-border-border-default wb-pr-xs">
            <span className="wb-pl-xl wb-pr-md wb-py-xl wb-text-text-default">
              <Search size={20} />
            </span>
            <input
              className="wb-flex-1 focus-within:wb-outline-none focus-visible:wb-outline-none wb-outline-none wb-p-lg wb-min-h-[32px] wb-box-content wb-bodyLg placeholder:wb-text-text-disabled wb-text-text-default wb-bg-surface-basic-input"
              placeholder="Search"
              onKeyDown={setKeyEvent}
              value={search}
              onChange={({ target }) => {
                if (target.value === '') {
                  setResults([]);
                }
                handleChange(target.value);
              }}
            />
            <span className="wb-pl-lg wb-pr-xl wb-bodyMd wb-text-text-soft">
              ⌘K
            </span>
            <div className="wb-border-l wb-border-border-default wb-h-[26px]" />
            <IconButton
              variant="plain"
              size="md"
              icon={<X />}
              onClick={() => {
                setShow(false);
              }}
            />
          </div>
          <div className="wb-bg-surface-basic-default">
            {results.length === 0 && !!search && (
              <div className="wb-bodyMd wb-px-4xl wb-py-8xl wb-text-center wb-text-text-soft">
                No recent results
              </div>
            )}
            {results.length === 0 && !search && (
              <div className="wb-bodyMd wb-p-xl wb-text-text-soft wb-min-h-[250px]">
                <div className="wb-px-xl wb-py-lg">Suggestions</div>
                <div className="wb-flex wb-flex-col wb-gap-md">
                  {consts.searchSuggestions.map((ss) => (
                    <SuggestionItem key={ss.title} {...ss} />
                  ))}
                </div>
              </div>
            )}
            {results.length > 0 && (
              <ListNavigate
                selectedClass="wb-bg-surface-basic-hovered"
                keyPressEvent={keyEvent}
                className="wb-py-xl wb-px-lg wb-flex wb-flex-col wb-space-y-lg"
                childSelectorClass="search-result-item"
              >
                {results.map((res) => (
                  <>
                    {res.category ? (
                      <div className="wb-bg-surface-basic-default wb-sticky wb-top-[49px] wb-text-text-default wb-p-xl wb-pb-2xl wb-headingXl">
                        {res.category}
                      </div>
                    ) : null}
                    <div key={res.id} className="wb-flex wb-flex-col">
                      <div className="text-text-default">{res.prefix}</div>
                      <Link
                        href={res.route}
                        className="wb-transition-all wb-rounded search-result-item wb-flex wb-flex-col wb-gap-md wb-px-xl wb-py-lg"
                      >
                        {res.children}
                      </Link>
                    </div>
                  </>
                ))}
              </ListNavigate>
            )}
          </div>
        </div>
      </Popup.Content>
    </Popup.Root>
  );
}
