import {
  EnvelopeFill,
  GithubLogoFill,
  GitlabLogoFill,
  GoogleLogo,
} from '@jengaicons/react';
import { Button } from 'kl-design-system/atoms/button';
import OptionList from 'kl-design-system/atoms/option-list';
import { useState } from 'react';
import Link from 'next/link';
import useConfig from '../utils/use-config';

const JoinProviders = () => {
  const [open, setOpen] = useState(false);
  const { config } = useConfig();
  const { oathProviders } = config;

  return (
    <OptionList.Root open={open} onOpenChange={setOpen}>
      <OptionList.Trigger>
        <Button content="Signup to join waitlist" variant="primary" />
      </OptionList.Trigger>
      <OptionList.Content
        align="center"
        className="!wb-shadow-darktheme-popover"
      >
        {oathProviders?.githubLoginUrl && (
          <OptionList.Link
            to={oathProviders.githubLoginUrl}
            toLabel="href"
            LinkComponent={Link}
          >
            <div className="wb-flex wb-flex-row wb-gap-xl">
              <span>
                <GithubLogoFill size={20} />
              </span>
              <span>Github</span>
            </div>
          </OptionList.Link>
        )}
        {oathProviders?.gitlabLoginUrl && (
          <OptionList.Link
            to={oathProviders.gitlabLoginUrl}
            toLabel="href"
            LinkComponent={Link}
          >
            <div className="wb-flex wb-flex-row wb-gap-xl">
              <span>
                <GitlabLogoFill size={20} />
              </span>
              <span>Gitlab</span>
            </div>
          </OptionList.Link>
        )}
        {oathProviders?.googleLoginUrl && (
          <OptionList.Link
            to={oathProviders.googleLoginUrl}
            toLabel="href"
            LinkComponent={Link}
          >
            <div className="wb-flex wb-flex-row wb-gap-xl">
              <span>
                <GoogleLogo size={20} />
              </span>
              <span>Google</span>
            </div>
          </OptionList.Link>
        )}
        <OptionList.Link
          to={`${process.env.AUTH_URL}/signup?mode=email`}
          toLabel="href"
          LinkComponent={Link}
        >
          <div className="wb-flex wb-flex-row wb-gap-xl">
            <span>
              <EnvelopeFill size={20} />
            </span>
            <span>Email</span>
          </div>
        </OptionList.Link>
      </OptionList.Content>
    </OptionList.Root>
  );
};

export default JoinProviders;
