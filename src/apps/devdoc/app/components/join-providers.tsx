import { GithubLogoFill, GoogleLogoFill } from '@jengaicons/react';
import { Button } from 'kl-design-system/atoms/button';
import OptionList from 'kl-design-system/atoms/option-list';
import { useState } from 'react';

const JoinProviders = () => {
  const [open, setOpen] = useState(false);
  return (
    <OptionList.Root open={open} onOpenChange={setOpen}>
      <OptionList.Trigger>
        <Button variant="primary" content="Join waitlist" />
      </OptionList.Trigger>
      <OptionList.Content
        align="center"
        className="!wb-shadow-darktheme-popover"
      >
        <OptionList.Item>
          <div className="wb-flex wb-flex-row wb-gap-xl">
            <span>
              <GithubLogoFill size={20} />
            </span>
            <span>Join via github login</span>
          </div>
        </OptionList.Item>
        <OptionList.Item>
          <div className="wb-flex wb-flex-row wb-gap-xl">
            <span>
              <GoogleLogoFill size={20} />
            </span>
            <span>Join via google login</span>
          </div>
        </OptionList.Item>
      </OptionList.Content>
    </OptionList.Root>
  );
};

export default JoinProviders;
