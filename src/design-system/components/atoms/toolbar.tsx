/* eslint-disable react/jsx-pascal-case */
import { composeEventHandlers } from '@radix-ui/primitive';
import { createContextScope } from '@radix-ui/react-context';
import * as React from 'react';

import type { Scope } from '@radix-ui/react-context';
import { Direction, useDirection } from '@radix-ui/react-direction';
import type * as Radix from '@radix-ui/react-primitive';
import { Primitive } from '@radix-ui/react-primitive';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { createRovingFocusGroupScope } from '@radix-ui/react-roving-focus';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { createToggleGroupScope } from '@radix-ui/react-toggle-group';
import { cn } from '../utils';
import {
  IButton,
  IIconButton,
  Button as _Button,
  IconButton as _IconButton,
} from './button';
import { IButtonGroupButton, IButtonGroupIconButton } from './button-group';
import { ITextInput, TextInput as _TextInput } from './input';

const TOOLBAR_NAME = 'Toolbar';
type ScopedProps<P> = P & { __scopeToolbar?: Scope };

const [createToolbarContext, _createToolbarScope] = createContextScope(
  TOOLBAR_NAME,
  [createRovingFocusGroupScope, createToggleGroupScope]
);
const useRovingFocusGroupScope = createRovingFocusGroupScope();
const useToggleGroupScope = createToggleGroupScope();

const [ToolbarProvider, useToolbarContext] = createToolbarContext(TOOLBAR_NAME);

interface IToolbarRoot {
  __scopeToolbar?: Scope<object | null>;
  orientation?: 'horizontal' | 'vertical';
  dir?: Direction;
  loop?: boolean;
  children: React.ReactNode;
}
const Root = React.forwardRef<HTMLDivElement, IToolbarRoot>(
  (props, forwardedRef) => {
    const {
      __scopeToolbar,
      orientation = 'horizontal',
      dir,
      loop = true,
      ...toolbarProps
    } = props;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToolbar);
    const direction = useDirection(dir);
    return (
      <ToolbarProvider scope={__scopeToolbar}>
        <RovingFocusGroup.Root
          asChild
          {...rovingFocusGroupScope}
          orientation={orientation}
          dir={direction}
          loop={loop}
        >
          <Primitive.div
            role="toolbar"
            aria-orientation={orientation}
            dir={direction}
            {...toolbarProps}
            ref={forwardedRef}
            className={cn('flex flex-row gap-lg w-full')}
          />
        </RovingFocusGroup.Root>
      </ToolbarProvider>
    );
  }
);

Root.displayName = TOOLBAR_NAME;

/* -------------------------------------------------------------------------------------------------
 * ToolbarSeparator
 * -----------------------------------------------------------------------------------------------*/

const SEPARATOR_NAME = 'ToolbarSeparator';

type ToolbarSeparatorElement = React.ElementRef<typeof SeparatorPrimitive.Root>;
type SeparatorProps = Radix.ComponentPropsWithoutRef<
  typeof SeparatorPrimitive.Root
>;
interface ToolbarSeparatorProps extends SeparatorProps {}

const ToolbarSeparator = React.forwardRef<
  ToolbarSeparatorElement,
  ToolbarSeparatorProps
>((props: ScopedProps<ToolbarSeparatorProps>, forwardedRef) => {
  const { __scopeToolbar, ...separatorProps } = props;
  const context = useToolbarContext(SEPARATOR_NAME, __scopeToolbar) as any;
  return (
    <SeparatorPrimitive.Root
      orientation={
        context.orientation === 'horizontal' ? 'vertical' : 'horizontal'
      }
      {...separatorProps}
      ref={forwardedRef}
    />
  );
});

ToolbarSeparator.displayName = SEPARATOR_NAME;

/* -------------------------------------------------------------------------------------------------
 * ToolbarButtonBase
 * -----------------------------------------------------------------------------------------------*/

const BUTTON_NAME = 'ToolbarButtonBase';

type ToolbarButtonElement = React.ElementRef<typeof Primitive.button>;
type PrimitiveButtonProps = Radix.ComponentPropsWithoutRef<
  typeof Primitive.button
>;
interface ToolbarButtonProps extends PrimitiveButtonProps {}

const ToolbarButtonBase = React.forwardRef<
  ToolbarButtonElement,
  ToolbarButtonProps
>((props: ScopedProps<ToolbarButtonProps>, forwardedRef) => {
  const { __scopeToolbar, ...buttonProps } = props;
  const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToolbar);
  return (
    <RovingFocusGroup.Item
      asChild
      {...rovingFocusGroupScope}
      focusable={!props.disabled}
    >
      <Primitive.button type="button" {...buttonProps} ref={forwardedRef} />
    </RovingFocusGroup.Item>
  );
});

ToolbarButtonBase.displayName = BUTTON_NAME;

