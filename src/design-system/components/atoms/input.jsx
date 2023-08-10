/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import PropTypes from 'prop-types';
import {
  useRef,
  cloneElement,
  forwardRef,
  useEffect,
  useId,
  useState,
} from 'react';
import {
  CaretUpFill,
  CaretDownFill,
  XCircleFill,
  EyeSlash,
  Eye,
} from '@jengaicons/react';
import { cn } from '../utils';

export const NumberInput = ({
  value,
  min,
  onChange,
  label,
  extra,
  error,
  disabled,
  max,
  message,
  size = 'md',
  step = 1,
}) => {
  const [v, setV] = useState(value || min || 0);
  const ref = useRef();
  const id = useId();

  useEffect(() => {
    if (onChange) {
      onChange({
        target: {
          ...ref.current,
          value: v,
        },
      });
    }
  }, [v]);

  return (
    <div
      className={cn('flex flex-col', {
        'gap-md': label || extra,
      })}
    >
      <div className="flex">
        <label className="flex-1 select-none bodyMd-medium" htmlFor={id}>
          {label}
        </label>
        {extra && <div className="bodyMd">{cloneElement(extra)}</div>}
      </div>
      <div
        className={cn(
          'transition-all flex relative',
          'ring-offset-1 focus-within:ring-2 focus-within:ring-border-focus rounded border overflow-hidden',
          {
            'bg-surface-critical-subdued border-border-critical text-text-critical placeholder:text-critical-400':
              error,
            'text-text-default border-border-default': !error,
          }
        )}
      >
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          type="number"
          autoComplete="off"
          inputMode="numeric"
          className={cn(
            'outline-none flex-1',
            'outline-none disabled:bg-surface-basic-input disabled:text-text-disabled',
            'rounded px-xl bodyMd ',
            'no-spinner',
            {
              'py-xl': size === 'lg',
              'py-lg': size === 'md',
            }
          )}
          value={v}
          onChange={(e) => {
            setV(e.target.value);
          }}
          min={min}
          max={max}
        />
        <div
          className={cn(
            'flex flex-col absolute right-0 top-0 bottom-0 justify-center items-center',
            {
              'bg-surface-critical-subdued divide-border-critical divide-y rounded-r border-l border-border-critical text-text-critical placeholder:text-critical-400':
                error,
              'text-text-default border-l border-border-default divide-border-default divide-y':
                !error,
            }
          )}
          tabIndex={-1}
        >
          <button
            aria-controls={id}
            aria-label={`Increase ${label}`}
            tabIndex={-1}
            onClick={() => {
              setV((_v) => _v + step);
              ref.current.focus();
            }}
            className={cn(
              'flex-1 p-sm disabled:text-icon-disabled hover:bg-surface-basic-hovered active:bg-surface-basic-pressed'
            )}
          >
            <CaretUpFill size={16} color="currentColor" />
          </button>
          <button
            aria-controls={id}
            aria-label={`Decrease ${label}`}
            tabIndex={-1}
            onClick={() => {
              setV((_v) => _v - step);
            }}
            className={cn(
              'flex-1 p-sm disabled:text-icon-disabled hover:bg-surface-basic-hovered active:bg-surface-basic-pressed'
            )}
          >
            <CaretDownFill size={16} color="currentColor" />
          </button>
        </div>
      </div>

      {message && (
        <span
          className={cn('bodySm', {
            'text-text-critical': error,
            'text-text-default': !error,
          })}
        >
          {message}
        </span>
      )}
    </div>
  );
};

