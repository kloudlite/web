import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import * as ToastRadix from '@radix-ui/react-toast';
import { v4 as uuid } from 'uuid';
import { X } from '@jengaicons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, IconButton } from '../atoms/button';
import { cn } from '../utils';

const context = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.data];
    default:
      return state;
  }
};

const AnimatedToast = ({ toast }) => {
  const [open, setOpen] = useState(false);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          layoutId={toast.id}
          initial={{ y: 3 }}
          animate={{ y: 0 }}
          exit={{ y: 3 }}
        >
          <ToastRadix.Root
            forceMount
            className={cn(
              'toast flex flex-row bg-surface-tertiary-default border-border-tertiary rounded shadow-popover text-text-on-primary p-xl gap-xl items-center justify-between'
            )}
          >
            <ToastRadix.Title className="bodyMd-medium truncate">
              {toast.content}
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
          </ToastRadix.Root>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ToastProvider = ({ duration, children }) => {
  const [toasts, dispatch] = useReducer(reducer, []);
  const [open, setOpen] = useState(false);

  return (
    <ToastRadix.Provider swipeDirection="right" duration={duration}>
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
          <AnimatedToast toast={toast} key={toast.id} />
        ))}
        {children}
      </context.Provider>
      <ToastRadix.Viewport className="flex flex-col gap-lg fixed w-13xl bottom-8xl left-11xl m-0 list-none z-[2147483647] outline-none" />
    </ToastRadix.Provider>
  );
};

export const useToast = () => {
  const { toasts, dispatch } = useContext(context);

  const addContent = (content) => {
    if (content) {
      dispatch({ type: 'ADD', data: { content, id: uuid() } });
      console.log(toasts);
    }
  };
  return {
    toast: async ({ content }) => {
      addContent(content);
    },
  };
};
