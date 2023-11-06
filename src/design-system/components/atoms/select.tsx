// import { X } from '@jengaicons/react';
// import React, {
//   ReactNode,
//   createContext,
//   useContext,
//   useMemo,
//   useRef,
// } from 'react';
// import RSelect, {
//   ClearIndicatorProps,
//   ControlProps,
//   DropdownIndicatorProps,
//   GroupBase,
//   GroupHeadingProps,
//   IndicatorsContainerProps,
//   InputProps,
//   MenuListProps,
//   MenuProps,
//   MultiValueGenericProps,
//   MultiValueRemoveProps,
//   OptionProps,
//   PlaceholderProps,
//   SingleValueProps,
//   ValueContainerProps,
//   components,
// } from 'react-select';
// import AsyncSelect from 'react-select/async';
// import RCreatable from 'react-select/creatable';
// import { ChildrenProps } from '../types';
// import { cn } from '../utils';
// import AnimateHide from './animate-hide';

// declare module 'react-select/dist/declarations/src/Select' {
//   export interface Props<
//     Option,
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
//     IsMulti extends boolean,
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
//     Group extends GroupBase<Option>
//   > {
//     label?: string;
//     size?: 'md' | 'lg';
//     error?: boolean;
//   }
// }

// type IOption = {
//   label: string;
//   labelValueIcon?: ReactNode;
//   value: string;
//   render?: () => ReactNode;
// };

// interface IGroup<T> {
//   label: string;
//   options: T;
// }

// type ExtractOptionType<T, A> = T extends IGroup<IOption[] | T[]>
//   ? A extends true
//     ? T['options'][number][]
//     : T['options'][number]
//   : A extends true
//   ? T[]
//   : T;

// interface ISelect<T, A> {
//   label?: string;
//   size?: 'md' | 'lg';
//   options: T[] & (IOption[] | IGroup<IOption[] | T[]>[]);
//   value: ExtractOptionType<T, A> | undefined; // Ensure value matches the type of options
//   creatable?: boolean;
//   async?: boolean;
//   multiselect?: A;
//   placeholder?: string;
//   onChange?: (value: ExtractOptionType<T, A>) => void;
//   onCreateOption?(value: string): void;
//   error?: boolean;
//   message?: ReactNode;
//   disabled?: boolean;
// }
// const Control = <T,>(props: ControlProps<T, boolean>) => {
//   const { selectProps } = props;

//   return (
//     <div className="flex flex-col gap-md">
//       {selectProps.label && (
//         <div className="bodyMd-medium text-text-default h-4xl pulsable">
//           {selectProps.label}
//         </div>
//       )}

//       <components.Control
//         {...props}
//         className={cn(
//           'rounded flex flex-row items-center pulsable',
//           {
//             'py-sm px-lg': selectProps.size === 'md',
//             'py-md px-lg': selectProps.size === 'lg',
//           },
//           {
//             'border border-border-default bg-surface-basic-default':
//               !selectProps.error,
//             'border bg-surface-critical-subdued border-border-critical text-text-critical':
//               !!selectProps.error,
//             'text-text-disabled border-border-disabled bg-surface-basic-input':
//               selectProps.isDisabled,
//           }
//         )}
//       />
//     </div>
//   );
// };

// const ValueContainer = <T,>({ children, ...props }: ValueContainerProps<T>) => {
//   const { selectProps } = props;
//   return (
//     <components.ValueContainer
//       {...props}
//       className={cn({
//         'py-xs': selectProps.size === 'md',
//         'py-sm': selectProps.size === 'lg',
//       })}
//     >
//       {children}
//     </components.ValueContainer>
//   );
// };

// const Input = <T,>(props: InputProps<T, boolean, GroupBase<T>>) => {
//   const { selectProps } = props;
//   return (
//     <components.Input
//       {...props}
//       className={cn({
//         'py-md': selectProps.size === 'lg',
//       })}
//     />
//   );
// };

// const SingleValue = <T extends IOption>({
//   children,
//   ...props
// }: SingleValueProps<T>) => {
//   const { selectProps, data } = props;
//   const { labelValueIcon } = data;

//   return (
//     <components.SingleValue
//       {...props}
//       className={cn('flex flex-row items-center gap-lg bodyMd', {
//         'text-text-default': !selectProps.isDisabled,
//         'text-text-disabled': selectProps.isDisabled,
//       })}
//     >
//       {labelValueIcon && <span>{labelValueIcon}</span>}
//       {children}
//     </components.SingleValue>
//   );
// };

