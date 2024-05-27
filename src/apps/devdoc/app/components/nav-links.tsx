import { ChevronLeft, ChevronRight } from '@jengaicons/react';
import { Button } from 'kl-design-system/atoms/button';
import Link from 'next/link';
import type { Item } from 'nextra/normalize-pages';
import type { ReactElement } from 'react';
import { cn } from '../utils/commons';

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
        'wb-py-6xl md:wb-px-xl wb-border-t wb-border-border-default dark:wb-border-border-darktheme-default  wb-flex wb-flex-col md:wb-flex-row wb-flex-wrap wb-items-center wb-gap-xl wb-bodyMd wb-text-text-default dark:wb-text-text-darktheme-default',
        {
          'justify-between': !!prev,
          'justify-end': !prev,
        }
      )}
    >
      <div className="wb-flex-1 md:wb-flex-none wb-self-start">
        {prev && (
          <Button
            linkComponent={Link}
            toLabel="href"
            content={prev.title}
            className="self-start"
            to={prev.route}
            prefix={<ChevronLeft />}
            variant="plain"
          />
        )}
      </div>
      <div className="wb-flex-1 md:wb-flex-none wb-self-end">
        {next && (
          <Button
            linkComponent={Link}
            toLabel="href"
            content={next.title}
            className="self-end ml-auto"
            to={next.route}
            suffix={<ChevronRight />}
            variant="plain"
          />
        )}
      </div>
    </div>
  );
};
