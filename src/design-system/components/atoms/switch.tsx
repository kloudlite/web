import { useState, useEffect, useId, ReactNode } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../utils';

interface SwitchProps {
  checked?: boolean;
  onChange?: (check: boolean) => void;
  disabled?: boolean;
  label: ReactNode;
}

export const Switch = ({
  checked: c = false,
  onChange = () => {},
  disabled = false,
  label,
}: SwitchProps) => {
  const [checked, setChecked] = useState(c);
  const id = useId();

  useEffect(() => {
    if (onChange) onChange(checked);
  }, [checked]);

  return (
    <div className="flex gap-lg items-center w-fit">
      <SwitchPrimitive.Root
        className={cn(
          'transition-all w-7xl rounded-full border flex items-center p-sm cursor-pointer',
          'ring-border-focus ring-offset-1 focus:ring-2 outline-none',
          {
            'data-[state=unchecked]:bg-surface-basic-default data-[state=unchecked]:border-border-default':
              !disabled,
          },
          {
            'data-[state=checked]:bg-surface-primary-default data-[state=checked]:border-border-primary':
              !disabled,
          },
          {
            'data-[disabled]:bg-surface-basic-default data-[disabled]:border-border-disabled data-[disabled]:!cursor-default':
              disabled,
          }
        )}
        id={id}
        disabled={disabled}
        onCheckedChange={(e) => {
          setChecked(e);
        }}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            'group rounded-full translate-x-0 transition-all duration-200 data-[state=checked]:translate-x-full'
          )}
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              {
                'group-data-[disabled]:fill-icon-disabled': disabled,
              },
              {
                'group-data-[state=unchecked]:fill-surface-primary-default group-data-[state=checked]:fill-surface-basic-default':
                  !disabled,
              }
            )}
          >
            <circle cx="11" cy="11" r="10.5" />
          </svg>
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
      {label && (
        <label
          className={cn(
            {
              'text-text-disabled': disabled,
              'text-text-default cursor-pointer': !disabled,
            },
            'bodyMd-medium select-none'
          )}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
};
