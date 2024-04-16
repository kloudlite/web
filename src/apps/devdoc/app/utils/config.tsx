import Link from 'next/link';
import { BrandLogo } from 'kl-design-system/branding/brand-logo';
import {
  CloudAgnostics,
  Container,
  GithubLogoFill,
  Infinity,
  LinkedinLogoFill,
  TwitterNewLogoFill,
} from '@jengaicons/react';
import { cn } from './commons';
import { IConfig } from './use-config';
import Button from '../components/button';
import { NavListItem } from '../components/nav-menu-v2';

const gitUrl = 'https://github.com/kloudlite/kloudlite';
const linkedinUrl = 'https://linkedin.com/company/kloudlite-io';
const xUrl = 'https://x.com/kloudlite';
export const supportEmail = 'launch@kloudlite.io';

const BrandMenu = ({ className }: { className?: string }) => {
  const socialIconSize = 24;
  const brandIconSize = 28;

  return (
    <div
      className={cn(
        'flex flex-col gap-3xl pr-4xl lg:w-[296px] order-last md:order-first md:!justify-between md:!h-full',
        className
      )}
    >
      <div className="flex flex-col md:!flex-row lg:!flex-col gap-3xl flex-1 lg:!min-h-[236px] md:!justify-between lg:!justify-start md:!items-center lg:!items-start">
        <div className="flex flex-col items-start gap-xl max-w-[300px]">
          <a href="/" aria-label="kloudlite">
            <BrandLogo size={brandIconSize} detailed />
          </a>
          <span className="bodySm text-text-soft">
            Kloudlite is a NoOps platform engineering system built to increase
            the productivity of developers & platform engineers.
          </span>
        </div>
        <div className="flex flex-col gap-lg">
          <div className="flex flex-row items-center justify-start md:!justify-end lg:!justify-start gap-3xl text-text-soft">
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
          <div className="bodyMd text-text-soft hidden md:!block lg:!hidden">
            © {new Date().getFullYear()} Kloudlite Labs Pvt Ltd.
          </div>
        </div>
      </div>
      <div className="bodyMd text-text-soft md:hidden lg:!block">
        © {new Date().getFullYear()} Kloudlite Labs Pvt Ltd.
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
    brand: <BrandMenu className="md:order-[-9999]" />,
    menu: [
      {
        title: 'Products',
        className: 'w-[47%] md:w-auto',
        items: [
          {
            title: 'Kl-DevOps',
            to: 'devops',
          },
          {
            title: 'Kl-InfraOps',
            to: 'infraops',
          },
          {
            title: 'Kl-Distribution',
            to: 'distribution',
          },
        ],
      },
      {
        title: 'Resources',
        className: 'w-[47%] md:w-auto',
        items: [
          {
            title: 'Help & support',
            to: 'help-and-support',
          },
          {
            title: 'Terms of services',
            to: 'terms-of-services',
          },
          {
            title: 'Privacy policy',
            to: 'privacy-policy',
          },
        ],
      },
      {
        title: 'Company',
        className: 'w-[47%] md:w-auto',
        items: [
          {
            title: 'Contact us',
            to: 'contact-us',
          },
          {
            title: 'Documentations',
            to: 'docs',
          },
          {
            title: 'Blog',
            to: 'blog',
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
        title: 'Product',
        to: '/product',
        type: 'popup',
        render: () => (
          <div className="w-[327px]">
            <ul className="flex flex-col">
              <NavListItem
                href="/devops"
                title="DevOps"
                icon={<Infinity size={28} />}
              >
                NoOps in every stage of devlopment
              </NavListItem>
              <NavListItem
                href="/infraops"
                title="InfraOps"
                icon={<CloudAgnostics size={28} />}
              >
                Cloud-native at the core of infrastructure
              </NavListItem>
              <NavListItem
                href="/distribution"
                title="Distribution"
                icon={<Container size={28} />}
              >
                Build, deploy and scale at an acceleration
              </NavListItem>
            </ul>
          </div>
        ),
      },
      {
        title: 'Help',
        to: '/help-and-support',
        type: 'normal',
      },
    ],
    extra: (
      <div className="flex flex-col md:!flex-row gap-2xl md:items-center mt-6xl md:!mt-0 px-2xl md:!px-0">
        <a
          href={gitUrl}
          aria-label="kloudlite-github"
          className="hidden md:!block"
        >
          <GithubLogoFill size={24} />
        </a>
        <div className="md:!hidden">
          <Button
            prefix={<GithubLogoFill />}
            content="Github"
            variant="basic"
            block
          />
        </div>
        <div>
          <Button
            content="Contact us"
            variant="primary"
            to="/contact-us"
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
