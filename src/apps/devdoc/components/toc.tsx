import type { Heading } from 'nextra';
import type { ReactElement } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

import { Button } from 'kl-design-system/atoms/button';
import { ArrowSquareOut } from '@jengaicons/react';
import Link from 'next/link';
import { BackToTop } from './back-to-top';
import { useActiveAnchor } from '~/utiltities/active-anchor';
import { cn } from '~/utiltities/commons';
import useConfig from '~/utiltities/use-config';
import getGitIssueUrl from '~/utiltities/get-git-issue-url';

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
    <div
      ref={tocRef}
      className={cn(
        'nextra-scrollbar nx-sticky nx-top-16 nx-overflow-y-auto nx-pr-4 nx-pt-6 nx-text-sm [hyphens:auto]',
        'nx-max-h-[calc(100vh-var(--nextra-navbar-height)-env(safe-area-inset-bottom))] ltr:-nx-mr-4 rtl:-nx-ml-4'
      )}
    >
      {hasHeadings && (
        <>
          <p className="nx-mb-4 nx-font-semibold nx-tracking-tight">
            On This Page
          </p>
          <ul>
            {items.map(({ id, value, depth }) => (
              <li className="nx-my-2 nx-scroll-my-6 nx-scroll-py-6" key={id}>
                <a
                  href={`#${id}`}
                  className={cn(
                    {
                      2: 'nx-font-semibold',
                      3: 'ltr:nx-pl-4 rtl:nx-pr-4',
                      4: 'ltr:nx-pl-8 rtl:nx-pr-8',
                      5: 'ltr:nx-pl-12 rtl:nx-pr-12',
                      6: 'ltr:nx-pl-16 rtl:nx-pr-16',
                    }[depth as Exclude<typeof depth, 1>],
                    'nx-inline-block',
                    activeAnchor[id]?.isActive
                      ? 'text-text-primary nx-subpixel-antialiased contrast-more:!text-text-primary '
                      : 'nx-text-gray-500 hover:nx-text-gray-900 dark:nx-text-gray-400 dark:hover:nx-text-gray-300',
                    'contrast-more:nx-text-gray-900 contrast-more:nx-underline contrast-more:dark:nx-text-gray-50 nx-w-full nx-break-words'
                  )}
                >
                  {value}
                </a>
              </li>
            ))}
          </ul>
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
