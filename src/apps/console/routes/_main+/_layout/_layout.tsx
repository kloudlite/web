import {
  Link,
  Outlet,
  ShouldRevalidateFunction,
  useLoaderData,
  useLocation,
  useParams,
} from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import Container from '~/components/atoms/container';
import OptionList from '~/components/atoms/option-list';
import { BrandLogo } from '~/components/branding/brand-logo';
import Profile from '~/components/molecule/profile';
import { cn, titleCase } from '~/components/utils';
import LogoWrapper from '~/console/components/logo-wrapper';
import { ViewModeProvider } from '~/console/components/view-mode';
import { IAccounts } from '~/console/server/gql/queries/account-queries';
import { setupAccountContext } from '~/console/server/utils/auth-utils';
import { LightTitlebarColor } from '~/design-system/tailwind-base';
import { getCookie } from '~/root/lib/app-setup/cookies';
import withContext from '~/root/lib/app-setup/with-contxt';
import { useExternalRedirect } from '~/root/lib/client/helpers/use-redirect';
import { SubNavDataProvider } from '~/root/lib/client/hooks/use-create-subnav-action';
import useMatches, {
  useHandleFromMatches,
} from '~/root/lib/client/hooks/use-custom-matches';
import { UnsavedChangesProvider } from '~/root/lib/client/hooks/use-unsaved-changes';
import { authBaseUrl } from '~/root/lib/configs/base-url.cjs';
import { UserMe } from '~/root/lib/server/gql/saved-queries';
import { IExtRemixCtx } from '~/root/lib/types/common';
import {
  InfraAsCode,
  Container as ContainerIcon,
  GearSix,
  Project,
  User,
  ChevronUpDown,
  Buildings,
  Search,
  Check,
  Plus,
} from '~/console/components/icons';
import Sidebar from '~/components/organisms/side-bar';
import { useActivePath } from '~/root/lib/client/hooks/use-active-path';
import Header from '~/components/organisms/headerV2';
import { Button } from '~/components/atoms/button';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import useCustomSwr from '~/root/lib/client/hooks/use-custom-swr';
import { useSearch } from '~/root/lib/client/helpers/search-filter';
import { parseName } from '~/console/server/r-utils/common';

const restActions = (ctx: IExtRemixCtx) => {
  return withContext(ctx, {});
};

export const loader = async (ctx: IExtRemixCtx) => {
  return (await setupAccountContext(ctx)) || restActions(ctx);
};

export type IConsoleRootContext = {
  user: UserMe;
  accounts: IAccounts;
};

export const meta = () => {
  return [
    { title: 'Environments' },
    { name: 'theme-color', content: LightTitlebarColor },
  ];
};

