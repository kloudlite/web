import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '../utils/commons';

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
      className={cn('wb-bodyLg-medium hover:wb-underline', {
        'wb-text-text-soft dark:wb-text-text-darktheme-soft': !active,
        'wb-text-text-default dark:wb-text-text-darktheme-default': !!active,
      })}
    >
      {children}
    </Link>
  );
};
