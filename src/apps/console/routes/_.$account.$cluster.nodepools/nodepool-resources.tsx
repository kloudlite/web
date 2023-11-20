import { PencilLine } from '@jengaicons/react';
import { generateKey, titleCase } from '~/components/utils';
import ConsoleAvatar from '~/console/components/console-avatar';
import {
  ListItemWithSubtitle,
  ListTitleWithSubtitleAvatar,
} from '~/console/components/console-list-components';
import Grid from '~/console/components/grid';
import List from '~/console/components/list';
import ListGridView from '~/console/components/list-grid-view';
import ResourceExtraAction from '~/console/components/resource-extra-action';
import { INodepools } from '~/console/server/gql/queries/nodepool-queries';
import {
  ExtractNodeType,
  parseName,
  parseUpdateOrCreatedBy,
  parseUpdateOrCreatedOn,
} from '~/console/server/r-utils/common';
import { IShowDialog } from '~/console/components/types.d';
import { useState } from 'react';
import { DIALOG_TYPE } from '~/console/utils/commons';
import HandleNodePool from './handle-nodepool';

const RESOURCE_NAME = 'nodepool';
type BaseType = ExtractNodeType<INodepools>;

const parseItem = (item: BaseType) => {
  return {
    name: item.displayName,
    id: parseName(item),
    updateInfo: {
      author: `Updated by ${titleCase(parseUpdateOrCreatedBy(item))}`,
      time: parseUpdateOrCreatedOn(item),
    },
  };
};

const ExtraButton = ({ onEdit }: { onEdit: () => void }) => {
  return (
    <ResourceExtraAction
      options={[
        {
          key: '1',
          label: 'Edit',
          icon: <PencilLine size={16} />,
          type: 'item',
          onClick: () => onEdit(),
        },
      ]}
    />
  );
};
interface IResource {
  items: BaseType[];
  onEdit: (item: BaseType) => void;
}

const GridView = ({ items, onEdit }: IResource) => {
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
                key: generateKey(keyPrefix, name + id),
                render: () => (
                  <ListTitleWithSubtitleAvatar
                    avatar={<ConsoleAvatar name={id} />}
                    title={name}
                    subtitle={id}
                    action={
                      <ExtraButton
                        onEdit={() => {
                          onEdit?.(item);
                        }}
                      />
                    }
                  />
                ),
              },
              {
                key: generateKey(keyPrefix, updateInfo.author),
                render: () => (
                  <ListItemWithSubtitle
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

const ListView = ({ items, onEdit }: IResource) => {
  return (
    <List.Root>
      {items.map((item, index) => {
        const { name, id, updateInfo } = parseItem(item);
        const keyPrefix = `${RESOURCE_NAME}-${id}-${index}`;
        return (
          <List.Row
            key={id}
            className="!p-3xl"
            columns={[
              {
                key: generateKey(keyPrefix, name + id),
                className: 'flex-1',
                render: () => (
                  <ListTitleWithSubtitleAvatar
                    title={name}
                    subtitle={id}
                    avatar={<ConsoleAvatar name={id} />}
                  />
                ),
              },
              {
                key: generateKey(keyPrefix, updateInfo.author),
                className: 'w-[180px]',
                render: () => (
                  <ListItemWithSubtitle
                    data={`${updateInfo.author}`}
                    subtitle={updateInfo.time}
                  />
                ),
              },
              {
                key: generateKey(keyPrefix, 'action'),
                render: () => (
                  <ExtraButton
                    onEdit={() => {
                      onEdit?.(item);
                    }}
                  />
                ),
              },
            ]}
          />
        );
      })}
    </List.Root>
  );
};

const NodepoolResources = ({ items = [] }: { items: BaseType[] }) => {
  const [showHandleNodepool, setShowHandleNodepool] =
    useState<IShowDialog<BaseType | null>>(null);
  const props: IResource = {
    items,
    onEdit: (item) => {
      setShowHandleNodepool({ type: DIALOG_TYPE.EDIT, data: item });
    },
  };
  return (
    <>
      <ListGridView
        gridView={<GridView {...props} />}
        listView={<ListView {...props} />}
      />
      <HandleNodePool
        show={showHandleNodepool}
        setShow={setShowHandleNodepool}
      />
    </>
  );
};

export default NodepoolResources;