export const TextInputBase = forwardRef((props, ref) => {
  const {
    value,
    type,
    component,
    extra,
    className,
    error,
    disabled,
    label,
    onKeyDown,
    autoComplete,
    onChange,
    message,
    showclear,
    placeholder,
    size = 'md',
    prefix,
    suffix,
    prefixIcon: PrefixIcon,
    suffixIcon: SuffixIcon,
    ...extraProps
  } = props;
  const [t, setT] = useState(type || 'text');

  const id = useId();
  let Prefix = prefix;
  let Suffix = suffix;

  if (PrefixIcon) {
    Prefix = <PrefixIcon size={16} color="currentColor" />;
  }
  if (SuffixIcon) {
    Suffix = <SuffixIcon size={16} color="currentColor" />;
  }

  const Component = component || 'input';

  return (
    <div
      className={cn('flex flex-col ', {
        'gap-md': label || extra,
      })}
    >
      <div className="flex items-center">
        <label
          className="flex-1 select-none bodyMd-medium text-text-default"
          htmlFor={id}
        >
          {label}
        </label>
        <div
          className={cn({
            'h-4xl': label || extra,
          })}
        >
          {extra && cloneElement(extra)}
        </div>
      </div>
      <div
        className={cn(
          'transition-all px-lg rounded border flex flex-row items-center relative ring-offset-1 focus-within:ring-2 focus-within:ring-border-focus ',
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
        {Prefix && (
          <div
            className={cn('pr-lg bodyMd', {
              'text-text-strong':
                typeof Prefix !== 'object' && !error && !disabled,
              'text-text-critical': error,
              'text-text-disabled': disabled,
            })}
          >
            {Prefix}
          </div>
        )}
        <Component
          type={t}
          placeholder={placeholder}
          id={id}
          className={cn(
            'outline-none flex-1 w-full',
            'rounded bodyMd bg-transparent',
            {
              'text-text-critical placeholder:text-text-critical/70': error,
              'text-text-default': !error,
            },
            {
              'py-xl': size === 'lg',
              'py-lg': size === 'md',
            }
          )}
          value={value}
          onChange={(e) => {
            if (onChange) {
              onChange(e);
            }
          }}
          disabled={disabled}
          ref={ref}
          onKeyDown={onKeyDown}
          autoComplete={autoComplete}
          {...extraProps}
        />
        {Suffix && (
          <div
            className={cn('pl-lg bodyMd', {
              'text-text-critical': error,
              'text-text-strong': !error && !disabled,
              'text-text-disabled': disabled,
            })}
          >
            {Suffix}
          </div>
        )}
        {showclear && !disabled && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => {
              if (onChange) onChange({ target: { value: '' } });
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
            {type === 'password' ? (
              <EyeSlash size={16} color="currentColor" />
            ) : (
              <Eye size={16} color="currentColor" />
            )}
          </button>
        )}
      </div>

      {message && (
        <div
          className={cn('bodySm', {
            'text-text-critical': error,
            'text-text-default': !error,
          })}
        >
          {message}
        </div>
      )}
    </div>
  );
});

TextInputBase.displayName = 'TextInputBase';

const _false = false;

export const TextInput =
  (_false
    ? ({
        value = '',
        type = 'password' || 'number',
        component = null,
        extra = null,
        className = '',
        error = false,
        disabled = false,
        label = '',
        onKeyDown = (_) => {},
        autoComplete = false,
        onChange = (_) => {},
        message = '',
        showclear = false,
        placeholder = '',
        size = 'md',
        prefix = null,
        suffix = null,
        prefixIcon = null,
        suffixIcon = null,
        ...extraProps
      }) => null
    : _false) ||
  forwardRef((props, ref) => {
    return <TextInputBase {...props} component="input" type="text" ref={ref} />;
  });

TextInput.displayName = 'TextInput';

export const TextArea = (props) => {
  const ref = useRef(null);
  return (
    <TextInputBase {...props} component="textarea" ref={ref} type="text" />
  );
};

export const PasswordInput = (props) => {
  const ref = useRef(null);
  return (
    <TextInputBase {...props} component="input" ref={ref} type="password" />
  );
};

TextInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['md', 'lg']),
  prefixIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  suffixIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

TextArea.propTypes = {};

NumberInput.propTypes = {
  value: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['md', 'lg']),
};

NumberInput.defaultProps = {
  value: 0,
  disabled: false,
  error: false,
  size: 'md',
};

TextInput.defaultProps = {
  placeholder: '',
  value: '',
  disabled: false,
  prefix: null,
  suffix: null,
  prefixIcon: null,
  suffixIcon: null,
  error: false,
  size: 'md',
};
