import { defer } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { LoadingComp, pWrapper } from '~/console/components/loading-component';
import { GQLServerHandler } from '~/console/server/gql/saved-queries';
import { getScopeAndProjectQuery } from '~/console/server/r-utils/common';
import {
  ensureAccountSet,
  ensureClusterSet,
} from '~/console/server/utils/auth-utils';
import { getPagination, getSearch } from '~/console/server/utils/common';
import { IRemixCtx } from '~/root/lib/types/common';

export const loader = async (ctx: IRemixCtx) => {
  ensureAccountSet(ctx);
  ensureClusterSet(ctx);

  const promise = pWrapper(async () => {
    const { data, errors } = await GQLServerHandler(ctx.request).listApps({
      ...getScopeAndProjectQuery(ctx),
      pagination: getPagination(ctx),
      search: getSearch(ctx),
    });
    if (errors) {
      throw errors[0];
    }
    return { appsData: data };
  });

  return defer({ promise });
};

const Overview = () => {
  const { promise } = useLoaderData<typeof loader>();

  return (
    <LoadingComp data={promise}>
      {({ appsData }) => {
        return (
          <div className="headingXl text-text-warning text-center">
            Overview page under construction
          </div>
        );
      }}
    </LoadingComp>
  );
};

export default Overview;
