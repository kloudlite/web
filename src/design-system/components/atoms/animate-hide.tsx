import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

interface IAnimateHide {
  children: ReactNode;
  show: boolean;
  initial?: boolean;
  className?: string;
}
const AnimateHide = ({
  children,
  show,
  initial = false,
  className,
}: IAnimateHide) => {
  return (
    <AnimatePresence initial={initial}>
      {show && (
        <motion.div
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
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimateHide;
