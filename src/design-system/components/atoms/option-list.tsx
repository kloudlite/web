import React, {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as MenuPrimitive from '@radix-ui/react-menu';
import * as OptionMenuPrimitive from './_dropdown-primitive';
import { ITextInput, TextInput } from './input';
import { cn } from '../utils';
import Tabs from './tabs';

type DropdownMenuContentElement = React.ElementRef<
  typeof MenuPrimitive.Content
>;

interface IBase {
  className?: string;
  onSelect?: (e: Event) => void;
}

interface ITrigger {
  children: ReactNode;
  props?: any;
}

interface IOptionMenuContent extends Omit<IBase, 'onSelect'> {
  sideOffset?: number;
  children: ReactNode;
  open?: boolean;
  align?: 'start' | 'center' | 'end';
}

interface IOptionMenuItem extends IBase {}

interface IOptionMenuLink extends IBase {
  LinkComponent?: any;
  to: string;
  children: ReactNode;
}

interface IOptionMenuTextInput
  extends Omit<ITextInput, 'onPointerDown' | 'onClick'> {
  compact?: boolean;
}

interface IOptionMenuCheckbox extends IBase {
  showIndicator?: boolean;
  children: ReactNode;
  checked?: boolean;
  onValueChange?: (checked: boolean) => void;
}

interface IOptionMenuRadio extends IBase {
  showIndicator?: boolean;
  children: ReactNode;
  value: string;
}

interface IOptionMenuSeparator extends Omit<IBase, 'onSelect'> {}

interface IOptionMenuTabs extends IBase {
  onChange?: () => void;
  value: string;
  size?: string;
  children: ReactNode;
  LinkComponent?: any;
  compact?: boolean;
}

const OptionMenu = OptionMenuPrimitive.Root;

const OptionMenuTriggerBase = OptionMenuPrimitive.Trigger;

const OptionMenuRadioGroup = OptionMenuPrimitive.RadioGroup;

const blurElement = (e: any) => {
  e.preventDefault();
  const element = e.target as HTMLButtonElement;
  element.blur();
};

const preventDefaultEvents = {
  onMouseMove: (e: any) => e.preventDefault(),
  onMouseEnter: (e: any) => e.preventDefault(),
  onMouseLeave: (e: any) => blurElement(e),
  onPointerLeave: (e: any) => e.preventDefault(),
  onPointerEnter: (e: any) => e.preventDefault(),
  onPointerMove: (e: any) => e.preventDefault(),
  // onClick: (e: any) => e.preventDefault(),
};

const OptionMenuTrigger = forwardRef<HTMLElement, ITrigger>(
  ({ props, children }, ref) => (
    <OptionMenuTriggerBase ref={ref} {...props} asChild is-menu-button="true">
      {children}
    </OptionMenuTriggerBase>
  )
);

OptionMenuTrigger.displayName = 'OptionMenuTrigger';

const OptionMenuContent = forwardRef<
  DropdownMenuContentElement,
  IOptionMenuContent
>(
  (
    { className, sideOffset = 4, children, open, align = 'end', ...props },
    ref
  ) => (
    <AnimatePresence>
      {open && (
        <OptionMenuPrimitive.Portal forceMount>
          <OptionMenuPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            align={align}
            loop
            forceMount
            asChild
            {...props}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3, ease: 'anticipate' }}
              className={cn(
                'z-50 border border-border-default shadow-popover bg-surface-basic-default rounded min-w-[160px] overflow-hidden origin-top py-lg',
                className
              )}
            >
              {children}
            </motion.div>
          </OptionMenuPrimitive.Content>
        </OptionMenuPrimitive.Portal>
      )}
    </AnimatePresence>
  )
);
OptionMenuContent.displayName = OptionMenuPrimitive.Content.displayName;

const OptionMenuItem = forwardRef<HTMLDivElement, IOptionMenuItem>(
  ({ className, ...props }, ref) => (
    <OptionMenuPrimitive.Item
      ref={ref}
      className={cn(
        'group relative flex flex-row gap-xl items-center bodyMd gap cursor-default select-none py-lg px-xl text-text-default outline-none transition-colors focus:bg-surface-basic-hovered hover:bg-surface-basic-hovered data-[disabled]:pointer-events-none data-[disabled]:text-text-disabled',
        className
      )}
      {...props}
    />
  )
);
OptionMenuItem.displayName = OptionMenuPrimitive.Item.displayName;

const OptionMenuLink = forwardRef<HTMLDivElement, IOptionMenuLink>(
  ({ className, LinkComponent = 'a', to = '', children }, ref) => {
    let Component: any = LinkComponent;

    if (to) {
      if (LinkComponent === motion.button) {
        Component = 'a';
      } else {
        Component = LinkComponent;
      }
    }

    return (
      <OptionMenuPrimitive.Item
        ref={ref}
        className={cn(
          'group relative flex flex-row gap-xl items-center bodyMd gap cursor-default select-none py-lg px-xl text-text-default outline-none transition-colors focus:bg-surface-basic-hovered hover:bg-surface-basic-hovered data-[disabled]:pointer-events-none data-[disabled]:text-text-disabled',
          className
        )}
        {...preventDefaultEvents}
        asChild
      >
        <Component {...(Component === 'a' ? { href: to } : { to })}>
          {children}
        </Component>
      </OptionMenuPrimitive.Item>
    );
  }
);
OptionMenuLink.displayName = 'OptionMenuLink';

