import PropTypes from 'prop-types';
import { useEffect, useId, useState } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '../utils';

const RadioGroupItem = (props) => {
  const { disabled, value, label } = props;
  const id = useId();
  return (
    <div
      className={cn('flex items-center w-fit', {
        'cursor-pointer': !disabled,
      })}
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
      {label && (
        <label
          className={cn(
            {
              'text-text-disabled': disabled,
              'text-text-default cursor-pointer': !disabled,
            },
            'bodyMd-medium pl-lg select-none'
          )}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export const RadioGroup = (props) => {
  const { value: v, onChange, label, disabled, items } = props;
  const [value, setValue] = useState(v);
  useEffect(() => {
    if (onChange) onChange(value);
  }, [value]);
  return (
    <RadioGroupPrimitive.Root
      className="flex flex-col gap-y-xl"
      value={value}
      aria-label={label}
      disabled={disabled}
      onValueChange={(e) => {
        setValue(e);
      }}
    >
      <span className="bodyMd-medium">{label}</span>
      {items &&
        items.map((item) => (
          <RadioGroupItem
            label={item.label}
            value={item.value}
            disabled={item.disabled || disabled}
            key={item.key}
          />
        ))}
    </RadioGroupPrimitive.Root>
  );
};

RadioGroup.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      disabled: PropTypes.bool,
      key: PropTypes.string,
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

RadioGroup.defaultProps = {
  onChange: () => {},
  disabled: false,
};
