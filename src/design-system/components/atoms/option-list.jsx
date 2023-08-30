import {
  Children,
  cloneElement,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as OptionMenuPrimitive from './_dropdown-primitive';
import { TextInputBase } from './input';
import { cn } from '../utils';
import Tabs from './tabs';

const OptionMenu = OptionMenuPrimitive.Root;

const OptionMenuTriggerBase = OptionMenuPrimitive.Trigger;

const OptionMenuRadioGroup = OptionMenuPrimitive.RadioGroup;

const OptionMenuTrigger = forwardRef(({ props, children }, ref) => (
  <OptionMenuTriggerBase ref={ref} {...props} asChild is-menu-button="true">
    {children}
  </OptionMenuTriggerBase>
));

OptionMenuTrigger.displayName = 'OptionMenuTrigger';

const OptionMenuContent = forwardRef(
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
              // initial={{ x: 0, y: -3, opacity: 0 }}
              // animate={{ x: 0, y: 0, opacity: 1 }}
              // exit={{ x: 0, y: -3, opacity: 0 }}
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

const OptionMenuItem = forwardRef(({ className, ...props }, ref) => (
  <OptionMenuPrimitive.Item
    ref={ref}
    className={cn(
      'group relative flex flex-row gap-xl items-center bodyMd gap cursor-default select-none py-lg px-xl text-text-default outline-none transition-colors focus:bg-surface-basic-hovered hover:bg-surface-basic-hovered data-[disabled]:pointer-events-none data-[disabled]:text-text-disabled',
      className
    )}
    {...props}
    onMouseMove={(e) => e.preventDefault()}
    onMouseEnter={(e) => e.preventDefault()}
    onMouseLeave={(e) => {
      e.preventDefault();
      e.target.blur();
    }}
    onPointerLeave={(e) => e.preventDefault()}
    onPointerEnter={(e) => e.preventDefault()}
    onPointerMove={(e) => e.preventDefault()}
    onClick={(e) => e.stopPropagation()}
  />
));
OptionMenuItem.displayName = OptionMenuPrimitive.Item.displayName;

const OptionMenuLink = forwardRef(
  ({ className, LinkComponent = null, to = '', children, ...props }, ref) => {
    let Comp = 'a';
    let tempProps = { href: to };
    if (LinkComponent) {
      Comp = LinkComponent;
      tempProps = { to };
    }
    return (
      <OptionMenuPrimitive.Item
        ref={ref}
        className={cn(
          'group relative flex flex-row gap-xl items-center bodyMd gap cursor-default select-none py-lg px-xl text-text-default outline-none transition-colors focus:bg-surface-basic-hovered hover:bg-surface-basic-hovered data-[disabled]:pointer-events-none data-[disabled]:text-text-disabled',
          className
        )}
        {...props}
        onMouseMove={(e) => e.preventDefault()}
        onMouseEnter={(e) => e.preventDefault()}
        onMouseLeave={(e) => {
          e.preventDefault();
          e.target.blur();
        }}
        onPointerLeave={(e) => e.preventDefault()}
        onPointerEnter={(e) => e.preventDefault()}
        onPointerMove={(e) => e.preventDefault()}
        asChild
      >
        <Comp {...tempProps}>{children}</Comp>
      </OptionMenuPrimitive.Item>
    );
  }
);
OptionMenuLink.displayName = 'OptionMenuLink';

const OptionMenuTextInputItem = forwardRef(
  ({ onChange, compact = false, ...props }, ref) => {
    const searchRef = useRef(null);
    const setSearchFocus = (e) => {
      e?.preventDefault();
      searchRef.current.focus();
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
            searchRef.current.focus();
            console.log('search focus');
          }}
          {...props}
          asChild
        >
          <TextInputBase
            component="input"
            ref={searchRef}
            autoComplete="off"
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key !== 'Escape') e.stopPropagation();
            }}
          />
        </OptionMenuPrimitive.Item>
      </div>
    );
  }
);
OptionMenuTextInputItem.displayName = OptionMenuPrimitive.Item.displayName;

