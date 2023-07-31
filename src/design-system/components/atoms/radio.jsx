import PropTypes from 'prop-types';
import React, { cloneElement, useEffect, useId, useState } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '../utils';
import { BounceIt } from '../bounce-it';

export const RadioItem = (props) => {
  const {
    disabled,
    value,
    children,
    className,
    withBounceEffect,
    labelPlacement = 'right',
  } = props;
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

export const RadioGroup = (props) => {
  const {
    value: v,
    onChange,
    label,
    disabled,
    children,
    className,
    labelPlacement = 'right',
  } = props;
  const [value, setValue] = useState(v);
  useEffect(() => {
    if (onChange) onChange(value);
  }, [value]);
  return (
    <RadioGroupPrimitive.Root
      className={cn('flex flex-col gap-y-xl', className)}
      value={value}
      aria-label={label}
      disabled={disabled}
      onValueChange={(e) => {
        setValue(e);
      }}
    >
      <span className="bodyMd-medium">{label}</span>
      {React.Children.map(children, (child) =>
        cloneElement(child, { labelPlacement })
      )}
    </RadioGroupPrimitive.Root>
  );
};

RadioItem.propTypes = {
  value: PropTypes.any,
  disabled: PropTypes.bool,
  withBounceEffect: PropTypes.bool,
};

RadioItem.defaultProps = {
  value: '',
  disabled: false,
  withBounceEffect: true,
};

RadioGroup.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

RadioGroup.defaultProps = {
  onChange: () => {},
  disabled: false,
  label: null,
};