/* -------------------------------------------------------------------------------------------------
 * ToolbarButton
 * -----------------------------------------------------------------------------------------------*/
const TOOLBAR_BUTTON_NAME = 'ToolbarButton';

const ToolbarButton = React.forwardRef<ToolbarButtonElement, IButton>(
  (props: ScopedProps<IButton>, forwardedRef) => {
    const { __scopeToolbar, ...buttonProps } = props;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToolbar);

    return (
      <RovingFocusGroup.Item
        asChild
        {...rovingFocusGroupScope}
        focusable={!props.disabled}
      >
        <_Button {...buttonProps} ref={forwardedRef} />
      </RovingFocusGroup.Item>
    );
  }
);

ToolbarButton.displayName = TOOLBAR_BUTTON_NAME;

const TOOLBAR_ICON_BUTTON_NAME = 'ToolbarIconButton';

const ToolbarIconButton = React.forwardRef<ToolbarButtonElement, IIconButton>(
  (props: ScopedProps<IIconButton>, forwardedRef) => {
    const { __scopeToolbar, ...buttonProps } = props;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToolbar);
    return (
      <RovingFocusGroup.Item
        asChild
        {...rovingFocusGroupScope}
        focusable={!props.disabled}
      >
        <_IconButton {...buttonProps} ref={forwardedRef} />
      </RovingFocusGroup.Item>
    );
  }
);

ToolbarIconButton.displayName = TOOLBAR_ICON_BUTTON_NAME;

const TEXTFIELD_NAME = 'TextField';

const ToolbarTextField = React.forwardRef<HTMLInputElement, ITextInput>(
  (props: ScopedProps<ITextInput>, forwardedRef) => {
    const { __scopeToolbar, ...inputProps } = props;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToolbar);
    return (
      <RovingFocusGroup.Item
        asChild
        {...rovingFocusGroupScope}
        focusable
        onFocus={(e) => {
          e.target?.parentElement?.classList?.add(
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
      >
        <_TextInput {...inputProps} ref={forwardedRef} />
      </RovingFocusGroup.Item>
    );
  }
);

ToolbarTextField.displayName = TEXTFIELD_NAME;

const LINK_NAME = 'ToolbarLink';
type ToolbarLinkElement = React.ElementRef<typeof Primitive.a>;
type PrimitiveLinkProps = Radix.ComponentPropsWithoutRef<typeof Primitive.a>;
interface ToolbarLinkProps extends PrimitiveLinkProps {}

const ToolbarLink = React.forwardRef<ToolbarLinkElement, ToolbarLinkProps>(
  (props: ScopedProps<ToolbarLinkProps>, forwardedRef) => {
    const { __scopeToolbar, ...linkProps } = props;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToolbar);
    return (
      <RovingFocusGroup.Item asChild {...rovingFocusGroupScope} focusable>
        <Primitive.a
          {...linkProps}
          ref={forwardedRef}
          onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
            if (event.key === ' ') event.currentTarget.click();
          })}
        />
      </RovingFocusGroup.Item>
    );
  }
);

ToolbarLink.displayName = LINK_NAME;

/* -------------------------------------------------------------------------------------------------
 * ToolbarButtonGroup
 * -----------------------------------------------------------------------------------------------*/

const BUTTON_GROUP_NAME = 'ToolbarButtonGroup';

type ToolbarToggleGroupElement = React.ElementRef<
  typeof ToggleGroupPrimitive.Root
>;
type ToggleGroupProps = Radix.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Root
>;
interface ToolbarToggleGroupSingleProps
  extends Extract<ToggleGroupProps, { type: 'single' }> {
  selectable?: boolean;
}
interface ToolbarToggleGroupSinglePropsOmitted
  extends Omit<ToolbarToggleGroupSingleProps, 'onClick' | 'type'> {
  onClick?: (value?: string) => void;
  type?: 'single';
}

const ToolbarButtonGroup = React.forwardRef<
  ToolbarToggleGroupElement,
  ToolbarToggleGroupSinglePropsOmitted
>((props: ScopedProps<ToolbarToggleGroupSinglePropsOmitted>, forwardedRef) => {
  const { __scopeToolbar, ...toggleGroupProps } = props;
  const context = useToolbarContext(BUTTON_GROUP_NAME, __scopeToolbar) as any;
  const toggleGroupScope = useToggleGroupScope(__scopeToolbar);

  delete toggleGroupProps.selectable;

  return (
    <ToggleGroupPrimitive.Root
      data-orientation={context?.orientation}
      dir={context?.dir}
      {...toggleGroupScope}
      {...toggleGroupProps}
      value={toggleGroupProps.value}
      ref={forwardedRef}
      rovingFocus={false}
      className={cn('flex flex-row pulsable')}
      onValueChange={(e) => {
        if (props.onValueChange && e) props.onValueChange(e);
      }}
      type="single"
      onClick={() => {
        if (props.onClick) props.onClick(props.value);
      }}
    >
      {React.Children.map(props.children, (child) => {
        const childElement = child as React.ReactElement;
        const childProps = childElement.props as IButtonGroupButton;
        return React.cloneElement(childElement, {
          selected: childProps.value === props.value && !!props.selectable,
        });
      })}
    </ToggleGroupPrimitive.Root>
  );
});

