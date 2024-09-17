import Link from 'next/link';
import { BrandLogo } from 'kl-design-system/branding/brand-logo';
import {
  GithubLogoFill,
  LinkedinLogoFill,
  TwitterNewLogoFill,
} from '~/app/icons/icons';
import OssIcon from '~/images/homeNew/oss.svg';
import OssIconDark from '~/images/homeNew/oss-dark.svg';
import { cn } from './commons';
import { IConfig } from './use-config';
import ThemeSwitcher from '../components/theme-switcher';
import { useTheme } from './useTheme';
import { YoutubeLogoFill } from '@jengaicons/react';

export const siteDesc =
  'Kloudlite is a remote-local development environment platform designed to streamline the workflow for developers working on distributed applications. By integrating both local and remote environments through Kubernetes, Kloudlite ensures a seamless, productive, and more connected development experience.';
export const basePath = 'https://kloudlite.io';
export const authUrl = `${process.env.AUTH_URL}` || 'https://auth.kloudlite.io';
export const consoleUrl =
  `${process.env.CONSOLE_URL}` || 'https://console.kloudlite.io';
export const gitUrl = 'https://github.com/kloudlite/kloudlite';
export const communityUrl =
  'https://github.com/kloudlite/kloudlite/discussions';
export const changeLogUrl = 'https://github.com/kloudlite/kloudlite/releases';
const linkedinUrl = 'https://linkedin.com/company/kloudlite-io';
const youtubeUrl = 'https://youtube.com/@kloudliteofficial';
const xUrl = 'https://x.com/kloudlite';
export const supportEmail = 'launch@kloudlite.io';
const socialIconSize = 18;

const SocialMenu = () => {
  return (
    <div className="wb-flex wb-flex-row wb-items-center wb-gap-xl wb-text-icon-soft wb-pr-2xl">
      <a target="_blank" href={gitUrl} aria-label="kloudlite-github">
        <GithubLogoFill size={socialIconSize} />
      </a>
      <a target="_blank" href={xUrl} aria-label="kloudlite-x">
        <TwitterNewLogoFill size={socialIconSize} />
      </a>
      <a target="_blank" href={linkedinUrl} aria-label="kloudlite-linkedin">
        <LinkedinLogoFill size={socialIconSize} />
      </a>
      <a target="_blank" href={youtubeUrl} aria-label="kloudlite-youtube">
        <YoutubeLogoFill size={socialIconSize} />
      </a>
    </div>
  );
};

const BrandMenu = ({ className }: { className?: string }) => {
  const brandIconSize = 24;

  const { binaryTheme } = useTheme();

  return (
    <div
      className={cn(
        'wb-flex wb-flex-col wb-gap-7xl md:wb-gap-3xl lg:wb-pr-4xl wb-order-last md:wb-order-first md:wb-justify-between md:wb-h-full',
        className,
      )}
    >
      <div className="wb-flex wb-flex-row">
        <div className="wb-flex wb-flex-col wb-gap-3xl wb-flex-1 lg:wb-min-h-[200px] xl:wb-min-h-[236px] wb-items-start">
          <div className="wb-flex wb-flex-col wb-items-start wb-gap-xl wb-max-w-[300px]">
            <a href="/" aria-label="kloudlite">
              <BrandLogo size={brandIconSize} detailed />
            </a>
            <span className="wb-bodyMd wb-text-text-soft">
              Boost your efficiency, speed up deployments, enhance collaboration
            </span>
          </div>
          <iframe
            title="kloudlite status"
            src={`https://status.kloudlite.io/badge?theme=${binaryTheme}`}
            width="250"
            height="30"
          />
        </div>
        <div className="wb-hidden md:wb-flex lg:wb-hidden wb-flex-col wb-justify-between wb-items-end">
          <div className="wb-flex wb-bodyMd wb-text-text-soft wb-flex-col wb-gap-3xl wb-items-end lg:wb-self-auto">
            <SocialMenu />
            <div>© {new Date().getFullYear()} Kloudlite Labs Pvt Ltd.</div>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
      <div className="wb-bodyMd wb-text-text-soft wb-flex md:wb-hidden lg:wb-flex wb-flex-col wb-gap-3xl">
        <SocialMenu />
        <div>© {new Date().getFullYear()} Kloudlite Labs Pvt Ltd.</div>
        <div className="md:wb-hidden">
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default {
  siteTitle: 'Kloudlite - Development Environment as a Service',
  logo: (
    <Link href="/" aria-label="Kloudlite homepage">
      <BrandLogo detailed size={24} />
    </Link>
  ),
  footer: {
    brand: <BrandMenu className="md:wb-order-[-9999]" />,
    extra: (
      <div className="wb-flex wb-flex-col wb-justify-between wb-h-full">
        <div>
          <img className="dark-hidden" src={OssIcon.src} alt="oss-light" />
          <img
            className="wb-hidden dark-block"
            src={OssIconDark.src}
            alt="oss-dark"
          />
        </div>
        <div className="wb-hidden lg:wb-flex">
          <ThemeSwitcher />
        </div>
      </div>
    ),
    menu: [
      {
        title: 'Products',
        className: 'wb-basis-1/2 md:wb-basis-auto wb-flex',
        showExtra: false,
        items: [
          {
            title: 'Docs',
            to: '/docs',
          },
          {
            title: 'Feature Request',
            to: 'https://github.com/kloudlite/kloudlite/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=',
          },
          {
            title: 'Bug Report',
            to: 'https://github.com/kloudlite/kloudlite/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=',
          },
        ],
      },
      {
        title: 'Resources',
        className: 'wb-basis-1/2 md:wb-basis-auto wb-flex',
        showExtra: false,
        items: [
          {
            title: 'About us',
            to: '/about-us',
          },
          {
            title: 'Blog',
            to: '/blog',
          },
          {
            title: 'Pricing',
            to: '/pricing',
          },
        ],
      },
      {
        title: 'Company',
        className: 'wb-basis-1/2 md:wb-basis-auto wb-flex',
        showExtra: true,
        items: [
          {
            title: 'Contact us',
            to: '/contact-us',
          },
          {
            title: 'Terms of services',
            to: '/legal/terms-of-services',
          },
          {
            title: 'Privacy policy',
            to: '/legal/privacy-policy',
          },
        ],
      },
    ],
  },
  scrollToTop: true,
  gitRepoUrl: gitUrl,
  feedback: {
    feedbackLabels: 'bug',
    linkTitle: 'Question? Give us feedback →',
  },
  headerPrimary: {
    items: [
      {
        title: 'Devops',
        to: '/docs/devops',
      },
      {
        title: 'Infraops',
        to: '/docs/infraops',
      },
      {
        title: 'Distribution',
        to: '/docs/distribution',
      },
    ],
  },
  headerSecondary: {
    items: [
      {
        title: 'Docs',
        type: 'normal',
        to: '/docs',
      },
      {
        title: 'Blog',
        type: 'normal',
        to: '/blog',
      },
      {
        title: 'Community',
        type: 'normal',
        to: communityUrl,
      },
      {
        title: 'Changelog',
        type: 'normal',
        to: changeLogUrl,
      },
    ],
  },
  urls: {
    auth: 'auth.kloudlite.io',
    console: 'console.kloudlite.io',
  },
} as IConfig;
