import { Button } from '../../components/atoms/button';

import { ToastContainer, toast } from '../../components/molecule/toast';

export default {
  title: 'Molecules/Toast',
  component: ToastContainer,
  tags: ['autodocs'],
  argTypes: {},
};

const ToastHook = () => {
  return (
    <>
      <ToastContainer />
      <Button
        content="toast"
        onClick={() => {
          toast.info('hello world');
        }}
      />
    </>
  );
};

export const DefaultToast = {
  args: {},
  render: () => <ToastHook />,
};
