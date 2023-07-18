import PropTypes from 'prop-types';
import { XFill } from '@jengaicons/react';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import React, {
  cloneElement,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils';

const ChipTypes = Object.freeze({
  BASIC: 'BASIC',
  REMOVABLE: 'REMOVABLE',
  CLICKABLE: 'CLICKABLE',
});

const ChipBase = forwardRef((props, ref) => {
  const {
    mid,
    label,
    disabled,
    type = ChipTypes.BASIC,
    onClose,
    Prefix,
    onClick,
    Component,
    active = false,
    ...mprops
  } = props;
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
      {...mprops}
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
          'hover:bg-surface-basic-hovered active:bg-surface-basic-pressed focus-visible:ring-2 focus-visible:ring-border-focus':
            type === ChipTypes.CLICKABLE,
        }
      )}
      onClick={onClick}
      ref={ref}
    >
      {Prefix &&
        type !== ChipTypes.CLICKABLE &&
        (typeof Prefix === 'string' ? (
          <span className="bodySm text-text-soft">{Prefix}</span>
        ) : (
          <Prefix size={12} color="currentColor" />
        ))}
      <span className="flex items-center">{label}</span>
      {type === ChipTypes.REMOVABLE && (
        <RovingFocusGroup.Item asChild focusable active={active}>
          <button
            disabled={disabled}
            onClick={(_e) => {
              if (onClose) onClose(mid, false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
                e.preventDefault();
              }
              if (e.key === 'Backspace' || e.key === 'Delete') {
                if (onClose) onClose(mid, true);
              }
            }}
            className={cn(
              'outline-none flex items-center rounded-sm ring-offset-0 justify-center hover:bg-surface-basic-hovered active:bg-surface-basic-pressed',
              {
                'cursor-default': disabled,
              }
            )}
          >
            <XFill size={12} color="currentColor" />
          </button>
        </RovingFocusGroup.Item>
      )}
    </Component>
  );
});

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
          mid={id}
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
      mid={id}
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

Chip.displayName = 'Chip';

const ChipGroup = ({ onClick, onRemove, children }) => {
  const [keyRemovable, setKeyRemovable] = useState(false);
  const [lastRemovedIndex, setLastRemovedIndex] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (keyRemovable && children.length > 0) {
      if (lastRemovedIndex === children.length)
        ref.current?.children[lastRemovedIndex - 1]?.lastChild?.focus();
      else ref.current?.children[lastRemovedIndex]?.lastChild?.focus();
    }
  }, [children]);
  return (
    <RovingFocusGroup.Root loop>
      <div className={cn('flex flex-row gap-lg')} ref={ref}>
        {React.Children.map(children, (child, index) => {
          return cloneElement(child, {
            onClick,
            onClose: (e, iskey) => {
              setKeyRemovable(iskey);
              setLastRemovedIndex(index);
              if (onRemove) {
                onRemove(e);
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
