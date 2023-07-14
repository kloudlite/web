import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LayoutGroup, motion } from 'framer-motion';
import { DefaultLinkComp } from './_link';
import { cn } from '../utils';

export const ActionButton = ({
  label,
  disabled,
  critical,
  active,
  onClick,
  href,
  LeftIconComp,
  RightIconComp,
  rightEmptyPlaceholder,
  LinkComponent = DefaultLinkComp,
}) => {
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
          'w-[inherit] rounded border bodyMd flex gap-md items-center justify-between cursor-pointer outline-none border-none px-2xl py-lg ring-offset-1 focus-visible:ring-2 focus:ring-border-focus',
          {
            'text-text-primary bodyMd-medium': active,
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
            'bg-surface-primary-selected': !critical && active,
          }
        )}
        onClick={!critical ? onClick : null}
      >
        <div className="flex flex-row items-center gap-md">
          {LeftIconComp && <LeftIconComp size={16} color="currentColor" />}
          {label}
        </div>
        {RightIconComp && <RightIconComp size={16} color="currentColor" />}
        {!RightIconComp && rightEmptyPlaceholder && (
          <div className="w-2xl h-2xl" />
        )}
      </LinkComponent>
    </div>
  );
};

export const ActionList = ({
  items,
  value,
  onChange,
  layoutId,
  LinkComponent,
}) => {
  const [active, setActive] = useState(value);
  useEffect(() => {
    if (onChange) onChange(active);
  }, [active]);
  return (
    <div className={cn('flex flex-col gap-y-md')}>
      <LayoutGroup id={layoutId}>
        {items.map((child) => {
          return (
            <ActionButton
              critical={child.critical}
              label={child.label}
              href={child.href}
              LeftIconComp={child.LeftIconComp}
              RightIconComp={child.RightIconComp}
              rightEmptyPlaceholder={!child.RightIconComp}
              key={child.key}
              active={child.value === active}
              LinkComponent={LinkComponent}
              onClick={() => {
                setActive(child.value);
              }}
            />
          );
        })}
      </LayoutGroup>
    </div>
  );
};

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
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

ActionList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        .isRequired,
      key: PropTypes.string,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  layoutId: PropTypes.string.isRequired,
};

ActionList.defaultProps = {};
