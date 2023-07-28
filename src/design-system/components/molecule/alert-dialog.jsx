import * as PrimitiveAlertDialog from '@radix-ui/react-alert-dialog';
import { X } from '@jengaicons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button as NativeButton, IconButton } from '../atoms/button';

export const Header = ({ children }) => {
  return (
    <div className="bg-surface-basic-subdued p-3xl flex flex-row items-center justify-between">
      <PrimitiveAlertDialog.Title className="headingLg text-text-strong">
        {children}
      </PrimitiveAlertDialog.Title>
      <PrimitiveAlertDialog.Cancel asChild>
        <IconButton variant="plain" icon={X} />
      </PrimitiveAlertDialog.Cancel>
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
    <PrimitiveAlertDialog.Cancel asChild>
      <NativeButton {...props} />
    </PrimitiveAlertDialog.Cancel>
  );
};

export const Dialog = ({ show, onOpenChange, children }) => {
  return (
    <PrimitiveAlertDialog.Root open={show} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {show && (
          <PrimitiveAlertDialog.Portal forceMount>
            <PrimitiveAlertDialog.Overlay
              className="fixed inset-0"
              asChild
              forceMount
            />
            <PrimitiveAlertDialog.Content asChild forceMount>
              <motion.div
                initial={{ x: '-50%', y: '-47%', opacity: 0 }}
                animate={{ x: '-50%', y: '-50%', opacity: 1 }}
                exit={{ x: '-50%', y: '-47%', opacity: 0 }}
                transition={{ duration: 0.3, ease: 'linear' }}
                className="outline-none transform overflow-hidden rounded bg-surface-basic-default shadow-modal border border-border-default fixed top-1/2 left-1/2 w-[90vw] max-w-[450px]"
              >
                {children}
              </motion.div>
            </PrimitiveAlertDialog.Content>
          </PrimitiveAlertDialog.Portal>
        )}
      </AnimatePresence>
    </PrimitiveAlertDialog.Root>
  );
};
