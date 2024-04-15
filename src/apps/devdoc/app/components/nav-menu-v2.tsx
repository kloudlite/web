import React, { ReactNode } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { PageItem } from 'nextra/normalize-pages';
import useConfig from '../utils/use-config';
import { cn } from '../utils/commons';

export const NavListItem = React.forwardRef<
  HTMLAnchorElement,
  {
    href?: string;
    className?: string;
    title: string;
    children?: ReactNode;
    icon: ReactNode;
  }
>(({ className, href, children, title, icon, ...props }, ref) => (
  <li>
    <NavigationMenu.Link asChild>
      <a
        className={classNames(
          'flex flex-row gap-xl items-center px-xl py-lg hover:bg-surface-basic-active cursor-pointer',
          className
        )}
        {...props}
        ref={ref}
        href={href}
      >
        <div className="h-[44px] w-[44px] flex items-center justify-center rounded border border-border-default p-lg bg-icon-on-primary text-icon-primary">
          {icon}
        </div>
        <div className="flex flex-col">
          <div className="bodyMd-semibold text-text-default">{title}</div>
          <p className="bodySm text-text-soft">{children}</p>
        </div>
      </a>
    </NavigationMenu.Link>
  </li>
));

const NavMenuButton = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <NavigationMenu.Trigger asChild>
      <span
        className={cn(
          'bodyLg-medium text-text-soft cursor-pointer px-2xl flex hover:!text-text-default  data-[state=open]:text-text-default',
          className
        )}
      >
        {' '}
        {children}
      </span>
    </NavigationMenu.Trigger>
  );
};

const NavMenuContent = ({ children }: { children?: ReactNode }) => {
  return (
    <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight  absolute top-0 left-0">
      {children}
    </NavigationMenu.Content>
  );
};

const NavMenuItem = ({
  children,
  label,
  type = 'normal',
  href,
  active,
}: {
  children?: ReactNode;
  label: ReactNode;
  type?: 'normal' | 'popup';
  href?: string;
  active?: boolean;
}) => {
  return (
    <NavigationMenu.Item>
      {type === 'normal' && (
        <NavigationMenu.Link
          className={cn(
            'bodyLg-medium cursor-pointer px-2xl flex hover:!text-text-default',
            active ? 'text-text-default' : 'text-text-soft'
          )}
          href={href}
        >
          {label}
        </NavigationMenu.Link>
      )}
      {type === 'popup' && (
        <NavMenuButton className={active ? '!text-text-default ' : ''}>
          {href ? (
            <NavigationMenu.Link href={href}>{label}</NavigationMenu.Link>
          ) : (
            label
          )}
        </NavMenuButton>
      )}
      {type === 'popup' && <NavMenuContent>{children}</NavMenuContent>}
    </NavigationMenu.Item>
  );
};

const NavigationMenuV2 = ({ activePath }: { activePath?: PageItem[] }) => {
  const { config } = useConfig();

  const { headerSecondary } = config;
  if (!headerSecondary) {
    return null;
  }

  console.log('active', activePath);
  return (
    <NavigationMenu.Root className="relative z-[1] flex w-full justify-end">
      <NavigationMenu.List className="m-0 flex list-none rounded-[6px] p-1">
        {headerSecondary.items.map((i) => {
          return (
            <NavMenuItem
              key={i.title}
              label={i.title}
              href={i.to}
              type={i.type}
              active={!!activePath?.find((ap) => ap.route === i.to)}
            >
              {i?.render?.()}
            </NavMenuItem>
          );
        })}
        <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-[calc(100%_+_7px)] z-[1] flex h-[16px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="13"
            viewBox="0 0 27 13"
            fill="none"
            className="drop-shadow-indicator"
          >
            <path
              d="M12.0458 1.31216C12.8181 0.577204 14.0311 0.577202 14.8034 1.31216L26.8492 12.776H0L12.0458 1.31216Z"
              fill="#FAFAFA"
            />
          </svg>
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute  w-full  top-full transform -translate-x-1/2 left-1/2 flex justify-end">
        <NavigationMenu.Viewport className="shadow-popover data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[22px] h-[var(--radix-navigation-menu-viewport-height)] origin-[top_center] overflow-hidden rounded bg-surface-basic-subdued transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};

export default NavigationMenuV2;
