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
import { cn } from './commons';
import { IConfig } from './use-config';
import Button from '../components/button';
import { useTheme } from './useTheme';

const gitUrl = 'https://github.com/kloudlite/kloudlite';
const linkedinUrl = 'https://linkedin.com/company/kloudlite-io';
const xUrl = 'https://x.com/kloudlite';
export const supportEmail = 'launch@kloudlite.io';
const socialIconSize = 18;

const SocialMenu = () => {
  return (
    <div className="wb-flex wb-flex-row wb-items-center wb-gap-xl wb-text-icon-soft dark:wb-text-icon-darktheme-soft md:wb-justify-end wb-pr-2xl">
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
        'wb-flex wb-flex-col wb-gap-7xl md:wb-gap-3xl wb-pr-4xl lg:wb-w-[296px] wb-order-last md:wb-order-first md:wb-justify-between md:wb-h-full',
        className
      )}
    >
      <div className="wb-flex wb-flex-col md:wb-flex-row lg:wb-flex-col wb-gap-3xl wb-flex-1 lg:wb-min-h-[236px] md:wb-justify-between lg:wb-justify-start md:wb-items-center lg:wb-items-start">
        <div className="wb-flex wb-flex-col wb-items-start wb-gap-xl wb-max-w-[300px]">
          <a href="/" aria-label="kloudlite">
            <BrandLogo size={brandIconSize} detailed />
          </a>
          <span className="wb-bodySm wb-text-text-soft dark:wb-text-text-darktheme-soft">
            Boost your efficiency, speed up deployments, enhance collaboration
          </span>
        </div>
        <div className="wb-flex wb-flex-col wb-gap-lg">
          <div className="wb-flex wb-flex-row wb-items-center wb-justify-start md:wb-justify-end lg:wb-justify-start wb-gap-3xl wb-text-text-soft">
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
          <div className="wb-bodyMd wb-text-text-soft dark:wb-text-text-darktheme-soft wb-hidden md:wb-block lg:wb-hidden">
            © {new Date().getFullYear()} Kloudlite Labs Pvt Ltd.
          </div>
        </div>
      </div>
      <div className="wb-bodyMd wb-text-text-soft dark:wb-text-text-darktheme-soft md:wb-hidden lg:wb-block wb-flex wb-flex-col wb-gap-3xl">
        <div className="wb-block md:wb-hidden">
          <SocialMenu />
        </div>
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
      <div className="wb-hidden md:wb-block">
        <SocialMenu />
      </div>
    ),
    menu: [
      {
        title: 'Developers',
        className: 'w-[47%] md:w-auto',
        showExtra: false,
        items: [
          {
            title: 'Documentation',
            to: '#',
          },
          {
            title: 'Blog',
            to: '#',
          },
          {
            title: 'Changelog',
            to: '#',
          },
        ],
      },
      {
        title: 'Resources',
        className: 'w-[47%] md:w-auto',
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
        className: 'w-[47%] md:w-auto',
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
        to: '#',
      },
    ],
    extra: (
      <div className="wb-flex wb-flex-col md:wb-flex-row wb-gap-xl md:wb-items-center wb-mt-6xl md:wb-mt-0 wb-px-2xl md:wb-px-0">
        <a
          href={gitUrl}
          aria-label="kloudlite-github"
          className="wb-hidden md:wb-block wb-text-icon-default dark:wb-text-icon-darktheme-default"
        >
          <GithubLogoFill size={24} />
        </a>
        <div className="md:wb-hidden">
          <Button
            prefix={<GithubLogoFill />}
            content="Github"
            variant="basic"
            block
          />
        </div>
        <span className="hidden md:block wb-h-2xl wb-w-xs wb-bg-border-default dark:wb-bg-border-darktheme-default" />
        <div>
          <Button
            content="Join waitlist"
            variant="primary"
            to="#join-waitlist"
            LinkComponent={Link}
            toLabel="href"
            block
          />
        </div>
      </div>
    ),
  },
  urls: {
    auth: 'auth.kloudlite.io',
    console: 'console.kloudlite.io',
  },
} as IConfig;
