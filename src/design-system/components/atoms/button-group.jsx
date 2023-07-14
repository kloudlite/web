import React, { cloneElement, forwardRef, useState } from 'react';
import * as ButtonGroupPrimitive from '@radix-ui/react-toggle-group';
import PropTypes from 'prop-types';
import { ButtonBase } from './button';
import { cn } from '../utils';

const Button = forwardRef((props, ref) => {
  return (
    <ButtonGroupPrimitive.Item value={props.value} asChild ref={ref}>
      <ButtonBase
        {...props}
        variant="basic"
        noRounded
        className={cn('-ml-xs first:rounded-l last:rounded-r first:ml-0')}
      />
    </ButtonGroupPrimitive.Item>
  );
});

Button.displayName = 'ButtonGroupButton';

const IconButton = forwardRef((props, ref) => {
  return (
    <ButtonGroupPrimitive.Item value={props.value} asChild ref={ref}>
      <ButtonBase
        {...props}
        variant="basic"
        iconOnly
        prefix={props.icon}
        noRounded
        className={cn('-ml-xs first:rounded-l last:rounded-r first:ml-0')}
      />
    </ButtonGroupPrimitive.Item>
  );
});

IconButton.displayName = 'ButtonGroupIconButton';

const ButtonGroup = ({
  children,
  value = '',
  selectable = false,
  onValueChange,
  onClick,
}) => {
  const [v, setV] = useState(value);
  return (
    <ButtonGroupPrimitive.Root
      className="bg-surface-basic-default rounded shadow-button flex flex-row w-fit"
      onClick={(_e) => {
        if (onClick) onClick(v);
      }}
      onValueChange={(e) => {
        if (e) setV(e);
        if (onValueChange && e) onValueChange(e);
      }}
      value={v}
      type="single"
    >
      {React.Children.map(children, (child) => {
        return cloneElement(child, {
          selected: child.props.value === v && !!selectable,
        });
      })}
    </ButtonGroupPrimitive.Root>
  );
};

ButtonGroup.Button = Button;
ButtonGroup.IconButton = IconButton;

ButtonGroup.prototype = {
  selectable: PropTypes.bool,
  onValueChange: PropTypes.func,
  onClick: PropTypes.func,
};

ButtonGroup.defaultProps = {};

export default ButtonGroup;
