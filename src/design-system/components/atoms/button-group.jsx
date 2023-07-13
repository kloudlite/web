import React, { cloneElement, forwardRef, useState } from 'react';
import * as ButtonGroupPrimitive from '@radix-ui/react-toggle-group';
import { ButtonBase } from './button';
import { cn } from '../utils';
import PropTypes from "prop-types";



const Button = forwardRef((props, ref) => {
    return <ButtonGroupPrimitive.Item value={props.value} asChild ref={ref}>
        <ButtonBase {...props} variant={'basic'} noRounded className={cn("-ml-xs first:rounded-l last:rounded-r first:ml-0")} />
    </ButtonGroupPrimitive.Item>
})

const IconButton = forwardRef((props, ref) => {
    return <ButtonGroupPrimitive.Item value={props.value} asChild ref={ref}>
        <ButtonBase {...props} variant={'basic'} iconOnly={true} prefix={props.icon} noRounded className={cn("-ml-xs first:rounded-l last:rounded-r first:ml-0")} />
    </ButtonGroupPrimitive.Item>
})

const ButtonGroup = ({ children, value = "", selectable = false, onValueChange, onClick }) => {
    const [v, setV] = useState(value)
    return <ButtonGroupPrimitive.Root
        className="bg-surface-basic-default rounded shadow-button flex flex-row w-fit"
        onClick={(e) => {
            if (onClick)
                onClick(v)
        }}
        onValueChange={(e) => {
            if (e) setV(e);
            if (onValueChange && e)
                onValueChange(e)
        }}
        value={v}

        children={Array.isArray(children) ? children.map((child, index) => {
            return cloneElement(child, {
                selected: (child.props.value == v && !!selectable),
                key: `toggle-group-item-${index}`
            })
        }) : cloneElement(children, {
            selected: children.props.value == v && !!selectable,
            key: `toggle-group-item-${0}`
        })}
        type='single'
    />
};

ButtonGroup.Button = Button
ButtonGroup.IconButton = IconButton

ButtonGroup.prototype = {
    selectable: PropTypes.bool,
    onValueChange: PropTypes.func,
    onClick: PropTypes.func
}


ButtonGroup.defaultProps = {

}

export default ButtonGroup;