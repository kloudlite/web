import {
  CheckCircle,
  Info,
  Warning,
  WarningCircle,
  X,
} from '@jengaicons/react';
import {
  ToastContainer as Container,
  ToastPosition,
  toast as t,
} from 'react-toastify';

export const toast = {
  info: t.info,
  success: t.success,
  error: t.error,
  warn: t.warn,
};

const classes = {
  info: 'bg-surface-tertiary-default border-border-tertiary',
  error: 'bg-surface-critical-default border-border-critical',
  success: 'bg-surface-success-default border-border-success',
  warning: 'bg-surface-warning-default border-border-warning',
  default: 'bg-surface-tertiary-default border-border-tertiary',
};

const icons = {
  info: <Info size={14} />,
  error: <WarningCircle size={14} />,
  success: <CheckCircle size={14} />,
  warning: <Warning size={14} />,
  default: null,
};

const CloseButton = () => (
  <span className="text-text-on-primary hover:text-text-on-primary/50 h-[24px] flex items-center">
    <X color="currentColor" size={12} />
  </span>
);

interface IToastContainer {
  autoClose?: number | false | undefined;
  position?: ToastPosition;
}
export const ToastContainer = ({ autoClose, position }: IToastContainer) => {
  return (
    <Container
      toastClassName={({ type }: any) =>
        `shadow-popover relative flex items-start gap-xl p-xl mb-xl rounded-md justify-between overflow-hidden cursor-pointer border ${
          classes[(type || 'default') as keyof typeof classes]
        }`
      }
      bodyClassName={() =>
        'text-text-on-primary py-sm bodyMd-medium flex flex-row items-center [&>*]:!w-auto [&>*]:break-all [&>*]:whitespace-break-spaces'
      }
      hideProgressBar
      icon={({ type }) => icons[type]}
      closeButton={<CloseButton />}
      position={position || 'top-right'}
      autoClose={autoClose}
    />
  );
};
