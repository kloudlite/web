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
        'wb-py-6xl wb-border-t wb-border-border-default wb-flex wb-flex-col md:wb-flex-row wb-flex-wrap wb-items-center wb-gap-xl wb-bodyMd wb-text-text-default print:wb-hidden',
        {
          'wb-justify-between': !!prev,
          'wb-justify-end': !prev,
        },
      )}
    >
      <div className="wb-flex-1 md:wb-flex-none wb-self-start">
        {prev && (
          <Button
            linkComponent={Link}
            toLabel="href"
            content={prev.title}
            className="wb-self-start !wb-pl-0"
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
            className="wb-self-end wb-ml-auto !wb-pr-0"
            to={next.route}
            suffix={<ChevronRight />}
            variant="plain"
          />
        )}
      </div>
    </div>
  );
};
