import { TextInput } from 'kl-design-system/atoms/input';
import Popup from 'kl-design-system/molecule/popup';

const InviteCodeDialog = ({
  show,
  onOpenChange,
}: {
  show?: boolean;
  onOpenChange?: (val: boolean) => void;
}) => {
  return (
    <Popup.Root show={show} onOpenChange={onOpenChange}>
      <Popup.Header>🎉 Congratulations!!!</Popup.Header>
      <Popup.Content>
        <div className="flex flex-col gap-3xl">
          <div className="bodyMd text-text-default dark:text-text-darktheme-default">
            Your request has been submitted successfully.
          </div>
          <div className="flex flex-col gap-lg">
            <div className="bodyMd text-text-default dark:text-text-darktheme-default">
              Do you have invite code? Enter the code to get an early access.
            </div>
            <TextInput />
          </div>
        </div>
      </Popup.Content>
      <Popup.Footer>
        <Popup.Button closable content="Cancel" variant="basic" />
        <Popup.Button content="Submit" variant="primary" />
      </Popup.Footer>
    </Popup.Root>
  );
};

export default InviteCodeDialog;
