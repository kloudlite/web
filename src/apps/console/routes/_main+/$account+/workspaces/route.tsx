import { Button } from '@kloudlite/design-system/atoms/button';
import { defer } from '@remix-run/node';
import { useEffect, useState } from 'react';
import { EmptyStorageImage } from '~/console/components/empty-resource-images';
import { InfraAsCode } from '~/console/components/icons';
import { LoadingComp, pWrapper } from '~/console/components/loading-component';
import Wrapper from '~/console/components/wrapper';
import { GQLServerHandler } from '~/console/server/gql/saved-queries';
import { ExtractNodeType, parseNodes } from '~/console/server/r-utils/common';
import { ensureAccountSet } from '~/console/server/utils/auth-utils';
import { getPagination, getSearch } from '~/console/server/utils/common';
import logger from '~/root/lib/client/helpers/log';
import { IRemixCtx } from '~/root/lib/types/common';
import Tools from './tools';
import WorkspaceResourcesV2 from './workspace-resources-V2';
import { EmptyState } from '~/console/components/empty-state';
import HandleWorkmachine, { findMachineType } from './handle-workmachine';
import { cn } from '@kloudlite/design-system/utils';
import { PencilLine, PlayCircleFill, StopCircleFill } from '@jengaicons/react';
import HandleWorkspace from './handle-workspace';
import { useLoaderData } from '@remix-run/react';
import {
  IWM,
  IWorkspaces,
} from '~/console/server/gql/queries/workspace-queries';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { useReload } from '~/root/lib/client/helpers/reloader';

export const loader = (ctx: IRemixCtx) => {
  ensureAccountSet(ctx);
  const { account } = ctx.params;
  const clusterName = `cls-${account}`;
  const promise = pWrapper(async () => {
    const { data: me, errors: meErrors } = await GQLServerHandler(
      ctx.request,
    ).whoAmI({});
    if (meErrors) {
      throw meErrors[0];
    }

    const { data: wm, errors: wmError } = await GQLServerHandler(
      ctx.request,
    ).getWorkmachine({
      name: `${me.id}-workmachine`.toUpperCase(),
      clusterName,
    });
    if (wmError) {
      throw wmError[0];
    }

    let ws: IWorkspaces | null = null;

    if (wm) {
      if (!wm.metadata) {
        throw Error('Error on fetching workmachine');
      }

      const { data: mData, errors: mErrors } = await GQLServerHandler(
        ctx.request,
      ).listWorkspaces({
        workmachineName: wm.metadata?.name,
        clusterName,
        pagination: getPagination(ctx),
        search: getSearch(ctx),
      });

      if (mErrors) {
        throw mErrors[0];
      }

      ws = mData;
    }

    return {
      workspaces: ws,
      workmachine: wm,
    };
  });
  return defer({ promise });
};

const WorkmachineStatus = ({
  onEdit,
  wm,
}: {
  wm: IWM;
  onEdit?: () => void;
}) => {
  const api = useConsoleApi();
  const reload = useReload();
  const [statusLoading, setStatusLoading] = useState(false);

  const machineType = findMachineType(wm.spec?.aws.instanceType || '');

  const updateState = async (status: boolean) => {
    setStatusLoading(true);
    await api.updateWorkmachineStatus({
      clusterName: wm.clusterName,
      name: wm.metadata?.name || '',
      status,
    });
    reload();
  };

  useEffect(() => {
    setStatusLoading(false);
  }, [wm]);
  return (
    <div
      className={cn(
        'p-2xl flex flex-row gap-2xl border rounded-lg text-text-default items-center bg-surface-basic-subdued border-border-default',
      )}
    >
      <span className={cn('pt-md')}>
        <InfraAsCode size={20} />
      </span>
      <div className="flex-1 flex flex-col gap-sm">
        <div className="headingMd">
          Workmachine is {wm.spec?.state === 'ON' ? 'running' : 'stopped'}
        </div>
        <div className="bodyMd">{machineType?.label} running</div>
      </div>
      <div className="flex flex-row items-center gap-lg">
        {wm.spec?.state === 'ON' ? (
          <Button
            prefix={<StopCircleFill />}
            content={'Stop'}
            variant="critical"
            size="sm"
            onClick={() => {
              updateState(false);
            }}
            loading={statusLoading}
          />
        ) : (
          <Button
            prefix={<PlayCircleFill />}
            content={'Start'}
            variant="primary"
            size="sm"
            onClick={() => {
              updateState(true);
            }}
            loading={statusLoading}
          />
        )}
        <Button
          variant="basic"
          prefix={<PencilLine />}
          content={'Edit'}
          size="sm"
          onClick={onEdit}
        />
      </div>
    </div>
  );
};

const KlOperatorServices = () => {
  const { promise } = useLoaderData<typeof loader>();

  const [showWM, setShowWM] = useState<any>(null);
  const [shouldUpdateWM, setShouldUpdateWM] =
    useState<ExtractNodeType<IWM> | null>(null);
  const [showWS, setShowWS] = useState<IWM | null>(null);

  useEffect(() => {
    logger.log(promise);
  }, [promise]);

  return (
    <>
      <LoadingComp
        data={promise}
        /* skeletonData={{
        managedServices: fake.ConsoleListClusterMSvsQuery
          .infra_listClusterManagedServices as any,
        templates: fake.ConsoleListMSvTemplatesQuery
          .infra_listManagedServiceTemplates as any,
        plugins: fake.ConsoleListMSvPluginsQuery as any,
      }} */
      >
        {({ workspaces, workmachine }) => {
          if (!workmachine) {
            return (
              <div>
                <div className="py-4xl">
                  <EmptyState
                    heading={'Create your Work Machine'}
                    action={
                      <Button
                        content="Setup workmachine"
                        onClick={() => setShowWM(true)}
                      />
                    }
                    image={null}
                  />
                </div>
              </div>
            );
          }
          if (!workspaces) {
            return <div>workspace is null.</div>;
          }
          const workspaceData = parseNodes(workspaces);

          return (
            <div className="flex flex-col pt-xl">
              <WorkmachineStatus
                wm={workmachine}
                onEdit={() => {
                  setShowWM(true);
                  setShouldUpdateWM(workmachine);
                }}
              />
              <Wrapper
                header={{
                  title: 'Workspaces',
                }}
                empty={{
                  image: <EmptyStorageImage />,
                  is: workspaceData.length === 0,
                  title: 'This is where you’ll manage your workspaces.',
                  content: (
                    <p>
                      You can create a new workspace and manage the listed
                      Workspaces.
                    </p>
                  ),
                  action: {
                    content: 'Create workspace',
                    onClick: () => {
                      setShowWS(workmachine);
                    },
                  },
                }}
                tools={<Tools />}
              >
                <WorkspaceResourcesV2 items={workspaceData} wm={workmachine} />
              </Wrapper>
            </div>
          );
        }}
      </LoadingComp>
      <HandleWorkspace
        {...{
          isUpdate: false,
          setVisible: () => setShowWS(null),
          visible: !!showWS,
          data: { wm: showWS },
        }}
      />
      <HandleWorkmachine
        {...{
          isUpdate: !!shouldUpdateWM,
          setVisible: () => setShowWM(null),
          visible: !!showWM,
          data: shouldUpdateWM!,
        }}
      />
    </>
  );
};

export default KlOperatorServices;
