/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from '@remix-run/react';
import * as OptionMenuPrimitive from './_dropdown-primitive';
import { TextInputBase } from './input';
import { _false, cn } from '../utils';
import Tabs from './tabs';

const OptionMenu = OptionMenuPrimitive.Root;

const OptionMenuTriggerBase = OptionMenuPrimitive.Trigger;

const OptionMenuRadioGroup =
  (_false
    ? ({ value, onValueChange = (_) => _, children = null } = { value: '' }) =>
        null
    : _false) || OptionMenuPrimitive.RadioGroup;

const OptionMenuTrigger =
  (_false ? ({ children = null }) => null : _false) ||
  React.forwardRef(({ ...props }, ref) => (
    <OptionMenuTriggerBase ref={ref} {...props} asChild is-menu-button="true" />
  ));

OptionMenuTrigger.displayName = 'OptionMenuTrigger';

const OptionMenuContent =
  (_false
    ? ({
        className = '',
        sideOffset = 4,
        children = null,
        open = false,
        compact = false,
        ...props
      }) => null
    : _false) ||
  React.forwardRef(
    ({ className, sideOffset = 4, children, open, compact, ...props }, ref) => (
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
                // initial={{ x: 0, y: -3, opacity: 0 }}
                // animate={{ x: 0, y: 0, opacity: 1 }}
                // exit={{ x: 0, y: -3, opacity: 0 }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3, ease: 'anticipate' }}
                className={cn(
                  'z-50 border border-border-default shadow-popover bg-surface-basic-default rounded min-w-[160px] overflow-hidden origin-top',
                  {
                    'py-lg': !compact,
                  },
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

const OptionMenuItem =
  (_false
    ? ({ className = '', onSelect = (_) => _, children = null }) => null
    : _false) ||
  React.forwardRef(({ className, ...props }, ref) => (
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

const OptionMenuTextInputItem =
  (_false
    ? (
        {
          value,
          type = 'password' || 'number',
          component = null,
          extra = null,
          className = '',
          error = false,
          disabled = false,
          label = '',
          onKeyDown = (_) => {},
          autoComplete = false,
          onChange = (_) => {},
          message = '',
          showclear = false,
          placeholder = '',
          size = 'md',
          prefix = null,
          suffix = null,
          prefixIcon = null,
          suffixIcon = null,
          compact = false,
          ...extraProps
        } = { value: '' }
      ) => null
    : _false) ||
  React.forwardRef(({ onChange, ...props }, ref) => {
    const searchRef = React.useRef(null);
    const setSearchFocus = (e) => {
      e?.preventDefault();
      searchRef.current.focus();
    };

    return (
      <div
        className={cn({
          'py-lg px-xl': !props.compact,
        })}
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
  });
OptionMenuTextInputItem.displayName = OptionMenuPrimitive.Item.displayName;

const OptionMenuCheckboxItem =
  (_false
    ? ({
        className = '',
        showIndicator = true,
        children = null,
        checked = false,
        onValueChange = (_) => _,
        onSelect = (_) => _,
      }) => null
    : _false) ||
  React.forwardRef(
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

const OptionMenuRadioItem =
  (_false
    ? (
        {
          value,
          onSelect = (_) => _,
          className = '',
          showIndicator = true,
          children = null,
        } = {
          value: '',
        }
      ) => null
    : _false) ||
  React.forwardRef(
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

const OptionMenuTabs = React.forwardRef(({ onChange, ...props }, ref) => {
  const tabRef = React.useRef(null);
  console.log('tab menu');
  return (
    <div
      className={cn({
        'py-lg px-xl': !props.compact,
      })}
    >
      <OptionMenuPrimitive.Item
        // ref={ref}
        onSelect={(e) => e.preventDefault()}
        onClick={(e) => console.log(e)}
        onPointerUp={(e) => e.preventDefault()}
        onPointerDown={(e) => e.preventDefault()}
        onMouseMove={(e) => e.preventDefault()}
        onMouseEnter={(e) => e.preventDefault()}
        onMouseLeave={(e) => e.preventDefault()}
        onPointerMove={(e) => e.preventDefault()}
        onPointerLeave={(e) => e.preventDefault()}
        {...props}
        asChild
        // onFocus={(e) => {
        //   tabRef.current.focus();
        //   console.log(tabRef.current.children[0].querySelector('a').focus());
        // }}
      >
        <Tabs.Root ref={ref} variant="filled" value="env" LinkComponent={Link}>
          {[
            { label: 'Environments', value: 'env' },
            {
              label: 'Workspace',
              value: 'work',
            },
          ].map((item, index) => {
            console.log(item);
            return (
              <Tabs.Tab
                {...item}
                key={index}
                onKeyDown={(e) => {
                  if (e.key === 'Tab') {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                  console.log(e);
                }}
              />
            );
          })}
        </Tabs.Root>
      </OptionMenuPrimitive.Item>
    </div>
  );
});
OptionMenuTextInputItem.displayName = OptionMenuPrimitive.Item.displayName;

const Root = ({ ...props }) => {
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
  Tabs: OptionMenuTabs,
};

export default OptionList;
