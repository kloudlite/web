import PropTypes from 'prop-types';
import React, { cloneElement, useId } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '../utils';
import { BounceIt } from '../bounce-it';

export const Item = ({
  disabled,
  value,
  children,
  className,
  withBounceEffect,
  labelPlacement = 'right',
}) => {
  const id = useId();
  const rend = () => {
    return (
      <div
        className={cn(
          'flex items-center w-fit',
          {
            'cursor-pointer': !disabled,
            'flex-row-reverse': labelPlacement === 'left',
            'flex-row': labelPlacement === 'right',
          },
          className
        )}
      >
        <RadioGroupPrimitive.Item
          className={cn(
            'w-2xl h-2xl outline-none rounded-full border ring-border-focus ring-offset-1 focus:ring-2 transition-all flex items-center justify-center border-border-default',
            {
              'hover:bg-surface-basic-hovered': !disabled,
              'data-[state=checked]:border-border-primary': !disabled,
              'data-[disabled]:border-border-disabled': disabled,
            }
          )}
          value={value}
          id={id}
          disabled={disabled}
        >
          <RadioGroupPrimitive.Indicator
            className={cn('block w-lg h-lg rounded-full', {
              'bg-icon-disabled': disabled,
              'bg-surface-primary-default': !disabled,
            })}
          />
        </RadioGroupPrimitive.Item>
        <label
          className={cn(
            {
              'text-text-disabled': disabled,
              'text-text-default cursor-pointer': !disabled,
            },
            'bodyMd-medium pl-lg select-none flex-1'
          )}
          htmlFor={id}
        >
          {children}
        </label>
      </div>
    );
  };
  return withBounceEffect ? <BounceIt>{rend()}</BounceIt> : rend();
};

export const Root = ({
  value,
  onChange = (_) => {},
  label,
  disabled,
  children,
  className,
  labelPlacement = 'right',
}) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('flex flex-col gap-y-xl', className)}
      value={value}
      aria-label={label}
      disabled={disabled}
      onValueChange={onChange}
    >
      <span className="bodyMd-medium">{label}</span>
      {React.Children.map(children, (child) =>
        cloneElement(child, { labelPlacement })
      )}
    </RadioGroupPrimitive.Root>
  );
};

const Radio = {
  Root,
  Item,
};

export default Radio;

Item.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  withBounceEffect: PropTypes.bool,
};

Item.defaultProps = {
  value: '',
  disabled: false,
  withBounceEffect: true,
};

Root.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

Root.defaultProps = {
  onChange: () => {},
  disabled: false,
  label: null,
};
