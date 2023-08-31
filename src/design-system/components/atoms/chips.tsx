import { Spinner, XFill } from '@jengaicons/react';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import React, {
  ReactElement,
  cloneElement,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils';

type ChipTypes =
  | 'BASIC'
  | 'REMOVABLE'
  | 'CLICKABLE'
  | (string & NonNullable<unknown>);

type ItemType = any;

interface ChipBaseProps {
  item: ItemType;
  label: string;
  disabled?: boolean;
  compType?: ChipTypes;
  onRemove?: (item: ItemType, isKeyBoard?: boolean) => void;
  prefix?: JSX.Element | string | null;
  onClick?: (item: ItemType) => void;
  Component: any;
  loading?: boolean;
}

const ChipBase = React.forwardRef<HTMLButtonElement, ChipBaseProps>(
  (props, ref) => {
    const {
      item,
      label,
      disabled = false,
      compType = 'BASIC',
      onRemove = (_) => {},
      prefix = null,
      onClick = (_) => {},
      Component,
      loading = false,
      ...mprops
    } = props;
    let extraProps = {};
    if (compType === 'CLICKABLE') {
      extraProps = {
        initial: { scale: 1 },
        whileTap: { scale: 0.99 },
      };
    }

    return (
      <Component
        type="button"
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
            'pr-md pl-lg py-md': compType === 'REMOVABLE',
            'px-lg py-md': compType !== 'REMOVABLE',
          },
          {
            'hover:bg-surface-basic-hovered active:bg-surface-basic-pressed focus-visible:ring-2 focus-visible:ring-border-focus':
              compType === 'CLICKABLE',
          }
        )}
        onClick={() => {
          if (onClick) onClick(item);
        }}
        ref={ref}
      >
        {prefix &&
          !loading &&
          (typeof prefix === 'string' ? (
            <span className="bodySm text-text-soft">{prefix}</span>
          ) : (
            React.cloneElement(prefix, {
              size: 12,
              color: 'currentColor',
            })
          ))}
        {loading && (
          <span className="animate-spin">
            <Spinner size={12} color="currentColor" />
          </span>
        )}
        <span className="flex items-center">{label}</span>
        {compType === 'REMOVABLE' && (
          <RovingFocusGroup.Item asChild focusable>
            <button
              type="button"
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
  }
);

interface ChipProps {
  item: ItemType;
  label: string;
  disabled?: boolean;
  type?: ChipTypes;
  onRemove?: (item: ItemType, isKeyBoard?: boolean) => void;
  prefix?: JSX.Element | string | null;
  onClick?: (item: ItemType) => void;
  loading?: boolean;
  isInGroup?: boolean;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      item,
      label,
      disabled = false,
      type = 'BASIC',
      prefix = null,
      onClick = (_) => _,
      onRemove = (_) => _,
      isInGroup = false,
      loading = false,
    },
    ref
  ) => {
    let Component: any = 'div';
    if (type === 'BASIC') {
      Component = motion.button;
    }

    const ChipBaseElement = (
      <ChipBase
        item={item}
        label={label}
        disabled={disabled}
        compType={type}
        prefix={prefix}
        Component={Component}
        onClick={onClick}
        onRemove={onRemove}
        loading={loading}
      />
    );

    if (type === 'CLICKABLE' && isInGroup)
      return (
        <RovingFocusGroup.Item asChild focusable ref={ref}>
          {ChipBaseElement}
        </RovingFocusGroup.Item>
      );

    return ChipBaseElement;
  }
);

interface ChipGroupProps {
  onClick?: (item: ItemType) => void;
  onRemove?: (item: ItemType) => void;
  children: ReactElement | ReactElement[];
  className?: string;
}

export const ChipGroup = ({
  onClick = (_) => {},
  onRemove = (_) => {},
  children,
  className = '',
}: ChipGroupProps) => {
  const [keyRemovable, setKeyRemovable] = useState(false);
  const [lastRemovedIndex, setLastRemovedIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // ref.current

  useEffect(() => {
    if (lastRemovedIndex === null) {
      return;
    }

    const length = React.Children.count(children);
    if (keyRemovable && length > 0) {
      if (lastRemovedIndex === length) {
        const buttonElement: HTMLButtonElement = ref.current?.children.item(
          lastRemovedIndex - 1
        )?.lastChild as HTMLButtonElement;

        buttonElement.focus();
      } else {
        const buttonElement: HTMLButtonElement = ref.current?.children.item(
          lastRemovedIndex
        )?.lastChild as HTMLButtonElement;

        buttonElement.focus();
      }
    }
  }, [children]);
  return (
    <RovingFocusGroup.Root loop asChild>
      <div className={cn('flex flex-row gap-lg', className)} ref={ref}>
        {React.Children.map(children, (child, index) => {
          if (!child) {
            return null;
          }

          return cloneElement(child, {
            onClick,
            isInGroup: true,
            onRemove: (
              e: any,
              iskey: boolean | ((prevState: boolean) => boolean)
            ) => {
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

const Chips = {
  ChipGroup,
  Chip,
};

export default Chips;
