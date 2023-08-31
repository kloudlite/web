import * as Dialog from '@radix-ui/react-dialog';
import { X } from '@jengaicons/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Button as NativeButton,
  IconButton,
  ButtonProps,
} from '../atoms/button';
import { cn } from '../utils';
import { ChildrenProps } from '../types';

const Header = ({ children, showclose = true }: any) => {
  return (
    <div className="border-b border-border-default p-3xl flex flex-row items-center min-h-[69px]">
      <Dialog.Title className="headingLg text-text-strong flex-1">
        {children}
      </Dialog.Title>
      {showclose && (
        <Dialog.Close asChild>
          <IconButton variant="plain" icon={<X />} />
        </Dialog.Close>
      )}
    </div>
  );
};

const Content = ({ children }: ChildrenProps) => {
  return (
    <div className="p-3xl overscroll-y-auto overflow-x-hidden">{children}</div>
  );
};

const Footer = ({ children }: ChildrenProps) => {
  return (
    <div className="p-3xl flex flex-row justify-end gap-lg bg-surface-basic-subdued">
      {children}
    </div>
  );
};

interface BProps extends ButtonProps {
  closable?: boolean;
}

const Button = (props: BProps) => {
  const { closable = true } = props;
  return (
    <>
      {closable && (
        <Dialog.Close asChild>
          <NativeButton {...props} />
        </Dialog.Close>
      )}
      {!closable && <NativeButton {...props} />}
    </>
  );
};

interface PopupRootProps extends ChildrenProps {
  show?: boolean;
  onOpenChange?: (val: any) => void;
  backdrop?: boolean;
  className?: string;
}

const PopupRoot = ({
  show = false,
  onOpenChange = () => {},
  children,
  backdrop = true,
  className = '',
}: PopupRootProps) => {
  return (
    <Dialog.Root
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
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'anticipate' }}
                className={cn('fixed inset-0 z-40', {
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
                className={cn(
                  'flex flex-col',
                  'z-50 outline-none transform overflow-hidden rounded bg-surface-basic-default shadow-modal',
                  'fixed top-1/2 left-1/2',
                  'w-[612px]',
                  'max-h-[70%]',
                  'border border-border-default',
                  className
                )}
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

const Popup = {
  Root: PopupRoot,
  Header,
  Content,
  Footer,
  Button,
};

export default Popup;
