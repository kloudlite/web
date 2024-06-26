import * as React from 'react';
import { SVGMotionProps, motion } from 'framer-motion';

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="1"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({
  toggle,
  onClick,
}: {
  toggle: boolean;
  onClick: () => void;
}) => (
  <button onClick={onClick} aria-label="menu-button">
    <motion.svg
      animate={toggle ? 'open' : 'closed'}
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
        className="wb-stroke-icon-default"
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
        className="wb-stroke-icon-default"
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
        className="wb-stroke-icon-default"
      />
    </motion.svg>
  </button>
);

export default MenuToggle;
