import { Button } from '@kloudlite/design-system/atoms/button';
import { defer } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { EmptyStorageImage } from '~/console/components/empty-resource-images';
import { Plus } from '~/console/components/icons';
import { LoadingComp, pWrapper } from '~/console/components/loading-component';
import Wrapper from '~/console/components/wrapper';
import { GQLServerHandler } from '~/console/server/gql/saved-queries';
import { parseNodes } from '~/console/server/r-utils/common';
import { ensureAccountSet } from '~/console/server/utils/auth-utils';
import { getPagination, getSearch } from '~/console/server/utils/common';
import fake from '~/root/fake-data-generator/fake';
import logger from '~/root/lib/client/helpers/log';
import { IRemixCtx } from '~/root/lib/types/common';
import BackendServicesResourcesV2 from './backend-services-resources-V2';
import Tools from './tools';

export const loader = (ctx: IRemixCtx) => {
  ensureAccountSet(ctx);
  const promise = pWrapper(async () => {
    const { data: mData, errors: mErrors } = await GQLServerHandler(
      ctx.request,
    ).listClusterMSvs({
      pagination: getPagination(ctx),
      search: getSearch(ctx),
    });

    const { data: msvTemplates, errors: msvError } = await GQLServerHandler(
      ctx.request,
    ).listMSvTemplates({});

    const { data: msvPlugins, errors: msvPluginError } = await GQLServerHandler(
      ctx.request,
    ).listMSvPlugins({});

    if (msvPluginError) {
      throw msvPluginError[0];
    }

    if (mErrors) {
      throw mErrors[0];
    }

    if (msvError) {
      throw msvError[0];
    }

    return {
      managedServices: mData,
      templates: msvTemplates,
      plugins: msvPlugins,
    };
  });
  return defer({ promise });
};

const KlOperatorServices = () => {
  const { promise } = useLoaderData<typeof loader>();

  useEffect(() => {
    logger.log(promise);
  }, [promise]);

  return (
    <LoadingComp
      data={promise}
      skeletonData={{
        managedServices: fake.ConsoleListClusterMSvsQuery
          .infra_listClusterManagedServices as any,
        templates: fake.ConsoleListMSvTemplatesQuery
          .infra_listManagedServiceTemplates as any,
        plugins: fake.ConsoleListMSvPluginsQuery as any,
      }}
    >
      {({
        managedServices,
        templates: templatesData,
        plugins: pluginsData,
      }) => {
        const backendServices = parseNodes(managedServices);
        const managedSvcs = backendServices.filter(
          (f) => f.spec?.msvcSpec.plugin?.kind !== 'HelmChart',
        );

        return (
          <Wrapper
            secondaryHeader={{
              title: 'Managed services',
              action: managedSvcs.length > 0 && (
                <Button
                  variant="primary"
                  content="Create managed service"
                  prefix={<Plus />}
                  to="../../new-managed-service"
                  linkComponent={Link}
                />
              ),
            }}
            empty={{
              image: <EmptyStorageImage />,
              is: managedSvcs.length === 0,
              title: 'This is where you’ll manage your managed services.',
              content: (
                <p>
                  You can create a new managed service and manage the listed
                  Managed service.
                </p>
              ),
              action: {
                content: 'Create new Managed service',
                prefix: <Plus />,
                to: '../../new-managed-service',
                linkComponent: Link,
              },
            }}
            tools={<Tools />}
          >
            <BackendServicesResourcesV2
              items={managedSvcs}
              templates={templatesData}
              plugins={pluginsData}
            />
          </Wrapper>
        );
      }}
    </LoadingComp>
  );
};

export default KlOperatorServices;
