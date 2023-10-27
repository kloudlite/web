import {
    DiscordLogoFill,
    GithubLogoFill,
    LinkedinLogoFill,
    TwitterLogoFill,
} from '@jengaicons/react';
import { Button } from 'kl-design-system/atoms/button';
import { BrandLogo } from 'kl-design-system/branding/brand-logo';
import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '../utils/commons';

const FooterLink = ({ to, children }: { to: string; children: ReactNode }) => {
  return (
    <Button
      content={children}
      LinkComponent={Link}
      toLabel="href"
      to={to}
      variant="plain"
      size="lg"
    />
  );
};

interface IFooterMenu {
  title: string;
  className?: string;
  menu: {
    title: string;
    to: string;
  }[];
}
const FooterMenu = ({ title, className, menu }: IFooterMenu) => {
  return (
    <div className={cn('flex flex-col gap-2xl', className)}>
      <div className="headingSm text-text-default px-lg py-sm">{title}</div>
      <ul className="list-none">
        {menu.map((item) => (
          <li key={item.to}>
            <FooterLink to={item.to}>{item.title}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

const menu: IFooterMenu[] = [
  {
    title: 'Products',
    className: 'flex-1',
    menu: [
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
    title: 'Developers',
    className: 'w-[200px]',
    menu: [
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
    className: 'w-[200px]',
    menu: [
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
    className: 'w-[200px]',
    menu: [
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
];

const BrandMenu = () => {
  const socialIconSize = 24;
  const brandIconSize = 28;

  return (
    <div className="flex flex-col gap-3xl pr-4xl w-[296px]">
      <div className="flex flex-col gap-3xl flex-1">
        <div className="flex flex-col items-start gap-lg">
          <BrandLogo size={brandIconSize} detailed />
          <span className="bodySm text-text-soft">
            Lorem ipsum dolor sit amet. Et sunt itaque et repudiandae blanditiis
            ut
          </span>
        </div>
        <div className="flex flex-row items-center gap-3xl text-text-soft">
          <GithubLogoFill size={socialIconSize} />
          <DiscordLogoFill size={socialIconSize} />
          <TwitterLogoFill size={socialIconSize} />
          <LinkedinLogoFill size={socialIconSize} />
        </div>
      </div>
      <div className="bodyMd text-text-soft">
        © 2023 Kloudlite Labs Pvt Ltd.
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="flex flex-row justify-between py-10xl px-14xl bg-surface-basic-default">
      <BrandMenu />
      {menu.map((item) => (
        <FooterMenu key={item.title} {...item} />
      ))}
    </div>
  );
};

export default Footer;
