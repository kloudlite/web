import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import React, { ReactElement, ReactNode, cloneElement, useId } from 'react';
import { BounceIt } from '../bounce-it';
import { cn } from '../utils';

type labelPlacements = 'left' | 'right' | (string & NonNullable<unknown>);

interface IRadioItem {
  disabled?: boolean;
  value: string;
  children: ReactNode;
  className?: string;
  withBounceEffect?: boolean;
  labelPlacement?: labelPlacements;
}

interface IRadioGroup {
  value: string;
  onChange?: (value: string) => void;
  label?: string;
  disabled?: boolean;
  children: ReactElement | ReactElement[];
  className?: string;
  labelPlacement?: labelPlacements;
  withBounceEffect?: boolean;
  direction?: 'vertical' | 'horizontal';
}

export const Item = ({
  disabled = false,
  value = '',
  children,
  className = '',
  withBounceEffect = true,
  labelPlacement = 'right',
}: IRadioItem) => {
  const id = useId();
  const rend = () => {
    return (
      <label
        htmlFor={id}
        className={cn(
          'flex items-center w-fit',
          {
            'cursor-pointer': !disabled,
            'flex-row-reverse': labelPlacement === 'left',
            'flex-row': labelPlacement === 'right',
          },
          className
        )}
        aria-label={value}
      >
        <RadioGroupPrimitive.Item
          className={cn(
            'w-2xl h-2xl outline-none rounded-full border pulsable pulsable-hidden ring-border-focus focus:ring-2 transition-all flex items-center justify-center border-border-default',
            {
              'hover:bg-surface-basic-hovered': !disabled,
              'data-[state=checked]:border-border-primary': !disabled,
              'data-[disabled]:border-border-disabled': disabled,
            }
          )}
          value={value}
          id={id}
          disabled={disabled}
          aria-label={value}
        >
          <RadioGroupPrimitive.Indicator
            className={cn('block w-lg h-lg rounded-full', {
              'bg-icon-disabled': disabled,
              'bg-surface-primary-default': !disabled,
            })}
          />
        </RadioGroupPrimitive.Item>
        <div
          className={cn(
            {
              'text-text-disabled': disabled,
              'text-text-default cursor-pointer': !disabled,
            },
            'bodyMd-medium pl-lg select-none flex-1'
          )}
        >
          {children}
        </div>
      </label>
    );
  };
  return withBounceEffect ? <BounceIt>{rend()}</BounceIt> : rend();
};

export const Root = ({
  value,
  onChange = () => { },
  label,
  disabled = false,
  children,
  className = '',
  labelPlacement = 'right',
  withBounceEffect = true,
  direction = 'vertical',
}: IRadioGroup) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        'flex ',
        {
          'flex-row gap-x-xl': direction === 'horizontal',
          'flex-col gap-y-xl': direction === 'vertical',
        },
        className
      )}
      value={value}
      aria-label={label || 'Radio choice'}
      disabled={disabled}
      onValueChange={onChange}
    >
      {label && <span className="bodyMd-medium">{label}</span>}
      {React.Children.map(children, (child) =>
        cloneElement(child, { labelPlacement, withBounceEffect })
      )}
    </RadioGroupPrimitive.Root>
  );
};

const Radio = {
  Root,
  Item,
};

export default Radio;
