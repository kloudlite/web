import { defer } from '@remix-run/node';
import {
  Link,
  Outlet,
  useLoaderData,
  useOutletContext,
  useParams,
} from '@remix-run/react';
import { CommonTabs } from '~/console/components/common-navbar-tabs';
import { GQLServerHandler } from '~/console/server/gql/saved-queries';
import { ensureAccountSet } from '~/console/server/utils/auth-utils';
import logger from '~/lib/client/helpers/log';
import { IRemixCtx } from '~/lib/types/common';

import { LoadingComp, pWrapper } from '~/console/components/loading-component';
import { BreadcrumSlash } from '~/console/utils/commons';
import Breadcrum from '~/console/components/breadcrum';
import { Truncate } from '~/root/lib/utils/common';
import { parseName } from '~/console/server/r-utils/common';
import { IEnvironmentContext } from '~/console/routes/_main+/$account+/env+/$environment+/_layout';
import { IHelmChart } from '~/console/server/gql/queries/helm-chart-queries';

const LocalTabs = () => {
  const { account, environment, helmchart } = useParams();
  return (
    <CommonTabs
      baseurl={`/${account}/env/${environment}/workloads/helm-chart/${helmchart}`}
      backButton={{
        to: `/${account}/env/${environment}/workloads/helm-charts`,
        label: 'Helm charts',
      }}
      tabs={[
        {
          label: 'Settings',
          to: '/settings/general',
          value: '/settings',
        },
      ]}
    />
  );
};

const LocalBreadcrum = ({ data }: { data: IHelmChart }) => {
  const params = useParams();

  const { account, environment } = params;

  const { displayName } = data;
  return (
    <div className="flex flex-row items-center">
      <BreadcrumSlash />
      <span className="mx-md" />
      <Breadcrum.Button
        to={`/${account}/env/${environment}/workloads/helm-charts`}
        linkComponent={Link}
        content="Helm Charts"
      />
      <BreadcrumSlash />
      <Breadcrum.Button
        content={<Truncate length={15}>{displayName || ''}</Truncate>}
        size="sm"
        variant="plain"
        linkComponent={Link}
        to={`/${account}/env/${environment}/workloads/helm-chart/${parseName(
          data,
        )}/logs-n-metrics`}
      />
    </div>
  );
};

export const handle = ({ promise: { helmchart, error } }: { promise: any }) => {
  if (error) {
    return {};
  }
  return {
    navbar: <LocalTabs />,
    breadcrum: () => <LocalBreadcrum data={helmchart} />,
    noLayout: true,
  };
};

export interface IHelmChartContext extends IEnvironmentContext {
  helmchart: IHelmChart;
}

const HelmChartOutlet = ({ helmChart: oHelmchart }: { helmChart: IHelmChart }) => {
  const rootContext = useOutletContext<IEnvironmentContext>();

  return <Outlet context={{ ...rootContext, helmchart: oHelmchart }} />;
};

export const loader = async (ctx: IRemixCtx) => {
  const promise = pWrapper(async () => {
    ensureAccountSet(ctx);
    const { helmchart, environment } = ctx.params;
    try {
      const { data, errors } = await GQLServerHandler(ctx.request).getHelmChart({
        envName: environment,
        name: helmchart
      });
      if (errors) {
        throw errors[0];
      }
      return {
        helmchart: data,
      };
    } catch (err) {
      logger.log(err);

      return {
        helmchart: {} as IHelmChart,
        redirect: '../helm-charts',
      };
    }
  });
  return defer({ promise: await promise });
};

const HelmChart = () => {
  const { promise } = useLoaderData<typeof loader>();
  return (
    <LoadingComp data={promise}>
      {({ helmchart }) => {
        return <HelmChartOutlet helmChart={helmchart} />;
      }}
    </LoadingComp>
  );
};

export default HelmChart;
