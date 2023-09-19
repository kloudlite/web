import {
  CaretDownFill,
  CaretUpFill,
  Eye,
  EyeSlash,
  XCircleFill,
} from '@jengaicons/react';
import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  PointerEventHandler,
  ReactNode,
  cloneElement,
  forwardRef,
  useId,
  useRef,
  useState,
} from 'react';
import { cn } from '../utils';
import AnimateHide from './animate-hide';

type InputSizes = 'md' | 'lg' | (undefined & NonNullable<unknown>);

export interface IInputRow {
  value?: string | number;
  extra?: JSX.Element;
  className?: string;
  error?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  autoComplete?: 'off' | (undefined & NonNullable<unknown>);
  onChange?: ChangeEventHandler<HTMLInputElement>;
  message?: ReactNode;
  placeholder?: string;
  size?: InputSizes;
  name?: string;

  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLTextAreaElement>;
  onMouseDown?: MouseEventHandler<HTMLTextAreaElement>;
  onPointerDown?: PointerEventHandler<HTMLTextAreaElement>;
}

interface INumberInput extends IInputRow {
  min?: number;
  max?: number;
  step?: number;
  suffix?: ReactNode;
}

export interface ITextInput extends IInputRow {
  prefix?: ReactNode;
  suffix?: ReactNode;
  prefixIcon?: JSX.Element;
  suffixIcon?: JSX.Element;
  showclear?: boolean;
}

interface ITextArea extends IInputRow {
  rows?: string;
  prefix?: ReactNode;
  prefixIcon?: JSX.Element;
  resize?: boolean;
}

export interface ITextInputBase extends IInputRow {
  type?: 'password' | 'number' | 'text' | (undefined & NonNullable<unknown>);
  component?: any;
  showclear?: boolean;
  resize?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  prefixIcon?: JSX.Element;
  suffixIcon?: JSX.Element;
  id: string;
}

