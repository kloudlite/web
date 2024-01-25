import { ReactNode } from 'react';
import { PageItem } from 'nextra/normalize-pages';
import Link from 'next/link';
import { HeaderLink } from './frequents';
import useConfig from '../utils/use-config';
import { cn } from '../utils/commons';
import MenuToggle from './menu-button';
import useMenu from '../utils/use-menu';

export const MobileMenu = ({
  items = [],
  extra,
}: {
  items?: { title: string; to: string }[];
  extra?: ReactNode;
}) => {
  return (
    <div className={cn('flex flex-col')}>
      {items.map((item) => (
        <Link
          href={item.to}
          key={item.to}
          className="px-2xl py-lg text-text-soft bodyMd"
        >
          {item.title}
        </Link>
      ))}

      {extra}
    </div>
  );
};
const HeaderSecondary = ({
  items,
  extra,
  activePath,
}: {
  items?: { title: string; to: string }[];
  extra?: ReactNode;
  activePath?: PageItem[];
}) => {
  const { config } = useConfig();
  const { state, setState } = useMenu();
  return (
    <div className="flex flex-row sticky top-0 left-0 right-0 p-2 bg-surface-basic-default border-b border-border-default min-h-[76px] z-50">
      <nav className="px-3xl md:!px-5xl lg:!px-8xl xl:!px-11xl 2xl:!px-12xl xl:max-w-[1024px] 2xl:max-w-[1120px] box-content flex flex-row items-center gap-6xl lg:m-auto w-full">
        {config.logo}
        <ul className="hidden md:!flex flex-1 flex-row items-center justify-center gap-4xl list-none">
          {items?.map((ni) => (
            <li key={ni.to} className="list-none">
              <HeaderLink
                to={ni.to}
                active={!!activePath?.find((ap) => ap.route === ni.to)}
              >
                {ni.title}
              </HeaderLink>
            </li>
          ))}
        </ul>
        <div className="hidden md:!flex">{extra}</div>
        <div className="flex-1 flex md:!hidden items-center justify-end">
          <MenuToggle onClick={() => setState(!state)} toggle={state} />
        </div>
      </nav>
    </div>
  );
};

export default HeaderSecondary;
