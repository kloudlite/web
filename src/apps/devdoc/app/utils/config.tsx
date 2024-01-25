import Link from 'next/link';
import { BrandLogo } from 'kl-design-system/branding/brand-logo';
import {
  DiscordLogoFill,
  GithubLogoFill,
  LinkedinLogoFill,
  TwitterNewLogoFill,
} from '@jengaicons/react';
import { Button } from 'kl-design-system/atoms/button';
import { cn } from './commons';
import { IConfig } from './use-config';

const BrandMenu = ({ className }: { className?: string }) => {
  const socialIconSize = 24;
  const brandIconSize = 28;

  return (
    <div
      className={cn(
        'flex flex-col gap-3xl pr-4xl w-[296px] md:w-[200px] lg:w-[296px] order-last md:order-first',
        className
      )}
    >
      <div className="flex flex-col gap-3xl flex-1">
        <div className="flex flex-col items-start gap-lg">
          <BrandLogo size={brandIconSize} detailed />
          <span className="bodySm text-text-soft">
            Kloudlite is a NoOps platform engineering system built to increase
            the productivity of developers & platform engineers.
          </span>
        </div>
        <div className="flex flex-row items-center gap-3xl text-text-soft">
          <GithubLogoFill size={socialIconSize} />
          <DiscordLogoFill size={socialIconSize} />
          <TwitterNewLogoFill size={socialIconSize} />
          <LinkedinLogoFill size={socialIconSize} />
        </div>
      </div>
      <div className="bodyMd text-text-soft">
        © 2023 Kloudlite Labs Pvt Ltd.
      </div>
    </div>
  );
};

export default {
  siteTitle: 'Kloudlite',
  logo: (
    <Link href="/">
      <div className="hidden md:block">
        <BrandLogo detailed size={28} />
      </div>
      <div className="md:hidden">
        <BrandLogo detailed={false} size={28} />
      </div>
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
        title: 'Developers',
        className: 'w-[47%] md:w-auto',
        items: [
          {
            title: 'Documents',
            to: 'documents',
          },
          {
            title: 'Tutorials',
            to: 'tutorials',
          },
          {
            title: 'Guides',
            to: 'guides',
          },
          {
            title: 'Changelog',
            to: 'changelog',
          },
          {
            title: 'Release notes',
            to: 'releasenotes',
          },
        ],
      },
      {
        title: 'Resources',
        className: 'w-[47%] md:w-auto',
        items: [
          {
            title: 'Pricing',
            to: 'pricing',
          },
          {
            title: 'Customers',
            to: 'customers',
          },
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
            title: 'About us',
            to: 'about-us',
          },
          {
            title: 'Career',
            to: 'career',
          },
          {
            title: 'Blog',
            to: 'blog',
          },
          {
            title: 'Contact us',
            to: 'contact-us',
          },
        ],
      },
    ],
  },
  scrollToTop: true,
  gitRepoUrl: 'https://github.com/kloudlite/web',
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
      },
      {
        title: 'Docs',
        to: '/docs',
      },
      {
        title: 'Pricing',
        to: '/pricing',
      },
      {
        title: 'Help',
        to: '/help-and-support',
      },
      {
        title: 'Contact us',
        to: '/contact-us',
      },
    ],
    extra: (
      <div className="flex flex-row gap-xl items-center">
        <Button
          content="Login"
          variant="basic"
          to="https://auth.kloudlite.io/login"
          LinkComponent={Link}
          toLabel="href"
        />
        <Button
          content="Signup"
          variant="primary"
          to="https://auth.kloudlite.io/signup"
          LinkComponent={Link}
          toLabel="href"
        />
      </div>
    ),
  },
  urls: {
    auth: 'auth.kloudlite.io',
    console: 'console.kloudlite.io',
  },
} as IConfig;
