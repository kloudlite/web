import Popup from 'kl-design-system/molecule/popup';
import {
  CircleNotch,
  Envelope,
  GithubLogoFill,
  GitlabLogoFill,
  GoogleLogoFill,
} from '@jengaicons/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, IButton } from 'kl-design-system/atoms/button';
import useConfig, { IConfig } from '../utils/use-config';
import useMenu from '../utils/use-menu';
import ButtonDev from './button';
import { Anchor } from './anchor';
import { authUrl, consoleUrl } from '../utils/config';
import { cn } from '../utils/commons';
import OptionList from 'kl-design-system/atoms/option-list';
import Profile from 'kl-design-system/molecule/profile';
import { ArrowRight } from '../icons/icons';

const ProfileMenu = ({ user }: { user: IConfig['user'] }) => {
  if (!user) {
    return null;
  }
  return (
    <OptionList.Root>
      <OptionList.Trigger>
        <div>
          <div className="wb-hidden md:wb-flex">
            <Profile name={user.name} size="xs" />
          </div>
          <div className="wb-flex md:wb-hidden">
            <Profile size="xs" />
          </div>
        </div>
      </OptionList.Trigger>
      <OptionList.Content className="wb-w-[200px]">
        <OptionList.Item>
          <div className="wb-flex wb-flex-col">
            <span className="wb-bodyMd-medium wb-text-text-default">
              {user.name}
            </span>
            <span className="wb-bodySm wb-text-text-soft">{user.email}</span>
          </div>
        </OptionList.Item>
        <OptionList.Link LinkComponent={Link} to={consoleUrl} toLabel="href">
          Go to console
        </OptionList.Link>
      </OptionList.Content>
    </OptionList.Root>
  );
};

const UserComponent = ({
  config,
  hasSignIn,
  isInHeader,
  setShow,
  size,
}: {
  config: IConfig;
  hasSignIn: boolean;
  isInHeader: boolean;
  setShow: any;
  size?: IButton['size'];
}) => {
  const user = config.user;
  if (config.userApiLoading) {
    return (
      <div
        className={cn(
          'wb-flex wb-flex-row wb-items-center wb-justify-center wb-text-text-default',
          {
            'wb-w-[172px]': isInHeader,
            'wb-h-[50px]': !isInHeader,
          },
        )}
      >
        <CircleNotch size={16} className="wb-animate-spin" />
      </div>
    );
  }

  if (user) {
    return (
      <div
        className={cn('wb-flex wb-items-center wb-justify-center', {
          'wb-w-[172px]': isInHeader,
        })}
      >
        <ButtonDev
          content={
            isInHeader ? (
              <span className="wb-bodyMd-medium">Access console</span>
            ) : (
              'Access console'
            )
          }
          variant="basic"
          suffix={<ArrowRight />}
          block
          size={size}
          linkComponent={Link}
          toLabel="href"
          to={consoleUrl}
        />
      </div>
    );
  }
  return (
    <div
      className={cn('wb-flex wb-flex-row wb-items-center wb-gap-lg', {
        'wb-w-[172px]': isInHeader,
      })}
    >
      {hasSignIn && (
        <ButtonDev
          content={
            isInHeader ? (
              <span className="wb-bodyMd-medium">Sign in</span>
            ) : (
              'Sign in'
            )
          }
          variant="outline"
          block
          size={size}
          onClick={() => {
            setShow('signin');
          }}
        />
      )}
      <ButtonDev
        content={
          isInHeader ? (
            <span className="wb-bodyMd-medium">Sign up</span>
          ) : (
            'Sign up'
          )
        }
        variant="primary"
        block
        size={size}
        onClick={() => {
          setShow('signup');
        }}
      />
    </div>
  );
};

