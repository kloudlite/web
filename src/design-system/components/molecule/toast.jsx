import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import * as ToastRadix from '@radix-ui/react-toast';
import { X } from '@jengaicons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn, uuid } from '../utils';

const context = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.data];
    case 'REMOVE':
      return state.filter((s) => s.id === action.toastId);
    default:
      return state;
  }
};

const ToastItem = ({ autoClose, duration, content, id, toastType }) => {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => {
      setOpen(false);
    }, duration - 200);

    return () => clearTimeout(t);
  }, []);
  return (
    <ToastRadix.Root key={id} duration={autoClose ? duration : 0}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 50, opacity: 100, x: 600 }}
            animate={{ y: 0, opacity: 100, x: 0 }}
            exit={{ height: 0, x: 600, opacity: 0 }}
            transition={{ ease: 'anticipate', duration: 0.2 }}
            className={cn(
              'toast flex flex-row rounded shadow-popover text-text-on-primary p-xl gap-xl items-center justify-between border overflow-hidden transition-all',
              {
                'opacity-0': !open,
                'bg-surface-critical-default border-border-critical ':
                  toastType === 'error',
                'bg-surface-tertiary-default border-border-tertiary ':
                  toastType === 'message',
              }
            )}
          >
            <ToastRadix.Title className="bodyMd-medium truncate">
              {content}
            </ToastRadix.Title>
            {/* <ToastRadix.Action asChild altText="undo">
              <Button
                content={<span className="text-text-on-primary">Undo</span>}
                variant="plain"
                className="text-text-on-primary"
              />
            </ToastRadix.Action> */}
            <ToastRadix.Action asChild altText="close">
              <button>
                <X size={12} color="currentColor" />
              </button>
            </ToastRadix.Action>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastRadix.Root>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, dispatch] = useReducer(reducer, []);
  return (
    <ToastRadix.Provider swipeDirection="right" duration={0}>
      <context.Provider
        value={useMemo(
          () => ({
            toasts,
            dispatch,
          }),
          [toasts, dispatch]
        )}
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} />
        ))}
        {children}
      </context.Provider>
      <ToastRadix.Viewport className="flex flex-col gap-lg fixed w-13xl top-8xl right-8xl m-0 list-none z-[2147483647] outline-none" />
    </ToastRadix.Provider>
  );
};

const defOptions = {
  icon: null,
  autoClose: true,
  duration: 5000,
};

export const useToast = () => {
  const { dispatch } = useContext(context);

  const addContent = (
    content,
    options = { toastType: 'message', ...defOptions }
  ) => {
    if (content) {
      dispatch({
        type: 'ADD',
        data: { content, id: uuid(), ...defOptions, ...options },
      });
    }
  };

  const toast = async (
    content,
    options = { ...defOptions, toastType: 'message' }
  ) => addContent(content, { ...options });

  toast.info = (content, options = { ...defOptions }) =>
    addContent(content, { ...options, toastType: 'info' });

  toast.success = (content, options = { ...defOptions }) =>
    addContent(content, { ...options, toastType: 'success' });

  toast.error = (content, options = { ...defOptions }) =>
    addContent(content, { ...options, toastType: 'error' });

  toast.message = (content, options = { ...defOptions }) =>
    addContent(content, { ...options, toastType: 'message' });

  toast.warning = (content, options = { ...defOptions }) =>
    addContent(content, { ...options, toastType: 'warning' });

  toast.remove = (toastId = '') => {
    dispatch({
      type: 'REMOVE',
      data: { toastId },
    });
  };

  return toast;
};
