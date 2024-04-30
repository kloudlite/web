import {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useState,
} from 'react';
import { AnimatePresence, AnimationDefinition, motion } from 'framer-motion';
import { cn } from '../utils';

interface ISidebar {
  children?: ReactNode;
  onCollapseChange?: ({
    type,
    value,
  }: {
    type: 'start' | 'end';
    value: AnimationDefinition;
  }) => void;
  linkComponent?: any;
  toLabel?: string;
}

const Item = ({
  children,
  active,
  icon,
  to,
  ...props
}: {
  children?: ReactNode;
  active?: boolean;
  icon?: JSX.Element;
  to?: string;
}) => {
  const { linkComponent: LinkComponent = 'div', toLabel = 'href' } = props as {
    linkComponent?: any;
    toLabel?: string;
  };

  let p = {};

  if (LinkComponent !== 'div') {
    p = {
      [toLabel]: to,
    };
  }

  return (
    <LinkComponent
      {...p}
      className={cn(
        'cursor-pointer px-3xl py-[10px] min-h-[40px] bodyMd text-text-default hover:bg-surface-basic-hovered flex flex-row items-center gap-lg flex-shrink-0',
        active ? 'bg-surface-basic-pressed' : ''
      )}
    >
      <span>
        {icon &&
          cloneElement(icon, {
            size: 16,
          })}
      </span>
      <motion.div className="overflow-hidden">{children}</motion.div>
    </LinkComponent>
  );
};

const Separator = () => {
  return <div className="bg-border-default h-xs w-full" />;
};

const Header = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="h-[60px] p-2xl border-b border-b-border-default flex flex-row items-center gap-lg">
      {children}
    </div>
  );
};

const Root = ({
  children,
  onCollapseChange,
  linkComponent = 'div',
  toLabel = 'href',
}: ISidebar) => {
  const topIcon = {
    open: {
      rotate: 20,
      height: 9,
      marginBottom: -1,
    },
    close: {
      rotate: -20,
      height: 9,
      marginBottom: -1,
    },
  };

  const bottomIcon = {
    open: {
      rotate: -20,
      height: 9,
      marginTop: -1,
    },
    close: {
      rotate: 20,
      height: 9,
      marginTop: -1,
    },
  };

  const panelVariants = {
    open: {
      width: 260,
    },
    close: {
      width: 57,
    },
  };

  const [open, setOpen] = useState(true);
  return (
    <AnimatePresence initial={false}>
      <motion.div
        animate={open ? 'open' : 'close'}
        variants={panelVariants}
        onAnimationComplete={(e) => {
          onCollapseChange?.({ type: 'end', value: e });
        }}
        onAnimationStart={(e) => {
          onCollapseChange?.({ type: 'start', value: e });
        }}
        className={cn(
          'min-h-screen max-h-screen flex flex-col bg-surface-basic-active border-r border-r-border-default sticky top-0 flex-shrink-0'
        )}
      >
        {Children.map(children, (child) => {
          if (!isValidElement(child)) return child;
          const c = child as ReactElement;
          return cloneElement(c, { collapsed: open, linkComponent, toLabel });
        })}
        <div
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          className="absolute -right-4xl top-1/2 transform -translate-y-1/2 text-icon-soft w-4xl flex items-center justify-center cursor-pointer"
        >
          <motion.div
            whileHover={open ? 'open' : 'close'}
            className="flex flex-col h-2xl w-full items-center"
          >
            <motion.div
              variants={topIcon}
              className="w-sm bg-icon-soft h-lg rounded-full !rounded-b-none"
            />
            <motion.div
              variants={bottomIcon}
              className="w-sm bg-icon-soft h-lg rounded-full !rounded-t-none"
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const Sidebar = {
  Root,
  Item,
  Header,
  Separator,
};
export default Sidebar;
