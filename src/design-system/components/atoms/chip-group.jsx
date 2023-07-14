import PropTypes from 'prop-types';
import { XFill } from '@jengaicons/react';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import React, { cloneElement, forwardRef, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils';

const ChipTypes = Object.freeze({
  BASIC: 'BASIC',
  REMOVABLE: 'REMOVABLE',
  CLICKABLE: 'CLICKABLE',
});

const ChipBase = forwardRef(
  (
    {
      id,
      label,
      disabled,
      type = ChipTypes.BASIC,
      onClose,
      Prefix,
      onClick,
      Component,
      active = false,
      ...props
    },
    ref
  ) => {
    let extraProps = {};
    if (type === ChipTypes.CLICKABLE) {
      extraProps = {
        initial: { scale: 1 },
        whileTap: { scale: 0.99 },
      };
    }
    return (
      <Component
        {...extraProps}
        className={cn(
          'rounded border bodySm-medium py-px flex items-center transition-all outline-none flex-row gap-md ring-offset-1',
          'focus-within:ring-2 focus-within:ring-border-focus',
          'w-fit',
          {
            'text-text-default': !disabled,
            'text-text-disabled': disabled,
          },
          {
            'pointer-events-none': disabled,
          },
          {
            'border-border-default': !disabled,
            'border-border-disabled': disabled,
          },
          {
            'bg-surface-basic-default': !disabled,
          },
          {
            'pr-md pl-lg py-md': type === ChipTypes.REMOVABLE,
            'px-lg py-md': type !== ChipTypes.REMOVABLE,
          },
          {
            'hover:bg-surface-basic-hovered active:bg-surface-basic-pressed focus-visible:ring-2 focus:ring-border-focus':
              type === ChipTypes.CLICKABLE,
          }
        )}
        onClick={onClick}
        {...props}
        ref={ref}
      >
        {Prefix &&
          type !== ChipTypes.CLICKABLE &&
          (typeof Prefix === 'string' ? (
            <span className="bodySm text-text-soft">{Prefix}</span>
          ) : (
            <Prefix size={16} color="currentColor" />
          ))}
        <span className="flex items-center">{label}</span>
        {type === ChipTypes.REMOVABLE && (
          <RovingFocusGroup.Item asChild focusable active={active}>
            <button
              disabled={disabled}
              onClick={(_e) => {
                if (onClose) onClose(id);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.stopPropagation();
                  e.preventDefault();
                }
                if (e.key === 'Backspace' || e.key === 'Delete') {
                  if (onClose) onClose(id);
                }
              }}
              className={cn(
                'outline-none flex items-center rounded-sm ring-offset-0 justify-center hover:bg-surface-basic-hovered active:bg-surface-basic-pressed',
                {
                  'cursor-default': disabled,
                }
              )}
            >
              <XFill size={16} color="currentColor" />
            </button>
          </RovingFocusGroup.Item>
        )}
      </Component>
    );
  }
);

ChipBase.displayName = 'ChipBase';

const Chip = ({
  id,
  label,
  disabled,
  type = ChipTypes.BASIC,
  prefix,
  onClick,
  onClose,
  active = false,
}) => {
  let Component = 'div';
  if (type === ChipTypes.CLICKABLE) {
    Component = motion.button;
  }
  if (type === ChipTypes.CLICKABLE)
    return (
      <RovingFocusGroup.Item asChild focusable active={active}>
        <ChipBase
          id={id}
          label={label}
          disabled={disabled}
          type={type}
          Prefix={prefix}
          Component={Component}
          onClick={onClick}
          onClose={onClose}
          active={active}
        />
      </RovingFocusGroup.Item>
    );
  return (
    <ChipBase
      id={id}
      label={label}
      disabled={disabled}
      type={type}
      Prefix={prefix}
      Component={Component}
      onClick={onClick}
      onClose={onClose}
      active={active}
    />
  );
};

const ChipGroup = ({ onClick, onRemove, children }) => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  return (
    <RovingFocusGroup.Root
      loop
      ref={ref}
      onEntryFocus={() => {
        setActive(true);
      }}
    >
      <div className={cn('flex flex-row gap-lg')}>
        {React.Children.map(children, (child, index) => {
          return cloneElement(child, {
            onClick,
            active: active && index === 0,
            onClose: (e) => {
              if (onRemove) {
                onRemove(e);
                ref.current.focus();
              }
            },
          });
        })}
      </div>
    </RovingFocusGroup.Root>
  );
};

ChipGroup.Chip = Chip;
ChipGroup.ChipType = ChipTypes;

Chip.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClose: PropTypes.func,
  type: PropTypes.oneOf([
    ChipTypes.BASIC,
    ChipTypes.CLICKABLE,
    ChipTypes.REMOVABLE,
  ]),
};

Chip.defaultProps = {
  onClose: null,
  disabled: false,
  type: ChipTypes.BASIC,
};

export default ChipGroup;
