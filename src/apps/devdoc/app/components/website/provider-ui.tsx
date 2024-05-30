import {
  Envelope,
  GithubLogoFill,
  GitlabLogoFill,
  GoogleLogoFill,
  X,
} from '@jengaicons/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Button, IconButton } from 'kl-design-system/atoms/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '~/app/utils/commons';
import { authUrl } from '~/app/utils/config';

const fetchProviders = async () => {
  try {
    const res = await axios({
      url: `${process.env.AUTH_URL}/api` || 'https://auth.kloudlite.io/api',
      method: 'post',
      withCredentials: false,
      data: {
        method: 'loginPageInitUrls',
        args: [{}],
      },
    });
    if (res.data?.data) {
      return res.data.data;
    }
    return null;
  } catch (e) {
    return null;
  }
};

type IProviders = {
  githubLoginUrl: string | null;
  gitlabLoginUrl: string | null;
  googleLoginUrl: string | null;
};

const ProviderUI = () => {
  const [providers, setProvider] = useState<IProviders | null>();
  const [reveal, setReveal] = useState(false);

  const signupUrl = `${authUrl}/signup?mode=email`;

  useEffect(() => {
    (async () => {
      setProvider(await fetchProviders());
    })();

    const unreveal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setReveal(false);
      }
    };
    document.addEventListener('keydown', unreveal);

    return () => document.removeEventListener('keydown', unreveal);
  }, []);

  return (
    <motion.div
      className={cn(
        'wb-overflow-y-hidden md:!wb-max-h-[42px] wb-p-sm wb-w-full wb-transition-all'
      )}
      style={{
        maxHeight: reveal
          ? `${
              providers
                ? `${
                    Object.values(providers).filter((value) => !!value).length *
                      50 +
                    24 +
                    12 +
                    20 +
                    50 +
                    10
                  }px`
                : '116px'
            }`
          : '42px',
      }}
    >
      <motion.div
        className={cn(
          'wb-flex wb-flex-col wb-items-center wb-gap-xl wb-transition-all wb-duration-200 wb-transform wb-ease-in-out',
          reveal
            ? '-wb-translate-y-[calc(38px_+_6px)] md:wb-translate-y-[calc(-50%_-_6px)]'
            : ''
        )}
      >
        <motion.div className={cn(reveal ? 'wb-invisible' : 'wb-visible')}>
          <Button
            variant="primary"
            content="Signup to join waitlist"
            onClick={() => {
              setReveal(true);
            }}
          />
        </motion.div>
        <motion.div
          className={cn(
            'wb-flex wb-flex-col md:wb-flex-row wb-gap-xl wb-items-center md:wb-justify-center wb-w-full'
          )}
        >
          <motion.span
            className={cn(
              'wb-text-text-default dark:wb-text-text-darktheme-default wb-transition-all wb-ease-in-out',
              reveal ? 'wb-opacity-100' : 'wb-opacity-0'
            )}
          >
            {' '}
            Signup with{' '}
          </motion.span>
          <motion.div
            className={cn(
              'wb-flex wb-flex-col md:wb-flex-row wb-gap-xl wb-items-center wb-transition-all wb-ease-in-out wb-w-full md:wb-w-auto',
              reveal ? 'wb-visible' : 'wb-invisible'
            )}
          >
            {providers?.githubLoginUrl && (
              <Button
                variant="tertiary"
                content="Github"
                prefix={<GithubLogoFill />}
                linkComponent={Link}
                toLabel="href"
                to={providers.githubLoginUrl}
                className="!wb-w-full md:wb-w-auto"
              />
            )}
            {providers?.gitlabLoginUrl && (
              <Button
                variant="purple"
                content="Gitlab"
                prefix={<GitlabLogoFill />}
                linkComponent={Link}
                toLabel="href"
                to={providers.gitlabLoginUrl}
                className="!wb-w-full md:wb-w-auto"
              />
            )}
            {providers?.googleLoginUrl && (
              <Button
                variant="primary"
                content="Google"
                prefix={<GoogleLogoFill />}
                linkComponent={Link}
                toLabel="href"
                to={providers.googleLoginUrl}
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
  );
};

export default ProviderUI;
