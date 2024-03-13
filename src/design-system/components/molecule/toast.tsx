import { CheckCircle, Info, Warning, WarningCircle } from '@jengaicons/react';

import { Toaster as Container, toast as t, ToastT } from 'sonner';

export const toast = {
  info: t.info,
  success: t.success,
  error: t.error,
  warn: t.warning,
};

const icons = {
  info: <Info size={14} />,
  error: <WarningCircle size={14} />,
  success: <CheckCircle size={14} />,
  warning: <Warning size={14} />,
};

interface IToastContainer {
  position?: ToastT['position'];
}

export const ToastContainer = ({ position }: IToastContainer) => {
  return (
    <Container
      toastOptions={{
        // unstyled: true,
        classNames: {
          toast: 'bg-surface-basic-default',
          title: 'text-text-default bodyMd-medium',
          description: 'text-text-default bodyMd',
        },
      }}
      icons={icons}
      position={position || 'bottom-right'}
    />
  );
};
