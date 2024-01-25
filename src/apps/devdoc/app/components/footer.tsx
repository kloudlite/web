import { Button } from 'kl-design-system/atoms/button';
import Link from 'next/link';
import { ReactNode, isValidElement } from 'react';
import { cn } from '../utils/commons';
import { IConfig } from '../utils/use-config';

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
  items: {
    title: string;
    to: string;
  }[];
}
const FooterMenu = ({ title, className, items }: IFooterMenu) => {
  return (
    <div className={cn('flex flex-col gap-2xl', className)}>
      <div className="headingSm text-text-default px-lg py-sm">{title}</div>
      <ul className="list-none">
        {items?.map((item) => (
          <li key={item.to}>
            <FooterLink to={item.to}>{item.title}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = ({ config }: { config: IConfig }) => {
  if (!config || !config.footer) {
    return null;
  }

  if (
    isValidElement(config.footer) ||
    ['string', 'number', 'boolean'].includes(typeof config.footer)
  ) {
    return <>{config.footer}</>;
  }

  if (
    config.footer != null &&
    typeof config.footer === 'object' &&
    'menu' in config.footer
  )
    return (
      <footer className="py-6xl md:py-8xl xl:py-8xl  2xl:py-10xl 3xl:py-10xl bg-surface-basic-default">
        <div className="px-3xl md:!px-5xl lg:!px-8xl xl:!px-11xl 2xl:!px-12xl xl:max-w-[1024px] 2xl:max-w-[1120px] box-content flex flex-row flex-wrap justify-between gap-y-6xl lg:gap-x-2xl  max-w-[1440px] m-auto">
          {config.footer.brand && config.footer.brand}
          {config.footer.menu.map((item) => (
            <FooterMenu key={item.title} {...item} />
          ))}
        </div>
      </footer>
    );
  return null;
};

export default Footer;
