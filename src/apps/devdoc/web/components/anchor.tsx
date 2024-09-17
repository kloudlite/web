// eslint-disable-next-line no-restricted-imports -- only in this file we determine either we include <a /> as child of <NextLink /> based of `newNextLinkBehavior` value
import NextLink from 'next/link';
import next from 'next/package.json';
import type { ComponentProps, ReactElement } from 'react';
import { forwardRef } from 'react';
import { cn } from '../utils/commons';

const defaultCss =
  'wb-ring-offset-0 wb-ring-border-focus wb-outline-none focus-visible:wb-ring-2 wb-text-text-primary';

export type AnchorProps = Omit<ComponentProps<'a'>, 'ref'> & {
  newWindow?: boolean;
};

const nextVersion = Number(next.version.split('.')[0]);

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  (
    { href = '', children, newWindow, ...props },
    // ref is used in <NavbarMenu />
    forwardedRef,
  ): ReactElement => {
    if (newWindow) {
      return (
        <a
          ref={forwardedRef}
          href={href}
          target="_blank"
          rel="noreferrer"
          {...props}
          className={cn(defaultCss, props.className)}
        >
          {children}
        </a>
      );
    }

    if (!href) {
      return (
        <a
          ref={forwardedRef}
          {...props}
          className={cn(defaultCss, props.className)}
        >
          {children}
        </a>
      );
    }

    if (nextVersion > 12) {
      return (
        <NextLink
          ref={forwardedRef}
          href={href}
          {...props}
          className={cn(defaultCss, props.className)}
        >
          {children}
        </NextLink>
      );
    }

    return (
      <NextLink href={href} passHref>
        <a
          ref={forwardedRef}
          {...props}
          className={cn(defaultCss, props.className)}
        >
          {children}
        </a>
      </NextLink>
    );
  },
);

Anchor.displayName = 'Anchor';
