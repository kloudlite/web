import { useOutletContext, useParams } from '@remix-run/react';
import { useState } from 'react';
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
import DeleteDialog from '~/console/components/delete-dialog';
import Grid from '~/console/components/grid';
import { LockSimple, Trash } from '~/console/components/icons';
import ListGridView from '~/console/components/list-grid-view';
import ListV2 from '~/console/components/listV2';
import ResourceExtraAction from '~/console/components/resource-extra-action';
import { useClusterStatusV3 } from '~/console/hooks/use-cluster-status-v3';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { IImportedManagedResources } from '~/console/server/gql/queries/imported-managed-resource-queries';
import { IMSvTemplates } from '~/console/server/gql/queries/managed-templates-queries';
import {
  ExtractNodeType,
  parseName,
  parseUpdateOrCreatedBy,
  parseUpdateOrCreatedOn,
} from '~/console/server/r-utils/common';
import { getManagedTemplateLogo } from '~/console/utils/commons';
import { useReload } from '~/lib/client/helpers/reloader';
import { useWatchReload } from '~/lib/client/helpers/socket/useWatch';
import { handleError } from '~/lib/utils/common';
import { IEnvironmentContext } from '../_layout';
import { IServiceBinding } from '~/console/server/gql/queries/service-binding-queries';

const RESOURCE_NAME = 'managed resource';
type BaseType = ExtractNodeType<IServiceBinding>;

const parseItem = (item: BaseType) => {
  return {
    name: parseName(item),
    updateInfo: {
      time: parseUpdateOrCreatedOn(item),
    },
  };
};

type OnAction = ({
  action,
  item,
}: {
  action: 'delete' | 'edit' | 'view_secret';
  item: BaseType;
}) => void;

type IExtraButton = {
  onAction: OnAction;
  item: BaseType;
};

const ExtraButton = ({ onAction, item }: IExtraButton) => {
  return (
    <ResourceExtraAction
      options={[
        {
          label: 'View Secret',
          icon: <LockSimple size={16} />,
          type: 'item',
          onClick: () => onAction({ action: 'view_secret', item }),
          key: 'view_secret',
        },
        {
          label: 'Delete',
          icon: <Trash size={16} />,
          type: 'item',
          onClick: () => onAction({ action: 'delete', item }),
          key: 'delete',
          className: '!text-text-critical',
        },
      ]}
    />
  );
};

interface IResource {
  items: BaseType[];
  onAction: OnAction;
}

const GridView = ({ items = [], onAction }: IResource) => {
  return (
    <Grid.Root className="!grid-cols-1 md:!grid-cols-3">
      {items.map((item, index) => {
        const { name, updateInfo } = parseItem(item);
        const keyPrefix = `${RESOURCE_NAME}-${name}-${index}`;
        return (
          <Grid.Column
            key={name}
            rows={[
              {
                key: generateKey(keyPrefix, name),
                render: () => (
                  <ListTitle
                    title={name}
                    subtitle={name}
                    action={<ExtraButton onAction={onAction} item={item} />}
                  />
                ),
              },
              {
                key: generateKey(keyPrefix, 'author'),
                render: () => <ListItem subtitle={updateInfo.time} />,
              },
            ]}
          />
        );
      })}
    </Grid.Root>
  );
};

const ListView = ({ items = [], onAction }: IResource) => {
  return (
    <ListV2.Root
      data={{
        headers: [
          {
            render: () => 'Resource Name',
            name: 'name',
            className: listClass.title,
          },
          {
            render: () => 'Resource Type',
            name: 'resource',
            className: listClass.item,
          },
          {
            render: () => '',
            name: 'flex-pre',
            className: listClass.flex,
          },
          {
            render: () => 'Integrated Service',
            name: 'service',
            className: 'w-[175px]',
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
          const { name, updateInfo } = parseItem(i);
          return {
            columns: {
              name: {
                render: () => <ListTitleV2 title={name} />,
              },
              updated: {
                render: () => <ListItemV2 subtitle={updateInfo.time} />,
              },
              action: {
                render: () => <ExtraButton item={i} onAction={onAction} />,
              },
            },
          };
        }),
      }}
    />
  );
};

const ServiceBindingsResourcesV2 = ({ items = [] }: { items: BaseType[] }) => {
  const [showSecret, setShowSecret] = useState<BaseType | null>(null);
  const api = useConsoleApi();
  const reloadPage = useReload();
  const params = useParams();

  const { environment, account } = useParams();

  useWatchReload(
    items.map((i) => {
      return `account:${account}.environment:${environment}.managed_resource:${parseName(i)}`;
    }),
  );

  const props: IResource = {
    items,
    onAction: ({ action, item }) => {
      switch (action) {
        case 'view_secret':
          setShowSecret(item);
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
    </>
  );
};

export default ServiceBindingsResourcesV2;
