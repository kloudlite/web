/* eslint-disable react/jsx-pascal-case */
import * as React from 'react';
import { composeEventHandlers } from '@radix-ui/primitive';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { createContextScope } from '@radix-ui/react-context';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Primitive } from '@radix-ui/react-primitive';
import { createMenuScope } from '@radix-ui/react-menu';
import { useId } from '@radix-ui/react-id';
import * as MenuPrimitive from './_menu-primitive';

/* -------------------------------------------------------------------------------------------------
 * DropdownMenu
 * -----------------------------------------------------------------------------------------------*/

const DROPDOWN_MENU_NAME = 'DropdownMenu';

const [createDropdownMenuContext, createDropdownMenuScope] = createContextScope(
  DROPDOWN_MENU_NAME,
  [createMenuScope]
);
const useMenuScope = createMenuScope();

const [DropdownMenuProvider, useDropdownMenuContext] =
  createDropdownMenuContext(DROPDOWN_MENU_NAME);

const DropdownMenu = (props) => {
  const {
    __scopeDropdownMenu,
    children,
    dir,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true,
  } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  const triggerRef = React.useRef(null);
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <DropdownMenuProvider
      scope={__scopeDropdownMenu}
      triggerId={useId()}
      triggerRef={triggerRef}
      contentId={useId()}
      open={open}
      onOpenChange={setOpen}
      onOpenToggle={React.useCallback(
        () => setOpen((prevOpen) => !prevOpen),
        [setOpen]
      )}
      modal={modal}
    >
      <MenuPrimitive.Root
        {...menuScope}
        open={open}
        onOpenChange={setOpen}
        dir={dir}
        modal={modal}
      >
        {children}
      </MenuPrimitive.Root>
    </DropdownMenuProvider>
  );
};

DropdownMenu.displayName = DROPDOWN_MENU_NAME;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuTrigger
 * -----------------------------------------------------------------------------------------------*/

const TRIGGER_NAME = 'DropdownMenuTrigger';
const DropdownMenuTrigger = React.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, disabled = false, ...triggerProps } = props;
  const context = useDropdownMenuContext(TRIGGER_NAME, __scopeDropdownMenu);
  const menuScope = useMenuScope(__scopeDropdownMenu);

  return (
    <MenuPrimitive.Anchor asChild {...menuScope}>
      <Primitive.button
        type="button"
        id={context.triggerId}
        aria-haspopup="menu"
        aria-expanded={context.open}
        aria-controls={context.open ? context.contentId : undefined}
        data-state={context.open ? 'open' : 'closed'}
        data-disabled={disabled ? '' : undefined}
        disabled={disabled}
        {...triggerProps}
        ref={composeRefs(forwardedRef, context.triggerRef)}
        onPointerDown={composeEventHandlers(props.onPointerDown, (event) => {
          // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
          // but not when the control key is pressed (avoiding MacOS right click)
          if (!disabled && event.button === 0 && event.ctrlKey === false) {
            context.onOpenToggle();
            // prevent trigger focusing when opening
            // this allows the content to be given focus without competition
            if (!context.open) event.preventDefault();
          }
        })}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          if (disabled) return;
          if (['Enter', ' '].includes(event.key)) context.onOpenToggle();
          if (event.key === 'ArrowDown') context.onOpenChange(true);
          // prevent keydown from scrolling window / first focused item to execute
          // that keydown (inadvertently closing the menu)
          if (['Enter', ' ', 'ArrowDown'].includes(event.key))
            event.preventDefault();
        })}
      />
    </MenuPrimitive.Anchor>
  );
});

DropdownMenuTrigger.displayName = TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuPortal
 * -----------------------------------------------------------------------------------------------*/

const PORTAL_NAME = 'DropdownMenuPortal';