export const TextInputBase = forwardRef<HTMLInputElement, ITextInputBase>(
  (props, ref) => {
    const {
      name,
      value,
      type,
      component = 'input',
      extra,
      className = '',
      error = false,
      disabled = false,
      label,
      onKeyDown,
      autoComplete,
      onBlur = () => {},
      onFocus = () => {},
      onChange = () => {},
      message = '',
      showclear,
      placeholder,
      size = 'md',
      resize = true,
      prefix,
      suffix,
      prefixIcon,
      suffixIcon,
      id,
      ...extraProps
    } = props;
    const [t, setT] = useState(type || 'text');

    const Component = component;

    const containerRef = useRef<HTMLDivElement>(null);
    return (
      <div className={cn('flex flex-col')}>
        <div
          className={cn('flex items-center', {
            'pb-md': !!label || !!extra,
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
              'h-4xl': !!label || !!extra,
            })}
          >
            {extra && cloneElement(extra)}
          </div>
        </div>
        <div
          ref={containerRef}
          className={cn(
            'transition-all px-lg rounded border flex flex-row items-center relative ring-offset-1',
            {
              'text-text-critical bg-surface-critical-subdued border-border-critical':
                error,
              'text-text-default border-border-default bg-surface-basic-input':
                !error,
              'text-text-disabled border-border-disabled bg-surface-basic-input':
                disabled,
              'pr-0': component !== 'input',
            },
            className
          )}
        >
          {!!prefixIcon && (
            <div
              className={cn('pr-lg bodyMd', {
                'text-text-strong': !error && !disabled,
                'text-text-critical': error,
                'text-text-disabled': disabled,
              })}
            >
              {cloneElement(prefixIcon, { size: 16, color: 'currentColor' })}
            </div>
          )}
          {!!prefix && <div className="cursor-default">{prefix}</div>}
          <Component
            {...(type === 'number'
              ? {
                  pattern: '[0-9]',
                }
              : {})}
            name={name}
            type={t}
            placeholder={placeholder}
            id={id}
            className={cn(
              'outline-none flex-1 w-full',
              'rounded bodyMd bg-transparent',
              {
                'text-text-critical placeholder:text-text-critical/70 bgh':
                  error,
                'text-text-default': !error,
              },
              {
                'py-xl': size === 'lg',
                'py-lg': size === 'md',
              },
              {
                'resize-none': !resize,
              },
              {
                'no-spinner': type === 'number',
              }
            )}
            value={value}
            onChange={(e: any) => {
              if (onChange) {
                onChange(e);
              }
            }}
            onFocus={(e: any) => {
              containerRef.current?.classList.add(
                'ring-2',
                'ring-border-focus'
              );
              onFocus(e);
            }}
            disabled={disabled}
            ref={ref}
            onKeyDown={onKeyDown}
            autoComplete={autoComplete}
            onBlur={(e: any) => {
              containerRef.current?.classList.remove(
                'ring-2',
                'ring-border-focus'
              );

              onBlur(e);
            }}
            {...extraProps}
          />
          {!!suffix && <div className="cursor-default">{suffix}</div>}
          {!!suffixIcon && (
            <div
              className={cn('pl-lg bodyMd', {
                'text-text-critical': error,
                'text-text-strong': !error && !disabled,
                'text-text-disabled': disabled,
              })}
            >
              {cloneElement(suffixIcon, { color: 'currentColor', size: 16 })}
            </div>
          )}
          {showclear && !disabled && (
            <button
              type="button"
              tabIndex={-1}
              onClick={(e: any) => {
                if (onChange) onChange({ ...e, target: { value: '' } });
              }}
              className={cn(
                'outline-none flex items-center rounded justify-center',
                {
                  'cursor-default': disabled,
                }
              )}
            >
              <XCircleFill size={16} color="currentColor" />
            </button>
          )}
          {type === 'password' && !disabled && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => {
                setT((prev) => (prev === 'text' ? 'password' : 'text'));
              }}
              className={cn(
                'outline-none flex items-center rounded justify-center',
                {
                  'cursor-default': disabled,
                }
              )}
            >
              {t === 'password' ? (
                <EyeSlash size={16} color="currentColor" />
              ) : (
                <Eye size={16} color="currentColor" />
              )}
            </button>
          )}
        </div>

        <AnimateHide show={!!message}>
          <div
            className={cn(
              'bodySm',
              {
                'text-text-critical': error,
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
  }
);

export const NumberInput = ({
  suffix,
  value,
  error = false,
  onChange = () => {},
  label,
  step = 1,
  ...etc
}: INumberInput) => {
  const ref = useRef<HTMLInputElement>(null);
  const id = useId();
  return (
    <TextInputBase
      {...{
        ...etc,
        type: 'number',
        id,
        error,
        onChange,
        label,
        ref,
        value,
        step,
        suffix: (
          <div className="flex flex-row items-center gap-xl -mr-lg">
            {suffix}
            <div
              className={cn('flex flex-col justify-center items-center', {
                'bg-surface-critical-subdued divide-border-critical divide-y rounded-r border-l border-border-critical text-text-critical placeholder:text-critical-400':
                  error,
                'text-text-default border-l border-border-default divide-border-default divide-y':
                  !error,
              })}
              tabIndex={-1}
            >
              <button
                type="button"
                aria-controls={id}
                aria-label={`Increase ${label}`}
                tabIndex={-1}
                onClick={(e: any) => {
                  // setV((_v) => _v + step);

                  onChange({
                    ...e,
                    target: { value: `${Number(value) + step}` },
                  });

                  ref?.current?.focus();
                }}
                className={cn(
                  'flex-1 p-sm disabled:text-icon-disabled hover:bg-surface-basic-hovered active:bg-surface-basic-pressed'
                )}
              >
                <CaretUpFill size={16} color="currentColor" />
              </button>
              <button
                type="button"
                aria-controls={id}
                aria-label={`Decrease ${label}`}
                tabIndex={-1}
                onClick={(e: any) => {
                  onChange({
                    ...e,
                    target: { value: `${Number(value) - step}` },
                  });
                  ref?.current?.focus();
                }}
                className={cn(
                  'flex-1 p-sm disabled:text-icon-disabled hover:bg-surface-basic-hovered active:bg-surface-basic-pressed'
                )}
              >
                <CaretDownFill size={16} color="currentColor" />
              </button>
            </div>
          </div>
        ),
      }}
    />
  );
};

export const TextInput = forwardRef<HTMLInputElement, ITextInput>(
  (props, ref) => {
    const id = useId();

    return (
      <TextInputBase
        {...{ ...props, id, component: 'input', type: 'text', ref }}
      />
    );
  }
);

export const TextArea = ({
  autoComplete = 'off',
  onChange = (_) => {},
  resize = false,
  rows = '3',
  ...etc
}: ITextArea) => {
  const ref = useRef(null);
  const id = useId();
  return (
    <TextInputBase
      {...{
        ...etc,
        id,
        autoComplete,
        onChange,
        resize,
        rows,
        component: 'textarea',
        ref,
        type: 'text',
      }}
    />
  );
};

export const PasswordInput = (props: IInputRow) => {
  const ref = useRef(null);
  const id = useId();
  return (
    <TextInputBase
      {...{ ...props, id, component: 'input', ref, type: 'password' }}
    />
  );
};