const AccountSwitch = () => {
  const api = useConsoleApi();
  const { account } = useParams();

  const { data: accounts } = useCustomSwr(
    () => '/accounts',
    async () => api.listAccounts({})
  );

  const [searchText, setSearchText] = useState('');

  const searchResp = useSearch(
    {
      data:
        accounts?.map((i) => {
          return {
            ...i,
            searchField: i.displayName,
          };
        }) || [],
      searchText,
      keys: ['searchField'],
    },
    [searchText, accounts]
  );

  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  useEffect(() => {
    setSearchText('');
  }, [open]);

  return (
    <div className="flex flex-row items-center flex-shrink-0 flex-1 justify-between">
      <Button
        variant="plain"
        size="sm"
        content={accounts?.find((a) => parseName(a) === account)?.displayName}
        prefix={<Buildings className="flex-shrink-0" />}
        className="!px-lg flex-shrink-0 max-w-[158px] truncate"
      />

      <OptionList.Root open={open} onOpenChange={setOpen} modal={false}>
        <OptionList.Trigger>
          <button
            ref={buttonRef}
            aria-label="accounts"
            className={cn(
              'outline-none rounded py-lg px-md mx-md',
              open || isMouseOver ? 'bg-surface-basic-pressed' : ''
            )}
            onMouseOver={() => {
              setIsMouseOver(true);
            }}
            onMouseOut={() => {
              setIsMouseOver(false);
            }}
            onFocus={() => {
              //
            }}
            onBlur={() => {
              //
            }}
          >
            <div className="flex flex-row items-center gap-md">
              <ChevronUpDown size={16} />
            </div>
          </button>
        </OptionList.Trigger>
        <OptionList.Content className="!pt-0 !pb-md" align="end">
          <div className="p-[3px] pb-0">
            <OptionList.TextInput
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefixIcon={<Search />}
              focusRing={false}
              placeholder="Search teams"
              compact
              className="border-0 rounded-none"
            />
          </div>
          <OptionList.Separator />

          {/* <div className="bodySm-medium text-text-soft py-md px-xl">Teams</div> */}

          {/* <OptionList.Separator /> */}

          {searchResp?.map((item) => {
            return (
              <OptionList.Link
                key={parseName(item)}
                LinkComponent={Link}
                to={`/${parseName(item)}/environments`}
                className={cn(
                  'flex flex-row items-center justify-between',
                  parseName(item) === account
                    ? 'bg-surface-basic-pressed hover:!bg-surface-basic-pressed'
                    : ''
                )}
              >
                <span>{item.displayName}</span>
                {parseName(item) === account && (
                  <span>
                    <Check size={16} />
                  </span>
                )}
              </OptionList.Link>
            );
          })}

          <OptionList.Separator />
          <OptionList.Link
            LinkComponent={Link}
            to="/new-team"
            className="text-text-primary"
          >
            <Plus size={16} /> <span>Create team</span>
          </OptionList.Link>
        </OptionList.Content>
      </OptionList.Root>
    </div>
  );
};

const Logo = () => {
  const { account } = useParams();
  return (
    <LogoWrapper to={`/${account}/environments`}>
      <BrandLogo />
    </LogoWrapper>
  );
};

export const handle = () => {
  return {
    logo: <Logo />,
  };
};

const sideTopMenuItems = ({ account }: { account: string }) => {
  return [
    {
      icon: <Project />,
      children: 'Environments',
      to: `/${account}/environments`,
      keys: ['/env', '/environments'],
    },
    {
      icon: <InfraAsCode />,
      children: 'Infra',
      to: `/${account}/infra/clusters`,
      keys: [`/infra`],
    },
    {
      icon: <ContainerIcon />,
      children: 'Packages',
      to: `/${account}/packages/repos`,
      keys: [`/packages`, '/repo'],
    },
  ];
};

const sideBottomMenuItems = ({ account }: { account: string }) => {
  return [
    {
      icon: <GearSix />,
      children: 'Settings',
      to: `/${account}/settings/general`,
      keys: [`/settings`],
    },
    {
      icon: <User />,
      children: 'Accounts',
      to: `/${account}/profile`,
      keys: [`/profile`],
    },
  ];
};

const isActive = (keys: string[], activePath: string) => {
  return keys.some((k) => activePath.startsWith(k));
};

// OptionList for various actions
const _ProfileMenu = ({ hideProfileName }: { hideProfileName: boolean }) => {
  const { user } = useLoaderData();
  const cookie = getCookie();
  const { pathname } = useLocation();
  const eNavigate = useExternalRedirect();
  const { account } = useParams();

  return (
    <OptionList.Root>
      <OptionList.Trigger>
        <div>
          <div className="hidden md:flex">
            {!hideProfileName ? (
              <Profile name={titleCase(user.name)} size="xs" />
            ) : (
              <Profile size="xs" />
            )}
          </div>
          <div className="flex md:hidden">
            <Profile size="xs" />
          </div>
        </div>
      </OptionList.Trigger>
      <OptionList.Content className="w-[200px]">
        <OptionList.Item>
          <div className="flex flex-col">
            <span className="bodyMd-medium text-text-default">
              {titleCase(user.name)}
            </span>
            <span className="bodySm text-text-soft">{user.email}</span>
          </div>
        </OptionList.Item>
        <OptionList.Link
          LinkComponent={Link}
          to={`/${account}/user-profile/account`}
        >
          Profile Settings
        </OptionList.Link>

        <OptionList.Item>Notifications</OptionList.Item>
        <OptionList.Item>Support</OptionList.Item>
        <OptionList.Separator />
        <OptionList.Item
          onClick={() => {
            cookie.set('url_history', pathname);
            eNavigate(`${authBaseUrl}/logout`);
          }}
        >
          Sign Out
        </OptionList.Item>
      </OptionList.Content>
    </OptionList.Root>
  );
};

