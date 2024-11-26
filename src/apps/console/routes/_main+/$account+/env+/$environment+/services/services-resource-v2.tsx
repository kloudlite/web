import { useOutletContext } from '@remix-run/react';
import { useState } from 'react';
import { Badge } from '@kloudlite/design-system/atoms/badge';
import { generateKey } from '@kloudlite/design-system/utils';
import {
  ListItem,
  ListItemV2,
  ListTitle,
  ListTitleV2,
  listClass,
} from '~/console/components/console-list-components';
import Grid from '~/console/components/grid';
import { LinkBreak, Repeat } from '~/console/components/icons';
import ListGridView from '~/console/components/list-grid-view';
import ListV2 from '~/console/components/listV2';
import ResourceExtraAction, { IResourceExtraItem } from '~/console/components/resource-extra-action';
import {
  ExtractNodeType,
  parseName,
  parseUpdateOrCreatedOn,
} from '~/console/server/r-utils/common';
import { useWatchReload } from '~/lib/client/helpers/socket/useWatch';
import { IServiceBinding } from '~/console/server/gql/queries/service-binding-queries';
import HandleIntercept from './handle-intercept-service';
import { NN } from '~/root/lib/types/common';
import TooltipV2 from '@kloudlite/design-system/atoms/tooltipV2';
import { handleError } from '~/root/lib/utils/common';
import { useConsoleApi } from '~/console/server/gql/api-provider';
import { IEnvironmentContext } from '../_layout';
import { useReload } from '~/root/lib/client/helpers/reloader';
import { toast } from '@kloudlite/design-system/molecule/toast';

const RESOURCE_NAME = 'managed resource';
type BaseType = ExtractNodeType<IServiceBinding>;

const parseItem = (item: BaseType) => {
  return {
    name: item.spec?.serviceRef?.name || "",
    updateInfo: {
      time: parseUpdateOrCreatedOn(item),
    },
  };
};

type OnAction = ({
  action,
  item,
}: {
  action: 'intercept' | 'remove_intercept';
  item: BaseType;
}) => void;

type IExtraButton = {
  onAction: OnAction;
  item: BaseType;
};

const ExtraButton = ({ onAction, item }: IExtraButton) => {
  const iconSize = 16;

  let options: IResourceExtraItem[] = [
  ]

  if (item.interceptStatus?.intercepted) {
    options = [
      {
        label: 'Remove intercept',
        icon: <LinkBreak size={iconSize} />,
        type: 'item',
        onClick: () => onAction({ action: 'remove_intercept', item }),
        key: 'remove-intercept',
      },
      ...options,
    ];
  } else {
    options = [
      {
        label: 'Intercept',
        icon: <Repeat size={iconSize} />,
        type: 'item',
        onClick: () => onAction({ action: 'intercept', item }),
        key: 'intercept',
      },
      ...options,
    ];
  }

  return (
    <ResourceExtraAction
      options={options}
    />
  );
};


const InterceptPortView = ({
  ports = [],
  devName = '',
}: {
  ports: NN<NN<ExtractNodeType<IServiceBinding>['interceptStatus']>['portMappings']>;
  devName: string;
}) => {
  return (
    <div className="flex flex-row items-center gap-md pulsable">
      <TooltipV2
        content={
          <div>
            <span className="bodyMd-medium text-text-soft">
              Intercepted to{' '}
              <span className="bodyMd-medium text-text-strong">{devName}</span>
            </span>
            <div className="flex flex-row gap-md py-md">
              {ports?.map((d) => {
                return (
                  <Badge className="shrink-0" key={d.containerPort}>
                    <div>
                      {d.containerPort} → {d.servicePort}
                    </div>
                  </Badge>
                );
              })}
            </div>
          </div>
        }
      >
        <div className="bodyMd-medium text-text-strong w-fit truncate">
          {ports?.length === 1 ? (
            <span>{ports.length} port</span>
          ) : (
            <span>{ports.length} ports</span>
          )}
          <span className="text-text-soft">
            {' '}
            intercepted to{' '}
            <span className="bodyMd-medium text-text-strong truncate">
              {devName}
            </span>
          </span>
        </div>
      </TooltipV2>
    </div>
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
            render: () => 'Service Name',
            name: 'name',
            className: listClass.title,
          },
          {
            render: () => '',
            name: 'intercept',
            className: 'w-[250px] truncate',
          },
          {
            render: () => '',
            name: 'flex-pre',
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
              intercept: {
                render: () =>
                  i.interceptStatus?.intercepted ? (
                    <div>
                      <InterceptPortView
                        ports={i.interceptStatus.portMappings || []}
                        devName={i.interceptStatus.toAddr || ''}
                      />
                    </div>
                  ) : null,
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

  const { environment, account } = useOutletContext<IEnvironmentContext>()
  const api = useConsoleApi()
  const reload = useReload()
  const [visible, setVisible] = useState(false);
  const [mi, setItem] = useState<ExtractNodeType<IServiceBinding>>();

  useWatchReload(
    items.map((i) => {
      return `account:${account}.environment:${environment}.service_binding:${parseName(i)}`;
    }),
  );


  const removeIntercept = async (item: BaseType) => {
    try {
      if (item.interceptStatus && item.spec?.serviceRef) {
        const { errors } = await api.removeInterceptService({
          envName: parseName(environment),
          interceptTo: item.interceptStatus?.toAddr,
          serviceName: item.spec?.serviceRef?.name,
          portMappings: item.interceptStatus.portMappings
        })
        if (errors) {
          throw errors[0]
        }
        toast.success("Service intercept is removed.")
        reload()
      }
    } catch (e) {
      handleError(e)
    }
  }

  const props: IResource = {
    items,
    onAction: ({ action, item }) => {
      switch (action) {
        case 'intercept':
          setItem(item)
          setVisible(true)
          break;
        case 'remove_intercept':
          removeIntercept(item)
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
      <HandleIntercept
        {...{
          visible,
          setVisible,
          service: mi,
        }}
      />

    </>
  );
};

export default ServiceBindingsResourcesV2;
