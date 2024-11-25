import { defer } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { Button } from '@kloudlite/design-system/atoms/button';
import { EmptyManagedResourceImage } from '~/console/components/empty-resource-images';
import { Plus } from '~/console/components/icons';
import { LoadingComp, pWrapper } from '~/console/components/loading-component';
import Wrapper from '~/console/components/wrapper';
import { GQLServerHandler } from '~/console/server/gql/saved-queries';
import { parseNodes } from '~/console/server/r-utils/common';
import { ensureAccountSet } from '~/console/server/utils/auth-utils';
import { getPagination } from '~/console/server/utils/common';
import { IRemixCtx } from '~/lib/types/common';
import fake from '~/root/fake-data-generator/fake';
import Tools from './tools';
import ServiceBindingsResourcesV2 from './services-resource-v2';

export const loader = (ctx: IRemixCtx) => {
  const { environment } = ctx.params;
  const promise = pWrapper(async () => {
    ensureAccountSet(ctx);

    const { data: mData, errors: mErrors } = await GQLServerHandler(
      ctx.request,
    ).listServiceBinding({
      envName: environment,
      pagination: getPagination(ctx),
    });

    if (mErrors) {
      throw mErrors[0];
    }
    return { serviceBindingsData: mData };
  });
  return defer({ promise });
};

const KlOperatorServices = () => {
  const [visible, setVisible] = useState(false);

  const { promise } = useLoaderData<typeof loader>();

  return (
    <>
      <LoadingComp
        data={promise}
        skeletonData={{
          serviceBindingsData: fake.ConsoleListManagedResourcesQuery
            .core_listManagedResources as any,
        }}
      >
        {({ serviceBindingsData }) => {
          const serviceBindings = parseNodes(serviceBindingsData);

          return (
            <Wrapper
              header={{
                title: 'Imported Managed Resources',
                action: serviceBindings.length > 0 && (
                  <Button
                    variant="primary"
                    content="Import Managed Resource"
                    prefix={<Plus />}
                    onClick={() => {
                      setVisible(true);
                    }}
                  />
                ),
              }}
              empty={{
                image: <EmptyManagedResourceImage />,
                is: serviceBindings.length === 0,
                title: 'This is where you’ll manage your Managed resources.',
                content: (
                  <p>
                    You can import a new managed resource and manage the listed
                    managed resource.
                  </p>
                ),
                action: {
                  content: 'Import Managed Resource',
                  prefix: <Plus />,
                  onClick: () => {
                    setVisible(true);
                  },
                  linkComponent: Link,
                },
              }}
              tools={<Tools />}
              pagination={serviceBindingsData}
            >
              <ServiceBindingsResourcesV2 items={serviceBindings} />
            </Wrapper>
          );
        }}
      </LoadingComp>
    </>
  );
};

export default KlOperatorServices;
