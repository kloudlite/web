/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useId, useMemo, useState } from 'react';
import { cn } from '../utils';

export const Option = ({ children, value }) => {
  return <option value={value}>{children}</option>;
};
export const Select = (props) => {
  const {
    disabled,
    value: v,
    onChange,
    className,
    children,
    label,
    block = true,
  } = props;
  const [value, setValue] = useState(v);
  useEffect(() => {
    if (onChange) onChange(value);
  }, [value]);
  const tempId = useId();
  const id = useMemo(() => tempId, []);
  return (
    <div className="flex flex-col gap-md">
      {label && (
        <label className="bodyMd-medium select-none" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        name="itemperpage"
        id={id}
        disabled={disabled}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        className={cn(
          'bodyMd py-lg pl-lg pr-5xl text-text-default border-border-default bg-surface-basic-input transition-all rounded border flex flex-row items-center relative outline-none disabled:bg-surface-basic-input disabled:text-text-disabled ring-offset-1 focus-within:ring-2 focus-within:ring-border-focus appearance-none',
          {
            'text-text-disabled border-border-disabled bg-surface-basic-input':
              disabled,
          },
          {
            'w-full': block,
          },
          className
        )}
      >
        {children}
      </select>
    </div>
  );
};
