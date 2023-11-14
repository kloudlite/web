import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '~/utiltities/commons';

export const HeaderLink = ({
  to,
  active,
  children,
}: {
  to: string;
  active?: boolean;
  children: ReactNode;
}) => {
  return (
    <Link
      href={to}
      className={cn('bodyLg-medium', {
        'text-text-soft': !active,
        'text-text-default': !!active,
      })}
    >
      {children}
    </Link>
  );
};
