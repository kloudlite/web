import { Button } from '~/components/atoms/button';
import { useState } from 'react';
import Popup from '~/components/molecule/popup';
import { TextInput } from '~/components/atoms/input';

export default {
  title: 'Molecules/Popup',
  component: Popup.Root,
  tags: ['autodocs'],
  argTypes: {},
};

const PopupHook = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Button
        content="Open dialog"
        onClick={() => {
          setShow(true);
        }}
      />{' '}
      <Popup.Root
        show={show}
        onOpenChange={(e) => {
          setShow(e);
        }}
      >
        <Popup.Header>Popup dialog</Popup.Header>
        <Popup.Content>
          <TextInput label="Name" />
        </Popup.Content>
        <Popup.Footer>
          <Popup.Button content="Cancel" variant="basic" closable />
          <Popup.Button type="submit" content="Continue" variant="primary" />
        </Popup.Footer>
      </Popup.Root>
    </div>
  );
};

export const DefaultPopup = {
  render: () => <PopupHook />,
};
