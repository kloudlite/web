import { defer } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
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
import { BackingServicesFill } from '@jengaicons/react';

export const loader = (ctx: IRemixCtx) => {
  const { environment, account } = ctx.params;
  const promise = pWrapper(async () => {
    ensureAccountSet(ctx);

    const { data, errors } = await GQLServerHandler(ctx.request).getEnvironment(
      {
        name: environment,
      },
    );

    if (errors) {
      throw errors[0];
    }

    let shouldRedirect = false
    if (!data.clusterName) {
      shouldRedirect = true
    }

    const { data: mData, errors: mErrors } = await GQLServerHandler(
      ctx.request,
    ).listServiceBinding({
      envName: environment,
      pagination: getPagination(ctx),
    });

    if (mErrors) {
      throw mErrors[0];
    }
    if (shouldRedirect) {
      return { serviceBindingsData: mData, redirect: `/${account}/env/${environment}` };
    } else {
      return { serviceBindingsData: mData, redirect: '' };
    }
  });
  return defer({ promise });
};

const ServiceBinding = () => {

  const { promise } = useLoaderData<typeof loader>();

  return (
    <>
      <LoadingComp
        data={promise}
        skeletonData={{
          redirect: '',
          serviceBindingsData: fake.ConsoleListServiceBindingQuery
            .core_listServiceBindings as any,
        }}
      >
        {({ serviceBindingsData }) => {
          const serviceBindings = parseNodes(serviceBindingsData);

          return (
            <Wrapper
              header={{
                title: 'Services',
              }}
              empty={{
                image: <BackingServicesFill />,
                is: serviceBindings.length === 0,
                title: 'Here you’ll get all the services created by apps and the helm charts.',
                content: (
                  null
                ),
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

export default ServiceBinding;
