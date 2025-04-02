import { toast } from '@kloudlite/design-system/molecule/toast';
import { generateKey, titleCase } from '@kloudlite/design-system/utils';
import { Link, useParams } from '@remix-run/react';
import { useEffect, useState } from 'react';
import ConsoleAvatar from '~/console/components/console-avatar';
import {
  ListItem,
  ListItemV2,
  ListTitle,
  ListTitleV2,
} from '~/console/components/console-list-components';
import DeleteDialog from '~/console/components/delete-dialog';
import Grid from '~/console/components/grid';
import { ChevronUpDown, Trash } from '~/console/components/icons';
import ListGridView from '~/console/components/list-grid-view';
import ListV2 from '~/console/components/listV2';
import ResourceExtraAction from '~/console/components/resource-extra-action';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import {
  ExtractNodeType,
  parseName,
  parseUpdateOrCreatedBy,
  parseUpdateOrCreatedOn,
} from '~/console/server/r-utils/common';
import { useReload } from '~/root/lib/client/helpers/reloader';
import { handleError } from '~/root/lib/utils/common';
import {
  IWM,
  IWorkspaces,
} from '~/console/server/gql/queries/workspace-queries';
import AnimateHide from '@kloudlite/design-system/atoms/animate-hide';
import { Button } from '@kloudlite/design-system/atoms/button';

const RESOURCE_NAME = 'workspace';
type BaseType = ExtractNodeType<IWorkspaces>;

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

const ExtraButton = ({ item, onAction }: IExtraButton) => {
  const iconSize = 16;
  return (
    <ResourceExtraAction
      options={[
        {
          label: 'Delete',
          icon: <Trash size={iconSize} />,
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

const GridView = ({ items, onAction }: IResource) => {
  const { account, project } = useParams();
  return (
    <Grid.Root className="!grid-cols-1 md:!grid-cols-3" linkComponent={Link}>
      {items.map((item, index) => {
        const { name, id, updateInfo } = parseItem(item);
        const keyPrefix = `${RESOURCE_NAME}-${id}-${index}`;
        return (
          <Grid.Column
            key={id}
            to={`/${account}/${project}/msvc/${id}/logs-n-metrics`}
            rows={[
              {
                key: generateKey(keyPrefix, name + id),
                render: () => (
                  <ListTitle
                    title={name}
                    subtitle={id}
                    action={
                      <ExtraButton item={item} onAction={onAction} />
                      // <ResourceExtraAction
                      //   options={[
                      //     {
                      //       key: 'managed-services-resource-extra-action-1',
                      //       to: `/${account}/${project}/msvc/${id}/logs-n-metrics`,
                      //       icon: <GearSix size={16} />,
                      //       label: 'logs & metrics',
                      //       type: 'item',
                      //     },
                      //   ]}
                      // />
                    }
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

const ListView = ({ items, onAction }: IResource) => {
  const [showButtons, setShowButtons] = useState<Record<string, boolean>>({});
  useEffect(() => {
    console.log(showButtons);
  }, [showButtons]);
  return (
    <ListV2.Root
      linkComponent={Link}
      data={{
        headers: [
          {
            render: () => 'Resource Name',
            name: 'name',
            className: 'flex-1',
          },
        ],
        rows: items.map((i) => {
          const { name, id, updateInfo } = parseItem(i);
          return {
            columns: {
              name: {
                render: () => (
                  <div
                    className="flex flex-col"
                    onClick={() =>
                      setShowButtons((prev) => {
                        if (prev?.[id]) {
                          return { ...prev, [id]: false };
                        }
                        return { ...prev, [id]: true };
                      })
                    }
                  >
                    <div className="flex flex-row justify-between items-center cursor-pointer">
                      <ListTitleV2
                        title={name}
                        subtitle={id}
                        avatar={<ConsoleAvatar name={id} />}
                      />
                      <div className="flex flex-row items-center gap-2xl">
                        <ListItemV2 subtitle={updateInfo.time} />
                        <div className="flex flex-row items-center gap-xl">
                          <span>
                            <ChevronUpDown size={16} />
                          </span>
                          <ExtraButton item={i} onAction={onAction} />
                        </div>
                      </div>
                    </div>
                    <AnimateHide show={!!showButtons?.[id]}>
                      <div className="pt-lg flex flex-row items-center gap-xl">
                        <Button
                          content="VS Code"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        />
                        <Button
                          content="SSH"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        />
                        <Button
                          content="Jupiter Notebook"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        />
                        <Button
                          content="VS Code Web"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        />
                        <Button
                          content="SSH Web"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        />
                      </div>
                    </AnimateHide>
                  </div>
                ),
              },
            },
          };
        }),
      }}
    />
  );
};

const WorkspaceResourcesV2 = ({
  items = [],
  wm,
}: {
  items: BaseType[];
  wm: IWM;
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState<BaseType | null>(
    null,
  );
  const api = useConsoleApi();
  const reloadPage = useReload();

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
          if (!showDeleteDialog?.clusterName) {
            throw Error('ClusterName is required');
          }
          if (!wm.metadata?.name) {
            throw Error('Workmachine is required');
          }
          try {
            const { errors } = await api.deleteWorkspace({
              name: parseName(showDeleteDialog),
              clusterName: showDeleteDialog?.clusterName!,
              workmachineName: wm.metadata?.name,
            });

            if (errors) {
              throw errors[0];
            }
            reloadPage();
            toast.success(`Workspace deleted successfully`);
            setShowDeleteDialog(null);
          } catch (err) {
            handleError(err);
          }
        }}
      />
    </>
  );
};

export default WorkspaceResourcesV2;
