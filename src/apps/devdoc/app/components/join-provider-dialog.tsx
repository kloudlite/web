import Popup from 'kl-design-system/molecule/popup';
import {
  Envelope,
  GithubLogoFill,
  GitlabLogoFill,
  GoogleLogoFill,
} from '@jengaicons/react';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { Badge } from 'kl-design-system/atoms/badge';
import { Button, IButton } from 'kl-design-system/atoms/button';
import useConfig from '../utils/use-config';
import useMenu from '../utils/use-menu';
import ButtonDev from './button';
import { Anchor } from './anchor';
import { authUrl } from '../utils/config';
import { cn } from '../utils/commons';

const JoinProvidersDialog = ({
  size,
  buttonContent,
}: {
  size?: IButton['size'];
  buttonContent?: ReactNode;
}) => {
  const { config } = useConfig();
  const { oathProviders } = config;
  const signupUrl = `${process.env.AUTH_URL}/signup?mode=email`;

  const { setState } = useMenu();

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setState(false);
    }, 150);
  }, [show]);

  const userApproved = config.user?.verified && !config.user.approved;
  const hasProvider =
    oathProviders?.githubLoginUrl ||
    oathProviders?.gitlabLoginUrl ||
    oathProviders?.googleLoginUrl;

  return (
    <div className="wb-w-full">
      {!buttonContent && (
        <ButtonDev
          content="Signup to join waitlist"
          variant="primary"
          block
          size={size}
          onClick={() => {
            setShow(true);
          }}
        />
      )}
      {buttonContent && (
        <Button
          content={buttonContent}
          variant="primary"
          block
          size={size}
          onClick={() => {
            setShow(true);
          }}
        />
      )}
      <Popup.Root show={show} onOpenChange={setShow}>
        <div className="md:wb-hidden">
          <Popup.Header />
        </div>
        <Popup.Content
          className={cn('!wb-p-0', !userApproved ? 'md:!wb-max-h-[90vh]' : '')}
        >
          {userApproved ? (
            <div className="wb-flex wb-flex-col wb-gap-4xl wb-px-8xl wb-py-5xl wb-text-center wb-h-full wb-items-center">
              <Badge type="neutral">
                🔥 Amazing curated Open-Source remote local envs
              </Badge>
              <span className="wb-headingXl-marketing wb-text-text-default">
                You&apos;ve been added to our waitlist!
              </span>
              <span className="wb-bodyLg wb-text-text-soft">
                Do you have an invite code?
                <br />
                <Link
                  href={`${process.env.AUTH_URL}/signup`}
                  className="wb-text-text-default hover:wb-underline wb-underline-offset-4"
                >
                  Click here
                </Link>{' '}
                to access.
              </span>
            </div>
          ) : (
            <div className="wb-flex wb-flex-col wb-h-full">
              <div className="wb-flex wb-flex-col wb-gap-5xl wb-p-8xl bg-surface-basic-subdued wb-items-center">
                <div className="wb-flex wb-flex-col wb-items-center wb-gap-lg">
                  <span className="wb-headingXl wb-text-text-default wb-text-center">
                    Join the waiting list by creating your Kloudlite account
                  </span>
                </div>
              </div>
              <div className="wb-flex wb-flex-col wb-w-full wb-p-8xl wb-gap-5xl wb-flex-1 md:wb-flex-auto">
                {hasProvider && (
                  <div className="wb-flex wb-flex-col wb-gap-3xl wb-w-[350px] wb-m-auto">
                    {oathProviders?.githubLoginUrl && (
                      <Button
                        variant="tertiary"
                        content="Continue with Github"
                        prefix={<GithubLogoFill />}
                        linkComponent={Link}
                        toLabel="href"
                        to={oathProviders.githubLoginUrl}
                        className="!wb-w-full md:wb-w-auto"
                        size="lg"
                      />
                    )}
                    {oathProviders?.gitlabLoginUrl && (
                      <Button
                        variant="purple"
                        content="Continue with Gitlab"
                        prefix={<GitlabLogoFill />}
                        linkComponent={Link}
                        toLabel="href"
                        to={oathProviders.gitlabLoginUrl}
                        className="!wb-w-full md:wb-w-auto"
                        size="lg"
                      />
                    )}
                    {oathProviders?.googleLoginUrl && (
                      <Button
                        variant="primary"
                        content="Continue with Google"
                        prefix={<GoogleLogoFill />}
                        linkComponent={Link}
                        toLabel="href"
                        to={oathProviders.googleLoginUrl}
                        className="!wb-w-full md:wb-w-auto"
                        size="lg"
                      />
                    )}
                  </div>
                )}
                <div className="wb-flex wb-flex-col wb-gap-5xl wb-w-[350px] wb-m-auto">
                  {hasProvider ? (
                    <span className="wb-h-xs wb-bg-border-default" />
                  ) : null}
                  <Button
                    variant="basic"
                    content="Continue with email"
                    prefix={<Envelope />}
                    linkComponent={Link}
                    toLabel="href"
                    to={signupUrl}
                    className="!wb-w-full md:wb-w-auto"
                    size="lg"
                  />

                  <div className="wb-bodyLg wb-text-text-soft wb-text-center">
                    By continuing, you agree Kloudlite’s <br />
                    <Anchor
                      className="wb-text-text-strong wb-underline wb-underline-offset-4 hover:wb-cursor-pointer"
                      href="/terms-of-services"
                    >
                      Terms of Service
                    </Anchor>
                    &nbsp; and &nbsp;
                    <Anchor
                      className="wb-text-text-strong wb-underline wb-underline-offset-4 hover:wb-cursor-pointer"
                      href="/privacy-policy"
                    >
                      Privacy Policy.
                    </Anchor>
                  </div>
                </div>
              </div>
              <div className="wb-flex wb-bg-surface-basic-subdued wb-px-8xl wb-py-5xl wb-bodyLg wb-text-text-soft wb-items-center wb-justify-center">
                Already have an account?&nbsp;
                <Anchor
                  className="wb-text-text-strong wb-underline wb-underline-offset-4 hover:wb-cursor-pointer"
                  href={`${authUrl}/login`}
                >
                  Sign in
                </Anchor>
              </div>
            </div>
          )}
        </Popup.Content>
      </Popup.Root>
    </div>
  );
};

export default JoinProvidersDialog;
