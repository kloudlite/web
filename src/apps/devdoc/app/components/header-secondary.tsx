import { PageItem } from 'nextra/normalize-pages';
import Link from 'next/link';
import { GithubLogoFill } from '@jengaicons/react';
import { Button } from 'kl-design-system/atoms/button';
import { useState } from 'react';
import useConfig, { IHeaderSecondary } from '../utils/use-config';
import { cn } from '../utils/commons';
import MenuToggle from './menu-button';
import useMenu from '../utils/use-menu';
import Wrapper from './wrapper';
import NavigationMenuV2 from './nav-menu-v2';
import JoinProviders from './join-providers';
import JoinProvidersDialog from './join-provider-dialog';

const HeaderSecondary = ({
  activePath,
}: Omit<IHeaderSecondary, 'items'> & {
  activePath?: PageItem[];
}) => {
  const { config } = useConfig();
  const { state, setState } = useMenu();
  return (
    <div className="lg:wb-relative wb-flex wb-flex-row wb-top-0 wb-left-0 wb-right-0 wb-bg-surface-basic-subdued wb-border-b wb-border-border-default wb-min-h-[var(--kl-navbar-height)] wb-z-50">
      <Wrapper className="wb-flex">
        <nav className="wb-flex wb-flex-row wb-items-center wb-gap-6xl wb-w-full">
          {config.logo}
          <ul className="wb-hidden lg:wb-flex wb-flex-1 wb-flex-row wb-items-center wb-justify-end wb-gap-4xl wb-list-none">
            <NavigationMenuV2 activePath={activePath} />
          </ul>

          <div className="wb-flex-1 lg:wb-flex-none wb-flex wb-flex-row wb-gap-2xl wb-items-center wb-justify-end">
            <div className="wb-flex wb-flex-col lg:wb-flex-row wb-gap-xl lg:wb-items-center">
              <a
                href={config.gitRepoUrl}
                aria-label="kloudlite-github"
                className="wb-hidden lg:wb-block wb-text-icon-default"
              >
                <GithubLogoFill size={24} />
              </a>
              <>
                <span className="wb-hidden lg:wb-block wb-h-2xl wb-w-xs wb-bg-border-default" />
                <div className="wb-hidden lg:wb-block">
                  <JoinProviders />
                </div>
              </>
            </div>
            <span className="wb-flex lg:wb-hidden">
              <MenuToggle onClick={() => setState(!state)} toggle={state} />
            </span>
          </div>
        </nav>
      </Wrapper>
    </div>
  );
};

export default HeaderSecondary;

export const MobileMenu = ({ items = [] }: IHeaderSecondary) => {
  const { config } = useConfig();
  const [show, setShow] = useState(false);
  return (
    <div>
      <HeaderSecondary />
      <div className={cn('wb-flex wb-flex-col wb-pt-3xl')}>
        {items.map((item) => (
          <Link
            href={item.to}
            key={item.to}
            className="wb-px-2xl wb-py-lg wb-text-text-soft wb-bodyMd hover:wb-text-text-default"
          >
            {item.title}
          </Link>
        ))}

        <div className="lg:wb-hidden wb-flex wb-flex-col wb-gap-xl wb-pt-xl wb-px-xl">
          <Button
            prefix={<GithubLogoFill />}
            content="Github"
            variant="basic"
            block
            linkComponent={Link}
            toLabel="href"
            to={config.gitRepoUrl}
          />
          <Button
            content="Signup to join waitlist"
            variant="primary"
            block
            onClick={() => {
              setShow(true);
            }}
          />
        </div>
      </div>
      <JoinProvidersDialog show={show} onOpenChange={setShow} />
    </div>
  );
};
