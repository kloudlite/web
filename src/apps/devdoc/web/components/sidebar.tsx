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
import { ChevronRight, GithubLogoFill } from '@jengaicons/react';
import { Collapse } from './collapse';
import { Anchor } from './anchor';
import useMenu from '../utils/use-menu';
import { cn } from '../utils/commons';
import useConfig from '../utils/use-config';
import HeaderSecondary, { MobileMenu } from './header-secondary';
import JoinProvidersDialog from './join-provider-dialog';
import Link from 'next/link';
import Button from './button';

const TreeState: Record<string, boolean> = Object.create(null);

const FocusedItemContext = createContext<null | string>(null);
const OnFocusItemContext = createContext<null | ((item: string | null) => any)>(
  null,
);
const FolderLevelContext = createContext(0);

type FolderProps = {
  item: PageItem | MenuItem | Item;
  anchors: Heading[];
};

const classes = {
  link: cn(
    'wb-flex wb-flex-row wb-items-center wb-rounded wb-py-md wb-px-2xl wb-transition-all [word-break:break-word]',
    'wb-cursor-pointer [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] contrast-more:wb-border hover:wb-bg-surface-basic-hovered',
  ),
  inactive: cn('wb-bodyMd wb-text-text-soft hover:wb-text-text-default'),
  active: cn(
    'wb-bodyMd-medium wb-text-text-primary wb-bg-surface-basic-active',
  ),
  list: cn('wb-flex wb-flex-col wb-w-full wb-gap-md'),
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
      (menu.children || []).map((route) => [route.name, route]),
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

  //make every page isLink
  const isLink = ('withIndexPage' in item && item.withIndexPage) || true;
  // use button when link don't have href because it impacts on SEO
  const ComponentToUse = isLink ? Anchor : 'button';

  return (
    <li className={cn({ open, active })}>
      <ComponentToUse
        href={isLink ? item.route : undefined}
        className={cn(
          'wb-flex-1 wb-flex wb-flex-row wb-items-center wb-justify-between',
          !isLink ? 'wb-text-left wb-w-full' : '',
          classes.link,
          active ? classes.active : classes.inactive,
        )}
        onClick={(e) => {
          const clickedToggleIcon = ['svg', 'path'].includes(
            (e.target as HTMLElement).tagName.toLowerCase(),
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
          className={cn(
            'wb-transition-all',
            open ? 'wb-rotate-90' : 'wb-rotate-0',
          )}
        />
      </ComponentToUse>
      <Collapse
        className="wb-pl-4xl wb-pt-lg wb-flex wb-flex-row"
        isOpen={open}
      >
        <div className="wb-border-l wb-border-border-default" />
        <LayoutGroup>
          {Array.isArray(item.children) ? (
            <Menu
              className={cn('wb-pl-md')}
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
        title ? 'wb-headingSm wb-text-text-default wb-py-md wb-px-2xl' : '',
        '[&:not(:first-child)]:wb-mt-5xl',
      )}
    >
      {title || <hr className="wb-mx-2 wb-border-t wb-border-border-default" />}
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

  const { setActiveDocTopic } = useConfig();
  useEffect(() => {
    if (active) {
      setActiveDocTopic(item.title);
    }
  }, [active]);

  if (item.type === 'separator') {
    return <Separator title={item.title} />;
  }

  return (
    <li
      className={cn('wb-flex wb-flex-row wb-relative wb-w-full', {
        active: !!active,
      })}
    >
      {!!base && active && (
        <motion.div
          layoutId={`line-${base}`}
          className="wb-border-l-2 wb-border-icon-primary wb-rounded wb-h-full wb-absolute -wb-left-[5px]"
        />
      )}
      <Anchor
        href={(item as PageItem).href || item.route}
        newWindow={(item as PageItem).newWindow}
        className={cn(
          classes.link,
          active ? classes.active : classes.inactive,
          'wb-w-full',
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
  rawLayout?: boolean;
}

export function Sidebar({
  docsDirectories,
  fullDirectories,
  asPopover = false,
  headings,
  rawLayout,
  includePlaceholder,
}: SideBarProps): ReactElement {
  const { state: menu, setState: setMenu } = useMenu();
  const router = useRouter();
  const [focused, setFocused] = useState<null | string>(null);
  const [showSidebar, _setSidebar] = useState(true);

  const anchors = useMemo(
    () => headings.filter((v) => v.depth === 2),
    [headings],
  );
  const sidebarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  useEffect(() => {
    if (menu) {
      document.body.classList.add('wb-overflow-hidden', 'lg:wb-overflow-auto');
    } else {
      document.body.classList.remove(
        'wb-overflow-hidden',
        'lg:wb-overflow-auto',
      );
    }
  }, [menu]);

  useEffect(() => {
    const activeElement = sidebarRef.current?.querySelector('li.active');

    if (activeElement && (window.innerWidth > 1023 || menu)) {
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
  }, [router.asPath]);

  const { config } = useConfig();
  return (
    <>
      {includePlaceholder && asPopover ? (
        <div className="max-xl:wb-hidden wb-h-0 w-shrink-0" />
      ) : null}
      <div
        className={cn(
          'motion-reduce:wb-transition-none [transition:background-color_1.5s_ease]',
          menu
            ? 'wb-fixed wb-inset-0 wb-z-10 wb-bg-black/80'
            : 'wb-bg-transparent',
        )}
        onClick={() => setMenu(false)}
      />
      <aside
        className={cn(
          'kl-sidebar wb-bg-surface-basic-subdued wb-z-40 kl-sidebar-container wb-flex-col wb-pb-6xl lg:wb-pt-0',
          'lg:wb-top-0 lg:wb-shrink-0 motion-reduce:wb-transform-none',
          // 'wb-transform-gpu wb-transition-all wb-ease-in-out wb-duration-[3s]',
          'print:wb-hidden',
          showSidebar ? 'lg:wb-w-[244px]' : '',
          asPopover ? 'lg:wb-hidden' : 'wb-flex lg:wb-sticky lg:wb-self-start',
          menu
            ? 'max-lg:[transform:translate3d(0,0,0)]'
            : 'max-lg:[transform:translate3d(0,-150%,0)]',
        )}
        ref={containerRef}
      >
        {/** uncomment this later * */}
        {/**
<div className="md:hidden pb-3xl px-2xl">
          <Search />
        </div>
       * */}
        <FocusedItemContext.Provider value={focused}>
          <OnFocusItemContext.Provider
            value={(item) => {
              setFocused(item);
            }}
          >
            <div
              className={cn(
                'wb-overflow-y-auto md:wb-overflow-y-hidden wb-overflow-x-hidden hover:wb-overflow-y-auto scrollbar-gutter lg:wb-pr-3xl',
                'wb-grow wb-h-screen lg:wb-h-[calc(100vh-var(--kl-navbar-height))]',
                {
                  'no-scrollbar': !showSidebar,
                },
                {
                  'lg:wb-pt-2xl': !!rawLayout,
                  'lg:wb-pt-6xl': !rawLayout,
                },
              )}
              ref={sidebarRef}
            >
              {/* without asPopover check <Collapse />'s inner.clientWidth on `layout: "raw"` will be 0 and element will not have width on initial loading */}
              {(!asPopover || !showSidebar) && (
                <Collapse isOpen={showSidebar} horizontal>
                  <Menu
                    className="nextra-menu-desktop max-lg:wb-hidden"
                    // The sidebar menu, shows only the docs directories.
                    directories={docsDirectories}
                    // When the viewport size is larger than `md`, hide the anchors in
                    // the sidebar when `floatTOC` is enabled.
                    anchors={anchors}
                    onlyCurrentDocs
                  />
                </Collapse>
              )}
              {mounted &&
                window.innerWidth < 1024 &&
                (rawLayout ? (
                  // @ts-ignore
                  <MobileMenu {...config.headerSecondary} />
                ) : (
                  <div>
                    <div className="lg:wb-hidden wb-sticky wb-top-0 wb-z-50">
                      <HeaderSecondary />
                    </div>

                    <div className="wb-px-xl wb-pt-xl">
                      <Menu
                        className="nextra-menu-mobile lg:wb-hidden"
                        // The mobile dropdown menu, shows all the directories.
                        directories={fullDirectories}
                        // Always show the anchor links on mobile (`md`).
                        anchors={anchors}
                      />

                      <div className={cn('wb-flex wb-flex-col')}>
                        {config.headerSecondary?.items
                          .filter(
                            (f) =>
                              !fullDirectories.find((ff) => ff.route === f.to),
                          )
                          ?.map((item) => (
                            <Link
                              href={item.to}
                              key={item.to}
                              className="wb-px-2xl wb-py-lg wb-text-text-soft wb-bodyMd hover:wb-text-text-default"
                            >
                              {item.title}
                            </Link>
                          ))}
                        <div className="lg:wb-hidden wb-flex wb-flex-col wb-gap-xl wb-pt-2xl">
                          <Button
                            prefix={<GithubLogoFill />}
                            content="Github"
                            variant="basic"
                            block
                            linkComponent={Link}
                            toLabel="href"
                            to={config.gitRepoUrl}
                          />
                          <JoinProvidersDialog
                            isInHeader
                            hasSignIn
                            hasSignUp={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
      {directories
        // @ts-ignore
        .filter((d) => d?.showinmenu !== false)
        .map((item) =>
          !onlyCurrentDocs || item.isUnderCurrentDocsTree ? (
            item.type === 'menu' ||
            (item.children && (item.children.length || !item.withIndexPage)) ? (
              <Folder key={item.name} item={item} anchors={anchors} />
            ) : //@ts-ignore
            item.frontMatter && item.frontMatter.draft === true ? null : (
              <File key={item.name} item={item} base={base} />
            )
          ) : null,
        )}
    </ul>
  );
}
