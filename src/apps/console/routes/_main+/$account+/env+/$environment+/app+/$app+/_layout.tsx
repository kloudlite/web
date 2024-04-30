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
import { Truncate } from '~/root/lib/utils/common';
import { breadcrumItems } from '~/components/organisms/headerV2';
import { parseName } from '~/console/server/r-utils/common';
import { IEnvironmentContext } from '../../_layout';

const LocalTabs = () => {
  const { account, environment, app } = useParams();
  return (
    <CommonTabs
      baseurl={`/${account}/env/${environment}/app/${app}`}
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

export const handle = ({ promise: { app, error } }: any) => {
  if (error) {
    return {};
  }

  return {
    navbar: <LocalTabs />,
    breadcrumV2: breadcrumItems(() => {
      const { account, environment } = useParams();

      return [
        {
          type: 'separator',
        },
        {
          type: 'plain',
          content: 'Apps',
          path: `/${account}/env/${environment}/apps`,
        },
        {
          type: 'separator',
        },
        {
          type: 'plain',
          content: (
            <Truncate length={15}>{app.displayName || parseName(app)}</Truncate>
          ),
        },
      ];
    }),
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
    const { app, environment } = ctx.params;
    try {
      const { data, errors } = await GQLServerHandler(ctx.request).getApp({
        envName: environment,
        name: app,
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
