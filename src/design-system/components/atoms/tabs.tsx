import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import React, {
  KeyboardEvent,
  ReactElement,
  ReactNode,
  forwardRef,
  useId,
  useState,
} from 'react';
import { cn } from '../utils';

type TabSizes = 'md' | 'sm' | (string & NonNullable<unknown>);
type TabVariant = 'filled' | 'plain' | (string & NonNullable<unknown>);

interface IBase {
  to?: string;
  fitted?: boolean;
  LinkComponent?: any;
  variant?: TabVariant;
  size?: TabSizes;
}

interface ITabBase extends IBase {
  label: ReactNode | ((active: boolean) => ReactNode);
  active?: boolean;
  onClick?: (e: KeyboardEvent<HTMLSpanElement>) => void;
  prefix?: JSX.Element;
  layoutId: string;
  toLabel?: string;
}

interface ITabs<T = string> extends Omit<IBase, 'to'> {
  onChange?: (item: T) => void;
  value: T;
  className?: string;
  basePath?: string;
  children: ReactNode;
  toLabel?: string;
}

export interface ITab<T = string> {
  to?: string;
  label: ReactNode | ((active: boolean) => ReactNode);
  prefix?: JSX.Element;
  value: T;
}

const TabBase = ({
  to = '',
  label,
  active = false,
  fitted = false,
  onClick = () => {},
  LinkComponent = 'div',
  variant = 'plain',
  size = 'md',
  prefix,
  layoutId,
  toLabel = 'to',
}: ITabBase) => {
  let Component: any = LinkComponent;

  let tempToLabel = toLabel;

  let extraProps = {} as any;
  if (to) {
    if (LinkComponent === 'div') {
      Component = motion.a;
      tempToLabel = 'href';
    } else {
      Component = LinkComponent;
    }
  } else {
    extraProps = {
      role: 'button',
    };
  }

  const [hoverd, setHoverd] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setHoverd(true);
      }}
      onMouseLeave={() => {
        setHoverd(false);
      }}
      className={cn(
        'outline-none flex flex-col relative group bodyMd-medium transition-all cursor-pointer hover:text-text-default active:text-text-default',
        {
          'text-text-default': active,
          'text-text-soft': !active,
          'rounded-lg hover:bg-surface-basic-hovered active:bg-surface-basic-pressed':
            variant === 'filled',
          // 'border border-transparent': variant === 'filled' && !active,
        }
      )}
    >
      <RovingFocusGroup.Item
        asChild
        focusable
        onKeyDown={(e) => {
          if (['Enter', ' '].includes(e.key)) {
            onClick(e);
          }
        }}
        // value={value}
      >
        <Component
          // eslint-disable-next-line no-nested-ternary
          {...{ [tempToLabel]: to }}
          {...extraProps}
          onClick={onClick}
          className={cn(
            'relative z-10 tab-item outline-none',
            'ring-offset-0 focus-visible:ring-border-focus focus-visible:ring-2',
            // 'focus-visible:shadow-focus',
            {
              ...((!fitted || variant === 'filled') && {
                'px-2xl py-lg': size === 'md',
                'px-lg py-md': size === 'sm',
                'rounded-lg': true,
              }),
              ...(fitted && {
                'py-md': variant !== 'filled',
              }),
            }
          )}
        >
          {variant === 'plain' && <div className="h-md bg-none w-full z-0" />}
          <div className="flex flex-row items-center gap-lg">
            {!!prefix &&
              React.cloneElement(prefix, { size: 16, color: 'currentColor' })}
            {typeof label === 'function' ? label(active) : label}
          </div>
          {active && variant === 'plain' && (
            <motion.div
              layoutId="underline"
              className={cn(
                'h-md z-10 absolute left-0 bottom-0 w-full bg-border-primary'
              )}
            />
          )}
          {variant === 'plain' && hoverd && (
            <motion.div
              layoutId="hoverd-underline"
              className="h-md bg-none absolute bottom-0 w-full z-0 left-0 bg-border-default group-active:bg-border-tertiary"
            />
          )}
          {variant === 'plain' && <div className="h-md bg-none w-full z-0" />}
        </Component>
      </RovingFocusGroup.Item>
      <AnimatePresence>
        {variant === 'filled' && active && (
          <motion.div
            layoutId={layoutId}
            className="absolute inset-0 rounded-lg shadow-button border border-border-default bg-surface-basic-default"
            transition={{ type: 'spring', bounce: 0.1, duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const Tab = <T,>({ to, label, prefix, value: _ }: ITab<T>) => (
  <TabBase to={to} label={label} prefix={prefix} layoutId="" />
);

const Root = forwardRef<HTMLDivElement, ITabs<any>>(
  (
    {
      variant = 'plain',
      size = 'md',
      fitted = false,
      onChange = () => {},
      value,
      LinkComponent,
      className = '',
      basePath = '',
      children,
      toLabel,
    },
    ref
  ) => {
    const id = useId();
    // id = useMemo(() => id, [children, value, basePath, size, variant]);
    return (
      <RovingFocusGroup.Root
        orientation="horizontal"
        loop
        className={cn(
          'flex flex-row items-center transition-all',
          'snap-x',
          {
            'md:gap-4xl': size === 'md' && variant !== 'filled',
            'gap-lg': size === 'sm' || variant === 'filled',
          },
          className
        )}
        ref={ref}
        asChild
      >
        <motion.div layout layoutRoot>
          <LayoutGroup id={id}>
            {React.Children.map(children, (child) => {
              if (!child) {
                throw Error('Tab child is required');
              }
              const tabChild = child as ReactElement;
              const tabChildProps: ITab = tabChild.props;

              return (
                <div
                  className={cn('snap-start', {
                    'px-xl md:px-0': variant === 'plain',
                  })}
                >
                  <TabBase
                    {...tabChildProps}
                    onClick={() => {
                      onChange?.(tabChildProps.value);
                    }}
                    layoutId={id}
                    fitted={fitted}
                    to={basePath + (tabChildProps.to || '')}
                    active={value === tabChildProps.value}
                    LinkComponent={LinkComponent}
                    variant={variant}
                    size={size}
                    toLabel={toLabel}
                  />
                </div>
              );
            })}
          </LayoutGroup>
        </motion.div>
      </RovingFocusGroup.Root>
    );
  }
);

const Tabs = {
  Tab,
  Root,
};

export default Tabs;
