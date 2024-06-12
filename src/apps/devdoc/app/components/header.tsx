import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PageItem } from 'nextra/normalize-pages';
import { HeaderLink } from './frequents';
import { Flexsearch } from './flexsearch';
import MenuButton from './menu-button';
import SearchBox from './search';
import useMenu from '../utils/use-menu';
import useSearch from '../utils/use-search';
import useConfig, { IConfig } from '../utils/use-config';
import Wrapper from './wrapper';

const Header = ({
  navitems,
  activePath,
}: {
  navitems: IConfig['headerPrimary'];
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
    <div className="wb-sticky wb-top-0 md:wb-relative wb-flex wb-flex-row wb-top-0 wb-left-0 wb-right-0 wb-bg-surface-basic-subdued wb-border-b wb-border-border-default wb-min-h-[var(--kl-navbar-height)] wb-z-50">
      <Wrapper className="wb-flex">
        <nav className="wb-flex wb-flex-row wb-items-center wb-gap-6xl wb-w-full">
          {config.logo}
          <ul className="wb-hidden lg:wb-flex wb-flex-1 wb-flex-row wb-items-center wb-justify-end wb-gap-4xl wb-list-none">
            {navitems?.items.map((ni) => (
              <li key={ni.title} className="list-none">
                <HeaderLink
                  to={ni.to}
                  active={!!activePath.find((ap) => ap.route === ni.to)}
                >
                  {ni.title}
                </HeaderLink>
              </li>
            ))}
          </ul>
          <SearchBox className="wb-hidden lg:wb-flex" />
          <div className="wb-flex-1 wb-flex lg:wb-hidden wb-items-center wb-justify-end">
            <MenuButton onClick={() => setState(!state)} toggle={state} />
          </div>
        </nav>
        <Flexsearch />
      </Wrapper>
    </div>
  );
};

export default Header;
