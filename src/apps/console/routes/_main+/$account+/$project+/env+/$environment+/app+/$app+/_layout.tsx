import { defer } from '@remix-run/node';
import {
  Outlet,
  useLoaderData,
  useOutletContext,
  useParams,
} from '@remix-run/react';
import { CommonTabs } from '~/console/components/common-navbar-tabs';
import { IApp } from '~/console/server/gql/queries/app-queries';
import { GQLServerHandler } from '~/console/server/gql/saved-queries';
import { ensureAccountSet } from '~/console/server/utils/auth-utils';
import logger from '~/lib/client/helpers/log';
import { IRemixCtx } from '~/lib/types/common';

import { LoadingComp, pWrapper } from '~/console/components/loading-component';
import { BreadcrumSlash } from '~/console/utils/commons';
import Breadcrum from '~/console/components/breadcrum';
import { Truncate } from '~/root/lib/utils/common';
import { IEnvironmentContext } from '../../_layout';

const LocalTabs = () => {
  const { account, project, environment, app } = useParams();
  return (
    <CommonTabs
      baseurl={`/${account}/${project}/env/${environment}/app/${app}`}
      backButton={{
        to: `/${account}/${project}/env/${environment}/apps`,
        label: 'Apps',
      }}
      tabs={[
        {
          label: 'Logs & Metrics',
          to: '/logs-n-metrics',
          value: '/logs-n-metrics',
        },
        {
          label: 'Settings',
          to: '/settings/general',
          value: '/settings',
        },
      ]}
    />
  );
};

const LocalBreadcrum = ({ data }: { data: IApp }) => {
  const { displayName } = data;
  return (
    <div className="flex flex-row items-center">
      <BreadcrumSlash />
      <Breadcrum.Button
        content={<Truncate length={15}>{displayName || ''}</Truncate>}
      />
    </div>
  );
};

export const handle = ({ promise: { app, error } }: { promise: any }) => {
  if (error) {
    return {};
  }
  return {
    navbar: <LocalTabs />,
    breadcrum: () => <LocalBreadcrum data={app} />,
  };
};

export interface IAppContext extends IEnvironmentContext {
  app: IApp;
}

const AppOutlet = ({ app: oApp }: { app: IApp }) => {
  const rootContext = useOutletContext<IEnvironmentContext>();

  return <Outlet context={{ ...rootContext, app: oApp }} />;
};

export const loader = async (ctx: IRemixCtx) => {
  const promise = pWrapper(async () => {
    ensureAccountSet(ctx);
    const { app, environment, project } = ctx.params;
    try {
      const { data, errors } = await GQLServerHandler(ctx.request).getApp({
        envName: environment,
        name: app,
        projectName: project,
      });
      if (errors) {
        throw errors[0];
      }
      return {
        app: data,
      };
    } catch (err) {
      logger.log(err);

      return {
        app: {} as IApp,
        redirect: '../apps',
      };
    }
  });
  return defer({ promise: await promise });
};

const App = () => {
  const { promise } = useLoaderData<typeof loader>();
  return (
    <LoadingComp data={promise}>
      {({ app }) => {
        return <AppOutlet app={app} />;
      }}
    </LoadingComp>
  );
};

export default App;
