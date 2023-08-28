/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import PropTypes from 'prop-types';
import { Spinner, XFill } from '@jengaicons/react';
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

export const ChipType = Object.freeze({
  BASIC: 'BASIC',
  REMOVABLE: 'REMOVABLE',
  CLICKABLE: 'CLICKABLE',
});

const ChipBase = forwardRef((props, ref) => {
  const {
    item,
    label,
    disabled,
    compType = ChipType.BASIC,
    onRemove,
    Prefix,
    onClick,
    Component,
    loading,
    ...mprops
  } = props;
  let extraProps = {};
  if (compType === ChipType.CLICKABLE) {
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
        'rounded border bodySm-medium py-px flex items-center transition-all outline-none flex-row gap-md ring-offset-1 h-fit',
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
          'pr-md pl-lg py-md': compType === ChipType.REMOVABLE,
          'px-lg py-md': compType !== ChipType.REMOVABLE,
        },
        {
          'hover:bg-surface-basic-hovered active:bg-surface-basic-pressed focus-visible:ring-2 focus-visible:ring-border-focus':
            compType === ChipType.CLICKABLE,
        }
      )}
      onClick={() => {
        if (onClick) onClick(item);
      }}
      ref={ref}
    >
      {Prefix &&
        !loading &&
        (typeof Prefix === 'string' ? (
          <span className="bodySm text-text-soft">{Prefix}</span>
        ) : (
          <Prefix size={12} color="currentColor" />
        ))}
      {loading && (
        <span className="animate-spin">
          <Spinner size={12} color="currentColor" />
        </span>
      )}
      <span className="flex items-center">{label}</span>
      {compType === ChipType.REMOVABLE && (
        <RovingFocusGroup.Item asChild focusable>
          <button
            disabled={disabled}
            onClick={(_e) => {
              if (onRemove) onRemove(item, false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
                e.preventDefault();
              }
              if (e.key === 'Backspace' || e.key === 'Delete') {
                if (onRemove) onRemove(item, true);
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

const _false = false;
export const Chip =
  (_false
    ? (
        {
          item,
          label,
          disabled = false,
          type = ChipType.BASIC || ChipType.CLICKABLE || ChipType.REMOVABLE,
          prefix = null,
          onClick = (_) => {},
          onRemove = (_) => {},
          isInGroup = false,
          loading = false,
        } = {
          label: '',
          item: {},
        }
      ) => null
    : _false) ||
  forwardRef(
    (
      {
        item,
        label,
        disabled,
        type = ChipType.BASIC,
        prefix,
        onClick,
        onRemove,
        isInGroup,
        loading = false,
      },
      ref
    ) => {
      let Component = 'div';
      if (type === ChipType.CLICKABLE) {
        Component = motion.button;
      }
      if (type === ChipType.CLICKABLE && isInGroup)
        return (
          <RovingFocusGroup.Item asChild focusable ref={ref}>
            <ChipBase
              item={item}
              label={label}
              disabled={disabled}
              compType={type}
              Prefix={prefix}
              Component={Component}
              onClick={onClick}
              onRemove={onRemove}
              type="button"
              loading={loading}
            />
          </RovingFocusGroup.Item>
        );
      return (
        <ChipBase
          item={item}
          label={label}
          disabled={disabled}
          compType={type}
          Prefix={prefix}
          Component={Component}
          onClick={onClick}
          onRemove={onRemove}
          type="button"
          ref={ref}
          loading={loading}
        />
      );
    }
  );

Chip.displayName = 'Chip';

export const ChipGroup = ({
  onClick = (_) => null,
  onRemove = (_) => null,
  children = null,
  className = '',
}) => {
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
    <RovingFocusGroup.Root loop asChild>
      <div className={cn('flex flex-row gap-lg', className)} ref={ref}>
        {React.Children.map(children, (child, index) => {
          return cloneElement(child, {
            onClick,
            isInGroup: true,
            onRemove: (e, iskey) => {
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

Chip.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onRemove: PropTypes.func,
  type: PropTypes.oneOf([
    ChipType.BASIC,
    ChipType.CLICKABLE,
    ChipType.REMOVABLE,
  ]),
};

Chip.defaultProps = {
  onRemove: null,
  disabled: false,
  type: ChipType.BASIC,
};
