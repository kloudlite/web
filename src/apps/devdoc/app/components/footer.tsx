import { Button } from 'kl-design-system/atoms/button';
import Link from 'next/link';
import { ReactNode, isValidElement } from 'react';
import { cn } from '../utils/commons';
import useConfig, { IConfig } from '../utils/use-config';

const FooterLink = ({ to, children }: { to: string; children: ReactNode }) => {
  return (
    <Button
      content={<div>{children}</div>}
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
  showExtra?: boolean;
  items: {
    title: string;
    to: string;
  }[];
}
const FooterMenu = ({ title: _, showExtra, className, items }: IFooterMenu) => {
  const { config } = useConfig();
  const { footer } = config;
  return (
    <div
      className={cn(
        'wb-py-3xl md:wb-py-8xl lg:wb-py-10xl wb-flex md:wb-flex-1 wb-flex-col wb-gap-2xl md:wb-pl-2xl wb-pr-2xl lg:wb-border-r lg:first:wb-border-l wb-border-border-disabled dark:wb-border-border-darktheme-default lg:wb-basis-auto lg:odd:wb-border-r wb-justify-between',
        className
      )}
    >
      {/* <div className="headingMd text-text-default dark:text-text-darktheme-default px-lg py-sm"> */}
      {/*   {title} */}
      {/* </div> */}
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
      {/* @ts-ignore */}
      {showExtra && footer?.extra}
    </div>
  );
};

const Footer = ({ config }: { config: IConfig }) => {
  console.log(config.footer);
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
      <footer className="wb-bg-surface-basic-default dark:wb-bg-surface-darktheme-basic-default wb-overflow-hidden">
        <div className="wb-px-3xl md:wb-px-5xl lg:wb-px-8xl xl:wb-px-11xl 2xl:wb-px-12xl 3xl:wb-px-15xl lg:wb-max-w-[896px] xl:wb-max-w-[1024px] 2xl:wb-max-w-[1120px] 3xl:wb-max-w-[1410px] wb-box-content wb-flex wb-flex-col-reverse wb-flex-wrap lg:wb-flex-row lg:wb-gap-x-2xl wb-m-auto">
          <div className="wb-px-lg lg:wb-px-5xl wb-py-3xl md:wb-py-2xl lg:wb-py-10xl lg:wb-border-x wb-border-border-disabled dark:wb-border-border-darktheme-default lg:wb-border-l lg:wb-border-r-0">
            {config.footer.brand && config.footer.brand}
          </div>
          <div className="wb-flex lg:wb-hidden wb-h-xs lg:wb-border-t wb-border-border-disabled dark:wb-border-border-darktheme-default -wb-mx-5xl wb-px-5xl">
            <div className="wb-w-full lg:wb-border-x wb-border-border-disabled dark:wb-border-border-darktheme-default" />
          </div>
          <div className="wb-flex wb-flex-row wb-flex-wrap wb-justify-between wb-flex-1 lg:wb-border-x wb-border-border-disabled dark:wb-border-border-darktheme-default wb-border-0">
            {config.footer.menu.map((item) => (
              <FooterMenu key={item.title} {...item} />
            ))}
          </div>
        </div>
      </footer>
    );
  return null;
};

export default Footer;
