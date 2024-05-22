import { PageItem } from 'nextra/normalize-pages';
import Link from 'next/link';
import { GithubLogoFill } from '@jengaicons/react';
import useConfig, { IHeaderSecondary } from '../utils/use-config';
import { cn } from '../utils/commons';
import MenuToggle from './menu-button';
import useMenu from '../utils/use-menu';
import Wrapper from './wrapper';
import NavigationMenuV2 from './nav-menu-v2';
import { gitUrl } from '../utils/config';

const HeaderSecondary = ({
  extra,
  activePath,
}: Omit<IHeaderSecondary, 'items'> & {
  activePath?: PageItem[];
}) => {
  const { config } = useConfig();
  const { state, setState } = useMenu();
  return (
    <div className="lg:wb-relative wb-flex wb-flex-row wb-top-0 wb-left-0 wb-right-0 wb-bg-surface-basic-subdued dark:wb-bg-surface-darktheme-basic-subdued wb-border-b wb-border-border-default dark:wb-border-border-darktheme-default wb-min-h-[var(--kl-navbar-height)] wb-z-50">
      <Wrapper className="wb-flex">
        <nav className="wb-flex wb-flex-row wb-items-center wb-gap-6xl wb-w-full">
          {config.logo}
          <ul className="wb-hidden lg:wb-flex wb-flex-1 wb-flex-row wb-items-center wb-justify-end wb-gap-4xl wb-list-none">
            <NavigationMenuV2 activePath={activePath} />
          </ul>

          <div className="wb-hidden lg:wb-flex">{extra}</div>
          <div className="wb-flex-1 wb-flex wb-flex-row wb-gap-2xl lg:wb-hidden wb-items-center wb-justify-end">
            <a
              href={gitUrl}
              aria-label="kloudlite-github"
              className="wb-text-text-default dark:wb-text-text-darktheme-default"
            >
              <GithubLogoFill size={20} />
            </a>
            <MenuToggle onClick={() => setState(!state)} toggle={state} />
          </div>
        </nav>
      </Wrapper>
    </div>
  );
};

export default HeaderSecondary;

export const MobileMenu = ({ items = [], extra }: IHeaderSecondary) => {
  return (
    <div>
      <HeaderSecondary />
      <div className={cn('wb-flex wb-flex-col wb-pt-3xl')}>
        {items.map((item) => (
          <Link
            href={item.to}
            key={item.to}
            className="wb-px-2xl wb-py-lg wb-text-text-soft dark:wb-text-text-darktheme-soft wb-bodyMd hover:wb-text-text-default dark:hover:wb-text-text-darktheme-default"
          >
            {item.title}
          </Link>
        ))}

        {extra}
      </div>
    </div>
  );
};
