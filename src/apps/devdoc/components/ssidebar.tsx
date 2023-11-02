/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import { useRouter } from 'next/router';
import type { Heading } from 'nextra';
import { useFSRoute, useMounted } from 'nextra/hooks';
import { LayoutGroup, motion } from 'framer-motion';

import type { Item, MenuItem, PageItem } from 'nextra/normalize-pages';
import type { ReactElement } from 'react';
import {
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import { ChevronRight } from '@jengaicons/react';
import { cn } from '~/utiltities/commons';
import useMenu from '~/utiltities/use-menu';
import { Collapse } from './collapse';
import { Anchor } from './anchor';
import Search from './search';

const TreeState: Record<string, boolean> = Object.create(null);

const FocusedItemContext = createContext<null | string>(null);
const OnFocusItemContext = createContext<null | ((item: string | null) => any)>(
  null
);
const FolderLevelContext = createContext(0);

type FolderProps = {
  item: PageItem | MenuItem | Item;
  anchors: Heading[];
};

const classes = {
  link: cn(
    'flex flex-row items-center rounded py-lg px-2xl transition-all [word-break:break-word]',
    'cursor-pointer [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] contrast-more:border'
  ),
  inactive: cn('bodyMd text-text-soft'),
  active: cn('bodyMd-medium text-text-primary bg-surface-basic-active'),
  list: cn('flex flex-col w-full gap-lg'),
};

function FolderImpl({ item, anchors }: FolderProps): ReactElement {
  const routeOriginal = useFSRoute();
  const [route] = routeOriginal.split('#');
  const active = [route, `${route}/`].includes(`${item.route}/`);
  const activeRouteInside = active || route.startsWith(`${item.route}/`);

  const focusedRoute = useContext(FocusedItemContext);
  const focusedRouteInside = !!focusedRoute?.startsWith(`${item.route}/`);
  const level = useContext(FolderLevelContext);

  const { setState: setMenu } = useMenu();
  const { theme } = item as Item;
  const open =
    TreeState[item.route] === undefined
      ? active ||
        activeRouteInside ||
        focusedRouteInside ||
        (theme && 'collapsed' in theme ? !theme.collapsed : level < 1)
      : TreeState[item.route] || focusedRouteInside;

  const rerender = useState({})[1];
  const sideBarAutoCollapse = false;
  useEffect(() => {
    const updateTreeState = () => {
      if (activeRouteInside || focusedRouteInside) {
        TreeState[item.route] = true;
      }
    };
    const updateAndPruneTreeState = () => {
      if (activeRouteInside && focusedRouteInside) {
        TreeState[item.route] = true;
      } else {
        delete TreeState[item.route];
      }
    };

    sideBarAutoCollapse ? updateAndPruneTreeState() : updateTreeState();
  }, [activeRouteInside, focusedRouteInside, item.route, sideBarAutoCollapse]);

  if (item.type === 'menu') {
    const menu = item as MenuItem;
    const routes = Object.fromEntries(
      (menu.children || []).map((route) => [route.name, route])
    );
    item.children = Object.entries(menu.items || {}).map(([key, item]) => {
      const route = routes[key] || {
        name: key,
        ...('locale' in menu && { locale: menu.locale }),
        route: `${menu.route}/${key}`,
      };
      return {
        ...route,
        ...item,
      };
    });
  }

  const isLink = 'withIndexPage' in item && item.withIndexPage;
  // use button when link don't have href because it impacts on SEO
  const ComponentToUse = isLink ? Anchor : 'button';

  return (
    <li className={cn({ open, active })}>
      <ComponentToUse
        href={isLink ? item.route : undefined}
        className={cn(
          'flex-1 flex flex-row items-center justify-between',
          !isLink ? 'text-left w-full' : '',
          classes.link,
          active ? classes.active : classes.inactive
        )}
        onClick={(e) => {
          const clickedToggleIcon = ['svg', 'path'].includes(
            (e.target as HTMLElement).tagName.toLowerCase()
          );
          if (clickedToggleIcon) {
            e.preventDefault();
          }
          if (isLink) {
            // If it's focused, we toggle it. Otherwise, always open it.
            if (active || clickedToggleIcon) {
              TreeState[item.route] = !open;
            } else {
              TreeState[item.route] = true;
              setMenu(false);
            }
            rerender({});
            return;
          }
          if (active) return;
          TreeState[item.route] = !open;
          rerender({});
        }}
      >
        {item.title}
        <ChevronRight
          size={16}
          className={cn('transition-all', open ? 'rotate-90' : 'rotate-0')}
        />
      </ComponentToUse>
      <Collapse className="pl-4xl pt-lg flex flex-row" isOpen={open}>
        <div className="border-l border-border-default" />
        <LayoutGroup>
          {Array.isArray(item.children) ? (
            <Menu
              className={cn('pl-md')}
              directories={item.children}
              base={item.route}
              anchors={anchors}
            />
          ) : null}
        </LayoutGroup>
      </Collapse>
    </li>
  );
}

const Folder = memo(function FolderInner(props: FolderProps) {
  const level = useContext(FolderLevelContext);
  return (
    <FolderLevelContext.Provider value={level + 1}>
      <FolderImpl {...props} />
    </FolderLevelContext.Provider>
  );
});

function Separator({ title }: { title: string }): ReactElement {
  return (
    <li
      className={cn(
        '[word-break:break-word]',
        title ? 'bodyMd-medium py-lg px-2xl my-md' : ''
      )}
    >
      {title || <hr className="mx-2 border-t border-border-default" />}
    </li>
  );
}

function File({
  base,
  item,
}: {
  base: string | undefined;
  item: PageItem | Item;
}): ReactElement {
  const route = useFSRoute();
  const onFocus = useContext(OnFocusItemContext);

  // It is possible that the item doesn't have any route - for example an external link.
  const active = item.route && [route, `${route}/`].includes(`${item.route}/`);
  const { setState: setMenu } = useMenu();

  if (item.type === 'separator') {
    return <Separator title={item.title} />;
  }

  return (
    <li
      className={cn('flex flex-row relative w-full', {
        active: !!active,
      })}
    >
      {!!base && active && (
        <motion.div
          layoutId={`line-${base}`}
          className="border-l-2 border-border-primary rounded h-full absolute -left-[5px]"
        />
      )}
      <Anchor
        href={(item as PageItem).href || item.route}
        newWindow={(item as PageItem).newWindow}
        className={cn(
          classes.link,
          active ? classes.active : classes.inactive,
          'w-full'
        )}
        onClick={() => {
          setMenu(false);
        }}
        onFocus={() => {
          onFocus?.(item.route);
        }}
        onBlur={() => {
          onFocus?.(null);
        }}
      >
        {item.title}
      </Anchor>
      {/* {active && anchors.length > 0 && (
        <ul className={cn(classes.list, 'ltr:ml-3 rtl:mr-3')}>
          {anchors.map(({ id, value }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  classes.link,
                  'flex gap-lg before:opacity-25 before:content-["#"]',
                  activeAnchor[id]?.isActive ? classes.active : classes.inactive
                )}
                onClick={() => {
                  setMenu(false);
                }}
              >
                {value}
              </a>
            </li>
          ))}
        </ul>
      )} */}
    </li>
  );
}

interface MenuProps {
  directories: PageItem[] | Item[];
  anchors: Heading[];
  base?: string;
  className?: string;
  onlyCurrentDocs?: boolean;
}

interface SideBarProps {
  docsDirectories: PageItem[];
  fullDirectories: Item[];
  asPopover?: boolean;
  headings: Heading[];
  includePlaceholder: boolean;
}

export function Sidebar({
  docsDirectories,
  fullDirectories,
  asPopover = false,
  headings,
  includePlaceholder,
}: SideBarProps): ReactElement {
  const { state: menu, setState: setMenu } = useMenu();
  const router = useRouter();
  const [focused, setFocused] = useState<null | string>(null);
  const [showSidebar, _setSidebar] = useState(true);

  const anchors = useMemo(
    () => headings.filter((v) => v.depth === 2),
    [headings]
  );
  const sidebarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  useEffect(() => {
    if (menu) {
      document.body.classList.add('overflow-hidden', 'md:overflow-auto');
    } else {
      document.body.classList.remove('overflow-hidden', 'md:overflow-auto');
    }
  }, [menu]);

  useEffect(() => {
    const activeElement = sidebarRef.current?.querySelector('li.active');

    if (activeElement && (window.innerWidth > 767 || menu)) {
      const scroll = () => {
        scrollIntoView(activeElement, {
          block: 'center',
          inline: 'center',
          scrollMode: 'always',
          boundary: containerRef.current,
        });
      };
      if (menu) {
        // needs for mobile since menu has transition transform
        setTimeout(scroll, 300);
      } else {
        scroll();
      }
    }
  }, [menu]);

  // Always close mobile nav when route was changed (e.g. logo click)
  useEffect(() => {
    setMenu(false);
  }, [router.asPath, setMenu]);

  return (
    <>
      {includePlaceholder && asPopover ? (
        <div className="max-xl:hidden h-0 shrink-0" />
      ) : null}
      <div
        className={cn(
          'motion-reduce:transition-none [transition:background-color_1.5s_ease]',
          menu ? 'fixed inset-0 z-10 bg-black/80' : 'bg-transparent'
        )}
        onClick={() => setMenu(false)}
      />
      <aside
        className={cn(
          'bg-surface-basic-subdued z-40 flex nextra-sidebar-container flex-col pt-6xl',
          'md:top-[calc(var(--kl-navbar-height))] md:shrink-0 motion-reduce:transform-none',
          'transform-gpu transition-all ease-in-out',
          'print:hidden',
          showSidebar ? 'md:w-[284px]' : '',
          asPopover ? 'md:hidden' : 'md:sticky md:self-start',
          menu
            ? 'max-md:[transform:translate3d(0,0,0)]'
            : 'max-md:[transform:translate3d(0,-100%,0)]'
        )}
        ref={containerRef}
      >
        <div className="md:hidden pb-3xl px-2xl">
          <Search />
        </div>
        <FocusedItemContext.Provider value={focused}>
          <OnFocusItemContext.Provider
            value={(item) => {
              setFocused(item);
            }}
          >
            <div
              className={cn(
                'overflow-y-auto overflow-x-hidden',
                'p-4 grow md:h-[calc(100vh-76px-var(--kl-navbar-height))]',
                showSidebar ? 'nextra-scrollbar' : 'no-scrollbar'
              )}
              ref={sidebarRef}
            >
              {/* without asPopover check <Collapse />'s inner.clientWidth on `layout: "raw"` will be 0 and element will not have width on initial loading */}
              {(!asPopover || !showSidebar) && (
                <Collapse isOpen={showSidebar} horizontal>
                  <Menu
                    className="nextra-menu-desktop max-md:hidden"
                    // The sidebar menu, shows only the docs directories.
                    directories={docsDirectories}
                    // When the viewport size is larger than `md`, hide the anchors in
                    // the sidebar when `floatTOC` is enabled.
                    anchors={anchors}
                    onlyCurrentDocs
                  />
                </Collapse>
              )}
              {mounted && window.innerWidth < 768 && (
                <Menu
                  className="nextra-menu-mobile md:hidden"
                  // The mobile dropdown menu, shows all the directories.
                  directories={fullDirectories}
                  // Always show the anchor links on mobile (`md`).
                  anchors={anchors}
                />
              )}
            </div>
          </OnFocusItemContext.Provider>
        </FocusedItemContext.Provider>
      </aside>
    </>
  );
}

function Menu({
  base,
  directories,
  anchors,
  className,
  onlyCurrentDocs,
}: MenuProps): ReactElement {
  return (
    <ul className={cn(classes.list, className)}>
      {directories.map((item) =>
        !onlyCurrentDocs || item.isUnderCurrentDocsTree ? (
          item.type === 'menu' ||
          (item.children && (item.children.length || !item.withIndexPage)) ? (
            <Folder key={item.name} item={item} anchors={anchors} />
          ) : (
            <File key={item.name} item={item} base={base} />
          )
        ) : null
      )}
    </ul>
  );
}
