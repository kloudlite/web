import {
  CircleNotch,
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
        className="!wb-shadow-darktheme-popover !wb-min-w-[176px]"
      >
        {config.userApiLoading ? (
          <div className="wb-text-text-default dark:wb-text-text-darktheme-default wb-flex wb-items-center wb-justify-center py-2xl">
            <span className="wb-animate-spin">
              <CircleNotch size={20} />
            </span>
          </div>
        ) : (
          <>
            {config.user?.approved && config.user.verified ? (
              <div className="wb-flex wb-flex-col wb-gap-4xl wb-max-w-[300px] wb-px-3xl wb-py-xl wb-text-center">
                <span className="wb-headingXl-marketing wb-text-text-default dark:wb-text-text-darktheme-default">
                  You&apos;ve been added to our waitlist!
                </span>
                <span className="wb-bodyLg wb-text-text-soft dark:wb-text-text-darktheme-soft">
                  Do you have an invite code?
                  <br />
                  <Link
                    href={`${process.env.AUTH_URL}/signup`}
                    className="wb-text-text-default dark:wb-text-text-darktheme-default hover:wb-underline wb-underline-offset-4"
                  >
                    Click here
                  </Link>{' '}
                  to access.
                </span>
              </div>
            ) : (
              <>
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
              </>
            )}
          </>
        )}
      </OptionList.Content>
    </OptionList.Root>
  );
};

export default JoinProviders;