ToolbarButtonGroup.displayName = BUTTON_GROUP_NAME;

/* -------------------------------------------------------------------------------------------------
 * ToolbarToggleItem
 * -----------------------------------------------------------------------------------------------*/

const BUTTON_GROUP_BUTTON_NAME = 'ButtonGroupButton';

type ToolbarToggleItemElement = React.ElementRef<
  typeof ToggleGroupPrimitive.Item
>;
type ToggleGroupItemProps = Radix.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Item
>;

interface ToolbarToggleItemPropsBase
  extends Omit<
    ToggleGroupItemProps,
    'value' | 'content' | 'onPointerDown' | 'type' | 'prefix' | 'children'
  > {
  value: string | number | readonly string[] | undefined;
}
interface ToolbarButtonGroupButtonProps
  extends ToolbarToggleItemPropsBase,
    Omit<
      IButtonGroupButton,
      'value' | 'onPointerDown' | 'type' | 'prefix' | 'children'
    > {
  'is-menu-button'?: string;
  'data-state'?: string;
}

const ToolbarButtonGroupButton = React.forwardRef<
  ToolbarToggleItemElement,
  ToolbarButtonGroupButtonProps
>((props: ScopedProps<ToolbarButtonGroupButtonProps>, forwardedRef) => {
  const { value, __scopeToolbar, ...toggleItemProps } = props;
  const toggleGroupScope = useToggleGroupScope(__scopeToolbar);
  const scope = { __scopeToolbar: props.__scopeToolbar };
  const extraProps = {} as any;
  if (props['is-menu-button']) {
    extraProps.selected = props['data-state'] === 'open';
  }
  return (
    <ToolbarButtonBase asChild {...scope}>
      <ToggleGroupPrimitive.Item
        {...toggleGroupScope}
        {...toggleItemProps}
        content={toggleItemProps.content as string}
        ref={forwardedRef}
        asChild
        value={value as string}
      >
        <_Button
          {...props}
          noRounded
          className={cn('-ml-xs first:rounded-l last:rounded-r first:ml-0')}
          variant="basic"
          {...extraProps}
          content={toggleItemProps.content}
        />
      </ToggleGroupPrimitive.Item>
    </ToolbarButtonBase>
  );
});

const BUTTON_GROUP_ICON_BUTTON_NAME = 'ToolbarButtonGroupIconButton';

interface ToolbarIconButtonProps
  extends ToolbarToggleItemPropsBase,
    Omit<IButtonGroupIconButton, 'value'> {
  'is-menu-button'?: string;
  'data-state'?: string;
}

const ToolbarButtonGroupIconButton = React.forwardRef<
  ToolbarToggleItemElement,
  ToolbarIconButtonProps
>((props: ScopedProps<ToolbarIconButtonProps>, forwardedRef) => {
  const { value, __scopeToolbar, ...toggleItemProps } = props;
  const toggleGroupScope = useToggleGroupScope(__scopeToolbar);
  const scope = { __scopeToolbar: props.__scopeToolbar };
  const extraProps = {} as any;
  if (props['is-menu-button']) {
    extraProps.selected = props['data-state'] === 'open';
  }
  return (
    <ToolbarButtonBase asChild {...scope}>
      <ToggleGroupPrimitive.Item
        {...toggleGroupScope}
        {...toggleItemProps}
        ref={forwardedRef}
        asChild
        value={value as string}
      >
        <_IconButton
          {...props}
          variant="basic"
          noRounded
          className={cn('-ml-xs first:rounded-l last:rounded-r first:ml-0')}
          {...extraProps}
        />
      </ToggleGroupPrimitive.Item>
    </ToolbarButtonBase>
  );
});

ToolbarButtonGroupButton.displayName = BUTTON_GROUP_BUTTON_NAME;
ToolbarButtonGroupIconButton.displayName = BUTTON_GROUP_ICON_BUTTON_NAME;

const Toolbar = {
  ButtonGroup: {
    Root: ToolbarButtonGroup,
    Button: ToolbarButtonGroupButton,
    IconButton: ToolbarButtonGroupIconButton,
  },
  Button: ToolbarButton,
  IconButton: ToolbarIconButton,
  TextInput: ToolbarTextField,
  Separator: ToolbarSeparator,
  Root,
};

export default Toolbar;
