import { LayoutGroup, motion } from 'framer-motion';
import React, { ReactElement, ReactNode, useId, useMemo } from 'react';
import { cn } from '../utils';

interface IActionList {
  children: ReactNode;
  value: string;
  onChange?: (value: string) => void;
  onClick?: (e: Event, route: string) => void;
  LinkComponent?: any;
  showIndicator?: boolean;
  className?: string;
}

export interface IActionItem {
  children?: ReactNode;
  disabled?: boolean;
  critical?: boolean;
  to?: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  value: string;
}

export interface IActionItemBase extends IActionItem {
  LinkComponent?: any;
  active?: boolean;
  onClick?: (e: Event) => void;
  showIndicator?: boolean;
}

export const Item = ({
  children,
  disabled = false,
  critical = false,
  active = false,
  onClick = () => {},
  to = '',
  prefix,
  suffix,
  LinkComponent = 'div',
  // eslint-disable-next-line no-unused-vars
  showIndicator = true,
}: IActionItemBase) => {
  let Component: any = LinkComponent;
  if (to) {
    if (LinkComponent === 'div') {
      Component = 'a';
    } else {
      Component = LinkComponent;
    }
  }

  return (
    <div className={cn('w-full flex flex-row gap-x-md')}>
      {active && showIndicator && (
        <motion.div layoutId="line" className="w-sm bg-icon-primary rounded" />
      )}
      {!active && showIndicator && (
        <motion.div layoutId="line_1" className="w-sm bg-transparent rounded" />
      )}
      <Component
        {...(Component === 'a' ? { href: to } : { to })}
        className={cn(
          'transition-all w-[inherit] rounded border flex gap-lg items-center justify-between cursor-pointer outline-none border-none py-lg ring-offset-1 focus-visible:ring-2 focus:ring-border-focus',
          {
            'px-2xl': showIndicator,
            'text-text-soft hover:text-text-default':
              !active && !disabled && !critical && showIndicator,
            'text-text-primary bodyMd-medium': active && showIndicator,
            bodyMd: !active || !showIndicator,
            'text-text-default px-xl': !showIndicator,
            'text-text-disabled': disabled,
            'text-text-critical hover:text-text-on-primary active:text-text-on-primary':
              critical,
          },
          {
            'pointer-events-none': disabled,
          },
          {
            'bg-none hover:bg-surface-basic-hovered active:bg-surface-basic-pressed':
              !active && !disabled && !critical,
            'bg-none hover:bg-surface-critical-hovered active:bg-surface-critical-pressed':
              !active && !disabled && critical,
            'bg-none': disabled,
            'bg-surface-basic-active': !critical && active,
          }
        )}
        onClick={!critical ? onClick : null}
      >
        <div className="flex flex-row items-center gap-lg">
          {!!prefix &&
            React.cloneElement(prefix, { size: 16, color: 'currentColor' })}
          {children}
        </div>
        {suffix &&
          React.cloneElement(suffix, { size: 16, color: 'currentColor' })}
      </Component>
    </div>
  );
};

const ItemBase = ({
  children,
  prefix,
  suffix,
  value,
  to,
  disabled,
  critical,
}: IActionItem) => {
  return (
    <Item
      prefix={prefix}
      suffix={suffix}
      value={value}
      to={to}
      disabled={disabled}
      critical={critical}
    >
      {children}
    </Item>
  );
};

export const Root = ({
  children,
  value,
  onChange = () => {},
  LinkComponent,
  showIndicator = true,
  onClick,
  className,
}: IActionList) => {
  const props = { children, value, onChange, LinkComponent };

  let id = useId();
  id = useMemo(() => id, [props]);

  return (
    <div className={cn('flex flex-col gap-y-md', className)}>
      <LayoutGroup id={id}>
        {React.Children.map(children as ReactElement[], (child) => (
          <Item
            {...child.props}
            LinkComponent={LinkComponent}
            onClick={(e) => {
              if (onChange) onChange(child.props?.value);
              onClick?.(e, child.props.to);
            }}
            active={child.props.value === value}
            showIndicator={showIndicator}
          />
        ))}
      </LayoutGroup>
    </div>
  );
};

const ActionList = {
  Root,
  Item: ItemBase,
};

export default ActionList;
