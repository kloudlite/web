import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PageItem } from 'nextra/normalize-pages';
import useMenu from '~/utiltities/use-menu';
import useSearch from '~/utiltities/use-search';
import useConfig from '~/utiltities/use-config';
import { HeaderLink } from './frequents';
import { Flexsearch } from './flexsearch';
import MenuButton from './menu-button';
import SearchBox from './search';

const Header = ({
  navitems,
  activePath,
}: {
  navitems: PageItem[];
  activePath: PageItem[];
}) => {
  const { config } = useConfig();
  const { state, setState } = useMenu();
  const { setShow: setShowSearch } = useSearch();
  const route = useRouter();

  useEffect(() => {
    setShowSearch(false);
  }, [route]);

  useEffect(() => {
    const commandK = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        setShowSearch(true);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
      }
    };

    document.addEventListener('keydown', commandK);

    return () => {
      document.removeEventListener('keydown', commandK);
    };
  }, []);

  return (
    <div className="flex flex-row sticky top-0 left-0 right-0 p-2 bg-surface-basic-default border-b border-border-default min-h-[76px] z-50">
      <nav className="w-full md:max-w-[1440px] flex-1 m-auto px-4xl flex flex-row items-center gap-6xl">
        {config.logo}
        <ul className="hidden md:flex flex-1 flex-row items-center justify-end gap-4xl list-none">
          {navitems?.map((ni) => (
            <li key={ni.name} className="list-none">
              <HeaderLink
                to={ni.route}
                active={!!activePath.find((ap) => ap.route === ni.route)}
              >
                {ni.title}
              </HeaderLink>
            </li>
          ))}
        </ul>
        <SearchBox className="hidden md:flex" />
        <div className="flex-1 flex md:!hidden items-center justify-end">
          <MenuButton onClick={() => setState(!state)} toggle={state} />
        </div>
      </nav>
      <Flexsearch />
    </div>
  );
};

export default Header;