const OptionMenuCheckboxItem = forwardRef(
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
      onMouseMove={(e) => e.preventDefault()}
      onMouseEnter={(e) => e.preventDefault()}
      onMouseLeave={(e) => {
        e.preventDefault();
        e.target.blur();
      }}
      onPointerLeave={(e) => e.preventDefault()}
      onPointerEnter={(e) => e.preventDefault()}
      onPointerMove={(e) => e.preventDefault()}
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

const OptionMenuRadioItem = forwardRef(
  ({ className, showIndicator = true, children, ...props }, ref) => (
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
      onMouseMove={(e) => e.preventDefault()}
      onMouseEnter={(e) => e.preventDefault()}
      onMouseLeave={(e) => {
        e.preventDefault();
        e.target.blur();
      }}
      onPointerLeave={(e) => e.preventDefault()}
      onPointerEnter={(e) => e.preventDefault()}
      onPointerMove={(e) => e.preventDefault()}
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

const OptionMenuSeparator = forwardRef(({ className, ...props }, ref) => (
  <OptionMenuPrimitive.Separator
    ref={ref}
    className={cn('h-xs bg-border-disabled my-md', className)}
    {...props}
  />
));
OptionMenuSeparator.displayName = OptionMenuPrimitive.Separator.displayName;

// OptionMenuTabs
const focusElement = (element) => {
  element?.querySelector('[data-radix-collection-item]')?.focus();
};

const handleKeyNavigation = (e, tabRef) => {
  if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
    e.preventDefault();
    e.stopPropagation();

    if (e.key === 'ArrowUp') {
      const childs = Array.from(tabRef.current.parentNode.children).filter(
        (c) =>
          c.hasAttribute('data-radix-collection-item') ||
          c.querySelector('[data-radix-collection-item]')
      );

      console.log(childs);
      const currentIndex = childs.indexOf(tabRef.current);
      if (currentIndex > 0) {
        if (
          childs[currentIndex - 1].hasAttribute('data-radix-collection-item')
        ) {
          childs[currentIndex - 1].focus();
        } else {
          focusElement(childs[currentIndex - 1]);
        }
      } else if (
        childs[childs.length - 1].hasAttribute('data-radix-collection-item')
      ) {
        childs[childs.length - 1].focus();
      } else {
        focusElement(childs[childs.length - 1]);
      }
    }
    if (e.key === 'ArrowDown') {
      const childs = Array.from(tabRef.current.parentNode.children).filter(
        (c) =>
          c.hasAttribute('data-radix-collection-item') ||
          c.querySelector('[data-radix-collection-item]')
      );

      console.log(childs);
      const currentIndex = childs.indexOf(tabRef.current);
      if (currentIndex < childs.length - 1) {
        if (
          childs[currentIndex + 1].hasAttribute('data-radix-collection-item')
        ) {
          childs[currentIndex + 1].focus();
        } else {
          focusElement(childs[currentIndex + 1]);
        }
      } else if (childs[0].hasAttribute('data-radix-collection-item')) {
        childs[0].focus();
      } else {
        focusElement(childs[0]);
      }
    }
  }
};
const OptionMenuTabs = forwardRef(
  (
    { onChange, value, size, children, LinkComponent, className, ...props },
    ref
  ) => {
    const tabRef = useRef(null);
    let tempProps = { LinkComponent };
    if (!LinkComponent) tempProps = {};

    return (
      <div
        className={cn({
          'py-lg px-xl': !props.compact,
        })}
        ref={tabRef}
        onFocus={(e) => {
          e.target.querySelector(`.tab-item`)?.focus();
          console.log(e.target.querySelector(`.tab-item`));
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
            {...tempProps}
            {...props}
          >
            {Children.map(children, (child) =>
              cloneElement(child, {
                onKeyDown: (e) => handleKeyNavigation(e, tabRef),
              })
            )}
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
