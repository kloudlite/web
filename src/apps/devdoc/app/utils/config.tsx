import Link from 'next/link';
import { BrandLogo } from 'kl-design-system/branding/brand-logo';
import {
  GithubLogoFill,
  LinkedinLogoFill,
  TwitterNewLogoFill,
} from '@jengaicons/react';
import { Button } from 'kl-design-system/atoms/button';
import { ReactNode } from 'react';
import { cn } from './commons';
import { IConfig } from './use-config';
import devops from '../../images/home/devops.svg';
import infraops from '../../images/home/infraops.svg';
import distribution from '../../images/home/distribution.svg';

const gitUrl = 'https://github.com/kloudlite';
const linkedinUrl = 'https://linkedin.com/company/kloudlite-io';
const xUrl = 'https://x.com/kloudlite';

const ProductMenuItem = ({
  title,
  image,
  description,
  to,
}: {
  title: ReactNode;
  image: string;
  description: ReactNode;
  to: string;
}) => {
  return (
    <li>
      <a
        href={to}
        className="flex flex-row items-center gap-xl px-xl py-lg bg-surface-basic-subdued hover:bg-surface-basic-active w-full"
      >
        <img
          src={image}
          className="rounded border border-border-default bg-surface-basic-default h-[54px] w-[54px] p-md"
        />
        <div className="flex flex-col justify-center gap-sm">
          <div className="bodyMd-semibold text-text-default">{title}</div>
          <p className="bodySm text-text-soft">{description}</p>
        </div>
      </a>
    </li>
  );
};
const BrandMenu = ({ className }: { className?: string }) => {
  const socialIconSize = 24;
  const brandIconSize = 28;

  return (
    <div
      className={cn(
        'flex flex-col gap-3xl pr-4xl lg:w-[296px] order-last md:order-first',
        className
      )}
    >
      <div className="flex flex-col md:!flex-row justify-between lg:!flex-col gap-3xl flex-1">
        <div className="flex flex-col items-start gap-lg max-w-[300px]">
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
            title: 'DevOps',
            to: 'devops',
          },
          {
            title: 'InfraOps',
            to: 'infraops',
          },
          {
            title: 'Distribution',
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
        type: 'dropdown',
        render: () => (
          <ul className="flex flex-col list-none w-full">
            <ProductMenuItem
              title="DevOps"
              description="NoOps in every stage of devlopment"
              image={devops.src}
              to="/devops"
            />
            <ProductMenuItem
              title="InfraOps"
              description="Cloud-native at the core of infrastructure"
              image={infraops.src}
              to="/infraops"
            />
            <ProductMenuItem
              title="Distribution"
              description="Build, deploy and scale at an acceleration"
              image={distribution.src}
              to="/distribution"
            />
          </ul>
        ),
      },
      {
        title: 'Help',
        to: '/help-and-support',
        type: 'link',
      },
    ],
    extra: (
      <div className="flex flex-col md:!flex-row gap-2xl md:items-center mt-6xl md:!mt-0">
        <a href={gitUrl} aria-label="kloudlite-github">
          <GithubLogoFill size={24} />
        </a>
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
