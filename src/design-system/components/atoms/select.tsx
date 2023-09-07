import RSelect, {
  ClearIndicatorProps,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  IndicatorsContainerProps,
  InputProps,
  MenuListProps,
  MenuProps,
  MultiValueGenericProps,
  MultiValueRemoveProps,
  OptionProps,
  PlaceholderProps,
  PropsValue,
  SingleValueProps,
  ValueContainerProps,
  components,
} from 'react-select';
import RCreatable from 'react-select/creatable';
import AsyncSelect from 'react-select/async';
import { X } from '@jengaicons/react';
import { ReactNode } from 'react';
import { cn } from '../utils';

declare module 'react-select/dist/declarations/src/Select' {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  > {
    label?: string;
    size?: 'md' | 'lg';
  }
}

interface IOptionBase {
  label: string;
  value: string;
  render?: () => ReactNode;
}

type IOption<T> = { [property in keyof T]: T[property] } & IOptionBase;

interface IGroupOption<T> {
  label: string;
  options: IOption<T>[];
}
interface ISelect<T> {
  label?: string;
  size?: 'md' | 'lg';
  options: (IOption<T> | IGroupOption<T>)[];
  value: PropsValue<IOption<T>> | undefined;
  creatable?: boolean;
  async?: boolean;
  multiselect?: boolean;
  placeholder?: string;
  onChange?: (value: T) => void;
}
const Control = <T,>(props: ControlProps<T, boolean>) => {
  const { selectProps } = props;

  return (
    <div className="flex flex-col gap-md">
      {selectProps.label && (
        <div className="bodyMd-medium text-text-default h-4xl">
          {selectProps.label}
        </div>
      )}

      <components.Control
        {...props}
        className={cn(
          'rounded border border-border-default bg-surface-basic-default flex flex-row items-center',
          {
            'py-sm px-lg': selectProps.size === 'md',
            'py-md px-lg': selectProps.size === 'lg',
          }
        )}
      />
    </div>
  );
};

const ValueContainer = <T,>({ children, ...props }: ValueContainerProps<T>) => {
  const { selectProps } = props;
  return (
    <components.ValueContainer
      {...props}
      className={cn({
        'py-xs': selectProps.size === 'md',
        'py-sm': selectProps.size === 'lg',
      })}
    >
      {children}
    </components.ValueContainer>
  );
};

const Input = <T,>(props: InputProps<T, boolean, GroupBase<T>>) => {
  const { selectProps } = props;
  return (
    <components.Input
      {...props}
      className={cn({
        'py-md': selectProps.size === 'lg',
      })}
    />
  );
};

const SingleValue = <T,>({ children, ...props }: SingleValueProps<T>) => (
  <components.SingleValue {...props} className="bodyMd text-text-default">
    {children}
  </components.SingleValue>
);

const IndicatorsContainer = <T,>(
  props: IndicatorsContainerProps<T, boolean>
) => {
  return <components.IndicatorsContainer {...props} />;
};

const DropdownIndicator = <T,>(props: DropdownIndicatorProps<T, boolean>) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.74053 5.96715C3.54527 6.16241 3.22869 6.16241 3.03342 5.96715C2.83816 5.77189 2.83816 5.45531 3.03342 5.26004L7.64642 0.647046C7.84169 0.451783 8.15827 0.451783 8.35353 0.647046L12.9665 5.26004C13.1618 5.45531 13.1618 5.77189 12.9665 5.96715C12.7713 6.16241 12.4547 6.16241 12.2594 5.96715L7.99998 1.70771L3.74053 5.96715ZM3.74053 10.0329C3.54527 9.83763 3.22869 9.83763 3.03342 10.0329C2.83816 10.2282 2.83816 10.5447 3.03342 10.74L7.64642 15.353C7.84169 15.5483 8.15827 15.5483 8.35353 15.353L12.9665 10.74C13.1618 10.5447 13.1618 10.2282 12.9665 10.0329C12.7713 9.83763 12.4547 9.83763 12.2594 10.0329L7.99998 14.2923L3.74053 10.0329Z"
          fill="#111827"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

const Menu = <T,>({
  children,
  ...props
}: MenuProps<T, boolean, GroupBase<T>>) => {
  return (
    <components.Menu
      {...props}
      className="absolute mt-md top-full w-full z-10 rounded border border-border-default bg-surface-basic-default shadow-popover py-lg"
    >
      {children}
    </components.Menu>
  );
};

const MenuList = <T,>({
  children,
  ...props
}: MenuListProps<T, false, GroupBase<T>>) => {
  return <components.MenuList {...props}>{children}</components.MenuList>;
};

const Option = <T,>({ children, ...props }: OptionProps<IOption<T>>) => {
  const { isFocused, isSelected, isDisabled, innerRef, innerProps, data } =
    props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={cn(
        'px-xl py-lg flex flex-row items-center gap-xl bodyMd cursor-default',
        {
          'bg-surface-basic-hovered': isFocused && !isSelected,
          'bg-surface-basic-active': isSelected,
          'text-text-default': !isDisabled,
          'text-text-disabled pointer-events-none': isDisabled,
        }
      )}
    >
      {data.render ? data.render() : children}
    </div>
  );
};

const Placeholder = <T,>({
  children,
  ...props
}: PlaceholderProps<IOption<T>>) => {
  return (
    <components.Placeholder {...props} className="text-text-default/80 bodyMd">
      {children}
    </components.Placeholder>
  );
};

const MultiValueContainer = <T,>({
  children,
  ..._props
}: MultiValueGenericProps<IOption<T>>) => {
  return (
    <div className="flex flex-row items-center px-lg py-md gap-md rounded border border-border-default bg-surface-basic-active mr-lg bodyMd-medium text-text-default">
      {children}
    </div>
  );
};

const MultiValueRemove = <T,>(props: MultiValueRemoveProps<IOption<T>>) => {
  return (
    <components.MultiValueRemove {...props}>
      <X size={14} />
    </components.MultiValueRemove>
  );
};

const ClearIndicator = <T,>(
  props: ClearIndicatorProps<IOption<T>, boolean>
) => {
  const {
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div {...restInnerProps} ref={ref} className="p-md cursor-pointer">
      <X size={16} />
    </div>
  );
};

const Select = <T,>({
  label,
  size = 'md',
  options,
  value,
  creatable = false,
  async = false,
  multiselect = false,
  placeholder = '',
  onChange,
}: ISelect<T>) => {
  let Component = creatable ? RCreatable : RSelect;
  Component = async ? AsyncSelect : Component;
  return (
    <Component
      classNames={{
        control: (state) => {
          return state.isFocused
            ? 'ring-offset-1 ring-2 ring-border-focus'
            : '';
        },
      }}
      label={label}
      size={size}
      isMulti={multiselect}
      options={options}
      value={value}
      onChange={onChange as any}
      styles={{ menu: () => ({}), option: () => ({}) }}
      unstyled
      placeholder={placeholder}
      components={{
        Control,
        Input,
        IndicatorsContainer,
        DropdownIndicator,
        ValueContainer,
        SingleValue,
        IndicatorSeparator: null,
        Menu,
        MenuList,
        Option,
        Placeholder,
        MultiValueContainer,
        MultiValueRemove,
        ClearIndicator,
      }}
    />
  );
};

export default Select;
