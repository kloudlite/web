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
    <div
      className={cn(
        'py-3xl md:!py-8xl lg:!py-10xl flex md:!flex-1 flex-col gap-2xl md:!pl-2xl pr-2xl md:!border-r md:first:!border-l border-border-disabled basis-1/2 odd:border-r',
        className
      )}
    >
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
      <footer className="bg-surface-basic-default">
        <div className="px-3xl md:!px-5xl lg:!px-8xl xl:!px-11xl 2xl:!px-12xl 3xl:!px-15xl lg:!max-w-[896px] xl:!max-w-[1024px] 2xl:!max-w-[1120px] 3xl:!max-w-[1410px] box-content flex flex-col-reverse flex-wrap lg:!flex-row lg:gap-x-2xl m-auto">
          <div className="flex lg:!hidden h-6xl md:!h-8xl border-y border-border-disabled -mx-5xl px-5xl">
            <div className="w-full border-x border-border-disabled" />
          </div>
          <div className="px-lg lg:!px-5xl 3xl:!pr-13xl py-3xl md:!py-2xl lg:!py-10xl border-x border-border-disabled lg:!border-l lg:!border-r-0">
            {config.footer.brand && config.footer.brand}
          </div>
          <div className="flex lg:!hidden h-xs border-t border-border-disabled -mx-5xl px-5xl">
            <div className="w-full border-x border-border-disabled" />
          </div>
          <div className="flex flex-row flex-wrap justify-between flex-1 border-x border-border-disabled md:!border-0">
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
