import * as Dialog from '@radix-ui/react-dialog';
import { X } from '@jengaicons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button as NativeButton, IconButton } from '../atoms/button';
import { cn } from '../utils';

export const Header = ({ children }) => {
  return (
    <div className="border-b border-border-default p-3xl flex flex-row items-center justify-between">
      <Dialog.Title className="headingLg text-text-strong">
        {children}
      </Dialog.Title>
      <Dialog.Close asChild>
        <IconButton variant="plain" icon={X} />
      </Dialog.Close>
    </div>
  );
};

export const Content = ({ children }) => {
  return <div className="p-3xl">{children}</div>;
};

export const Footer = ({ children }) => {
  return (
    <div className="p-3xl flex flex-row justify-end gap-lg">{children}</div>
  );
};

export const Button = (props) => {
  return (
    <Dialog.Close asChild>
      <NativeButton {...props} />
    </Dialog.Close>
  );
};

const Popup = ({ show, onOpenChange, children, backdrop = true }) => {
  return (
    <Dialog.Root open={show} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {show && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay className="fixed inset-0" asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'anticipate' }}
                className={cn('fixed inset-0', {
                  'bg-text-default/60': backdrop,
                })}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ x: '-50%', y: '-47%', opacity: 0 }}
                animate={{ x: '-50%', y: '-50%', opacity: 1 }}
                exit={{ x: '-50%', y: '-47%', opacity: 0 }}
                transition={{ duration: 0.3, ease: 'anticipate' }}
                className="outline-none transform overflow-hidden rounded bg-surface-basic-default shadow-modal border border-border-default fixed top-1/2 left-1/2 w-[90vw] max-w-[450px]"
              >
                {children}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default Popup;
