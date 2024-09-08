import OptionList from 'kl-design-system/atoms/option-list';
import { useState } from 'react';
import Link from 'next/link';
import Profile from 'kl-design-system/molecule/profile';
import useConfig from '../utils/use-config';

const ProfileButtonUI = () => {
  const [open, setOpen] = useState(false);
  const { config } = useConfig();
  const { user } = config;
  if (!user) {
    return null;
  }
  return (
    <OptionList.Root open={open} onOpenChange={setOpen}>
      <OptionList.Trigger>
        <Profile size="sm" name={user.name || ''} />
      </OptionList.Trigger>
      <OptionList.Content
        align="center"
        className="!wb-shadow-darktheme-popover"
      >
        {user.approved ? (
          <OptionList.Link
            to={`${process.env.CONSOLE_URL}`}
            toLabel="href"
            LinkComponent={Link}
          >
            Go to dashboard
          </OptionList.Link>
        ) : (
          <OptionList.Item>You are in waitlist</OptionList.Item>
        )}
      </OptionList.Content>
    </OptionList.Root>
  );
};

export default ProfileButtonUI;
