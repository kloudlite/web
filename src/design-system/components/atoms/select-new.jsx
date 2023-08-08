import RSelect from 'react-select';
import RCreatable from 'react-select/creatable';
import { useState } from 'react';
import colors from 'tailwindcss/colors';
import AsyncSelect from 'react-select/async';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils';

export const Select = ({
  className = '',
  error = '',
  label = '',
  onBlur = () => {},
  creatable = false,
  asyncSelect = false,
  instanceId = 'instanceId',
  notFloating = false,
  id = 'id',
  ...props
}) => {
  // const animatedComponents = makeAnimated();
  const [focused, setFocused] = useState(false);
  const theme = (_theme) => {
    return {
      ..._theme,
      // borderWidth: 1,
      outline: 'none',
      colors: {
        ..._theme.colors,
        primary: colors.blue['400'],
        primary75: colors.blue['200'],
        primary50: colors.blue['100'],
        primary25: colors.blue['50'],
      },
      spacing: {
        baseUnit: 5,
      },
    };
  };

  // eslint-disable-next-line no-nested-ternary
  let SelectComp = creatable ? RCreatable : RSelect;

  SelectComp = asyncSelect ? AsyncSelect : SelectComp;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={cn('flex flex-col gap-1 z-[10] relative', className, {
        'cursor-not-allowed': props.disabled,
        'cursor-text': !props.disabled,
      })}
    >
      {(error || label) && (
        <span
          className={cn('font-medium text-sm text-neutral-400', {
            'text-primary-500': focused,
            'text-secondary': !focused,
            ' text-red-700': error,
          })}
        >
          {error || label}
        </span>
      )}

      <SelectComp
        {...props}
        instanceId={instanceId}
        id={id}
        theme={theme}
        onBlur={() => {
          onBlur();
          setFocused(false);
        }}
        onFocus={() => {
          setFocused(true);
        }}
        onMenuOpen={() => setMenuOpen(true)}
        onMenuClose={() => setMenuOpen(false)}
        styles={{
          control: (provided) => ({
            ...provided,
            // border: focused ? `none` : '',
            zIndex: 999,
          }),
          menu: (provided) => ({
            ...provided,
            marginTop: '0.5rem',
          }),
        }}
        isDisabled={props.disabled}
      />
      {notFloating && (
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              transition={{
                ease: 'anticipate',
                duration: 0.2,
              }}
              initial={{ height: 0 }}
              // animate={{ height: `${props.options.length * 2.75}rem` }}
              animate={{
                height: `${
                  Math.min(7 * 2.45, (props?.options?.length || 0) * 2.45) + 2
                }rem`,
              }}
              exit={{ height: 0 }}
            />
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
