import { Button } from 'kl-design-system/atoms/button';
import Link from 'next/link';
import { ReactNode, isValidElement } from 'react';
import { cn } from '../utils/commons';
import { IConfig } from '../utils/use-config';

const FooterLink = ({ to, children }: { to: string; children: ReactNode }) => {
  return (
    <Button
      content={<div>{children}</div>}
      linkComponent={Link}
      toLabel="href"
      to={to}
      variant="plain"
      size="lg"
    />
  );
};

interface IFooterMenu {
  className?: string;
  items: {
    title: string;
    to: string;
  }[];
}
const FooterMenu = ({ className, items }: IFooterMenu) => {
  return (
    <div
      className={cn(
        'wb-py-3xl md:wb-py-8xl lg:wb-py-10xl wb-flex md:wb-flex-1 wb-flex-col wb-gap-2xl md:wb-pl-2xl wb-pr-2xl lg:wb-basis-auto wb-justify-between',
        className
      )}
    >
      <ul className="wb-list-none wb-flex wb-flex-col wb-gap-lg">
        {items?.map((item) => (
          <li key={item.to}>
            <FooterLink to={item.to}>
              <span className="wb-bodyLg wb-text-text-strong dark:wb-text-text-darktheme-strong">
                {item.title}
              </span>
            </FooterLink>
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
      <footer className="wb-bg-surface-basic-default dark:wb-bg-surface-darktheme-basic-default wb-overflow-hidden print:wb-hidden">
        <div className="wb-px-3xl md:wb-px-5xl lg:wb-px-8xl xl:wb-px-11xl 2xl:wb-px-12xl 3xl:wb-px-15xl lg:wb-max-w-[896px] xl:wb-max-w-[1024px] 2xl:wb-max-w-[1120px] 3xl:wb-max-w-[1410px] wb-box-content wb-flex wb-flex-col-reverse wb-flex-wrap lg:wb-flex-row lg:wb-gap-x-2xl wb-m-auto">
          <div className="wb-px-lg lg:wb-px-5xl wb-py-3xl md:wb-py-2xl lg:wb-py-10xl">
            {config.footer.brand && config.footer.brand}
          </div>
          <div className="wb-flex lg:wb-hidden wb-h-xs -wb-mx-5xl wb-px-5xl">
            <div className="wb-w-full" />
          </div>
          <div className="wb-flex wb-flex-row wb-flex-wrap wb-justify-between wb-flex-1">
            {config.footer.menu.map((item) => (
              <FooterMenu key={item.title} {...item} />
            ))}
            {config.footer.extra && (
              <div className="wb-basis-1/2 md:wb-basis-auto wb-items-start md:wb-items-end wb-py-3xl md:wb-py-8xl lg:wb-py-10xl wb-flex md:wb-flex-1 wb-flex-col wb-gap-2xl md:wb-pl-2xl wb-pr-2xl lg:wb-basis-auto wb-justify-between">
                {config.footer.extra}
              </div>
            )}
          </div>
        </div>
      </footer>
    );
  return null;
};

export default Footer;
