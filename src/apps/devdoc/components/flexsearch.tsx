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
import { Search } from '@jengaicons/react';
import Link from 'next/link';
import { cn } from '~/utiltities/commons';
import { DEFAULT_LOCALE } from '~/utiltities/constants';
import ListNavigate from './list-navigate';
import { HighlightMatches } from './highlight-matches';
import useSearch from '~/utiltities/use-search';

type SearchResult = {
  children: ReactNode;
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
  locale: string
): Promise<void> => {
  const response = await fetch(
    `${basePath}/_next/static/chunks/nextra-data-${locale}.json`
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
          prefix: isFirstItemOfPage && (
            <div
              className={cn(
                'headingMd mx-xl pb-md mb-md border-b border-border-default'
              )}
            >
              {result.doc.title}
            </div>
          ),
          children: (
            <>
              <div className="text-base bodyMd-semibold text-text-default">
                <HighlightMatches match={search} value={title} />
              </div>
              {content && (
                <div className="excerpt bodySm text-text-soft">
                  <HighlightMatches match={search} value={content} />
                </div>
              )}
            </>
          ),
        });
        isFirstItemOfPage = false;
      }
    }

    setResults(
      results
        .sort((a, b) => {
          // Sort by number of matches in the title.
          if (a._page_rk === b._page_rk) {
            return a._section_rk - b._section_rk;
          }
          if (pageTitleMatches[a._page_rk] !== pageTitleMatches[b._page_rk]) {
            return pageTitleMatches[b._page_rk] - pageTitleMatches[a._page_rk];
          }
          return a._page_rk - b._page_rk;
        })
        .map((res) => ({
          id: `${res._page_rk}_${res._section_rk}`,
          route: res.route,
          prefix: res.prefix,
          children: res.children,
        }))
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
    [locale, basePath]
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
      <Popup.Content className="!p-0">
        <div className="flex flex-col">
          <div className="flex flex-row items-center sticky top-0 bg-surface-basic-default border-b border-border-default">
            <span className="pl-xl pr-md py-xl">
              <Search size={20} />
            </span>
            <input
              className="flex-1 outline-none p-lg min-h-[32px] box-content bodyLg placeholder:text-text-disabled text-text-default"
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
            <span className="pl-lg px-lg bodyMd text-text-soft">⌘K</span>
          </div>
          <div>
            {results.length === 0 && (
              <div className="bodyMd px-4xl py-8xl text-center text-text-soft">
                No recent results
              </div>
            )}
            {results.length > 0 && (
              <ListNavigate
                selectedClass="bg-surface-basic-hovered"
                keyPressEvent={keyEvent}
                className="py-xl px-lg flex flex-col space-y-lg"
                childSelectorClass="search-result-item"
              >
                {results.map((res) => (
                  <div key={res.id} className="flex flex-col">
                    <div>{res.prefix}</div>
                    <Link
                      href={res.route}
                      className="transition-all rounded search-result-item flex flex-col gap-md px-xl py-lg"
                    >
                      {res.children}
                    </Link>
                  </div>
                ))}
              </ListNavigate>
            )}
          </div>
        </div>
      </Popup.Content>
    </Popup.Root>
  );
}
