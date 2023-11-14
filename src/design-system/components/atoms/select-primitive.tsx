/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEventHandler, ReactNode, useId, useMemo } from 'react';
import { cn } from '../utils';

interface IOption {
  children?: ReactNode;
  value: string;
  disabled?: boolean;
}
const Option = ({ children, value = '', disabled, ...props }: IOption) => {
  return (
    <option value={value} disabled={disabled} {...props}>
      {children}
    </option>
  );
};

interface IRoot {
  disabled?: boolean;
  value: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  className?: string;
  children: ReactNode;
  label?: ReactNode;
  size?: 'md' | 'lg';
  block?: boolean;
  error?: boolean;
  message?: ReactNode;
}

export const Root = (props: IRoot) => {
  const {
    disabled,
    value,
    onChange,
    className,
    children,
    label,
    size = 'md',
    block = true,
    error,
    ...extraProps
  } = props;

  const tempId = useId();
  const id = useMemo(() => tempId, []);
  return (
    <div className="flex flex-col">
      <div
        className={cn('flex items-center', {
          'pb-md': !!label,
        })}
      >
        <label
          className="flex-1 select-none bodyMd-medium text-text-default"
          htmlFor={id}
        >
          {label}
        </label>
        <div
          className={cn({
            'h-4xl': !!label,
          })}
        />
      </div>
      <select
        {...extraProps}
        id={id}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={cn(
          'bodyMd py-lg pl-lg pr-5xl text-text-default border-border-default bg-surface-basic-input transition-all rounded border flex flex-row items-center relative outline-none disabled:bg-surface-basic-input disabled:text-text-disabled disabled:border-border-disabled ring-offset-1 focus-within:ring-2 focus-within:ring-border-focus appearance-none',
          {
            'w-full': block,
            'py-lg': size === 'md',
            'py-xl': size === 'lg',
          },
          className
        )}
      >
        {children}
      </select>
    </div>
  );
};

const SelectPrimitive = {
  Root,
  Option,
};

export default SelectPrimitive;
