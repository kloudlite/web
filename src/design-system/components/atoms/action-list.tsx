import React, {
  ReactElement,
  ReactNode,
  cloneElement,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import { cn } from '../utils';

interface IActionList {
  children: ReactElement | ReactElement[];
  value: string;
  onChange?: (value: string) => void;
  LinkComponent?: any;
}

export interface IActionItem {
  children: ReactNode;
  disabled?: boolean;
  critical?: boolean;
  active?: boolean;
  onClick?: () => void;
  to?: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  LinkComponent?: any;
  value: string;
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
  value: _,
}: IActionItem) => {
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
      {active && (
        <motion.div layoutId="line" className="w-sm bg-icon-primary rounded" />
      )}
      {!active && (
        <motion.div layoutId="line_1" className="w-sm bg-transparent rounded" />
      )}
      <Component
        {...(Component === 'a' ? { href: to } : { to })}
        className={cn(
          'transition-all w-[inherit] rounded border flex gap-md items-center justify-between cursor-pointer outline-none border-none px-2xl py-lg ring-offset-1 focus-visible:ring-2 focus:ring-border-focus',
          {
            'text-text-soft hover:text-text-default':
              !active && !disabled && !critical,
            'text-text-primary bodyMd-medium': active,
            bodyMd: !active,
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
        <div className="flex flex-row items-center gap-md">
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

export const Root = ({
  children,
  value,
  onChange = () => {},
  LinkComponent,
}: IActionList) => {
  const props = { children, value, onChange, LinkComponent };
  const [active, setActive] = useState(value);
  useEffect(() => {
    if (onChange) onChange(active);
  }, [active]);

  let id = useId();
  id = useMemo(() => id, [props]);

  return (
    <div className={cn('flex flex-col gap-y-md')}>
      <LayoutGroup id={id}>
        {React.Children.map(children, (child) =>
          cloneElement(child, {
            LinkComponent,
            active: child.props.value === value,
            onClick: () => {
              setActive(child.props?.value);
            },
          })
        )}
      </LayoutGroup>
    </div>
  );
};

const ActionList = {
  Root,
  Item,
};

export default ActionList;
