import Popup from 'kl-design-system/molecule/popup';
import { Button } from 'kl-design-system/atoms/button';
import {
  Envelope,
  GithubLogoFill,
  GitlabLogoFill,
  GoogleLogoFill,
} from '@jengaicons/react';
import Link from 'next/link';
import useConfig from '../utils/use-config';

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

  return (
    <Popup.Root show={show} onOpenChange={onOpenChange}>
      <Popup.Header>Signup to waitlist</Popup.Header>
      <Popup.Content className="wb-flex wb-justify-center wb-items-center">
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
      </Popup.Content>
    </Popup.Root>
  );
};

export default JoinProvidersDialog;
