import { defer } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { LoadingComp, pWrapper } from '~/console/components/loading-component';
import Wrapper from '~/console/components/wrapper';
import { GQLServerHandler } from '~/console/server/gql/saved-queries';
import {
  ensureAccountSet,
  ensureClusterSet,
} from '~/console/server/utils/auth-utils';
import { IRemixCtx } from '~/root/lib/types/common';
import fake from '~/root/fake-data-generator/fake';
import { getPagination, getSearch } from '~/console/server/utils/common';
import { EmptyStorageImage } from '~/console/components/empty-resource-images';
import Tools from './tools';
import StorageResourcesV2 from './storage-resources-v2';

export const loader = async (ctx: IRemixCtx) => {
  ensureAccountSet(ctx);
  ensureClusterSet(ctx);
  const { cluster } = ctx.params;

  const promise = pWrapper(async () => {
    const { data, errors } = await GQLServerHandler(ctx.request).listPvs({
      clusterName: cluster,
      pq: getPagination(ctx),
      search: getSearch(ctx),
    });
    if (errors) {
      throw errors[0];
    }
    return { storageData: data };
  });

  return defer({ promise });
};

const ClusterStorage = () => {
  const { promise } = useLoaderData<typeof loader>();

  return (
    <LoadingComp
      data={promise}
      skeletonData={{
        storageData: fake.ConsoleListNodePoolsQuery.infra_listNodePools as any,
      }}
    >
      {({ storageData }) => {
        const storages = storageData?.edges?.map(({ node }) => node);
        if (!storages) {
          return null;
        }
        const { pageInfo, totalCount } = storageData;
        return (
          <Wrapper
            header={{
              title: 'Storage',
            }}
            empty={{
              image: <EmptyStorageImage />,
              is: storages.length === 0,
              title: '',
              content: (
                <p>
                  This area displays the list of information automatically
                  redirected from your cluster storage.
                </p>
              ),
            }}
            pagination={{
              pageInfo,
              totalCount,
            }}
            tools={<Tools />}
          >
            <StorageResourcesV2 items={storages} />
          </Wrapper>
        );
      }}
    </LoadingComp>
  );
};

export default ClusterStorage;
