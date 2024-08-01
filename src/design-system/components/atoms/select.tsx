import { ReactNode } from 'react';
import SelectZener from '@oshq/react-select';
import type {
  IGroupRender,
  IMenuItemRender,
  ISelect,
} from '@oshq/react-select';
import { ChevronUpDown, CircleNotch, X } from '~/components/icons';
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
  return (
    <div className="bodySm-medium text-text-disabled px-lg py-md">{label}</div>
  );
};

const suffixRender = ({
  loading,
  showclear,
  clear,
  error,
  disabled,
}: {
  loading: boolean;
  clear: (() => void) | undefined;
  showclear: boolean | undefined;
  error: boolean;
  disabled: boolean;
}) => {
  const iconSize = 16;
  return (
    <div
      className={cn(
        'px-lg flex flex-row items-center gap-lg',
        error && !disabled ? 'text-text-critical' : '',
      )}
    >
      {loading && (
        <span className="animate-spin">
          <CircleNotch size={iconSize} />
        </span>
      )}
      <ChevronUpDown size={iconSize} color="currentColor" />
      {showclear && (
        <span onClick={clear} className="cursor-pointer">
          <X size={iconSize} color="currentColor" />
        </span>
      )}
    </div>
  );
};

const Select = <T, U extends boolean | undefined = undefined>(
  props: ISelect<T, U> & {
    label?: ReactNode;
    size?: 'md' | 'lg';
    message?: ReactNode;
    loading?: boolean;
    error?: boolean;
  },
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
    loading,
    onSearch,
    searchable,
    showclear,
    noOptionMessage,
    open,
    disableWhileLoading,
    createLabel,
  } = props;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-md">
        {label && (
          <div className="bodyMd-medium text-text-default h-4xl">{label}</div>
        )}
        <div className="pulsable">
          <div className="pulsable pulsable-hidden">
            <SelectZener
              className={() => {
                const c = cn(
                  'rounded flex flex-row items-center border bodyMd outline-none cursor-default',
                  {
                    'py-[10px] px-lg h-[48px]': size === 'lg',
                    'py-[6px] px-lg h-[36px]': size === 'md',
                  },
                  error && !disabled
                    ? 'bg-surface-critical-subdued border-text-critical text-text-critical'
                    : '',
                );
                return {
                  default: `${c} border-border-default bg-surface-basic-input text-text-default`,
                  disabled: `${c} border-border-disabled text-text-disabled`,
                  focus: `${c} bg-surface-basic-default border-border-input text-text-default ring-offset-1 ring-2 ring-border-focus`,
                };
              }}
              open={open}
              menuClass="shadow-popover bg-surface-basic-default border border-border-default rounded py-lg"
              menuItemRender={menuItemRender}
              value={value}
              options={options}
              placeholder={
                <div
                  className={cn(
                    error && !disabled
                      ? 'text-text-critical/70'
                      : 'text-text-disabled',
                  )}
                >
                  {placeholder}
                </div>
              }
              showclear={showclear}
              suffixRender={({ clear, showclear }) =>
                suffixRender({
                  loading: loading || false,
                  clear,
                  showclear,
                  error,
                  disabled: !!disabled,
                })
              }
              onChange={onChange}
              groupRender={groupRender}
              disabled={disabled}
              valueRender={valueRender}
              creatable={creatable}
              multiple={multiple}
              onSearch={onSearch}
              searchable={searchable}
              noOptionMessage={noOptionMessage}
              disableWhileLoading={disableWhileLoading}
              createLabel={createLabel}
            />
          </div>
        </div>
      </div>
      <AnimateHide show={!!message}>
        <div
          className={cn(
            'bodySm pulsable',
            {
              'text-text-critical': !!error,
              'text-text-default': !error,
            },
            'pt-md',
          )}
        >
          {message}
        </div>
      </AnimateHide>
    </div>
  );
};

export default Select;
