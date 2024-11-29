import { Trash } from '~/console/components/icons';
import { generateKey, titleCase } from '@kloudlite/design-system/utils';
import {
  ListItem,
  ListItemV2,
  ListTitle,
} from '~/console/components/console-list-components';
import Grid from '~/console/components/grid';
import ListGridView from '~/console/components/list-grid-view';
import {
  ExtractNodeType,
  parseName,
  parseUpdateOrCreatedBy,
  parseUpdateOrCreatedOn,
} from '~/console/server/r-utils/common';
import DeleteDialog from '~/console/components/delete-dialog';
import ResourceExtraAction, {
  IResourceExtraItem,
} from '~/console/components/resource-extra-action';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { useReload } from '~/root/lib/client/helpers/reloader';
import { useState } from 'react';
import { handleError } from '~/root/lib/utils/common';
import { toast } from '@kloudlite/design-system/molecule/toast';
import { Link, useOutletContext } from '@remix-run/react';
import { IHelmCharts } from '~/console/server/gql/queries/helm-chart-queries';
import { useWatchReload } from '~/lib/client/helpers/socket/useWatch';
import ListV2 from '~/console/components/listV2';
import { SyncStatusV2 } from '~/console/components/sync-status';
import { constants } from '~/console/server/utils/constants';
import { IEnvironmentContext } from '../../_layout';
import { useClusterStatusV3 } from '~/console/hooks/use-cluster-status-v3';
import { Badge } from '@kloudlite/design-system/atoms/badge';

const RESOURCE_NAME = 'helm chart';
type BaseType = ExtractNodeType<IHelmCharts>;

const parseItem = (item: BaseType) => {
  return {
    name: item?.displayName,
    id: parseName(item),
    updateInfo: {
      author: `Updated by ${titleCase(parseUpdateOrCreatedBy(item))}`,
      time: parseUpdateOrCreatedOn(item),
    },
  };
};

type OnAction = ({
  action,
  item,
}: {
  action: 'delete';
  item: BaseType;
}) => void;

type IExtraButton = {
  onAction: OnAction;
  item: BaseType;
};

const ExtraButton = ({ onAction, item }: IExtraButton) => {
  const kloudliteAgentName = item.metadata?.name;
  const iconSize = 16;

  let items: IResourceExtraItem[] = [
    {
      label: 'Delete',
      icon: <Trash size={iconSize} />,
      type: 'item',
      onClick: () => onAction({ action: 'delete', item }),
      key: 'delete',
      className: '!text-text-critical',
    },
  ];

  return kloudliteAgentName !== constants.kloudliteHelmAgentName ? (
    <ResourceExtraAction options={items} />
  ) : null;
};

interface IResource {
  items: BaseType[];
  onAction: OnAction;
}

const GridView = ({ items = [], onAction }: IResource) => {
  return (
    <Grid.Root className="!grid-cols-1 md:!grid-cols-3">
      {items.map((item, index) => {
        const { name, id, updateInfo } = parseItem(item);
        const keyPrefix = `${RESOURCE_NAME}-${id}-${index}`;
        return (
          <Grid.Column
            key={id}
            rows={[
              {
                key: generateKey(keyPrefix, name),
                render: () => (
                  <ListTitle
                    title={name}
                    subtitle={id}
                    action={<ExtraButton onAction={onAction} item={item} />}
                  />
                ),
              },
              {
                key: generateKey(keyPrefix, 'author'),
                render: () => (
                  <ListItem
                    data={updateInfo.author}
                    subtitle={updateInfo.time}
                  />
                ),
              },
            ]}
          />
        );
      })}
    </Grid.Root>
  );
};

const ListView = ({ items = [], onAction }: IResource) => {
  const { environment } = useOutletContext<IEnvironmentContext>();
  const { clustersMap: clusterStatus } = useClusterStatusV3({
    clusterName: environment.clusterName,
  });


  return (
    <ListV2.Root
      linkComponent={Link}
      data={{
        headers: [
          {
            render: () => (
              <div className="flex flex-row">
                <span className="w-[32px]" />
                Name
              </div>
            ),
            name: 'name',
            className: 'w-[300px]',
          },
          {
            render: () => 'Status',
            name: 'status',
            className: 'flex-1 min-w-[30px] flex items-center justify-center',
          },
          {
            render: () => 'Updated',
            name: 'updated',
            className: 'w-[180px]',
          },
          {
            render: () => '',
            name: 'action',
            className: 'w-[28px]',
          },
        ],
        rows: items.map((i) => {
          const { name, id, updateInfo } = parseItem(i);
          const isClusterOnline =
            !!clusterStatus[environment.clusterName]?.isOnline;

          return {
            columns: {
              name: {
                render: () => <ListTitle title={name} subtitle={id} />,
              },
              status: {
                render: () => {
                  if (environment.spec?.suspend) {
                    return null;
                  }

                  if (environment.clusterName === '') {
                    return <ListItemV2 className="px-4xl" data="-" />;
                  }

                  if (clusterStatus[environment.clusterName] === undefined) {
                    return null;
                  }

                  if (!isClusterOnline) {
                    return <Badge type="warning">Cluster Offline</Badge>;
                  }

                  return <SyncStatusV2 item={i} />;
                },
              },
              updated: {
                render: () => (
                  <ListItem
                    data={updateInfo.author}
                    subtitle={updateInfo.time}
                  />
                ),
              },
              action: {
                render: () => <ExtraButton item={i} onAction={onAction} />,
              },
            },
            to: `../helm-chart/${id}`
          };
        }),
      }}
    />
  );
};

const HelmChartResourcesV2 = ({ items = [] }: { items: BaseType[] }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState<BaseType | null>(
    null,
  );
  const api = useConsoleApi();
  const reloadPage = useReload();

  const { environment, account } = useOutletContext<IEnvironmentContext>();
  useWatchReload(
    items.map((i) => {
      return `account:${parseName(account)}.environment:${parseName(
        environment,
      )}.helm_release:${parseName(i)}`;
    }),
  );

  const props: IResource = {
    items,
    onAction: ({ action, item }) => {
      switch (action) {
        case 'delete':
          setShowDeleteDialog(item);
          break;
        default:
          break;
      }
    },
  };
  return (
    <>
      <ListGridView
        listView={<ListView {...props} />}
        gridView={<GridView {...props} />}
      />
      <DeleteDialog
        resourceName={parseName(showDeleteDialog)}
        resourceType={RESOURCE_NAME}
        show={showDeleteDialog}
        setShow={setShowDeleteDialog}
        onSubmit={async () => {
          try {
            const { errors } = await api.deleteHelmChart({
              envName: parseName(environment),
              helmChartName: parseName(showDeleteDialog),
            });

            if (errors) {
              throw errors[0];
            }
            reloadPage();
            toast.success(`${titleCase(RESOURCE_NAME)} deleted successfully`);
            setShowDeleteDialog(null);
          } catch (err) {
            handleError(err);
          }
        }}
      />
    </>
  );
};

export default HelmChartResourcesV2;
