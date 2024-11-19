import HandleHelmChart from './handle-helm-chart';
import { useState } from 'react';
import { Button } from '@kloudlite/design-system/atoms/button';
import { IRemixCtx } from '~/root/lib/types/common';
import { LoadingComp, pWrapper } from '~/console/components/loading-component';
import { GQLServerHandler } from '~/console/server/gql/saved-queries';
import { defer } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { parseNodes } from '~/console/server/r-utils/common';
import Wrapper from '~/console/components/wrapper';
import { Plus } from '@jengaicons/react';
import { EmptyHelmReleaseImage } from '~/console/components/empty-resource-images';
import HelmChartResourcesV2 from './helm-chart-resources-v2';
import Tools from './tools';

export const loader = (ctx: IRemixCtx) => {
  const { environment } = ctx.params;
  const promise = pWrapper(async () => {
    const { data: mData, errors: mErrors } = await GQLServerHandler(
      ctx.request,
    ).listHelmCharts({
      envName: environment,
    });

    console.log(mData, environment);
    if (mErrors) {
      throw mErrors[0];
    }

    return { helmChartData: mData };
  });
  return defer({ promise });
};

const HelmCharts = () => {
  const [visible, setVisible] = useState(false);
  const { promise } = useLoaderData<typeof loader>();

  console.log(promise);

  return (
    <>
      <LoadingComp
        data={promise}
        /* skeletonData={{
          helmChartData: fake.ConsoleListHelmChartQuery
            .infra_listHelmReleases as any,
        }} */
      >
        {({ helmChartData }) => {
          const helmCharts = parseNodes(helmChartData);

          return (
            <Wrapper
              header={{
                title: 'Helm charts',
                action: helmCharts.length > 0 && (
                  <Button
                    variant="primary"
                    content="Install helm chart"
                    prefix={<Plus />}
                    to="../new-helm-chart"
                    linkComponent={Link}
                  />
                ),
              }}
              empty={{
                image: <EmptyHelmReleaseImage />,
                is: helmCharts.length === 0,
                title: 'This is where you’ll manage your Helm charts.',
                content: (
                  <p>
                    You can create a new backing service and manage the listed
                    backing service.
                  </p>
                ),
                action: {
                  content: 'Install helm chart',
                  prefix: <Plus />,
                  onClick: () => {
                    setVisible(true);
                  },
                },
              }}
              tools={<Tools />}
            >
              <HelmChartResourcesV2 items={helmCharts} />
            </Wrapper>
          );
        }}
      </LoadingComp>
      <HandleHelmChart
        {...{
          isUpdate: false,
          visible,
          setVisible,
        }}
      />
    </>
  );
};

export default HelmCharts;