const DropdownMenuPortal = (props) => {
  const { __scopeDropdownMenu, ...portalProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return <MenuPrimitive.Portal {...menuScope} {...portalProps} />;
};

DropdownMenuPortal.displayName = PORTAL_NAME;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuContent
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_NAME = 'DropdownMenuContent';

const DropdownMenuContent = React.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...contentProps } = props;
  const context = useDropdownMenuContext(CONTENT_NAME, __scopeDropdownMenu);
  const menuScope = useMenuScope(__scopeDropdownMenu);
  const hasInteractedOutsideRef = React.useRef(false);

  return (
    <MenuPrimitive.Content
      id={context.contentId}
      aria-labelledby={context.triggerId}
      {...menuScope}
      {...contentProps}
      ref={forwardedRef}
      onCloseAutoFocus={composeEventHandlers(
        props.onCloseAutoFocus,
        (event) => {
          if (!hasInteractedOutsideRef.current)
            context.triggerRef.current?.focus();
          hasInteractedOutsideRef.current = false;
          // Always prevent auto focus because we either focus manually or want user agent focus
          event.preventDefault();
        }
      )}
      onInteractOutside={composeEventHandlers(
        props.onInteractOutside,
        (event) => {
          const { originalEvent } = event.detail;
          const ctrlLeftClick =
            originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (!context.modal || isRightClick)
            hasInteractedOutsideRef.current = true;
        }
      )}
      style={{
        ...props.style,
        // re-namespace exposed content custom properties
        ...{
          '--radix-dropdown-menu-content-transform-origin':
            'var(--radix-popper-transform-origin)',
          '--radix-dropdown-menu-content-available-width':
            'var(--radix-popper-available-width)',
          '--radix-dropdown-menu-content-available-height':
            'var(--radix-popper-available-height)',
          '--radix-dropdown-menu-trigger-width':
            'var(--radix-popper-anchor-width)',
          '--radix-dropdown-menu-trigger-height':
            'var(--radix-popper-anchor-height)',
        },
      }}
    />
  );
});

DropdownMenuContent.displayName = CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuGroup
 * -----------------------------------------------------------------------------------------------*/

const GROUP_NAME = 'DropdownMenuGroup';

const DropdownMenuGroup = React.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...groupProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return (
    <MenuPrimitive.Group {...menuScope} {...groupProps} ref={forwardedRef} />
  );
});

DropdownMenuGroup.displayName = GROUP_NAME;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuLabel
 * -----------------------------------------------------------------------------------------------*/

const LABEL_NAME = 'DropdownMenuLabel';

const DropdownMenuLabel = React.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...labelProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return (
    <MenuPrimitive.Label {...menuScope} {...labelProps} ref={forwardedRef} />
  );
});

DropdownMenuLabel.displayName = LABEL_NAME;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuItem
 * -----------------------------------------------------------------------------------------------*/

const ITEM_NAME = 'DropdownMenuItem';

const DropdownMenuItem = React.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...itemProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return (
    <MenuPrimitive.Item {...menuScope} {...itemProps} ref={forwardedRef} />
  );
});

DropdownMenuItem.displayName = ITEM_NAME;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuCheckboxItem
 * -----------------------------------------------------------------------------------------------*/

const CHECKBOX_ITEM_NAME = 'DropdownMenuCheckboxItem';

const DropdownMenuCheckboxItem = React.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...checkboxItemProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return (
    <MenuPrimitive.CheckboxItem
      {...menuScope}
      {...checkboxItemProps}
      ref={forwardedRef}
    />
  );
});

DropdownMenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuRadioGroup
 * -----------------------------------------------------------------------------------------------*/

const RADIO_GROUP_NAME = 'DropdownMenuRadioGroup';

const DropdownMenuRadioGroup = React.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...radioGroupProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return (
    <MenuPrimitive.RadioGroup
      {...menuScope}
      {...radioGroupProps}
      ref={forwardedRef}
    />
  );
});

DropdownMenuRadioGroup.displayName = RADIO_GROUP_NAME;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuRadioItem
 * -----------------------------------------------------------------------------------------------*/

const RADIO_ITEM_NAME = 'DropdownMenuRadioItem';

const DropdownMenuRadioItem = React.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...radioItemProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return (
    <MenuPrimitive.RadioItem
      {...menuScope}
      {...radioItemProps}
      ref={forwardedRef}
    />
  );
});

DropdownMenuRadioItem.displayName = RADIO_ITEM_NAME;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuItemIndicator
 * -----------------------------------------------------------------------------------------------*/

const INDICATOR_NAME = 'DropdownMenuItemIndicator';

