import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as OptionMenuPrimitive from './_dropdown-primitive';
import { TextInputBase } from './input';
import { cn } from '../utils';

const OptionMenu = OptionMenuPrimitive.Root;

const OptionMenuTriggerBase = OptionMenuPrimitive.Trigger;

const OptionMenuRadioGroup = OptionMenuPrimitive.RadioGroup;

const OptionMenuTrigger = React.forwardRef(({ ...props }, ref) => (
  <OptionMenuTriggerBase ref={ref} {...props} asChild is-menu-button="true" />
));

OptionMenuTrigger.displayName = 'OptionMenuTrigger';

const OptionMenuContent = React.forwardRef(
  ({ className, sideOffset = 4, children, open, ...props }, ref) => (
    <AnimatePresence>
      {open && (
        <OptionMenuPrimitive.Portal forceMount>
          <OptionMenuPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            align="end"
            loop
            forceMount
            asChild
            {...props}
          >
            <motion.div
              initial={{ x: 0, y: -3, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ x: 0, y: -3, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'anticipate' }}
              className={cn(
                'z-50 border border-border-default shadow-popover bg-surface-basic-default rounded min-w-[160px] overflow-hidden py-lg',
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

const OptionMenuItem = React.forwardRef(({ className, ...props }, ref) => (
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
  />
));
OptionMenuItem.displayName = OptionMenuPrimitive.Item.displayName;

const OptionMenuTextInputItem = React.forwardRef(
  ({ onChange, ...props }, ref) => {
    const searchRef = React.useRef(null);
    const setSearchFocus = (e) => {
      e?.preventDefault();
      searchRef.current.focus();
    };

    return (
      <div className="py-lg px-xl">
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
          }}
          {...props}
          asChild
        >
          <TextInputBase
            component="input"
            ref={searchRef}
            autoComplete="off"
            onChange={(e) => {
              if (onChange) onChange(e.target.value);
            }}
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

const OptionMenuCheckboxItem = React.forwardRef(
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

const OptionMenuRadioItem = React.forwardRef(
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

const OptionMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <OptionMenuPrimitive.Separator
    ref={ref}
    className={cn('h-xs bg-border-disabled my-md', className)}
    {...props}
  />
));
OptionMenuSeparator.displayName = OptionMenuPrimitive.Separator.displayName;

const OptionList = ({ ...props }) => {
  const [open, setOpen] = React.useState(props.open);

  React.useEffect(() => {
    if (props.onOpenChange) props.onOpenChange(open);
  }, [open]);
  return (
    <OptionMenu open={open} onOpenChange={setOpen}>
      {React.Children.map(props.children, (child) =>
        React.cloneElement(child, {
          open,
        })
      )}
    </OptionMenu>
  );
};

OptionList.RadioGroup = OptionMenuRadioGroup;
OptionList.RadioGroupItem = OptionMenuRadioItem;
OptionList.CheckboxItem = OptionMenuCheckboxItem;
OptionList.Separator = OptionMenuSeparator;
OptionList.Content = OptionMenuContent;
OptionList.Trigger = OptionMenuTrigger;
OptionList.TextInput = OptionMenuTextInputItem;
OptionList.Item = OptionMenuItem;

export default OptionList;
