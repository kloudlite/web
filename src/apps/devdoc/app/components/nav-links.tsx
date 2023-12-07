import { ChevronLeft, ChevronRight } from '@jengaicons/react';
import { Button } from 'kl-design-system/atoms/button';
import Link from 'next/link';
import type { Item } from 'nextra/normalize-pages';
import type { ReactElement } from 'react';
import { cn } from '~/utiltities/commons';

interface NavLinkProps {
  currentIndex: number;
  flatDirectories: Item[];
}

export const NavLinks = ({
  flatDirectories,
  currentIndex,
}: NavLinkProps): ReactElement | null => {
  const nav = true;
  const navigation = { prev: nav, next: nav };
  let prev = navigation.prev && flatDirectories[currentIndex - 1];
  let next = navigation.next && flatDirectories[currentIndex + 1];

  if (prev && !prev.isUnderCurrentDocsTree) prev = false;
  if (next && !next.isUnderCurrentDocsTree) next = false;

  if (!prev && !next) return null;

  return (
    <div
      className={cn(
        'py-6xl px-xl border-t border-border-default  flex flex-row flex-wrap items-center gap-xl bodyMd text-text-default ',
        {
          'justify-between': !!prev,
          'justify-end': !prev,
        }
      )}
    >
      {prev && (
        <Button
          LinkComponent={Link}
          toLabel="href"
          content={prev.title}
          className="self-start"
          to={prev.route}
          prefix={<ChevronLeft />}
          variant="plain"
        />
      )}
      {next && (
        <Button
          LinkComponent={Link}
          toLabel="href"
          content={next.title}
          className="self-end ml-auto"
          to={next.route}
          suffix={<ChevronRight />}
          variant="plain"
        />
      )}
    </div>
  );
};
