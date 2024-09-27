import React, { ReactNode } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { PageItem } from 'nextra/normalize-pages';
import { ChevronDown } from '@jengaicons/react';
import useConfig from '../utils/use-config';
import { cn } from '../utils/commons';
import { usePathname } from 'next/navigation';

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
          'wb-rounded wb-flex wb-flex-row wb-gap-xl wb-items-center wb-px-xl wb-py-lg hover:wb-bg-surface-basic-hovered wb-cursor-pointer',
          className,
        )}
        {...props}
        ref={ref}
        href={href}
      >
        <div className="wb-h-[44px] wb-w-[44px] wb-flex wb-items-center wb-justify-center wb-rounded wb-p-lg wb-bg-icon-primary wb-text-text-on-primary">
          {icon}
        </div>
        <div className="wb-flex wb-flex-col">
          <div className="wb-bodyMd-semibold wb-text-text-default">{title}</div>
          <p className="wb-bodySm wb-text-text-soft">{children}</p>
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
          'wb-transition-colors wb-group wb-flex-row wb-gap-lg wb-items-center wb-bodyLg-medium wb-text-text-soft wb-cursor-pointer wb-px-2xl wb-flex hover:wb-text-text-default  data-[state=open]:wb-text-text-default',
          className,
        )}
      >
        {children}
        <span className="flex transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180">
          <ChevronDown size={16} />
        </span>
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
            'wb-bodyLg-medium wb-cursor-pointer wb-px-2xl wb-flex hover:wb-text-text-default',
            active ? 'wb-text-text-default' : 'wb-text-text-soft',
          )}
          href={href}
        >
          {label}
        </NavigationMenu.Link>
      )}
      {type === 'popup' && (
        <NavMenuButton className={active ? '!text-text-default' : ''}>
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

const NavigationMenuV2 = () => {
  const { config } = useConfig();
  const path = usePathname();

  const { headerSecondary } = config;
  if (!headerSecondary) {
    return null;
  }
  return (
    <NavigationMenu.Root className="wb-relative wb-z-[1] wb-flex wb-w-full wb-justify-center">
      <NavigationMenu.List className="wb-m-0 wb-flex wb-list-none wb-rounded-[6px] wb-p-1">
        {headerSecondary.items.map((i) => {
          return (
            <NavMenuItem
              key={i.title}
              label={i.title}
              href={i.to}
              type={i.type}
              active={i.to === path}
            >
              {i?.render?.()}
            </NavMenuItem>
          );
        })}
        <NavigationMenu.Indicator className="data-[state=visible]:wb-animate-fadeIn data-[state=hidden]:animate-fadeOut wb-top-[calc(100%_+_7px)] wb-z-[1] wb-flex wb-h-[16px] wb-items-end wb-justify-center wb-overflow-hidden wb-transition-[width,transform_250ms_ease]">
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
              fill="#FFFFFF"
            />
          </svg>
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="wb-perspective-[2000px] wb-absolute wb-w-full wb-top-full wb-transform -wb-translate-x-1/2 wb-left-1/2 wb-flex wb-justify-end">
        <NavigationMenu.Viewport className="wb-shadow-popover data-[state=open]:wb-animate-scaleIn data-[state=closed]:wb-animate-scaleOut wb-relative wb-mt-[22px] wb-h-[var(--radix-navigation-menu-viewport-height)] wb-origin-[top_center] wb-overflow-hidden wb-rounded wb-bg-surface-basic-default wb-transition-[width,_height] wb-duration-300 sm:wb-w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};

export default NavigationMenuV2;
