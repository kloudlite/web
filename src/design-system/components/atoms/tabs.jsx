import React, {
  useState,
  useEffect,
  forwardRef,
  useId,
  useMemo,
  cloneElement,
} from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { cn } from '../utils';

const Tab = ({
  href,
  label,
  active,
  fitted,
  onClick,
  LinkComponent,
  variant,
  size,
  prefix,
  onKeyDown,
}) => {
  const Prefix = prefix;
  let tempProps = { to: href };
  if (!LinkComponent) {
    // eslint-disable-next-line no-param-reassign
    LinkComponent = 'button';
    tempProps = {};
  }
  return (
    <div
      className={cn(
        'outline-none flex flex-col relative group bodyMd-medium hover:text-text-default active:text-text-default transition-all',
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
          if (onKeyDown) onKeyDown(e);
          if (['Enter', ' '].includes(e.key)) {
            onClick(e);
          }
        }}
      >
        <LinkComponent
          onClick={onClick}
          className={cn(
            'z-10 tab-item gap-lg outline-none flex flex-row items-center ring-offset-1 focus-visible:ring-2 focus-visible:ring-border-focus w-max cursor-default',
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
          {...tempProps}
        >
          {prefix && <Prefix size={16} color="currentColor" />}
          {label}
        </LinkComponent>
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
          className="absolute inset-0 rounded-lg bg-surface-basic-default border border-border-default shadow-button "
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
      {variant === 'plain' && (
        <div className="h-md group-hover:bg-border-default group-active:bg-border-tertiary bg-none transition-all absolute bottom-0 w-full z-0" />
      )}
    </div>
  );
};

const Root = forwardRef(
  (
    {
      variant = 'plain',
      size = 'md',
      fitted,
      onChange,
      value,
      LinkComponent,
      className,
      basePath,
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
    console.log(value);
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
      >
        <LayoutGroup id={id}>
          {React.Children.map(children, (child) => {
            return (
              <div className="px-xl md:px-0 snap-start">
                {cloneElement(child, {
                  onClick: () => {
                    console.log(child.props.value);
                    setActive(child.props.value);
                  },
                  fitted,
                  href: basePath + child.props.href,
                  label: child.props.label,
                  active: value === child.props.value,
                  LinkComponent,
                  variant,
                  size,
                  prefix: child.props.prefix,
                })}
              </div>
            );
          })}
        </LayoutGroup>
      </RovingFocusGroup.Root>
    );
  }
);

Root.displayName = 'TabRoot';

const Tabs = {
  Tab,
  Root,
};

export default Tabs;

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  fitted: PropTypes.bool,
};

Root.propTypes = {
  fitted: PropTypes.bool,
  variant: PropTypes.oneOf(['plain', 'filled']),
  size: PropTypes.oneOf(['md', 'sm']),
};

Root.defaultProps = {
  fitted: false,
  variant: 'plain',
  size: 'md',
};

Tab.defaultProps = {
  active: false,
  fitted: false,
};
