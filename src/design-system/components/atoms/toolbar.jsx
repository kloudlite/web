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
import { TextInput } from "./input.jsx";
import { Button, ButtonBase, IconButton } from './button.jsx';
import classNames from 'classnames';


const TOOLBAR_NAME = 'Toolbar';

const [createToolbarContext, createToolbarScope] = createContextScope(TOOLBAR_NAME, [
    createRovingFocusGroupScope,
    createToggleGroupScope,
]);
const useRovingFocusGroupScope = createRovingFocusGroupScope();
const useToggleGroupScope = createToggleGroupScope();


const [ToolbarProvider, useToolbarContext] = createToolbarContext(TOOLBAR_NAME);


export const Toolbar = React.forwardRef(
    (props, forwardedRef) => {
        const { __scopeToolbar, orientation = 'horizontal', dir, loop = true, ...toolbarProps } = props;
        const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToolbar);
        const direction = useDirection(dir);
        return (
            <ToolbarProvider scope={__scopeToolbar} orientation={orientation} dir={direction}>
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
                        className={classNames("flex flex-row gap-2")}
                    />
                </RovingFocusGroup.Root>
            </ToolbarProvider>
        );
    }
);

Toolbar.displayName = TOOLBAR_NAME;

/* -------------------------------------------------------------------------------------------------
 * ToolbarSeparator
 * -----------------------------------------------------------------------------------------------*/

const SEPARATOR_NAME = 'ToolbarSeparator';


export const ToolbarSeparator = React.forwardRef(
    (props, forwardedRef) => {
        const { __scopeToolbar, ...separatorProps } = props;
        const context = useToolbarContext(SEPARATOR_NAME, __scopeToolbar);
        return (
            <SeparatorPrimitive.Root
                orientation={context.orientation === 'horizontal' ? 'vertical' : 'horizontal'}
                {...separatorProps}
                ref={forwardedRef}
            />
        );
    }
);

ToolbarSeparator.displayName = SEPARATOR_NAME;

/* -------------------------------------------------------------------------------------------------
 * ToolbarButtonBase
 * -----------------------------------------------------------------------------------------------*/

const BUTTON_NAME = 'ToolbarButtonBase';

const ToolbarButtonBase = React.forwardRef(
    (props, forwardedRef) => {
        const { __scopeToolbar, ...buttonProps } = props;
        const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToolbar);
        return (
            <RovingFocusGroup.Item asChild {...rovingFocusGroupScope} focusable={!props.disabled}>
                <Primitive.button type="button" {...buttonProps} ref={forwardedRef} />
            </RovingFocusGroup.Item>
        );
    }
);

ToolbarButtonBase.displayName = BUTTON_NAME;



/* -------------------------------------------------------------------------------------------------
 * ToolbarButton
 * -----------------------------------------------------------------------------------------------*/
const TOOLBAR_BUTTON_NAME = 'ToolbarButton';

export const ToolbarButton = React.forwardRef(
    (props, forwardedRef) => {
        const { __scopeToolbar, ...buttonProps } = props;
        const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToolbar);
        return (
            <RovingFocusGroup.Item asChild {...rovingFocusGroupScope} focusable={!props.disabled}>
                <Button {...buttonProps} ref={forwardedRef} />
            </RovingFocusGroup.Item>
        );
    }
);

ToolbarButton.displayName = TOOLBAR_BUTTON_NAME;

const LINK_NAME = 'ToolbarLink';

export const ToolbarTextField = React.forwardRef(
    (props, forwardedRef) => {
        const { __scopeToolbar, ...inputProps } = props;
        const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToolbar);
        return (
            <RovingFocusGroup.Item asChild {...rovingFocusGroupScope} focusable>
                <TextInput
                    {...inputProps}
                    ref={forwardedRef}
                />
            </RovingFocusGroup.Item>
        );
    }
);


export const ToolbarLink = React.forwardRef(
    (props, forwardedRef) => {
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
 * ToolbarToggleGroup
 * -----------------------------------------------------------------------------------------------*/

const TOGGLE_GROUP_NAME = 'ToolbarToggleGroup';

export const ToolbarToggleGroup = React.forwardRef(
    (
        { selectable, ...props },
        forwardedRef
    ) => {
        const { __scopeToolbar, ...toggleGroupProps } = props;
        const context = useToolbarContext(TOGGLE_GROUP_NAME, __scopeToolbar);
        const toggleGroupScope = useToggleGroupScope(__scopeToolbar);
        const [value, setValue] = React.useState(props.value)
        return (
            <ToggleGroupPrimitive.Root
                data-orientation={context.orientation}
                dir={context.dir}
                {...toggleGroupScope}
                {...toggleGroupProps}
                ref={forwardedRef}
                rovingFocus={false}
                className={classNames("flex flex-row")}
                onClick={(e) => {
                    if (props.onClick)
                        props.onClick(value)
                }}
                onValueChange={(e) => {
                    if (e) setValue(e);
                    if (props.onValueChange && e)
                        props.onValueChange(e)
                }}
                value={value}

                children={props.children.map((child, index) => {
                    return React.cloneElement(child, {
                        selected: child.props.value == value && !!selectable,
                        key: `toggle-group-item-${index}`
                    })
                })}
            />
        );
    }
);

ToolbarToggleGroup.displayName = TOGGLE_GROUP_NAME;

/* -------------------------------------------------------------------------------------------------
 * ToolbarToggleItem
 * -----------------------------------------------------------------------------------------------*/

const TOGGLE_BUTTON_NAME = 'ToolbarToggleButton';

export const ToolbarToggleButton = React.forwardRef(
    (props, forwardedRef) => {
        const { __scopeToolbar, ...toggleItemProps } = props;
        const toggleGroupScope = useToggleGroupScope(__scopeToolbar);
        const scope = { __scopeToolbar: props.__scopeToolbar };

        return (
            <ToolbarButtonBase asChild {...scope}>
                <ToggleGroupPrimitive.Item {...toggleGroupScope} {...toggleItemProps} ref={forwardedRef} asChild>
                    <Button variant={"basic"} {...props} noRounded className={classNames("-ml-px first:rounded-l last:rounded-r first:ml-0")} />
                </ToggleGroupPrimitive.Item>
            </ToolbarButtonBase>
        );
    }
);

const TOGGLE_ICON_BUTTON_NAME = 'ToolbarToggleIconButton';
export const ToolbarToggleIconButton = React.forwardRef(
    (props, forwardedRef) => {
        const { __scopeToolbar, ...toggleItemProps } = props;
        const toggleGroupScope = useToggleGroupScope(__scopeToolbar);
        const scope = { __scopeToolbar: props.__scopeToolbar };

        return (
            <ToolbarButtonBase asChild {...scope}>
                <ToggleGroupPrimitive.Item {...toggleGroupScope} {...toggleItemProps} ref={forwardedRef} asChild>
                    <IconButton variant={"basic"} {...props} noRounded className={classNames("-ml-px first:rounded-l last:rounded-r first:ml-0")} />
                </ToggleGroupPrimitive.Item>
            </ToolbarButtonBase>
        );
    }
);

ToolbarToggleButton.displayName = TOGGLE_BUTTON_NAME;
ToolbarToggleIconButton.displayName = TOGGLE_ICON_BUTTON_NAME;

/* -------------------------------------------------------------------------------------------------
 * ToolbarButtonGroup
 * -----------------------------------------------------------------------------------------------*/


