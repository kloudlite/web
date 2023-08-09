import { Button } from '~/components/atoms/button';
import { useState } from 'react';
import Popup from '~/components/molecule/popup';

export default {
  title: 'Molecules/Popup',
  component: Popup,
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
          console.log(show);
        }}
      />{' '}
      <Popup show={show}>hello</Popup>
    </div>
  );
};

export const DefaultPopup = {
  render: () => <PopupHook />,
};
