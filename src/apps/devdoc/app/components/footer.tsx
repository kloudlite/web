/** eslint-disable prefer-const */
/** eslint-disable prettier/prettier */
import { Button } from 'kl-design-system/atoms/button';
import Link from 'next/link';
import { ReactNode, isValidElement } from 'react';
import { IConfig } from '../utils/use-config';
import Wrapper from './wrapper';

const FooterLink = ({ to, children }: { to: string; children: ReactNode }) => {
  return (
    <Button
      content={<div className="wb-text-text-strong wb-bodyLg">{children}</div>}
      linkComponent={Link}
      toLabel="href"
      to={to}
      variant="plain"
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

type IFooterItem = {
  brand?: ReactNode;
  extra?: ReactNode;
  menu: IFooterMenu[];
};
const FooterMobile = ({ brand, extra, menu }: IFooterItem) => {
  return (
    <div className="md:wb-hidden wb-border-x wb-border-border-default wb-flex wb-flex-col wb-pb-6xl">
      <div className="wb-flex wb-flex-row">
        <div className="wb-flex wb-flex-col wb-gap-6xl wb-pl-lg wb-basis-1/2 wb-border-r wb-border-border-default">
          <div className="wb-flex wb-flex-col wb-gap-lg wb-pt-6xl">
            {menu[0].items.map((item) => (
              <FooterLink key={item.title} to={item.to}>
                {item.title}
              </FooterLink>
            ))}
          </div>
          <div className="wb-flex wb-flex-col wb-gap-lg wb-pb-3xl">
            {menu[1].items.map((item) => (
              <FooterLink key={item.title} to={item.to}>
                {item.title}
              </FooterLink>
            ))}
          </div>
        </div>
        <div className="wb-flex wb-flex-col wb-gap-lg wb-basis-1/2 wb-pl-lg wb-pt-6xl">
          {menu[2].items.map((item) => (
            <FooterLink key={item.title} to={item.to}>
              {item.title}
            </FooterLink>
          ))}
        </div>
      </div>
      <div className="wb-h-xs bg-border-default wb-w-[calc(100%_+_40px)] wb-relative -wb-left-3xl -wb-right-3xl" />
      <div className="wb-flex wb-flex-col wb-gap-6xl wb-px-lg wb-py-3xl">
        {extra}
        {brand}
      </div>
      <div className="wb-h-xs bg-border-default wb-w-[calc(100%_+_40px)] wb-mt-3xl wb-relative -wb-left-3xl -wb-right-3xl" />
    </div>
  );
};

const FooterMd = ({ brand, extra, menu }: IFooterItem) => {
  return (
    <div className="wb-hidden md:wb-block lg:wb-hidden wb-flex wb-flex-col wb-border-x wb-border-border-default wb-pb-8xl">
      <div className="wb-flex wb-flex-row wb-gap-5xl">
        {menu.map((menu, index) => {
          const i = index;
          return (
            <div
              key={i}
              className="wb-pl-lg wb-flex wb-flex-col wb-gap-lg wb-py-8xl wb-basis-1/4 wb-border-r wb-border-border-default"
            >
              {menu.items.map((item) => (
                <FooterLink key={item.title} to={item.to}>
                  {item.title}
                </FooterLink>
              ))}
            </div>
          );
        })}

        <div className="wb-py-8xl">{extra}</div>
      </div>
      <div className="wb-h-xs bg-border-default wb-w-[calc(100%_+_40px)] wb-relative -wb-left-3xl -wb-right-3xl" />
      <div className="wb-p-2xl">{brand}</div>
      <div className="wb-h-xs bg-border-default wb-w-[calc(100%_+_40px)] wb-relative -wb-left-3xl -wb-right-3xl" />
    </div>
  );
};

const FooterLg = ({ brand, extra, menu }: IFooterItem) => {
  return (
    <div className="wb-hidden lg:wb-flex xl:wb-hidden wb-flex-row wb-gap-5xl wb-border-x wb-border-border-default">
      <div className="wb-py-10xl wb-w-[238px] wb-pl-4xl wb-box-content">
        {brand}
      </div>
      <div className="wb-py-10xl wb-border-l wb-border-border-default wb-pl-lg wb-w-[188px] wb-flex wb-flex-col wb-gap-6xl">
        {menu.slice(0, 2).map((m, index) => {
          const i = index;
          return (
            <div key={i} className="wb-flex wb-flex-col wb-gap-lg">
              {m.items.map((item) => (
                <FooterLink key={item.title} to={item.to}>
                  {item.title}
                </FooterLink>
              ))}
            </div>
          );
        })}
      </div>
      <div className="wb-py-10xl wb-border-l wb-border-border-default wb-pl-lg wb-w-[188px]">
        <div className="wb-flex wb-flex-col wb-gap-lg">
          {menu[2].items.map((item) => (
            <FooterLink key={item.title} to={item.to}>
              {item.title}
            </FooterLink>
          ))}
        </div>
      </div>
      <div className="wb-py-10xl wb-border-l wb-border-border-default wb-pl-5xl">
        {extra}
      </div>
    </div>
  );
};

const FooterXlAndUp = ({ brand, extra, menu }: IFooterItem) => {
  return (
    <div className="wb-hidden xl:wb-flex wb-flex-row wb-gap-5xl wb-border-x wb-border-border-default">
      <div className="wb-py-10xl wb-w-[232px] 2xl:wb-w-[296px] 3xl:wb-w-[480px] wb-pl-4xl 3xl:wb-pl-5xl wb-box-content">
        {brand}
      </div>
      <div className="wb-flex wb-flex-row wb-gap-5xl">
        {menu.map((m, index) => {
          const i = index;
          return (
            <div
              key={i}
              className="wb-flex wb-flex-col wb-gap-lg wb-py-10xl wb-w-[160px] 3xl:wb-w-[192px] wb-pl-lg wb-border-l wb-border-border-default"
            >
              {m.items.map((item) => (
                <FooterLink key={item.title} to={item.to}>
                  {item.title}
                </FooterLink>
              ))}
            </div>
          );
        })}
      </div>
      <div className="wb-py-10xl wb-border-l wb-border-border-default wb-pl-5xl 2xl:wb-w-[168px] 3xl:wb-w-[192px] 2xl:wb-pr-4xl 3xl:wb-pr-5xl wb-flex wb-justify-end">
        {extra}
      </div>
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
      <footer className="wb-bg-surface-basic-default print:wb-hidden">
        <Wrapper>
          <FooterMobile {...config.footer} />
          <FooterMd {...config.footer} />
          <FooterLg {...config.footer} />
          <FooterXlAndUp {...config.footer} />
        </Wrapper>
      </footer>
    );
  return null;
};

export default Footer;
