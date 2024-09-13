import {
  CircleNotch,
  EnvelopeFill,
  GithubLogoFill,
  GitlabLogoFill,
  GoogleLogo,
} from '@jengaicons/react';
import OptionList from 'kl-design-system/atoms/option-list';
import { useState } from 'react';
import Link from 'next/link';
import useConfig from '../utils/use-config';
import Button from './button';
import { authUrl } from '../utils/config';

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
        className="!wb-shadow-darktheme-popover !wb-min-w-[176px]"
      >
        {config.userApiLoading ? (
          <div className="wb-text-text-default wb-flex wb-items-center wb-justify-center py-2xl">
            <span className="wb-animate-spin">
              <CircleNotch size={20} />
            </span>
          </div>
        ) : (
          <>
            {config.user?.approved && config.user.verified ? (
              <div className="wb-flex wb-flex-col wb-gap-4xl wb-max-w-[300px] wb-px-3xl wb-py-xl wb-text-center">
                <span className="wb-headingXl-marketing wb-text-text-default">
                  You&apos;ve been added to our waitlist!
                </span>
                <span className="wb-bodyLg wb-text-text-soft">
                  Do you have an invite code?
                  <br />
                  <Link
                    href={`${authUrl}/signup`}
                    className="wb-text-text-default hover:wb-underline wb-underline-offset-4"
                  >
                    Click here
                  </Link>{' '}
                  to access.
                </span>
              </div>
            ) : (
              <div className="wb-flex wb-flex-col wb-gap-xl wb-p-xl">
                {oathProviders?.githubLoginUrl && (
                  <Button
                    to={oathProviders.githubLoginUrl}
                    toLabel="href"
                    linkComponent={Link}
                    content="Continue with Github"
                    prefix={<GithubLogoFill />}
                    variant="basic"
                    block
                  />
                )}
                {oathProviders?.gitlabLoginUrl && (
                  <Button
                    to={oathProviders.gitlabLoginUrl}
                    toLabel="href"
                    linkComponent={Link}
                    content="Continue with Gitlab"
                    prefix={<GitlabLogoFill />}
                    variant="purple"
                    block
                  />
                )}
                {oathProviders?.googleLoginUrl && (
                  <Button
                    to={oathProviders.googleLoginUrl}
                    toLabel="href"
                    linkComponent={Link}
                    content="Continue with Google"
                    prefix={<GoogleLogo />}
                    variant="primary"
                    block
                  />
                )}
                <Button
                  to={`${authUrl}/signup?mode=email`}
                  toLabel="href"
                  linkComponent={Link}
                  content="Continue with Email"
                  prefix={<EnvelopeFill />}
                  variant="primary"
                  block
                />
              </div>
            )}
          </>
        )}
      </OptionList.Content>
    </OptionList.Root>
  );
};

export default JoinProviders;
