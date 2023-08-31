import { motion } from 'framer-motion';
import { MouseEventHandler } from 'react';
import { ChildrenProps } from './types';
import { cn } from './utils';

interface BounceItProps extends ChildrenProps {
  disable?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
}

export const BounceIt = ({
  disable = false,
  onClick = (_) => {},
  className = '',
  ...etc
}: BounceItProps) => {
  if (disable) {
    return <div>{etc.children}</div>;
  }
  return (
    <motion.div
      tabIndex={-1}
      className={cn('inline-block', className)}
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      {...etc}
    />
  );
};
