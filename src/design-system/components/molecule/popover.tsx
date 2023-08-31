/* eslint-disable jsx-a11y/label-has-associated-control */
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { ReactNode } from 'react';
import { ButtonProps, Button as NativeButton } from '~/components/atoms/button';
import { ChildrenProps } from '../types';

export const Trigger = ({ children }: ChildrenProps) => {
  return (
    <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
  );
};
export const Content = ({
  children,
  align = 'center',
}: {
  children: ReactNode;
  align?: 'center' | 'start' | 'end';
}) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        className="outline-none transform overflow-hidden rounded bg-surface-basic-default shadow-modal border border-border-default w-[300px] z-[99]"
        sideOffset={5}
      >
        <div className="p-3xl">{children}</div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
};

export const Footer = ({ children }: ChildrenProps) => {
  return (
    <div className="pt-3xl flex flex-row justify-end gap-lg">{children}</div>
  );
};
export const Button = (props: ButtonProps) => {
  return (
    <PopoverPrimitive.Close asChild>
      <NativeButton {...props} />
    </PopoverPrimitive.Close>
  );
};

interface PopoverProps extends ChildrenProps {
  onOpenChange?: (val: boolean) => void;
  show?: boolean;
}

export const Popover = ({
  children,
  onOpenChange = () => {},
  show = false,
}: PopoverProps) => (
  <PopoverPrimitive.Root open={show} onOpenChange={onOpenChange}>
    {children}
  </PopoverPrimitive.Root>
);