// const IndicatorsContainer = <T,>(
//   props: IndicatorsContainerProps<T, boolean>
// ) => {
//   return <components.IndicatorsContainer {...props} />;
// };

// const DropdownIndicator = <T,>(props: DropdownIndicatorProps<T, boolean>) => {
//   const { selectProps } = props;
//   return (
//     <components.DropdownIndicator {...props}>
//       <svg
//         width="16"
//         height="16"
//         viewBox="0 0 16 16"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         className={cn({
//           'fill-icon-default': !selectProps.error,
//           'fill-icon-critical': !!selectProps.error,
//           'fill-icon-disabled': selectProps.isDisabled,
//         })}
//       >
//         <path
//           fillRule="evenodd"
//           clipRule="evenodd"
//           d="M3.74053 5.96715C3.54527 6.16241 3.22869 6.16241 3.03342 5.96715C2.83816 5.77189 2.83816 5.45531 3.03342 5.26004L7.64642 0.647046C7.84169 0.451783 8.15827 0.451783 8.35353 0.647046L12.9665 5.26004C13.1618 5.45531 13.1618 5.77189 12.9665 5.96715C12.7713 6.16241 12.4547 6.16241 12.2594 5.96715L7.99998 1.70771L3.74053 5.96715ZM3.74053 10.0329C3.54527 9.83763 3.22869 9.83763 3.03342 10.0329C2.83816 10.2282 2.83816 10.5447 3.03342 10.74L7.64642 15.353C7.84169 15.5483 8.15827 15.5483 8.35353 15.353L12.9665 10.74C13.1618 10.5447 13.1618 10.2282 12.9665 10.0329C12.7713 9.83763 12.4547 9.83763 12.2594 10.0329L7.99998 14.2923L3.74053 10.0329Z"
//         />
//       </svg>
//     </components.DropdownIndicator>
//   );
// };

// const Menu = <T,>({
//   children,
//   ...props
// }: MenuProps<T, boolean, GroupBase<T>>) => {
//   return (
//     <components.Menu
//       {...props}
//       className="absolute mt-md top-full w-full z-10 rounded border border-border-default bg-surface-basic-default shadow-popover py-lg"
//     >
//       {children}
//     </components.Menu>
//   );
// };

// const MenuList = <T,>({
//   children,
//   ...props
// }: MenuListProps<T, false, GroupBase<T>>) => {
//   return <components.MenuList {...props}>{children}</components.MenuList>;
// };

// const Option = ({ children, ...props }: OptionProps<IOption, boolean>) => {
//   const { isFocused, isSelected, isDisabled, innerRef, innerProps, data } =
//     props;

//   return (
//     <div
//       ref={innerRef}
//       {...innerProps}
//       className={cn(
//         'px-xl py-lg flex flex-row items-center gap-xl bodyMd cursor-default',
//         {
//           'bg-surface-basic-hovered': isFocused && !isSelected,
//           'bg-surface-basic-active': isSelected,
//           'text-text-default': !isDisabled,
//           'text-text-disabled pointer-events-none': isDisabled,
//         }
//       )}
//     >
//       {data.render ? data?.render() : children}
//     </div>
//   );
// };

// const Placeholder = ({ children, ...props }: PlaceholderProps<IOption>) => {
//   const { selectProps } = props;
//   return (
//     <components.Placeholder
//       {...props}
//       className={cn('bodyMd', {
//         'text-text-default/60': !selectProps.error && !selectProps.isDisabled,
//         'text-text-critical/60': !!selectProps.error && !selectProps.isDisabled,
//         'text-text-disabled': selectProps.isDisabled,
//       })}
//     >
//       {children}
//     </components.Placeholder>
//   );
// };

// const MultiValueContainer = ({
//   children,
//   ..._props
// }: MultiValueGenericProps<IOption>) => {
//   return (
//     <div className="flex flex-row items-center px-lg py-md gap-md rounded border border-border-default bg-surface-basic-active mr-lg bodyMd-medium text-text-default">
//       {children}
//     </div>
//   );
// };

// const MultiValueRemove = (props: MultiValueRemoveProps<IOption>) => {
//   return (
//     <components.MultiValueRemove {...props}>
//       <X size={14} />
//     </components.MultiValueRemove>
//   );
// };

