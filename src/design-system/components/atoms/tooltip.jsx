import { useState } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { AnimatePresence, motion } from 'framer-motion';

export const TooltipProvider = ({ delayDuration = 0, children }) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration}>
    {children}
  </TooltipPrimitive.Provider>
);

export const Tooltip = ({ children, content }) => {
  const [open, setOpen] = useState(false);
  return (
    <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
      <TooltipPrimitive.Trigger asChild item={{ name: 1 }}>
        {children}
      </TooltipPrimitive.Trigger>

      <AnimatePresence>
        {open && (
          <TooltipPrimitive.Portal forceMount>
            <TooltipPrimitive.Content asChild sideOffset={5}>
              <motion.div
                initial={{ y: -2, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -2, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'anticipate' }}
                className="bodySm-default text-text-default px-lg py-md shadow-popover bg-surface-basic-default rounded"
              >
                {content}
              </motion.div>
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        )}
      </AnimatePresence>
    </TooltipPrimitive.Root>
  );
};

export default Tooltip;