const OptionMenuTextInputItem = forwardRef<
  HTMLInputElement,
  IOptionMenuTextInput
>(({ onChange, compact = false, ...props }, ref) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const setSearchFocus = (e?: any) => {
    e?.preventDefault();
    searchRef.current?.focus();
  };

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  return (
    <div
      className={cn({
        'py-lg px-xl': !compact,
      })}
      onFocus={() => console.log('div focus')}
    >
      <OptionMenuPrimitive.Item
        ref={ref}
        onSelect={setSearchFocus}
        onClick={() => setSearchFocus()}
        onPointerUp={setSearchFocus}
        onPointerDown={() => setSearchFocus()}
        onMouseMove={(e) => e.preventDefault()}
        onMouseEnter={(e) => e.preventDefault()}
        onMouseLeave={(e) => e.preventDefault()}
        onPointerMove={(e) => e.preventDefault()}
        onPointerLeave={(e) => e.preventDefault()}
        onFocus={() => {
          searchRef.current?.focus();
        }}
        asChild
      >
        <TextInput
          {...props}
          ref={searchRef}
          autoComplete="off"
          onChange={onChange}
          onFocus={(event) => {
            event.target?.parentElement?.classList?.add(
              'ring-2',
              'ring-border-focus'
            );
          }}
          onBlur={(e) => {
            e.target?.parentElement?.classList?.remove(
              'ring-2',
              'ring-border-focus'
            );
          }}
          onKeyDown={(e) => {
            if (e.key !== 'Escape') e.stopPropagation();
          }}
        />
      </OptionMenuPrimitive.Item>
    </div>
  );
});
OptionMenuTextInputItem.displayName = OptionMenuPrimitive.Item.displayName;

const OptionMenuCheckboxItem = forwardRef<HTMLDivElement, IOptionMenuCheckbox>(
  (
    {
      className,
      showIndicator = true,
      children,
      checked,
      onValueChange,
      ...props
    },
    ref
  ) => (
    <OptionMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        'group relative flex flex-row gap-xl items-center bodyMd gap cursor-default select-none py-lg px-xl text-text-default outline-none transition-colors focus:bg-surface-basic-hovered hover:bg-surface-basic-hovered data-[disabled]:pointer-events-none data-[disabled]:text-text-disabled',
        {
          'data-[state=checked]:bg-surface-primary-subdued data-[state=checked]:text-text-primary':
            !showIndicator,
        },
        className
      )}
      checked={checked}
      {...props}
      {...preventDefaultEvents}
      onCheckedChange={onValueChange}
    >
      {showIndicator && (
        <span className="w-2xl h-2xl rounded border transition-all flex items-center justify-center border-border-default group-data-[state=checked]:border-border-primary group-data-[state=checked]:bg-surface-primary-default group-data-[disabled]:border-border-disabled group-data-[disabled]:bg-surface-basic-default ">
          <OptionMenuPrimitive.ItemIndicator>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.25 3.50017L5.25 10.4999L1.75 7.00017"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  'stroke-text-on-primary group-data-[disabled]:stroke-text-disabled'
                )}
              />
            </svg>
          </OptionMenuPrimitive.ItemIndicator>
        </span>
      )}
      {children}
    </OptionMenuPrimitive.CheckboxItem>
  )
);
OptionMenuCheckboxItem.displayName =
  OptionMenuPrimitive.CheckboxItem.displayName;

const OptionMenuRadioItem = forwardRef<HTMLDivElement, IOptionMenuRadio>(
  (
    { className, showIndicator = true, children, value, onSelect, ...props },
    ref
  ) => (
    <OptionMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        'group relative flex flex-row gap-xl items-center bodyMd gap cursor-default select-none py-lg px-xl text-text-default outline-none transition-colors focus:bg-surface-basic-hovered hover:bg-surface-basic-hovered data-[disabled]:pointer-events-none data-[disabled]:text-text-disabled',
        {
          'data-[state=checked]:bg-surface-primary-subdued data-[state=checked]:text-text-primary':
            !showIndicator,
        },
        className
      )}
      {...props}
      value={value}
      {...preventDefaultEvents}
    >
      {showIndicator && (
        <span
          className={cn(
            'w-2xl h-2xl rounded-full border transition-all flex items-center justify-center border-border-default group-data-[state=checked]:border-border-primary group-data-[disabled]:border-border-disabled'
          )}
        >
          <OptionMenuPrimitive.ItemIndicator>
            <div
              className={cn(
                'block w-lg h-lg rounded-full bg-surface-primary-default group-data-[disabled]:bg-icon-disabled'
              )}
            />
          </OptionMenuPrimitive.ItemIndicator>
        </span>
      )}
      {children}
    </OptionMenuPrimitive.RadioItem>
  )
);
OptionMenuRadioItem.displayName = OptionMenuPrimitive.RadioItem.displayName;

