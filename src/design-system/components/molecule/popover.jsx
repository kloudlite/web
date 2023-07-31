/* eslint-disable jsx-a11y/label-has-associated-control */
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Button as NativeButton } from '~/components/atoms/button';

export const Trigger = ({ children }) => {
  return (
    <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
  );
};
export const Content = ({ children, align = 'center' }) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        className="outline-none transform overflow-hidden rounded bg-surface-basic-default shadow-modal border border-border-default w-[300px]"
        sideOffset={5}
      >
        <div className="p-3xl">{children}</div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
};

export const Footer = ({ children }) => {
  return (
    <div className="pt-3xl flex flex-row justify-end gap-lg">{children}</div>
  );
};
export const Button = (props) => {
  return (
    <PopoverPrimitive.Close asChild>
      <NativeButton {...props} />
    </PopoverPrimitive.Close>
  );
};

export const Popover = ({ children, onOpenChange, show }) => (
  <PopoverPrimitive.Root open={show} onOpenChange={onOpenChange}>
    {children}
  </PopoverPrimitive.Root>
);
