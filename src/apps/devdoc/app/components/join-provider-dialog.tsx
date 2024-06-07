import Popup from 'kl-design-system/molecule/popup';
import { Button } from 'kl-design-system/atoms/button';
import {
  Envelope,
  GithubLogoFill,
  GitlabLogoFill,
  GoogleLogoFill,
} from '@jengaicons/react';
import Link from 'next/link';
import { useEffect } from 'react';
import useConfig from '../utils/use-config';
import useMenu from '../utils/use-menu';

const JoinProvidersDialog = ({
  show,
  onOpenChange,
}: {
  show?: boolean;
  onOpenChange?: (val: boolean) => void;
}) => {
  const { config } = useConfig();
  const { oathProviders } = config;
  const signupUrl = `${process.env.AUTH_URL}/signup?mode=email`;

  const { setState } = useMenu();

  useEffect(() => {
    setTimeout(() => {
      setState(false);
    }, 150);
  }, [show]);

  return (
    <Popup.Root show={show} onOpenChange={onOpenChange}>
      <Popup.Header>Signup to waitlist</Popup.Header>
      <Popup.Content className="wb-flex wb-justify-center wb-items-center">
        {config.user?.approved && config.user.verified ? (
          <div className="wb-flex wb-flex-col wb-gap-4xl wb-max-w-[300px] wb-px-3xl wb-py-xl wb-text-center">
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
          <div className="wb-flex wb-flex-col wb-gap-3xl wb-w-full">
            {oathProviders?.githubLoginUrl && (
              <Button
                variant="tertiary"
                content="Github"
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
                content="Gitlab"
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
                content="Google"
                prefix={<GoogleLogoFill />}
                linkComponent={Link}
                toLabel="href"
                to={oathProviders.googleLoginUrl}
                className="!wb-w-full md:wb-w-auto"
              />
            )}
            <Button
              variant="primary"
              content="Email"
              prefix={<Envelope />}
              linkComponent={Link}
              toLabel="href"
              to={signupUrl}
              className="!wb-w-full md:wb-w-auto"
            />
          </div>
        )}
      </Popup.Content>
    </Popup.Root>
  );
};

export default JoinProvidersDialog;
