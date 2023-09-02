import { Plus } from '@jengaicons/react';
import { defer } from '@remix-run/node';
import { useEffect, useState } from 'react';
import { Button } from '~/components/atoms/button';
import { Link, useLoaderData, useOutletContext } from '@remix-run/react';
import AlertDialog from '~/console/components/alert-dialog';
import Wrapper from '~/console/components/wrapper';
import logger from '~/root/lib/client/helpers/log';
import { getPagination, getSearch } from '~/console/server/r-urils/common';
import { GQLServerHandler } from '~/console/server/gql/saved-queries';
import { LoadingComp, pWrapper } from '~/console/components/loading-component';
import {
  ensureAccountSet,
  ensureClusterSet,
} from '~/console/server/utils/auth-utils';
import { parseError } from '~/root/lib/utils/common';
import { parseNodes } from '~/console/server/utils/kresources/aggregated';
import Resource from './config-resource';
import Tools from './tools';
import HandleConfig from './handle-config';

const Configs = () => {
  const [showHandleConfig, setHandleConfig] = useState(null);
  const [showDeleteConfig, setShowDeleteConfig] = useState(false);

  const data = useOutletContext();

  useEffect(() => {
    if (data?.setSubNavAction) {
      data.setSubNavAction({
        action: () => {
          setHandleConfig({ type: 'add', data: null });
        },
      });
    }
  }, []);

  const { promise } = useLoaderData();

  return (
    <>
      <LoadingComp data={promise}>
        {({ configsData }) => {
          const configs = parseNodes(configsData);
          return (
            <Wrapper
              empty={{
                is: configs.length === 0,
                title: 'This is where you’ll manage your Config.',
                content: (
                  <p>
                    You can create a new config and manage the listed configs.
                  </p>
                ),
                action: {
                  content: 'Create config',
                  prefix: <Plus />,
                  LinkComponent: Link,
                  onClick: () => {
                    setHandleConfig({ type: 'add', data: null });
                  },
                },
              }}
            >
              <Tools />
              <Resource items={configs} linkComponent={Link} />
            </Wrapper>
          );
        }}
      </LoadingComp>
      <HandleConfig show={showHandleConfig} setShow={setHandleConfig} />
      {/* Alert Dialog for deleting config */}
      <AlertDialog
        show={showDeleteConfig}
        setShow={setShowDeleteConfig}
        title="Delete config"
        message={"Are you sure you want to delete 'kloud-root-ca.crt"}
        type="critical"
        okText="Delete"
        onSubmit={() => {}}
      />
    </>
  );
};

export default Configs;

export const handle = {
  subheaderAction: () => <Button content="Add new config" prefix={<Plus />} />,
};

export const loader = async (ctx) => {
  ensureAccountSet(ctx);
  ensureClusterSet(ctx);
  const { project, scope, workspace } = ctx.params;

  const promise = pWrapper(async () => {
    try {
      const { data, errors } = await GQLServerHandler(ctx.request).listConfigs({
        project: {
          value: project,
          type: 'name',
        },
        scope: {
          value: workspace,
          type: scope === 'workspace' ? 'workspaceName' : 'environmentName',
        },
        pagination: getPagination(ctx),
        search: getSearch(ctx),
      });
      if (errors) {
        throw errors[0];
      }
      return { configsData: data };
    } catch (err) {
      logger.error(err);
      return { error: parseError(err).message };
    }
  });

  return defer({ promise });
};