const JoinProvidersDialog = ({
  size,
  hasSignIn,
  isInHeader,
}: {
  size?: IButton['size'];
  hasSignIn?: boolean;
  isInHeader?: boolean;
}) => {
  const { config } = useConfig();
  const { oathProviders } = config;
  const signupUrl = `${authUrl}/signup?mode=email`;
  const signinUrl = `${authUrl}/login?mode=email`;

  const { setState } = useMenu();

  const [show, setShow] = useState('');

  useEffect(() => {
    const time = setTimeout(() => {
      setState(false);
    }, 150);

    return () => {
      clearInterval(time);
    };
  }, [show]);

  const userApproved = config.user?.verified && config.user.approved;
  const hasProvider =
    oathProviders?.githubLoginUrl ||
    oathProviders?.gitlabLoginUrl ||
    oathProviders?.googleLoginUrl;

  return (
    <div className="wb-w-full">
      <UserComponent
        config={config}
        hasSignIn={!!hasSignIn}
        isInHeader={!!isInHeader}
        setShow={setShow}
        size={size}
      />
      <Popup.Root
        show={!!show}
        onOpenChange={(e) => {
          if (!e) {
            setShow('');
          }
        }}
      >
        <div className="md:wb-hidden">
          <Popup.Header />
        </div>
        <Popup.Content
          className={cn('!wb-p-0', !userApproved ? 'md:!wb-max-h-[90vh]' : '')}
        >
          <div className="wb-flex wb-flex-col wb-h-full">
            <div className="wb-flex wb-flex-col wb-gap-5xl wb-p-8xl bg-surface-basic-subdued wb-items-center">
              <div className="wb-flex wb-flex-col wb-items-center wb-gap-lg">
                <span className="wb-headingXl wb-text-text-default wb-text-center">
                  {show === 'signup'
                    ? 'Create your Kloudlite.io account'
                    : 'Sign in to Kloudlite.io'}
                </span>
                <div className="wb-bodyLg wb-text-text-soft wb-text-center">
                  {show === 'signup'
                    ? 'Get started for free. No credit card required.'
                    : 'Start integrating local coding with remote power'}
                </div>
              </div>
            </div>
            <div className="wb-flex wb-flex-col wb-w-full wb-p-8xl wb-gap-5xl wb-flex-1 md:wb-flex-auto">
              {hasProvider && (
                <div className="wb-flex wb-flex-col wb-gap-3xl md:wb-w-[350px] md:wb-m-auto">
                  {oathProviders?.githubLoginUrl && (
                    <Button
                      variant="tertiary"
                      content={
                        <span className="!wb-bodyLg">Continue with Github</span>
                      }
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
                      content={
                        <span className="!wb-bodyLg">Continue with Gitlab</span>
                      }
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
                      content={
                        <span className="!wb-bodyLg">Continue with Google</span>
                      }
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
              <div className="wb-flex wb-flex-col wb-gap-5xl md:wb-w-[350px] md:wb-m-auto">
                {hasProvider ? (
                  <span className="wb-h-xs wb-bg-border-default" />
                ) : null}
                <Button
                  variant="basic"
                  content={
                    <span className="!wb-bodyLg">Continue with email</span>
                  }
                  prefix={<Envelope />}
                  linkComponent={Link}
                  toLabel="href"
                  to={show === 'signup' ? signupUrl : signinUrl}
                  className="!wb-w-full md:wb-w-auto"
                  size="lg"
                />

                <div className="wb-bodyLg wb-text-text-soft wb-text-center">
                  By continuing, you agree Kloudlite's <br />
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
            <div className="wb-flex wb-bg-surface-basic-subdued wb-px-5xl md:wb-px-8xl wb-py-5xl wb-bodyLg wb-text-text-soft wb-items-center wb-justify-center">
              {show === 'signup' ? (
                <>Already have an account?&nbsp;</>
              ) : (
                <>New to Kloudlite?&nbsp;</>
              )}
              <Anchor
                className="wb-text-text-strong wb-underline wb-underline-offset-4 hover:wb-cursor-pointer"
                href={
                  show === 'signup' ? `${authUrl}/login` : `${authUrl}/signup`
                }
              >
                {show === 'signup' ? 'Sign in' : 'Sign up'}
              </Anchor>
            </div>
          </div>
        </Popup.Content>
      </Popup.Root>
    </div>
  );
};

export default JoinProvidersDialog;
