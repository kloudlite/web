import {
  Envelope,
  GithubLogoFill,
  GitlabLogoFill,
  GoogleLogoFill,
  X,
} from '@jengaicons/react';
import { motion } from 'framer-motion';
import { Button, IconButton } from 'kl-design-system/atoms/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '~/app/utils/commons';
import useConfig from '~/app/utils/use-config';
import { ArrowRight } from '~/app/icons/icons';
import JoinProvidersDialog from '../join-provider-dialog';

const ProviderUI = () => {
  const [show, setShow] = useState(false);
  const [reveal, setReveal] = useState(false);
  const { config } = useConfig();
  const signupUrl = `${process.env.AUTH_URL}/signup?mode=email`;

  useEffect(() => {
    const unreveal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setReveal(false);
      }
    };
    document.addEventListener('keydown', unreveal);

    return () => document.removeEventListener('keydown', unreveal);
  }, []);

  return (
    <div>
      <motion.div
        className={cn(
          'wb-overflow-y-hidden md:wb-max-h-[50px] wb-p-sm wb-w-full wb-transition-all'
        )}
      >
        <motion.div
          className={cn(
            'wb-flex wb-flex-col wb-items-center wb-gap-xl wb-transition-all wb-duration-200 wb-transform wb-ease-in-out',
            reveal
              ? '-wb-translate-y-[calc(38px_+_6px)] md:wb-translate-y-[calc(-50%_-_6px)]'
              : ''
          )}
        >
          <motion.div
            className={cn(
              'wb-hidden md:wb-block',
              reveal ? 'wb-invisible' : 'wb-visible'
            )}
          >
            <Button
              variant="primary"
              content="Signup to join waitlist"
              size="lg"
              suffix={<ArrowRight />}
              className="!wb-h-[48px] !wb-px-4xl !wb-w-[302px]"
              onClick={() => {
                setReveal(true);
              }}
            />
          </motion.div>
          <motion.div className={cn('wb-block md:wb-hidden')}>
            <Button
              variant="primary"
              content="Signup to join waitlist"
              onClick={() => {
                setShow(true);
              }}
            />
          </motion.div>
          <motion.div
            className={cn(
              'wb-hidden md:wb-flex wb-flex-col md:wb-flex-row wb-gap-xl wb-items-center md:wb-justify-center wb-w-full'
            )}
          >
            <motion.span
              className={cn(
                'wb-text-text-default dark:wb-text-text-darktheme-default wb-transition-all wb-ease-in-out',
                reveal ? 'wb-opacity-100' : 'wb-opacity-0'
              )}
            >
              Signup with{' '}
            </motion.span>
            <motion.div
              className={cn(
                'wb-flex wb-flex-col md:wb-flex-row wb-gap-xl wb-items-center wb-transition-all wb-ease-in-out wb-w-full md:wb-w-auto',
                reveal ? 'wb-visible' : 'wb-invisible'
              )}
            >
              {config.oathProviders?.githubLoginUrl && (
                <Button
                  variant="tertiary"
                  content="Github"
                  prefix={<GithubLogoFill />}
                  linkComponent={Link}
                  toLabel="href"
                  to={config.oathProviders.githubLoginUrl}
                  className="!wb-w-full md:wb-w-auto"
                />
              )}
              {config.oathProviders?.gitlabLoginUrl && (
                <Button
                  variant="purple"
                  content="Gitlab"
                  prefix={<GitlabLogoFill />}
                  linkComponent={Link}
                  toLabel="href"
                  to={config.oathProviders.gitlabLoginUrl}
                  className="!wb-w-full md:wb-w-auto"
                />
              )}
              {config.oathProviders?.googleLoginUrl && (
                <Button
                  variant="primary"
                  content="Google"
                  prefix={<GoogleLogoFill />}
                  linkComponent={Link}
                  toLabel="href"
                  to={config.oathProviders.googleLoginUrl}
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
              <IconButton
                variant="plain"
                icon={<X />}
                size="xs"
                onClick={() => {
                  setReveal(false);
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      <JoinProvidersDialog show={show} onOpenChange={setShow} />
    </div>
  );
};

export default ProviderUI;
