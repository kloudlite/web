import { DotsThreeOutlineFill, Trash } from '@jengaicons/react';
import { useState } from 'react';
import AnimateHide from '~/components/atoms/animate-hide';
import { Badge } from '~/components/atoms/badge';
import { generateKey } from '~/components/utils';
import CodeView from '~/console/components/code-view';
import { ListItemWithSubtitle } from '~/console/components/console-list-components';
import Grid from '~/console/components/grid';
import List from '~/console/components/list';
import ListGridView from '~/console/components/list-grid-view';
import ResourceExtraAction from '~/console/components/resource-extra-action';
import { IShowDialog } from '~/console/components/types.d';
import { IDigests } from '~/console/server/gql/queries/tags-queries';
import {
  ExtractNodeType,
  parseCreationTime,
} from '~/console/server/r-utils/common';
import { DIALOG_TYPE } from '~/console/utils/commons';
import SHADialog from './sha-dialog';

const RESOURCE_NAME = 'tag';
type BaseType = ExtractNodeType<IDigests>;

const parseItem = (item: BaseType) => {
  return {
    sha: item.digest,
    tags: item.tags,
    id: item.digest,
    updateInfo: `Published ${parseCreationTime(item)}`,
  };
};

const ExtraButton = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <ResourceExtraAction
      options={[
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

export interface ISHADialogData {
  tag: string | null;
  sha: string;
}

const TagView = ({
  tags,
  sha,
  updateInfo,
  showSHA = (_) => _,
}: {
  tags: Array<string>;
  sha: string;
  updateInfo: string;
  showSHA: (data: ISHADialogData) => void;
}) => {
  const [toggleSha, setToggleSha] = useState(false);

  let data = (
    <code
      className="cursor-pointer"
      onClick={() => showSHA({ tag: null, sha })}
    >
      {sha}
    </code>
  );
  let subtitle = <span>{updateInfo}</span>;

  if (!((tags.length === 1 && !tags[0]) || tags.length === 0)) {
    data = (
      <div className="flex flex-row items-center gap-lg mb-md">
        {tags.map((tag) => (
          <button
            onClick={() => showSHA({ tag, sha })}
            key={tag}
            className="rounded-full outline-none ring-offset-1 focus-visible:ring-2 focus-visible:ring-border-focus hover:underline text-text-primary"
          >
            <Badge type="info">{tag}</Badge>
          </button>
        ))}
      </div>
    );

    subtitle = (
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-lg">
          <span>{updateInfo}</span>
          <span>&bull;</span>
          <div className="flex flex-row items-center gap-lg">
            <span>Digest</span>
            <button
              onClick={() => setToggleSha((prev) => !prev)}
              className="px-md rounded outline-none ring-offset-1 focus-visible:ring-2 focus-visible:ring-border-focus border border-border-default hover:bg-surface-basic-hovered active:bg-surface-basic-pressed"
            >
              <DotsThreeOutlineFill size={16} />
            </button>
          </div>
        </div>
        <AnimateHide show={toggleSha} className="w-fit">
          <div className="mt-lg">
            <CodeView copy data={sha} />
          </div>
        </AnimateHide>
      </div>
    );
  }

  return <ListItemWithSubtitle data={data} subtitle={subtitle} />;
};

interface IResource {
  items: BaseType[];
  onDelete: (item: BaseType) => void;
  showSHA: (data: ISHADialogData) => void;
}
const GridView = ({ items, onDelete = (_) => _, showSHA }: IResource) => {
  return (
    <Grid.Root className="!grid-cols-1 md:!grid-cols-3">
      {items.map((item, index) => {
        const { sha, tags, id, updateInfo } = parseItem(item);
        const keyPrefix = `${RESOURCE_NAME}-${id}-${index}`;
        return <Grid.Column key={id} rows={[]} />;
      })}
    </Grid.Root>
  );
};

const ListView = ({
  items,
  onDelete = (_) => _,
  showSHA = (_) => _,
}: IResource) => {
  return (
    <List.Root>
      {items.map((item, index) => {
        const { sha, tags, id, updateInfo } = parseItem(item);
        const keyPrefix = `${RESOURCE_NAME}-${id}-${index}`;

        return (
          <List.Row
            key={id}
            className="!p-3xl"
            columns={[
              {
                key: generateKey(keyPrefix, id),
                className: 'flex-1',
                render: () => (
                  <TagView
                    tags={tags}
                    sha={sha}
                    updateInfo={updateInfo}
                    showSHA={showSHA}
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

const TagsResources = ({ items = [] }: { items: BaseType[] }) => {
  const [showSHADialog, setShowSHADialog] =
    useState<IShowDialog<ISHADialogData>>(null);
  // const [showDeleteDialog, setShowDeleteDialog] = useState<BaseType | null>(
  //   null
  // );

  // const api = useConsoleApi();
  // const reloadPage = useReload();

  const props: IResource = {
    items,
    onDelete: (item) => {
      // setShowDeleteDialog(item);
    },
    showSHA: (data) => {
      setShowSHADialog({ type: DIALOG_TYPE.NONE, data });
    },
  };

  return (
    <>
      <ListGridView
        listView={<ListView {...props} />}
        gridView={<ListView {...props} />}
      />
      {/* <DeleteDialog
        resourceName={showDeleteDialog?.name}
        resourceType={RESOURCE_NAME}
        show={showDeleteDialog}
        setShow={setShowDeleteDialog}
        onSubmit={async () => {
          try {
            const { errors } = await api.deleteRepo({
              name: showDeleteDialog?.name || '',
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
      /> */}
      <SHADialog show={showSHADialog} setShow={setShowSHADialog} />
    </>
  );
};

export default TagsResources;