const DropdownMenuItemIndicator = React.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...itemIndicatorProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return (
    <MenuPrimitive.ItemIndicator
      {...menuScope}
      {...itemIndicatorProps}
      ref={forwardedRef}
    />
  );
});

DropdownMenuItemIndicator.displayName = INDICATOR_NAME;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSeparator
 * -----------------------------------------------------------------------------------------------*/

const SEPARATOR_NAME = 'DropdownMenuSeparator';

const DropdownMenuSeparator = React.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...separatorProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return (
    <MenuPrimitive.Separator
      {...menuScope}
      {...separatorProps}
      ref={forwardedRef}
    />
  );
});

DropdownMenuSeparator.displayName = SEPARATOR_NAME;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuArrow
 * -----------------------------------------------------------------------------------------------*/

const ARROW_NAME = 'DropdownMenuArrow';

const DropdownMenuArrow = React.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...arrowProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return (
    <MenuPrimitive.Arrow {...menuScope} {...arrowProps} ref={forwardedRef} />
  );
});

DropdownMenuArrow.displayName = ARROW_NAME;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSub
 * -----------------------------------------------------------------------------------------------*/

const DropdownMenuSub = (props) => {
  const {
    __scopeDropdownMenu,
    children,
    open: openProp,
    onOpenChange,
    defaultOpen,
  } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <MenuPrimitive.Sub {...menuScope} open={open} onOpenChange={setOpen}>
      {children}
    </MenuPrimitive.Sub>
  );
};

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSubTrigger
 * -----------------------------------------------------------------------------------------------*/

const SUB_TRIGGER_NAME = 'DropdownMenuSubTrigger';

const DropdownMenuSubTrigger = React.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...subTriggerProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);
  return (
    <MenuPrimitive.SubTrigger
      {...menuScope}
      {...subTriggerProps}
      ref={forwardedRef}
    />
  );
});

DropdownMenuSubTrigger.displayName = SUB_TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSubContent
 * -----------------------------------------------------------------------------------------------*/

const SUB_CONTENT_NAME = 'DropdownMenuSubContent';

const DropdownMenuSubContent = React.forwardRef((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...subContentProps } = props;
  const menuScope = useMenuScope(__scopeDropdownMenu);

  return (
    <MenuPrimitive.SubContent
      {...menuScope}
      {...subContentProps}
      ref={forwardedRef}
      style={{
        ...props.style,
        // re-namespace exposed content custom properties
        ...{
          '--radix-dropdown-menu-content-transform-origin':
            'var(--radix-popper-transform-origin)',
          '--radix-dropdown-menu-content-available-width':
            'var(--radix-popper-available-width)',
          '--radix-dropdown-menu-content-available-height':
            'var(--radix-popper-available-height)',
          '--radix-dropdown-menu-trigger-width':
            'var(--radix-popper-anchor-width)',
          '--radix-dropdown-menu-trigger-height':
            'var(--radix-popper-anchor-height)',
        },
      }}
    />
  );
});

DropdownMenuSubContent.displayName = SUB_CONTENT_NAME;

const Root = DropdownMenu;
const Trigger = DropdownMenuTrigger;
const Portal = DropdownMenuPortal;
const Content = DropdownMenuContent;
const Group = DropdownMenuGroup;
const Label = DropdownMenuLabel;
const Item = DropdownMenuItem;
const CheckboxItem = DropdownMenuCheckboxItem;
const RadioGroup = DropdownMenuRadioGroup;
const RadioItem = DropdownMenuRadioItem;
const ItemIndicator = DropdownMenuItemIndicator;
const Separator = DropdownMenuSeparator;
const Arrow = DropdownMenuArrow;
const Sub = DropdownMenuSub;
const SubTrigger = DropdownMenuSubTrigger;
const SubContent = DropdownMenuSubContent;

export {
  createDropdownMenuScope,
  //
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItemIndicator,
  DropdownMenuSeparator,
  DropdownMenuArrow,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  //
  Root,
  Trigger,
  Portal,
  Content,
  Group,
  Label,
  Item,
  CheckboxItem,
  RadioGroup,
  RadioItem,
  ItemIndicator,
  Separator,
  Arrow,
  Sub,
  SubTrigger,
  SubContent,
};
