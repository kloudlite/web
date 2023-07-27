import { useState, useEffect } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { DefaultLinkComp } from './_link';
import { cn } from '../utils';

export const NavTab = ({
  href,
  label,
  active,
  fitted,
  onClick,
  LinkComponent = DefaultLinkComp,
}) => {
  return (
    <div
      className={cn(
        'outline-none flex flex-col relative group bodyMd-medium hover:text-text-default active:text-text-default',
        {
          'text-text-default': active,
          'text-text-soft': !active,
        }
      )}
    >
      <LinkComponent
        onClick={onClick}
        to={href}
        className={cn(
          'outline-none flex flex-col rounded ring-offset-1 focus-visible:ring-2 focus-visible:ring-border-focus w-max',
          {
            'px-2xl': !fitted,
            'pt-lg pb-xl': fitted,
          }
        )}
      >
        {label}
      </LinkComponent>
      {active && (
        <motion.div
          layoutId="underline"
          className={cn(
            'h-md bg-surface-primary-pressed z-10 absolute bottom-0 w-full'
          )}
        />
      )}
      <div className="h-md group-hover:bg-border-default group-active:bg-border-tertiary bg-none transition-all absolute bottom-0 w-full z-0" />
    </div>
  );
};

export const NavTabs = ({
  items,
  fitted,
  onChange,
  layoutId,
  value,
  LinkComponent,
  className,
  basePath,
}) => {
  const [active, setActive] = useState(value);
  useEffect(() => {
    if (onChange) {
      onChange(active);
    }
  }, [active]);
  return (
    <div
      className={cn(
        'no-scrollbar flex flex-row md:gap-4xl overflow-x-scroll py-[3px] pl-[3px] -my-[3px] -ml-[3px]',
        'snap-x',
        className
      )}
    >
      <LayoutGroup id={layoutId}>
        {items.map((child) => {
          return (
            <div
              key={child.key}
              className="px-xl first:pl-3xl last:pr-3xl md:first:pl-0 md:first:pr-0 md:px-0 snap-start"
            >
              <NavTab
                onClick={() => {
                  setActive(child.value);
                }}
                fitted={fitted}
                href={basePath + child.href}
                label={child.label}
                active={value === child.value}
                LinkComponent={LinkComponent}
              />
            </div>
          );
        })}
      </LayoutGroup>
    </div>
  );
};

NavTab.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  fitted: PropTypes.bool,
};

NavTabs.propTypes = {
  /**
   * LayoutId should be provided in order to prevent multiple tabs to share same instance.
   */
  layoutId: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  fitted: PropTypes.bool,
};

NavTabs.defaultProps = {
  fitted: false,
};

NavTab.defaultProps = {
  active: false,
  fitted: false,
};
