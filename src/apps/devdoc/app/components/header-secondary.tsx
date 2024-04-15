import { PageItem } from 'nextra/normalize-pages';
import Link from 'next/link';
import useConfig, { IHeaderSecondary } from '../utils/use-config';
import { cn } from '../utils/commons';
import MenuToggle from './menu-button';
import useMenu from '../utils/use-menu';
import Wrapper from './wrapper';
import NavigationMenuV2 from './nav-menu-v2';

export const MobileMenu = ({ items = [], extra }: IHeaderSecondary) => {
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
  extra,
  activePath,
}: IHeaderSecondary & {
  activePath?: PageItem[];
}) => {
  const { config } = useConfig();
  const { state, setState } = useMenu();
  console.log('aaa', activePath);
  return (
    <div className="flex flex-row sticky top-0 left-0 right-0 p-2 bg-surface-basic-subdued border-b border-border-default min-h-[68px] z-50">
      <Wrapper className="flex">
        <nav className="flex flex-row items-center gap-6xl w-full">
          {config.logo}
          <ul className="hidden md:!flex flex-1 flex-row items-center justify-end gap-4xl list-none">
            <NavigationMenuV2 activePath={activePath} />
          </ul>

          <div className="hidden md:!flex">{extra}</div>
          <div className="flex-1 flex md:!hidden items-center justify-end">
            <MenuToggle onClick={() => setState(!state)} toggle={state} />
          </div>
        </nav>
      </Wrapper>
    </div>
  );
};

export default HeaderSecondary;
