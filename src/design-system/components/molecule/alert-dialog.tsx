import * as PrimitiveAlertDialog from '@radix-ui/react-alert-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { X } from '~/components/icons';
import { IButton, IconButton, Button as NativeButton } from '../atoms/button';
import { cn } from '../utils';

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-surface-basic-active p-3xl flex flex-row items-center justify-between">
      <PrimitiveAlertDialog.Title className="headingLg text-text-strong">
        {children}
      </PrimitiveAlertDialog.Title>
      <PrimitiveAlertDialog.Cancel asChild>
        <IconButton variant="plain" icon={<X />} />
      </PrimitiveAlertDialog.Cancel>
    </div>
  );
};

const Content = ({ children }: { children: ReactNode }) => {
  return <div className="p-3xl bodyMd">{children}</div>;
};

const Footer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-3xl flex flex-row justify-end gap-lg">{children}</div>
  );
};

interface IPopupButton extends IButton {
  closable?: boolean;
}

const Button = (props: IPopupButton) => {
  const { closable = false } = props;
  return (
    <>
      {closable && (
        <PrimitiveAlertDialog.Cancel asChild>
          <NativeButton {...props} />
        </PrimitiveAlertDialog.Cancel>
      )}
      {!closable && <NativeButton {...props} />}
    </>
  );
};

interface IDialog {
  show: boolean;
  onOpenChange: (val: boolean) => void;
  children: ReactNode;
  backdrop?: boolean;
}

const Root = ({ show, onOpenChange, children, backdrop = true }: IDialog) => {
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

const AlertDialog = {
  Root,
  Content,
  Header,
  Footer,
  Button,
};

export default AlertDialog;