// const ClearIndicator = (props: ClearIndicatorProps<IOption, boolean>) => {
//   const {
//     innerProps: { ref, ...restInnerProps },
//   } = props;
//   return (
//     <div {...restInnerProps} ref={ref} className="p-md cursor-pointer">
//       <X size={16} />
//     </div>
//   );
// };

// const GroupHeading = (props: GroupHeadingProps<IOption>) => (
//   <components.GroupHeading
//     {...props}
//     className="py-md px-xl flex flex-row items-center bodySm-medium text-text-disabled"
//   />
// );

// const SelectContext = createContext<React.MutableRefObject<null> | null>(null);

// export const SelectPortalContainer = ({ children }: ChildrenProps) => {
//   const ref = useRef(null);

//   return (
//     <SelectContext.Provider value={useMemo(() => ref, [ref])}>
//       {children}
//       <div className="select-portal" ref={ref} />
//     </SelectContext.Provider>
//   );
// };

// const Select = <T, A extends boolean | undefined = undefined>({
//   label,
//   size = 'md',
//   options,
//   value,
//   creatable = false,
//   async = false,
//   multiselect = false,
//   placeholder = '',
//   onChange,
//   onCreateOption,
//   error,
//   message,
//   disabled = false,
// }: ISelect<T, A>) => {
//   const portalRef = useContext(SelectContext);
//   let Component = creatable ? RCreatable : RSelect;
//   Component = async ? AsyncSelect : Component;

//   return (
//     <div>
//       <Component<IOption, boolean>
//         classNames={{
//           control: (state) => {
//             return state.isFocused
//               ? 'ring-offset-1 ring-2 ring-border-focus'
//               : '';
//           },
//         }}
//         menuPortalTarget={portalRef?.current}
//         label={label}
//         isDisabled={disabled}
//         size={size}
//         isMulti={multiselect}
//         options={options as any}
//         value={value as any}
//         onChange={onChange as any}
//         error={error}
//         onCreateOption={onCreateOption}
//         styles={{
//           menu: () => ({}),
//           option: () => ({}),
//           menuPortal: (css) => {
//             return {
//               ...css,
//               zIndex: 9999,
//               pointerEvents: 'all',
//             };
//           },
//         }}
//         unstyled
//         placeholder={placeholder}
//         components={{
//           Control,
//           Input,
//           IndicatorsContainer,
//           DropdownIndicator,
//           ValueContainer,
//           SingleValue,
//           IndicatorSeparator: null,
//           Menu,
//           MenuList,
//           Option,
//           Placeholder,
//           MultiValueContainer,
//           MultiValueRemove,
//           ClearIndicator,
//           GroupHeading,
//         }}
//       />
//       <AnimateHide show={!!message}>
//         <div
//           className={cn(
//             'bodySm pulsable',
//             {
//               'text-text-critical': !!error,
//               'text-text-default': !error,
//             },
//             'pt-md'
//           )}
//         >
//           {message}
//         </div>
//       </AnimateHide>
//     </div>
//   );
// };

// export default Select;

import { ReactNode } from 'react';

import SelectP from 'react-select-test';
import type { ISelect, IOptionItem } from 'react-select-test';
import { ChevronUpDown } from '@jengaicons/react';
import { cn } from '../utils';

const menuItemRender = (props: IOptionItem) => {
  const { innerProps, render, active, focused } = props;
  return (
    <div
      {...innerProps}
      className={cn('px-xl py-lg', {
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

const Suffix = () => {
  return (
    <div className="px-lg text-text-default">
      <ChevronUpDown size={16} />
    </div>
  );
};
const Select = <T, U extends boolean | undefined = undefined>(
  props: ISelect<T, U> & { label: ReactNode; size: 'md' | 'lg' }
) => {
  const { value, options, label, size, placeholder } = props;

  return (
    <SelectP
      className={cn(
        'rounded flex flex-row items-center border border-border-default bg-surface-basic-default bodyMd text-text-default focus:ring-offset-1 focus:ring-2 focus:ring-border-focus outline-none',
        {
          'py-[10px] px-lg': size === 'lg',
          'py-[6px] px-lg': size === 'md',
        }
      )}
      menuClass="shadow-popover bg-surface-basic-default rounded py-lg"
      menuItemRender={menuItemRender}
      value={value}
      options={options}
      placeholder={placeholder}
      showclear={false}
      suffix={<Suffix />}
    />
  );
};

export default Select;
