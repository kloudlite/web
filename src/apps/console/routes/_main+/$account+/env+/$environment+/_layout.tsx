import {
  Link,
  Outlet,
  useLoaderData,
  useOutletContext,
  useParams,
} from '@remix-run/react';
import Breadcrum from '~/console/components/breadcrum';
import { CommonTabs } from '~/console/components/common-navbar-tabs';
import {
  BackingServices,
  CirclesFour,
  Container,
  File,
  GearSix,
} from '~/console/components/icons';
// import HandleScope from '~/console/page-components/handle-environment';
import { IEnvironment } from '~/console/server/gql/queries/environment-queries';
import { ILoginUrls, ILogins } from '~/console/server/gql/queries/git-queries';
import { GQLServerHandler } from '~/console/server/gql/saved-queries';
import { parseName } from '~/console/server/r-utils/common';
import { ensureAccountSet } from '~/console/server/utils/auth-utils';
import { BreadcrumSlash, tabIconSize } from '~/console/utils/commons';
import { SubNavDataProvider } from '~/lib/client/hooks/use-create-subnav-action';
import { IRemixCtx, LoaderResult } from '~/lib/types/common';
import logger from '~/root/lib/client/helpers/log';
import { handleError } from '~/root/lib/utils/common';
import { IAccountContext } from '../../_layout';
import { MultiTenant } from '@jengaicons/react';

const Environment = () => {
  const rootContext = useOutletContext<IAccountContext>();

  const {
    environment,
    managedTemplates,
    loginUrls,
    logins,
    // cluster
  } = useLoaderData();

  return (
    <SubNavDataProvider>
      <Outlet
        context={{
          ...rootContext,
          environment,
          managedTemplates,
          loginUrls,
          logins,
          // cluster,
        }}
      />
    </SubNavDataProvider>
  );
};

const tabs = [
  {
    label: (
      <span className="flex flex-row items-center gap-lg">
        <Container size={tabIconSize} />
        Workloads
      </span>
    ),
    to: '/workloads',
    value: '/workloads',
  },
  {
    label: (
      <span className="flex flex-row items-center gap-lg">
        <MultiTenant size={tabIconSize} />
        Services
      </span>
    ),
    to: '/services',
    value: '/services',
  },
  /* {
    label: (
      <span className="flex flex-row items-center gap-lg">
        <BackingServices size={tabIconSize} />
        Imported Managed Resources
      </span>
    ),
    to: '/managed-resources',
    value: '/managed-resources',
  }, */
  {
    label: (
      <span className="flex flex-row items-center gap-lg">
        <File size={tabIconSize} />
        Configs and Secrets
      </span>
    ),
    to: '/cs/configs',
    value: '/cs',
  },
  {
    label: (
      <span className="flex flex-row items-center gap-lg">
        <GearSix size={tabIconSize} />
        Settings
      </span>
    ),
    to: '/settings/general',
    value: '/settings',
  },
];

const EnvironmentTabs = ({ env }: { env: IEnvironment }) => {
  const { account } = useParams();
  return (
    <CommonTabs
      backButton={{
        to: `/${account}/environments`,
        label: 'Environments',
      }}
      baseurl={`/${account}/env/${parseName(env)}`}
      tabs={tabs.filter((t) => !(t.value === '/services' && !env.clusterName))}
    />
  );
};

const CurrentBreadcrum = ({ environment }: { environment: IEnvironment }) => {
  const params = useParams();

  const { account } = params;

  return (
    <>
      <BreadcrumSlash />
      <span className="mx-md" />
      <Breadcrum.Button
        to={`/${account}/environments`}
        linkComponent={Link}
        content="Environments"
      />
      <BreadcrumSlash />
      <span className="mx-md" />

      <Breadcrum.Button
        content={environment.displayName}
        size="sm"
        variant="plain"
        linkComponent={Link}
        to={`/${account}/env/${parseName(environment)}/apps`}
      />
    </>
  );
};

export const handle = ({ environment }: any) => {
  return {
    navbar: <EnvironmentTabs {...{ env: environment }} />,
    breadcrum: () => <CurrentBreadcrum {...{ environment }} />,
  };
};

export const loader = async (ctx: IRemixCtx) => {
  const { environment } = ctx.params;
  ensureAccountSet(ctx);

  let envData: IEnvironment;

  try {
    const { data, errors } = await GQLServerHandler(ctx.request).getEnvironment(
      {
        name: environment,
      },
    );

    if (errors) {
      throw errors[0];
    }

    const { data: logins, errors: loginErrors } = await GQLServerHandler(
      ctx.request,
    ).getLogins({});

    if (loginErrors) {
      throw loginErrors[0];
    }

    const { data: loginUrls, errors: dErrors } = await GQLServerHandler(
      ctx.request,
    ).loginUrls({});

    if (dErrors) {
      throw dErrors[0];
    }

    envData = data;
    return {
      loginUrls,
      logins,
      environment: envData,
    };
  } catch (err) {
    logger.error(err);
    return handleError(err) as {
      logins: ILogins;
      loginUrls: ILoginUrls;
      environment: IEnvironment;
    };
  }
};

export interface IEnvironmentContext extends IAccountContext {
  logins: LoaderResult<typeof loader>['logins'];
  loginUrls: LoaderResult<typeof loader>['loginUrls'];
  environment: LoaderResult<typeof loader>['environment'];
}

export default Environment;
