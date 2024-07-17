import { useEffect, useState } from 'react';
import { Button } from '~/components/atoms/button';
import AlertDialog from '~/components/molecule/alert-dialog';
import logger from '~/root/lib/client/helpers/log';

export default {
  title: 'Molecules/AlertDialog',
  component: AlertDialog.Root,
  tags: ['autodocs'],
  argTypes: {},
};

const DialogHook = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    logger.log(show);
  }, [show]);
  return (
    <div>
      <Button
        content="Open dialog"
        onClick={() => {
          setShow(true);
        }}
      />{' '}
      <AlertDialog.Root show={show} onOpenChange={setShow}>
        <AlertDialog.Header>This is a sample dialog</AlertDialog.Header>
        <AlertDialog.Content>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.
        </AlertDialog.Content>
        <AlertDialog.Footer>
          <AlertDialog.Button content="Cancel" variant="basic" />
          <AlertDialog.Button content="Delete" variant="critical" />
        </AlertDialog.Footer>
      </AlertDialog.Root>
    </div>
  );
};

export const DefaultAlertDialog = {
  render: () => <DialogHook />,
};
