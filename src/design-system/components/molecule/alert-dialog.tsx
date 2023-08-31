import * as PrimitiveAlertDialog from '@radix-ui/react-alert-dialog';
import { X } from '@jengaicons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Button as NativeButton, IconButton, IButton } from '../atoms/button';
import { cn } from '../utils';

export const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-surface-basic-subdued p-3xl flex flex-row items-center justify-between">
      <PrimitiveAlertDialog.Title className="headingLg text-text-strong">
        {children}
      </PrimitiveAlertDialog.Title>
      <PrimitiveAlertDialog.Cancel asChild>
        <IconButton variant="plain" icon={<X />} />
      </PrimitiveAlertDialog.Cancel>
    </div>
  );
};

export const Content = ({ children }: { children: ReactNode }) => {
  return <div className="p-3xl bodyMd">{children}</div>;
};

export const Footer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-3xl flex flex-row justify-end gap-lg">{children}</div>
  );
};

export const Button = (props: IButton) => {
  return (
    <PrimitiveAlertDialog.Cancel asChild>
      <NativeButton {...props} />
    </PrimitiveAlertDialog.Cancel>
  );
};

interface IDialog {
  show: boolean;
  onOpenChange: (val: boolean) => void;
  children: ReactNode;
  backdrop: boolean;
}

export const DialogRoot = ({
  show,
  onOpenChange,
  children,
  backdrop = true,
}: IDialog) => {
  return (
    <PrimitiveAlertDialog.Root
      open={show}
      onOpenChange={(e) => {
        if (e) {
          onOpenChange(show);
        } else {
          onOpenChange(false);
        }
      }}
    >
      <AnimatePresence>
        {show && (
          <PrimitiveAlertDialog.Portal forceMount>
            <PrimitiveAlertDialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'anticipate' }}
                className={cn('fixed inset-0 z-40', {
                  'bg-text-default/60': backdrop,
                })}
              />
            </PrimitiveAlertDialog.Overlay>
            <PrimitiveAlertDialog.Content asChild forceMount>
              <motion.div
                initial={{ x: '-50%', y: '-47%', opacity: 0 }}
                animate={{ x: '-50%', y: '-50%', opacity: 1 }}
                exit={{ x: '-50%', y: '-47%', opacity: 0 }}
                transition={{ duration: 0.3, ease: 'anticipate' }}
                className="z-50 outline-none transform overflow-hidden rounded bg-surface-basic-default shadow-modal border border-border-default fixed top-1/2 left-1/2 w-[612px] max-w-[612px]"
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
