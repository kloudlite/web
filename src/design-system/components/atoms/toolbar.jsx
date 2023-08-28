/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/jsx-pascal-case */
import * as React from 'react';
import { composeEventHandlers } from '@radix-ui/primitive';
import { createContextScope } from '@radix-ui/react-context';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { createRovingFocusGroupScope } from '@radix-ui/react-roving-focus';
import { Primitive } from '@radix-ui/react-primitive';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { createToggleGroupScope } from '@radix-ui/react-toggle-group';
import { useDirection } from '@radix-ui/react-direction';
import { TextInputType, TextInput as _TextInput } from './input.jsx';
import {
  ButtonType,
  IconButtonType,
  Button as _Button,
  IconButton as _IconButton,
} from './button.jsx';
import { cn } from '../utils.jsx';

const TOOLBAR_NAME = 'Toolbar';

const [createToolbarContext, _createToolbarScope] = createContextScope(
  TOOLBAR_NAME,
  [createRovingFocusGroupScope, createToggleGroupScope]
);
const useRovingFocusGroupScope = createRovingFocusGroupScope();
const useToggleGroupScope = createToggleGroupScope();

const [ToolbarProvider, useToolbarContext] = createToolbarContext(TOOLBAR_NAME);

const _false = false;

const Root =
  (_false ? ({ children = null }) => null : _false) ||
  React.forwardRef((props, forwardedRef) => {
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
      <ToolbarProvider
        scope={__scopeToolbar}
        orientation={orientation}
        dir={direction}
      >
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
  });

Root.displayName = TOOLBAR_NAME;

/* -------------------------------------------------------------------------------------------------
 * ToolbarSeparator
 * -----------------------------------------------------------------------------------------------*/

const SEPARATOR_NAME = 'ToolbarSeparator';

const ToolbarSeparator = React.forwardRef((props, forwardedRef) => {
  const { __scopeToolbar, ...separatorProps } = props;
  const context = useToolbarContext(SEPARATOR_NAME, __scopeToolbar);
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

const ToolbarButtonBase = React.forwardRef((props, forwardedRef) => {
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

const ToolbarButton =
  ButtonType ||
  React.forwardRef((props, forwardedRef) => {
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
  });

ToolbarButton.displayName = TOOLBAR_BUTTON_NAME;

const TOOLBAR_ICON_BUTTON_NAME = 'ToolbarIconButton';

const ToolbarIconButton =
  IconButtonType ||
  React.forwardRef((props, forwardedRef) => {
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
  });

ToolbarIconButton.displayName = TOOLBAR_ICON_BUTTON_NAME;

const TEXTFIELD_NAME = 'TextField';

const ToolbarTextField =
  TextInputType ||
  React.forwardRef((props, forwardedRef) => {
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
  });

ToolbarTextField.displayName = TEXTFIELD_NAME;

const LINK_NAME = 'ToolbarLink';
const ToolbarLink = React.forwardRef((props, forwardedRef) => {
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
});

ToolbarLink.displayName = LINK_NAME;

/* -------------------------------------------------------------------------------------------------
 * ToolbarButtonGroup
 * -----------------------------------------------------------------------------------------------*/

const BUTTON_GROUP_NAME = 'ToolbarButtonGroup';

const ToolbarButtonGroup =
  (_false
    ? ({
        value = '',
        children = null,
        onValueChange = (_) => _,
        selectable = false,
      }) => null
    : _false) ||
  React.forwardRef(({ selectable, ...props }, forwardedRef) => {
    const { __scopeToolbar, ...toggleGroupProps } = props;
    const context = useToolbarContext(BUTTON_GROUP_NAME, __scopeToolbar);
    const toggleGroupScope = useToggleGroupScope(__scopeToolbar);
    const [value, setValue] = React.useState(props.value);
    return (
      <ToggleGroupPrimitive.Root
        data-orientation={context.orientation}
        dir={context.dir}
        {...toggleGroupScope}
        {...toggleGroupProps}
        ref={forwardedRef}
        rovingFocus={false}
        className={cn('flex flex-row')}
        onClick={(_e) => {
          if (props.onClick) props.onClick(value);
        }}
        onValueChange={(e) => {
          if (e) setValue(e);
          if (props.onValueChange && e) props.onValueChange(e);
        }}
        value={value}
        type="single"
      >
        {React.Children.map(props.children, (child) => {
          return React.cloneElement(child, {
            selected: child.props.value === value && !!selectable,
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

const ToolbarButtonGroupButton =
  (_false
    ? (
        { content, variant = '', suffix = null, prefix = null } = {
          content: '',
        }
      ) => null
    : _false) ||
  React.forwardRef((props, forwardedRef) => {
    const { __scopeToolbar, ...toggleItemProps } = props;
    const toggleGroupScope = useToggleGroupScope(__scopeToolbar);
    const scope = { __scopeToolbar: props.__scopeToolbar };
    const extraProps = {};
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
        >
          <_Button
            {...props}
            noRounded
            className={cn('-ml-xs first:rounded-l last:rounded-r first:ml-0')}
            variant="basic"
            {...extraProps}
          />
        </ToggleGroupPrimitive.Item>
      </ToolbarButtonBase>
    );
  });

const BUTTON_GROUP_ICON_BUTTON_NAME = 'ToolbarButtonGroupIconButton';
const ToolbarButtonGroupIconButton = _false
  ? (
      { icon, disabled = false, onClick = (_) => _, value = '' } = {
        icon: null,
      }
    ) => null
  : _false ||
    React.forwardRef((props, forwardedRef) => {
      const { __scopeToolbar, ...toggleItemProps } = props;
      const toggleGroupScope = useToggleGroupScope(__scopeToolbar);
      const scope = { __scopeToolbar: props.__scopeToolbar };
      const extraProps = {};
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
