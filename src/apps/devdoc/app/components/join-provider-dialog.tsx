import Popup from 'kl-design-system/molecule/popup';
import {
  Envelope,
  GithubLogoFill,
  GitlabLogoFill,
  GoogleLogoFill,
} from '@jengaicons/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BrandLogo } from 'kl-design-system/branding/brand-logo';
import { Badge } from 'kl-design-system/atoms/badge';
import useConfig from '../utils/use-config';
import useMenu from '../utils/use-menu';
import Button from './button';
import { Anchor } from './anchor';
import { authUrl } from '../utils/config';

const JoinProvidersDialog = () => {
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

  return (
    <div>
      <Button
        content="Signup to join waitlist"
        variant="primary"
        block
        onClick={() => {
          setShow(true);
        }}
      />
      <Popup.Root show={show} onOpenChange={setShow}>
        <div className="md:wb-hidden">
          <Popup.Header />
        </div>
        <Popup.Content className="!wb-p-0">
          {config.user?.verified && !config.user.approved ? (
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
              <div className="wb-flex wb-flex-col wb-gap-5xl wb-py-5xl wb-px-8xl bg-surface-basic-subdued wb-items-center">
                <div className="wb-p-xl wb-rounded-lg wb-border wb-w-6xl wb-aspect-square wb-box-content wb-bg-surface-basic-default wb-border-border-default wb-flex wb-items-center wb-justify-center">
                  <BrandLogo size={40} />
                </div>
                <div className="wb-flex wb-flex-col wb-items-center wb-gap-lg">
                  <span className="wb-headingXl wb-text-text-default wb-text-center">
                    Join the waiting list by creating your Kloudlite account
                  </span>
                </div>
              </div>
              <div className="wb-flex wb-flex-col wb-w-full wb-p-8xl wb-gap-5xl wb-flex-1 md:wb-flex-auto">
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
                    />
                  )}
                  {oathProviders?.githubLoginUrl ||
                  oathProviders?.gitlabLoginUrl ||
                  oathProviders?.googleLoginUrl ? (
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
                  />

                  <div className="wb-bodyLg wb-text-text-soft wb-text-center">
                    By continuing, you agree Kloudlite’s &nbsp;
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
