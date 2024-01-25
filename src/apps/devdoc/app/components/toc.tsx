import type { Heading } from 'nextra';
import type { ReactElement } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

import { Button } from 'kl-design-system/atoms/button';
import { ArrowSquareOut } from '@jengaicons/react';
import Link from 'next/link';
import { LayoutGroup, motion } from 'framer-motion';
import { BackToTop } from './back-to-top';
import useConfig from '../utils/use-config';
import { useActiveAnchor } from '../utils/active-anchor';
import { cn } from '../utils/commons';
import getGitIssueUrl from '../utils/get-git-issue-url';

export type TOCProps = {
  headings: Heading[];
};

export function TOC({ headings }: TOCProps): ReactElement {
  const { config } = useConfig();
  const activeAnchor = useActiveAnchor();
  const tocRef = useRef<HTMLDivElement>(null);

  const items = useMemo(
    () => headings.filter((heading) => heading.depth > 1),
    [headings]
  );

  const hasHeadings = items.length > 0;

  const activeSlug = Object.entries(activeAnchor).find(
    ([, { isActive }]) => isActive
  )?.[0];

  useEffect(() => {
    if (!activeSlug) return;
    const anchor = tocRef.current?.querySelector(
      `li > a[href="#${activeSlug}"]`
    );

    if (anchor) {
      console.log(activeSlug, anchor);
      setTimeout(() => {
        scrollIntoView(anchor, {
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
          scrollMode: 'always',
          boundary: tocRef.current,
        });
      }, 100);
      // anchor.scrollIntoView({ block: '' });
    }
  }, [activeSlug]);

  return (
    <div
      ref={tocRef}
      className={cn(
        'md:h-[calc(100vh-var(--kl-navbar-height))] overflow-x-hidden overflow-y-auto kl-scrollbar-transparent hover:kl-scrollbar-colored scrollbar-gutter grow pr-md pt-6xl'
      )}
    >
      {hasHeadings && (
        <>
          <LayoutGroup>
            <ul className="flex flex-col">
              {items.map(({ id, value, depth }, index) => {
                return (
                  <li
                    className={cn('flex flex-row relative', {
                      'ml-2xl pl-md border-l border-border-default': depth > 2,
                      'mb-lg': depth === 2,
                      'pb-lg': depth > 2 && items?.[index + 1]?.depth > 2,
                    })}
                    key={id}
                  >
                    <a
                      href={`#${id}`}
                      className={cn(
                        'flex px-2xl py-lg rounded min-w-0 w-full',
                        activeAnchor[id]?.isActive
                          ? 'bg-surface-basic-active bodyMd-medium  text-text-primary relative'
                          : 'bodyMd text-text-soft'
                      )}
                    >
                      {depth > 2 && activeAnchor[id]?.isActive && (
                        <motion.div
                          layoutId="toc-line"
                          className="border-l-2 border-border-primary rounded h-full absolute -left-[5px] top-0"
                        />
                      )}

                      <span className="block truncate">{value}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </LayoutGroup>
        </>
      )}

      <div
        className={cn(
          'sticky pb-6xl bottom-0 bg-surface-basic-subdued shadow-[0_-12px_16px_#FAFAFA]'
        )}
      >
        {/* {renderComponent(config.editLink.component, {
            filePath,
            className: linkClassName,
            children: renderComponent(config.editLink.text),
          })}

          {renderComponent(config.toc.extraContent)} */}
        <hr className="border-border-default mb-5xl" />
        {config.feedback ? (
          <Button
            content={
              config.feedback.linkTitle || 'Question? Give us feedback →'
            }
            to={getGitIssueUrl({
              labels: config.feedback.feedbackLabels || '',
              repository: config.gitRepoUrl,
              title: `Feedback for “${config.pageOpts?.title}”`,
            })}
            LinkComponent={Link}
            toLabel="href"
            variant="plain"
            size="lg"
          />
        ) : null}
        <Button
          content="Kloudlite.io"
          suffix={<ArrowSquareOut />}
          variant="plain"
          size="lg"
        />
        {config.scrollToTop && <BackToTop className="opacity-0" />}
      </div>
    </div>
  );
}
