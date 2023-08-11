import React, {
  cloneElement,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { LayoutGroup, motion } from 'framer-motion';
import { DefaultLinkComp } from './_link';
import { cn } from '../utils';

export const ActionButton = ({
  children = null,
  disabled = false,
  critical = false,
  active = false,
  onClick = (_) => _,
  href = '',
  prefix = null,
  suffix = null,
  LinkComponent,
  // eslint-disable-next-line no-unused-vars
  value = '',
}) => {
  if (!LinkComponent) {
    // eslint-disable-next-line no-param-reassign
    LinkComponent = DefaultLinkComp;
  }
  return (
    <div className={cn('w-full flex flex-row gap-x-md')}>
      {active && (
        <motion.div layoutId="line" className="w-sm bg-icon-primary rounded" />
      )}
      {!active && (
        <motion.div layoutId="line_1" className="w-sm bg-transparent rounded" />
      )}
      <LinkComponent
        to={href}
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
          {prefix && <prefix size={16} color="currentColor" />}
          {children}
        </div>
        {suffix && <suffix size={16} color="currentColor" />}
      </LinkComponent>
    </div>
  );
};

export const ActionRoot = (
  { children, value, onChange = (_) => _, LinkComponent = null } = {
    children: null,
    value: '',
  }
) => {
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

ActionButton.propTypes = {
  href: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

ActionButton.defaultProps = {
  active: false,
  onClick: null,
  disabled: false,
};

ActionRoot.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

ActionRoot.defaultProps = {};
