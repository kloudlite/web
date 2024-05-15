import React, { ReactElement, ReactNode, cloneElement, useId } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '../utils';
import { BounceIt } from '../bounce-it';

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
      >
        <RadioGroupPrimitive.Item
          className={cn(
            'w-2xl h-2xl outline-none rounded-full border pulsable pulsable-hidden ring-border-focus dark:ring-border-darktheme-focus ring-offset-1 dark:ring-offset-0 focus:ring-2 transition-all flex items-center justify-center border-border-default dark:border-border-darktheme-default',
            {
              'hover:bg-surface-basic-hovered dark:hover:bg-surface-darktheme-basic-hovered':
                !disabled,
              'data-[state=checked]:border-border-primary dark:data-[state=checked]:border-border-darktheme-primary':
                !disabled,
              'data-[disabled]:border-border-disabled dark:data-[disabled]:border-border-darktheme-disabled':
                disabled,
            }
          )}
          value={value}
          id={id}
          disabled={disabled}
        >
          <RadioGroupPrimitive.Indicator
            className={cn('block w-lg h-lg rounded-full', {
              'bg-icon-disabled dark:bg-icon-darktheme-disabled': disabled,
              'bg-surface-primary-default dark:bg-surface-darktheme-primary-default':
                !disabled,
            })}
          />
        </RadioGroupPrimitive.Item>
        <div
          className={cn(
            {
              'text-text-disabled dark:text-text-darktheme-disabled': disabled,
              'text-text-default dark:text-text-darktheme-default cursor-pointer':
                !disabled,
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
  onChange = () => {},
  label,
  disabled = false,
  children,
  className = '',
  labelPlacement = 'right',
  withBounceEffect = true,
}: IRadioGroup) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('flex flex-col gap-y-xl', className)}
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
