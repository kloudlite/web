import type { Heading } from 'nextra';
import type { ReactElement } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

import { Button } from 'kl-design-system/atoms/button';
import { ArrowSquareOut } from '@jengaicons/react';
import Link from 'next/link';
import { LayoutGroup, motion } from 'framer-motion';
import { useActiveAnchor } from '~/utiltities/active-anchor';
import { cn } from '~/utiltities/commons';
import useConfig from '~/utiltities/use-config';
import getGitIssueUrl from '~/utiltities/get-git-issue-url';
import { BackToTop } from './back-to-top';

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
      scrollIntoView(anchor, {
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
        scrollMode: 'always',
        boundary: tocRef.current,
      });
    }
  }, [activeSlug]);

  return (
    <div ref={tocRef} className={cn()}>
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

      <div className={cn()}>
        {/* {renderComponent(config.editLink.component, {
            filePath,
            className: linkClassName,
            children: renderComponent(config.editLink.text),
          })}

          {renderComponent(config.toc.extraContent)} */}
        <hr className="border-border-default my-5xl" />
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
