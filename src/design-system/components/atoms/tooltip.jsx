import { useEffect, useState } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { AnimatePresence, motion } from 'framer-motion';

export const Provider = ({ delayDuration = 0, children }) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration}>
    {children}
  </TooltipPrimitive.Provider>
);

export const Root = ({ children, content, open = false, offset = 5 }) => {
  const [_open, _setOpen] = useState(false);
  useEffect(() => {
    _setOpen(open);
  }, [open]);
  return (
    <TooltipPrimitive.Root
      open={_open}
      onOpenChange={(e) => {
        if (open) {
          _setOpen(open);
        } else {
          _setOpen(e);
        }
      }}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

      <AnimatePresence>
        {_open && (
          <TooltipPrimitive.Portal forceMount>
            <TooltipPrimitive.Content asChild sideOffset={offset}>
              <motion.div
                onKeyDown={(e) => console.log(e)}
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

const Tooltip = {
  Root,
  Provider,
};

export default Tooltip;