const Console = () => {
  const loaderData = useLoaderData<typeof loader>();
  const { account } = useParams();
  const matches = useMatches();

  const { activePath } = useActivePath({ parent: account || '' });

  const navbar = useHandleFromMatches('navbar', null);
  // const logo = useHandleFromMatches('logo', null);

  const noMainLayout = useHandleFromMatches('noMainLayout', null);

  // const devicesMenu = useHandleFromMatches('devicesMenu', null);
  // const noBreadCrum = useHandleFromMatches('noBreadCrum', false);
  // const hideProfileName = useHandleFromMatches('hideProfileName', false);
  //
  // const headerExtra = useHandleFromMatches('headerExtra', null);
  //
  // const breadcrum = useCallback(() => {
  //   return matches.filter((m) => m.handle?.breadcrum);
  // }, [matches])();

  const [hideAccountSwitcher, setHideAccountSwitcher] = useState(false);

  if (noMainLayout) {
    return (
      <Outlet
        context={{
          ...loaderData,
        }}
      />
    );
  }

  // const project1 = useDataFromMatches<IProject>('project', {});
  const breadcrumV2 = matches.reduce((acc, curr) => {
    if (curr.handle?.breadcrumV2) {
      return [...acc, ...(curr.handle?.breadcrumV2?.() || [])];
    }
    return acc;
  }, [] as any);

  // console.log(breadcrumV2, matches);

  return (
    <div className="flex flex-row bg-surface-basic-subdued min-h-full">
      <Sidebar.Root
        linkComponent={Link}
        toLabel="to"
        onCollapseChange={(e) => {
          if (e.type === 'end' && e.value === 'close') {
            setHideAccountSwitcher(true);
          } else {
            setHideAccountSwitcher(false);
          }
        }}
      >
        <Sidebar.Header>
          <span className="flex-shrink-0">
            <BrandLogo size={24} />
          </span>
          {!hideAccountSwitcher && (
            <div className="flex flex-row items-center flex-1">
              <div className="bodyMd text-icon-disabled">/</div>
              <AccountSwitch />
            </div>
          )}
        </Sidebar.Header>
        {sideTopMenuItems({ account: account || '' }).map((sm) => {
          return (
            <Sidebar.Item
              active={isActive(sm.keys, activePath)}
              key={sm.to}
              {...sm}
            />
          );
        })}
        <div className="flex-1" />

        {sideBottomMenuItems({ account: account || '' }).map((sm) => {
          return (
            <Sidebar.Item
              active={isActive(sm.keys, activePath)}
              key={sm.to}
              {...sm}
            />
          );
        })}
      </Sidebar.Root>
      <ViewModeProvider>
        <SubNavDataProvider>
          <UnsavedChangesProvider>
            <div className="flex flex-col w-full">
              {/* {b} */}
              <Header items={breadcrumV2} />
              <Container className={cn('pb-5xl', navbar ? 'pt-4xl' : 'pt-6xl')}>
                {navbar && (
                  <div className="mb-5xl border-b border-border-default">
                    {navbar}
                  </div>
                )}
                <Outlet
                  context={{
                    ...loaderData,
                  }}
                />
              </Container>
            </div>
          </UnsavedChangesProvider>
        </SubNavDataProvider>
      </ViewModeProvider>
    </div>
  );
};

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}) => {
  if (!defaultShouldRevalidate) {
    return false;
  }
  if (currentUrl.search !== nextUrl.search) {
    return false;
  }
  return true;
};

export default Console;
