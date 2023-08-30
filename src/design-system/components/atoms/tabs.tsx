import React, {
  useState,
  useEffect,
  forwardRef,
  useId,
  useMemo,
  KeyboardEvent,
  ReactElement,
} from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { cn } from '../utils';

type TabSizes = 'md' | 'sm' | (string & NonNullable<unknown>);
type TabVariant = 'filled' | 'plain' | (string & NonNullable<unknown>);

interface BaseProps {
  to?: string;
  label: string;
  fitted?: boolean;
  LinkComponent?: any;
  variant?: TabVariant;
  size?: TabSizes;
}

interface TabBaseProps extends BaseProps {
  active?: boolean;
  onClick?: (e: KeyboardEvent<HTMLSpanElement>) => void;
  prefix?: JSX.Element;
}

interface RootProps extends BaseProps {
  onChange?: (item: string) => void;
  value: string;
  className?: string;
  basePath?: string;
  children: ReactElement;
}

interface TabProps {
  to?: string;
  label: string;
  prefix?: JSX.Element;
  value: string;
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
}: TabBaseProps) => {
  let Component: any = LinkComponent;

  if (to) {
    if (LinkComponent === 'div') {
      Component = 'a';
    } else {
      Component = LinkComponent;
    }
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
        'outline-none flex flex-col relative group bodyMd-medium hover:text-text-default active:text-text-default transition-all cursor-pointer',
        {
          'text-text-default': active,
          'text-text-soft': !active,
          'hover:bg-surface-basic-hovered active:bg-surface-basic-pressed rounded-lg':
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
          {...(to ? (Component === 'a' ? { href: to } : { to }) : {})}
          onClick={onClick}
          className={cn(
            'z-10 tab-item gap-lg outline-none flex flex-row items-center ring-offset-1 focus-visible:ring-2 focus-visible:ring-border-focus w-max',
            {
              ...((!fitted || variant === 'filled') && {
                'px-2xl py-lg': size === 'md',
                'px-lg py-md': size === 'sm',
                'rounded-lg': true,
              }),
              ...(fitted && {
                'py-lg': variant !== 'filled',
              }),
            }
          )}
        >
          {!!prefix &&
            React.cloneElement(prefix, { size: 16, color: 'currentColor' })}
          {label}
        </Component>
      </RovingFocusGroup.Item>
      {active && variant === 'plain' && (
        <motion.div
          layoutId="underline"
          className={cn(
            'h-md bg-surface-primary-pressed z-10 absolute bottom-0 w-full'
          )}
        />
      )}
      {variant === 'filled' && active && (
        <motion.span
          layoutId="bubble"
          className="absolute inset-0 rounded-lg bg-surface-basic-default border border-border-default shadow-button"
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        />
      )}
      {variant === 'plain' && hoverd && (
        <motion.div
          layoutId="hoverd-underline"
          className="h-md bg-border-default group-active:bg-border-tertiary bg-none absolute bottom-0 w-full z-0"
        />
      )}

      {variant === 'plain' && (
        <div className="h-md bg-none absolute bottom-0 w-full z-0" />
      )}
    </div>
  );
};

const Tab = ({ to, label, prefix, value: _ }: TabProps) => (
  <TabBase to={to} label={label} prefix={prefix} />
);

const Root = forwardRef<HTMLDivElement, RootProps>(
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
    },
    ref
  ) => {
    const [active, setActive] = useState(value);
    let id = useId();
    id = useMemo(() => id, [children, value, basePath, size, variant]);
    useEffect(() => {
      if (onChange) {
        onChange(active);
      }
    }, [active]);
    return (
      <RovingFocusGroup.Root
        orientation="horizontal"
        loop
        className={cn(
          'flex flex-row items-center py-[3px] pl-[3px] -my-[3px] -ml-[3px] transition-all',
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
              return (
                <motion.div className="px-xl md:px-0 snap-start">
                  <TabBase
                    {...child.props}
                    onClick={() => {
                      setActive(child.props.value);
                    }}
                    fitted={fitted}
                    to={basePath + child.props.to}
                    active={value === child.props.value}
                    LinkComponent={LinkComponent}
                    variant={variant}
                    size={size}
                  />
                </motion.div>
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
