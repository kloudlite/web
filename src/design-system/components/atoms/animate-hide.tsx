import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '../utils';

interface IAnimateHide {
  children: ReactNode;
  show: boolean;
  initial?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
const AnimateHide = ({
  children,
  show,
  initial = false,
  className,
  onClick,
}: IAnimateHide) => {
  return (
    <AnimatePresence initial={initial}>
      {show && (
        <motion.div
          onClick={onClick}
          initial={{
            height: 0,
            opacity: 0,
            y: -5,
          }}
          animate={{
            height: 'auto',
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            height: 0,
            y: -5,
          }}
          className={cn(className, 'overflow-hidden')}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimateHide;
