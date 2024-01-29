import React, { ReactNode } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ChevronDown } from '@jengaicons/react';
import { Button } from 'kl-design-system/atoms/button';
import Link from 'next/link';
import { cn } from '../utils/commons';

const NavigationMenuDemo = ({
  children,
  label,
  active,
  to,
}: {
  children?: ReactNode;
  label: string;
  active?: boolean;
  to?: string;
}) => {
  return (
    <NavigationMenu.Root className="relative z-[1]">
      <NavigationMenu.List className="">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger asChild>
            <Button
              variant="plain"
              size="sm"
              LinkComponent={Link}
              to={to}
              toLabel="href"
              content={
                <span
                  className={cn(
                    'flex flex-row items-center gap-lg bodyLg-medium',
                    {
                      'text-text-soft': !active,
                      'text-text-default': !!active,
                    }
                  )}
                >
                  {label}
                </span>
              }
              suffix={<ChevronDown />}
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-0 left-0 w-full">
            {children}
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute w-fit min-w-[350px] top-full transform -translate-x-1/2 left-1/2 flex justify-center">
        <NavigationMenu.Viewport className="w-full shadow-popover data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};

export default NavigationMenuDemo;
