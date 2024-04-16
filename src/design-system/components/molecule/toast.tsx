import {
  ToastContainer as Container,
  ToastPosition,
  toast as t,
} from 'react-toastify';
import {
  CheckCircle,
  Info,
  Warning,
  WarningCircle,
  X,
} from '~/components/icons';

export const toast = {
  info: t.info,
  success: t.success,
  error: t.error,
  warn: t.warn,
  isActive: t.isActive,
  update: t.update,
};

const classes = {
  info: 'bg-surface-basic-default text-text-default bodyMd border-border-disabled',
  error:
    'bg-surface-basic-default text-text-default bodyMd border-border-disabled',
  success:
    'bg-surface-basic-default text-text-default bodyMd border-border-disabled',
  warning:
    'bg-surface-basic-default text-text-default bodyMd border-border-disabled',
  default:
    'bg-surface-basic-default text-text-default bodyMd border-border-disabled',
};

const icons = {
  info: <Info size={14} />,
  error: <WarningCircle size={14} />,
  success: <CheckCircle size={14} />,
  warning: <Warning size={14} />,
  default: null,
};

const CloseButton = () => (
  <span className="text-text-default hover:text-text-default/50 h-[24px] flex items-center">
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
        `z-[9999999999] shadow-popover relative flex items-start gap-xl p-xl mb-xl rounded-md justify-between overflow-hidden cursor-pointer border 
        ${classes[(type || 'default') as keyof typeof classes]}`
      }
      bodyClassName={() =>
        'text-text-default py-sm bodyMd-medium flex flex-row items-center [&>*]:!w-auto [&>*]:break-all [&>*]:whitespace-break-spaces'
      }
      hideProgressBar
      icon={({ type }) => icons[type]}
      closeButton={<CloseButton />}
      position={position || 'top-right'}
      autoClose={autoClose}
    />
  );
};
