import { ReactNode } from 'react';
import SelectZener from '@oshq/react-select';
import type {
  IGroupRender,
  IMenuItemRender,
  ISelect,
} from '@oshq/react-select';
import { ChevronUpDown } from '@jengaicons/react';
import { cn } from '../utils';
import AnimateHide from './animate-hide';

const menuItemRender = (props: IMenuItemRender) => {
  const { innerProps, render, active, focused } = props;
  return (
    <div
      {...innerProps}
      className={cn('px-xl py-lg cursor-pointer select-none', {
        'bg-surface-basic-hovered': !!focused && !active,
        'bg-surface-basic-active': !!active,
      })}
    >
      {typeof render === 'string'
        ? render
        : render?.({ active: !!active, focused: !!focused })}
    </div>
  );
};

const groupRender = ({ label }: IGroupRender) => {
  // return null;
  return (
    <div className="px-xl py-md bodySm-medium text-text-disabled">{label}</div>
  );
};

const suffixRender = () => {
  return (
    <div className="px-lg">
      <ChevronUpDown size={16} color="currentColor" />
    </div>
  );
};

const Select = <T, U extends boolean | undefined = undefined>(
  props: ISelect<T, U> & {
    label?: ReactNode;
    size?: 'md' | 'lg';
    message?: ReactNode;
    error?: boolean;
  }
) => {
  const {
    value,
    options,
    label,
    size = 'md',
    placeholder,
    message,
    error = false,
    onChange,
    disabled,
    valueRender,
    creatable,
    multiple,
  } = props;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-md">
        {label && (
          <div className="bodyMd-medium text-text-default h-4xl pulsable">
            {label}
          </div>
        )}
        <SelectZener
          open
          className={() => {
            const c = cn(
              'rounded flex flex-row items-center border bodyMd outline-none cursor-default',
              {
                'py-[10px] px-lg': size === 'lg',
                'py-[6px] px-lg': size === 'md',
              }
            );
            return {
              default: `${c} border-border-default bg-surface-basic-default text-text-default`,
              disabled: `${c} border-border-disabled text-text-disabled`,
              focus: `${c} bg-surface-basic-default border-border-default text-text-default ring-offset-1 ring-2 ring-border-focus`,
            };
          }}
          menuClass="shadow-popover bg-surface-basic-default rounded py-lg"
          menuItemRender={menuItemRender}
          value={value}
          options={options}
          placeholder={placeholder}
          showclear={false}
          suffixRender={suffixRender}
          onChange={onChange}
          groupRender={groupRender}
          disabled={disabled}
          valueRender={valueRender}
          creatable={creatable}
          multiple={multiple}
        />
      </div>
      <AnimateHide show={!!message}>
        <div
          className={cn(
            'bodySm pulsable',
            {
              'text-text-critical': !!error,
              'text-text-default': !error,
            },
            'pt-md'
          )}
        >
          {message}
        </div>
      </AnimateHide>
    </div>
  );
};

export default Select;
