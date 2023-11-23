import { Trash, PencilLine, Gear } from '@jengaicons/react';
import { useState } from 'react';
import { toast } from '~/components/molecule/toast';
import { generateKey, titleCase } from '~/components/utils';
import {
  ListBody,
  ListItemWithSubtitle,
  ListTitle,
} from '~/console/components/console-list-components';
import DeleteDialog from '~/console/components/delete-dialog';
import Grid from '~/console/components/grid';
import List from '~/console/components/list';
import ListGridView from '~/console/components/list-grid-view';
import ResourceExtraAction from '~/console/components/resource-extra-action';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { IDomains } from '~/console/server/gql/queries/domain-queries';
import {
  ExtractNodeType,
  parseUpdateOrCreatedBy,
  parseUpdateOrCreatedOn,
} from '~/console/server/r-utils/common';
import { useReload } from '~/root/lib/client/helpers/reloader';
import { handleError } from '~/root/lib/utils/common';
import HandleDomain from './handle-domain';
import DomainDetailPopup from './domain-detail';

const RESOURCE_NAME = 'domain';
type BaseType = ExtractNodeType<IDomains>;

const parseItem = (item: BaseType) => {
  return {
    name: item.displayName,
    id: item.id,
    domainName: item.domainName,
    updateInfo: {
      author: `Updated by ${parseUpdateOrCreatedBy(item)}`,
      time: parseUpdateOrCreatedOn(item),
    },
  };
};

const ExtraButton = ({
  onDelete,
  onEdit,
  showDetail,
}: {
  onDelete: () => void;
  onEdit: () => void;
  showDetail: () => void;
}) => {
  return (
    <ResourceExtraAction
      options={[
        {
          label: 'Edit',
          icon: <PencilLine size={16} />,
          type: 'item',
          onClick: onEdit,
          key: 'edit',
        },
        {
          label: 'Domain detail',
          icon: <Gear size={16} />,
          type: 'item',
          onClick: showDetail,
          key: 'domain-detail',
        },
        {
          label: 'Delete',
          icon: <Trash size={16} />,
          type: 'item',
          onClick: onDelete,
          key: 'delete',
          className: '!text-text-critical',
        },
      ]}
    />
  );
};

interface IResource {
  items: BaseType[];
  onDelete: (item: BaseType) => void;
  onEdit: (item: BaseType) => void;
  showDetail: (item: BaseType) => void;
}

const GridView = ({ items, onDelete, onEdit, showDetail }: IResource) => {
  return (
    <Grid.Root className="!grid-cols-1 md:!grid-cols-3">
      {items.map((item, index) => {
        const { name, domainName, id, updateInfo } = parseItem(item);
        const keyPrefix = `${RESOURCE_NAME}-${id}-${index}`;
        return (
          <Grid.Column
            key={id}
            rows={[
              {
                key: generateKey(keyPrefix, name + id),
                render: () => (
                  <ListTitle
                    title={name}
                    action={
                      <ExtraButton
                        onDelete={() => onDelete(item)}
                        onEdit={() => onEdit(item)}
                        showDetail={() => showDetail(item)}
                      />
                    }
                  />
                ),
              },
              {
                key: generateKey(keyPrefix, domainName),
                render: () => <ListBody data={domainName} />,
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

const ListView = ({ items, onDelete, onEdit, showDetail }: IResource) => {
  return (
    <List.Root>
      {items.map((item, index) => {
        const { name, id, domainName, updateInfo } = parseItem(item);
        const keyPrefix = `${RESOURCE_NAME}-${id}-${index}`;
        return (
          <List.Row
            key={id}
            className="!p-3xl"
            columns={[
              {
                key: generateKey(keyPrefix, name + id),
                className: 'flex-1',
                render: () => <ListTitle title={name} />,
              },
              {
                key: generateKey(keyPrefix, domainName),
                className: 'w-[300px] text-start',
                render: () => <ListBody data={domainName} />,
              },
              {
                key: generateKey(keyPrefix, updateInfo.author),
                className: 'w-[180px]',
                render: () => (
                  <ListItemWithSubtitle
                    data={updateInfo.author}
                    subtitle={updateInfo.time}
                  />
                ),
              },
              {
                key: generateKey(keyPrefix, 'action'),
                render: () => (
                  <ExtraButton
                    onDelete={() => onDelete(item)}
                    onEdit={() => onEdit(item)}
                    showDetail={() => showDetail(item)}
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

const DomainResources = ({ items = [] }: { items: BaseType[] }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState<BaseType | null>(
    null
  );
  const [visible, setVisible] = useState<BaseType | null>(null);
  const [domainDetail, setDomainDetail] = useState<BaseType | null>(null);
  const api = useConsoleApi();
  const reloadPage = useReload();

  const props: IResource = {
    items,
    onDelete: (item) => {
      setShowDeleteDialog(item);
    },
    onEdit: (item) => {
      setVisible(item);
    },
    showDetail: (item) => {
      setDomainDetail(item);
    },
  };
  return (
    <>
      <ListGridView
        listView={<ListView {...props} />}
        gridView={<GridView {...props} />}
      />
      <DeleteDialog
        resourceName={showDeleteDialog?.displayName}
        resourceType={RESOURCE_NAME}
        show={showDeleteDialog}
        setShow={setShowDeleteDialog}
        onSubmit={async () => {
          try {
            const { errors } = await api.deleteDomain({
              domainName: showDeleteDialog!.domainName,
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
      <HandleDomain
        {...{
          isUpdate: true,
          data: visible!,
          visible: !!visible,
          setVisible: () => setVisible(null),
        }}
      />
      <DomainDetailPopup
        {...{
          visible: !!domainDetail,
          setVisible: () => setDomainDetail(null),
          data: domainDetail!,
        }}
      />
    </>
  );
};

export default DomainResources;