const OptionMenuSeparator = forwardRef<HTMLDivElement, IOptionMenuSeparator>(
  ({ className, ...props }, ref) => (
    <OptionMenuPrimitive.Separator
      ref={ref}
      className={cn('h-xs bg-border-disabled my-md', className)}
      {...props}
    />
  )
);
OptionMenuSeparator.displayName = OptionMenuPrimitive.Separator.displayName;

// OptionMenuTabs
const focusElement = (element: any) => {
  element?.querySelector('[data-radix-collection-item]')?.focus();
};

const handleKeyNavigation = (
  e: KeyboardEvent,
  tabElement: HTMLDivElement | null
) => {
  if (!(tabElement && tabElement.parentNode)) {
    return;
  }

  const tab = tabElement.parentNode.children;

  if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
    e.preventDefault();
    e.stopPropagation();

    if (e.key === 'ArrowUp') {
      const childs = Array.from(tab).filter(
        (c) =>
          c.hasAttribute('data-radix-collection-item') ||
          c.querySelector('[data-radix-collection-item]')
      );

      console.log(childs);
      const currentIndex = childs.indexOf(tabElement);
      if (currentIndex > 0) {
        if (
          childs[currentIndex - 1].hasAttribute('data-radix-collection-item')
        ) {
          (childs[currentIndex - 1] as HTMLButtonElement).focus();
        } else {
          focusElement(childs[currentIndex - 1]);
        }
      } else if (
        childs[childs.length - 1].hasAttribute('data-radix-collection-item')
      ) {
        (childs[childs.length - 1] as HTMLButtonElement).focus();
      } else {
        focusElement(childs[childs.length - 1]);
      }
    }
    if (e.key === 'ArrowDown') {
      const childs = Array.from(tab).filter(
        (c) =>
          c.hasAttribute('data-radix-collection-item') ||
          c.querySelector('[data-radix-collection-item]')
      );

      console.log(childs);
      const currentIndex = childs.indexOf(tabElement);
      if (currentIndex < childs.length - 1) {
        if (
          childs[currentIndex + 1].hasAttribute('data-radix-collection-item')
        ) {
          (childs[currentIndex + 1] as HTMLButtonElement).focus();
        } else {
          focusElement(childs[currentIndex + 1]);
        }
      } else if (childs[0].hasAttribute('data-radix-collection-item')) {
        (childs[0] as HTMLButtonElement).focus();
      } else {
        focusElement(childs[0]);
      }
    }
  }
};

const OptionMenuTabs = forwardRef<HTMLDivElement, IOptionMenuTabs>(
  (
    {
      onChange,
      value,
      size,
      children,
      LinkComponent = 'div',
      className,
      compact,
      ...props
    },
    ref
  ) => {
    const tabRef = useRef<HTMLDivElement>(null);

    return (
      <div
        className={cn({
          'py-lg px-xl': !compact,
        })}
        ref={tabRef}
        onFocus={(e) => {
          (e.target.querySelector(`.tab-item`) as HTMLButtonElement)?.focus();
        }}
      >
        <OptionMenuPrimitive.Item
          onSelect={(e) => e.preventDefault()}
          onPointerUp={(e) => e.preventDefault()}
          onPointerDown={(e) => e.preventDefault()}
          onMouseMove={(e) => e.preventDefault()}
          onMouseEnter={(e) => e.preventDefault()}
          onMouseLeave={(e) => e.preventDefault()}
          onPointerMove={(e) => e.preventDefault()}
          onPointerLeave={(e) => e.preventDefault()}
        >
          <Tabs.Root
            ref={ref}
            variant="filled"
            value={value}
            size={size}
            className={className}
            onChange={onChange}
            LinkComponent={LinkComponent}
            {...props}
          >
            {Children.map(children, (child) => {
              const childElement = child as ReactElement;
              return cloneElement(childElement, {
                onKeyDown: (e: KeyboardEvent) =>
                  handleKeyNavigation(e, tabRef.current),
              });
            })}
          </Tabs.Root>
        </OptionMenuPrimitive.Item>
      </div>
    );
  }
);

OptionMenuTextInputItem.displayName = OptionMenuPrimitive.Item.displayName;

const Root = ({ ...props }) => {
  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    if (props.onOpenChange) props.onOpenChange(open);
  }, [open]);
  return (
    <OptionMenu open={open} onOpenChange={setOpen}>
      {Children.map(props.children, (child) =>
        cloneElement(child, {
          open,
        })
      )}
    </OptionMenu>
  );
};

const OptionList = {
  Root,
  RadioGroup: OptionMenuRadioGroup,
  RadioGroupItem: OptionMenuRadioItem,
  CheckboxItem: OptionMenuCheckboxItem,
  Separator: OptionMenuSeparator,
  Content: OptionMenuContent,
  Trigger: OptionMenuTrigger,
  TextInput: OptionMenuTextInputItem,
  Item: OptionMenuItem,
  Tabs: {
    Root: OptionMenuTabs,
    Tab: Tabs.Tab,
  },
  Link: OptionMenuLink,
};

export default OptionList;
