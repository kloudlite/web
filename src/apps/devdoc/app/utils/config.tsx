import Link from 'next/link';
import { BrandLogo } from 'kl-design-system/branding/brand-logo';
import ButtonGroup from 'kl-design-system/atoms/button-group';
import {
  GithubLogoFill,
  LinkedinLogoFill,
  Monitor,
  Moon,
  Sun,
  TwitterNewLogoFill,
} from '~/app/icons/icons';
import OssIcon from '~/images/homeNew/oss.svg';
import OssIconDark from '~/images/homeNew/oss-dark.svg';
import { cn } from './commons';
import { IConfig } from './use-config';
import { useTheme } from './useTheme';

export const basePath = 'https://kloudlite.io';
export const authUrl = 'https://auth.kloudlite.io';
export const gitUrl = 'https://github.com/kloudlite/kloudlite';
const linkedinUrl = 'https://linkedin.com/company/kloudlite-io';
const xUrl = 'https://x.com/kloudlite';
export const supportEmail = 'launch@kloudlite.io';
const socialIconSize = 18;

const SocialMenu = () => {
  return (
    <div className="wb-flex wb-flex-row wb-items-center wb-gap-xl wb-text-icon-strong dark:wb-text-icon-darktheme-strong wb-pr-2xl">
      <a href={gitUrl} aria-label="kloudlite-github">
        <GithubLogoFill size={socialIconSize} />
      </a>
      <a href={xUrl} aria-label="kloudlite-x">
        <TwitterNewLogoFill size={socialIconSize} />
      </a>
      <a href={linkedinUrl} aria-label="kloudlite-linkedin">
        <LinkedinLogoFill size={socialIconSize} />
      </a>
    </div>
  );
};

const BrandMenu = ({ className }: { className?: string }) => {
  const brandIconSize = 28;

  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        'wb-flex wb-flex-col wb-gap-7xl md:wb-gap-3xl lg:wb-pr-4xl lg:wb-w-[211px] xl:wb-w-[296px] wb-order-last md:wb-order-first md:wb-justify-between md:wb-h-full',
        className
      )}
    >
      <div className="wb-flex wb-flex-row">
        <div className="wb-flex wb-flex-col wb-gap-3xl wb-flex-1 lg:wb-min-h-[236px] wb-items-start">
          <div className="wb-flex wb-flex-col wb-items-start wb-gap-xl wb-max-w-[300px]">
            <a href="/" aria-label="kloudlite">
              <BrandLogo size={brandIconSize} detailed />
            </a>
            <span className="wb-bodySm wb-text-text-soft dark:wb-text-text-darktheme-soft">
              Boost your efficiency, speed up deployments, enhance collaboration
            </span>
          </div>
          <ButtonGroup.Root
            variant="outline"
            selectable
            value={theme}
            onValueChange={(v: any) => {
              setTheme(v);
            }}
          >
            <ButtonGroup.IconButton value="light" icon={<Sun />} />
            <ButtonGroup.IconButton value="dark" icon={<Moon />} />
            <ButtonGroup.IconButton value="system" icon={<Monitor />} />
          </ButtonGroup.Root>
        </div>
        <div className="wb-bodyMd wb-text-text-soft dark:wb-text-text-darktheme-soft wb-hidden md:wb-flex lg:wb-hidden wb-flex-col wb-gap-3xl wb-items-end md:wb-self-end lg:wb-self-auto">
          <SocialMenu />
          <div>© {new Date().getFullYear()} Kloudlite Labs Pvt Ltd.</div>
        </div>
      </div>
      <div className="wb-bodyMd wb-text-text-soft dark:wb-text-text-darktheme-soft wb-flex md:wb-hidden lg:wb-flex wb-flex-col wb-gap-3xl">
        <SocialMenu />
        <div>© {new Date().getFullYear()} Kloudlite Labs Pvt Ltd.</div>
      </div>
    </div>
  );
};

export default {
  siteTitle: 'Kloudlite',
  logo: (
    <Link href="/">
      <BrandLogo detailed size={28} />
    </Link>
  ),
  footer: {
    brand: <BrandMenu className="md:wb-order-[-9999]" />,
    extra: (
      <div>
        <img className="dark:wb-hidden" src={OssIcon.src} alt="oss-light" />
        <img
          className="wb-hidden dark:wb-block"
          src={OssIconDark.src}
          alt="oss-dark"
        />
      </div>
    ),
    menu: [
      {
        title: 'Developers',
        className: 'wb-basis-1/2 md:wb-basis-auto wb-flex',
        showExtra: false,
        items: [
          {
            title: 'Documentation',
            to: '/docs',
          },
          {
            title: 'Blog',
            to: '/blog',
          },
          {
            title: 'Changelog',
            to: '#',
          },
        ],
      },
      {
        title: 'Resources',
        className: 'wb-basis-1/2 md:wb-basis-auto wb-flex',
        showExtra: false,
        items: [
          {
            title: 'Careers',
            to: '#',
          },
          {
            title: 'Contact us',
            to: '/contact-us',
          },
          {
            title: 'Pricing',
            to: '#',
          },
        ],
      },
      {
        title: 'Company',
        className: 'wb-basis-1/2 md:wb-basis-auto wb-flex',
        showExtra: true,
        items: [
          {
            title: 'Help and support',
            to: '/help-and-support',
          },
          {
            title: 'Terms of services',
            to: '/terms-of-services',
          },
          {
            title: 'Privacy policy',
            to: '/privacy-policy',
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
        title: 'Blog',
        type: 'normal',
        to: '/blog',
      },
      {
        title: 'Changelog',
        type: 'normal',
        to: '#',
      },
      {
        title: 'Documentation',
        type: 'normal',
        to: '/docs',
      },
    ],
  },
  urls: {
    auth: 'auth.kloudlite.io',
    console: 'console.kloudlite.io',
  },
} as IConfig;
