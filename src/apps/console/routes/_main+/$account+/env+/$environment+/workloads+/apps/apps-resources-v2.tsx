import { Link, useOutletContext, useParams } from '@remix-run/react';
import { Badge } from '@kloudlite/design-system/atoms/badge';
import { toast } from '@kloudlite/design-system/molecule/toast';
import { generateKey, titleCase } from '@kloudlite/design-system/utils';
import {
  ListItem,
  ListItemV2,
  ListTitle,
  ListTitleV2,
  listClass,
} from '~/console/components/console-list-components';
import Grid from '~/console/components/grid';
import { GearSix, Link as LinkIcon } from '~/console/components/icons';
import ListGridView from '~/console/components/list-grid-view';
import ListV2 from '~/console/components/listV2';
import ResourceExtraAction, {
  IResourceExtraItem,
} from '~/console/components/resource-extra-action';
import { SyncStatusV2 } from '~/console/components/sync-status';
import { useClusterStatusV3 } from '~/console/hooks/use-cluster-status-v3';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { IApps } from '~/console/server/gql/queries/app-queries';
import {
  ExtractNodeType,
  parseName,
  parseUpdateOrCreatedBy,
  parseUpdateOrCreatedOn,
  parseName as pn,
} from '~/console/server/r-utils/common';
import { useWatchReload } from '~/lib/client/helpers/socket/useWatch';
import { handleError } from '~/lib/utils/common';
import { IEnvironmentContext } from '~/console/routes/_main+/$account+/env+/$environment+/_layout';

const RESOURCE_NAME = 'app';
type BaseType = ExtractNodeType<IApps>;

const parseItem = (item: ExtractNodeType<IApps>) => {
  return {
    name: item.displayName,
    id: pn(item),
    intercept: item.spec.intercept,
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
  action: 'delete' | 'edit' | 'intercept' | 'remove_intercept' | 'restart';
  item: BaseType;
}) => void;

type IExtraButton = {
  onAction: OnAction;
  item: BaseType;
};

const ExtraButton = ({ onAction, item }: IExtraButton) => {
  const { account, environment } = useParams();
  const iconSize = 16;
  let options: IResourceExtraItem[] = [
    {
      label: 'Settings',
      icon: <GearSix size={iconSize} />,
      type: 'item',
      to: `/${account}/env/${environment}/workloads/app/${parseName(
        item,
      )}/settings/general`,
      key: 'settings',
    },
  ];

  options = [
    {
      label: 'Restart',
      icon: <LinkIcon size={iconSize} />,
      type: 'item',
      onClick: () => onAction({ action: 'restart', item }),
      key: 'restart',
    },
    ...options,
  ];

  return <ResourceExtraAction options={options} />;
};

interface IResource {
  items: BaseType[];
  onAction: OnAction;
}

const GridView = ({ items = [], onAction: _ }: IResource) => {
  const { account, environment } = useParams();
  return (
    <Grid.Root className="!grid-cols-1 md:!grid-cols-3" linkComponent={Link}>
      {items.map((item, index) => {
        const { name, id, updateInfo } = parseItem(item);
        const keyPrefix = `${RESOURCE_NAME}-${id}-${index}`;
        return (
          <Grid.Column
            key={id}
            to={`/${account}/env/${environment}/app/${id}`}
            rows={[
              {
                key: generateKey(keyPrefix, name + id),
                render: () => (
                  <ListTitle
                    title={name}
                    subtitle={id}
                    action={
                      <ResourceExtraAction
                        options={[
                          {
                            key: 'apps-resource-extra-action-1',
                            to: `/${account}/env/${environment}/app/${id}/settings/general`,
                            icon: <GearSix size={16} />,
                            label: 'Settings',
                            type: 'item',
                          },
                        ]}
                      />
                    }
                  />
                ),
              },
              {
                key: generateKey(keyPrefix, updateInfo.author),
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
  const { environment, account } = useOutletContext<IEnvironmentContext>();
  const { clustersMap: clusterStatus } = useClusterStatusV3({
    clusterName: environment.clusterName,
  });

  return (
    <ListV2.Root
      linkComponent={Link}
      data={{
        headers: [
          {
            render: () => 'Name',
            name: 'name',
            className: listClass.title,
          },
          {
            render: () => '',
            name: 'flex-pre',
            className: listClass.flex,
          },
          {
            render: () => '',
            name: 'flex-post',
            className: listClass.flex,
          },
          {
            render: () => 'Status',
            name: 'status',
            className: 'min-w-[120px]',
          },
          {
            render: () => '',
            name: 'flex-post',
            className: listClass.flex,
          },
          {
            render: () => 'Updated',
            name: 'updated',
            className: listClass.updated,
          },
          {
            render: () => '',
            name: 'action',
            className: listClass.action,
          },
        ],
        rows: items.map((i) => {
          const isClusterOnline =
            !!clusterStatus[environment.clusterName]?.isOnline;
          const { name, id, updateInfo } = parseItem(i);
          return {
            columns: {
              name: {
                render: () => <ListTitleV2 title={name} subtitle={id} />,
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
                  <ListItemV2
                    data={`${updateInfo.author}`}
                    subtitle={updateInfo.time}
                  />
                ),
              },
              action: {
                render: () => <ExtraButton onAction={onAction} item={i} />,
              },
            },
            to: `/${parseName(account)}/env/${parseName(
              environment,
            )}/workloads/app/${id}`,
          };
        }),
      }}
    />
  );
};

const AppsResourcesV2 = ({ items = [] }: Omit<IResource, 'onAction'>) => {
  const api = useConsoleApi();
  const { environment, account } = useOutletContext<IEnvironmentContext>();

  useWatchReload(
    items.map((i) => {
      return `account:${parseName(account)}.environment:${parseName(
        environment,
      )}.app:${parseName(i)}`;
    }),
  );

  const restartApp = async (item: BaseType) => {
    if (!environment) {
      throw new Error('Environment is required!.');
    }

    try {
      const { errors } = await api.restartApp({
        appName: pn(item),
        envName: pn(environment),
      });

      if (errors) {
        throw errors[0];
      }
      toast.success('App restarted successfully');
      // reload();
    } catch (error) {
      handleError(error);
    }
  };

  const props: IResource = {
    items,
    onAction: ({ action, item }) => {
      switch (action) {
        case 'restart':
          restartApp(item);
          break;
        default:
      }
    },
  };
  return (
    <>
      <ListGridView
        listView={<ListView {...props} />}
        gridView={<GridView {...props} />}
      />
    </>
  );
};

export default AppsResourcesV2;
