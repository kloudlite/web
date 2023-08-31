import React, { ReactElement, ReactNode, cloneElement, useId } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '../utils';
import { BounceIt } from '../bounce-it';

type labelPlacements = 'left' | 'right' | (string & NonNullable<unknown>);

interface ItemProps {
  disabled?: boolean;
  value: string;
  children: ReactNode;
  className?: string;
  withBounceEffect?: boolean;
  labelPlacement?: labelPlacements;
}

export const Item = ({
  disabled = false,
  value = '',
  children,
  className = '',
  withBounceEffect = true,
  labelPlacement = 'right',
}: ItemProps) => {
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

interface RootProps {
  value: string;
  onChange?: () => void;
  label: string;
  disabled?: boolean;
  children: ReactElement | ReactElement[];
  className?: string;
  labelPlacement?: labelPlacements;
  withBounceEffect?: boolean;
}

export const Root = ({
  value,
  onChange = () => {},
  label,
  disabled = false,
  children,
  className = '',
  labelPlacement = 'right',
  withBounceEffect = true,
}: RootProps) => {
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
