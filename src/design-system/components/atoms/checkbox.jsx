import PropTypes from 'prop-types';
import { useEffect, useId, useState } from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '../utils';

export const Checkbox = (props) => {
  const { checked: c, onChange, disabled, error, indeterminate, label } = props;
  const [checked, setChecked] = useState(c);

  useEffect(() => {
    if (onChange) onChange(checked);
  }, [checked]);

  const id = useId();

  return (
    <div className="flex items-center justify-center w-fit">
      <CheckboxPrimitive.Root
        className={cn(
          'rounded flex flex-row items-center justify-center border w-2xl h-2xl outline-none transition-all cursor-pointer',
          'ring-border-focus ring-offset-1 focus:ring-2',
          {
            'border-border-disabled !cursor-default': disabled,
          },
          {
            'bg-surface-basic-default border-border-default':
              !checked && !disabled && !error,
            'bg-surface-critical-subdued border-border-critical':
              !checked && !disabled && error,
            'bg-surface-primary-default border-border-primary':
              checked && !error && !disabled,
            'bg-surface-critical-default border-border-critical':
              checked && error && !disabled,
            'hover:bg-surface-basic-hovered': !checked && !disabled,
          }
        )}
        defaultChecked
        id={id}
        checked={checked}
        onCheckedChange={(e) => {
          setChecked((prev) => {
            if (indeterminate) {
              if (prev === 'indeterminate') return false;
              return 'indeterminate';
            }
            return e;
          });
        }}
        disabled={disabled}
      >
        <CheckboxPrimitive.Indicator>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {checked === true && (
              <path
                d="M12.25 3.50017L5.25 10.4999L1.75 7.00017"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn({
                  'stroke-text-disabled': disabled,
                  'stroke-text-on-primary': !disabled,
                })}
              />
            )}
            {checked === 'indeterminate' && (
              <path
                d="M1.75 7H12.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn({
                  'stroke-text-disabled': disabled,
                  'stroke-text-on-primary': !disabled,
                })}
              />
            )}
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          className={cn(
            {
              'text-text-disabled': disabled,
              'text-text-default cursor-pointer': !disabled && !error,
              'text-text-critical cursor-pointer': !disabled && error,
            },
            'bodyMd pl-lg select-none'
          )}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  indeterminate: PropTypes.bool,
};

Checkbox.defaultProps = {
  onChange: () => {},
  disabled: false,
  error: false,
  checked: false,
  indeterminate: false,
};
