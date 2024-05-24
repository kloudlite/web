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
        'md:wb-h-[calc(100vh_-_var(--kl-navbar-height))] wb-overflow-x-hidden wb-overflow-y-auto kl-scrollbar-transparent hover:kl-scrollbar-colored scrollbar-gutter wb-grow wb-pr-md wb-pt-6xl'
      )}
    >
      {hasHeadings && (
        <>
          <LayoutGroup>
            <ul className="wb-flex wb-flex-col">
              {items.map(({ id, value, depth }, index) => {
                return (
                  <li
                    className={cn('wb-flex wb-flex-row wb-relative', {
                      'wb-ml-2xl wb-pl-md wb-border-l wb-border-border-default dark:wb-border-border-darktheme-default':
                        depth > 2,
                      'wb-mb-lg': depth === 2,
                      'wb-pb-lg': depth > 2 && items?.[index + 1]?.depth > 2,
                    })}
                    key={id}
                  >
                    <a
                      href={`#${id}`}
                      className={cn(
                        'wb-flex wb-px-2xl wb-py-lg wb-rounded wb-min-w-0 wb-w-full hover:wb-bg-surface-basic-hovered dark:hover:wb-bg-surface-darktheme-basic-hovered',
                        activeAnchor[id]?.isActive
                          ? 'wb-bg-surface-basic-active dark:wb-bg-surface-darktheme-basic-active wb-bodyMd-medium  wb-text-text-primary dark:wb-text-text-darktheme-primary wb-relative'
                          : 'wb-bodyMd wb-text-text-soft dark:wb-text-text-darktheme-soft'
                      )}
                    >
                      {depth > 2 && activeAnchor[id]?.isActive && (
                        <motion.div
                          layoutId="toc-line"
                          className="wb-border-l-2 wb-border-border-primary dark:wb-border-border-darktheme-primary wb-rounded wb-h-full wb-absolute -wb-left-[5px] wb-top-0"
                        />
                      )}

                      <span className="wb-block wb-truncate">{value}</span>
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
          'wb-sticky wb-pb-6xl wb-bottom-0 wb-bg-surface-basic-subdued dark:wb-bg-surface-darktheme-basic-subdued wb-shadow-[0_-12px_16px_theme(colors.surface.basic.default)] dark:wb-shadow-[0_-12px_16px_theme(colors.surface.darktheme.basic.default)]'
        )}
      >
        {/* {renderComponent(config.editLink.component, {
            filePath,
            className: linkClassName,
            children: renderComponent(config.editLink.text),
          })}

          {renderComponent(config.toc.extraContent)} */}
        <hr className="wb-border-border-default dark:wb-border-border-darktheme-default wb-mb-5xl" />
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
        {config.scrollToTop && (
          <BackToTop className="!wb-hidden" content="Scroll to top" />
        )}
      </div>
    </div>
  );
}
