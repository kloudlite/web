import { Plus } from '@jengaicons/react';
import { defer } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { LoadingComp, pWrapper } from '~/console/components/loading-component';
import SubNavAction from '~/console/components/sub-nav-action';
import { IShowDialog } from '~/console/components/types.d';
import Wrapper from '~/console/components/wrapper';
import { GQLServerHandler } from '~/console/server/gql/saved-queries';
import { ensureAccountSet } from '~/console/server/utils/auth-utils';
import { getPagination, getSearch } from '~/console/server/utils/common';
import { DIALOG_DATA_NONE } from '~/console/utils/commons';
import logger from '~/root/lib/client/helpers/log';
import { IRemixCtx } from '~/root/lib/types/common';
import CredResources from './cred-resources';
import HandleCrCred from './handle-cr-cred';
import Tools from './tools';

export const loader = async (ctx: IRemixCtx) => {
  const promise = pWrapper(async () => {
    ensureAccountSet(ctx);
    const { data, errors } = await GQLServerHandler(ctx.request).listCred({
      pagination: getPagination(ctx),
      search: getSearch(ctx),
    });
    if (errors) {
      logger.error(errors[0]);
      throw errors[0];
    }

    return {
      credentials: data || {},
    };
  });

  return defer({ promise });
};

const ContainerRegistryAccessManagement = () => {
  const [showHandleCred, setShowHandleCred] = useState<IShowDialog>(null);
  const { promise } = useLoaderData<typeof loader>();

  return (
    <>
      <LoadingComp data={promise}>
        {({ credentials }) => {
          const creds = credentials.edges?.map(({ node }) => node);
          const data = {
            action: () => {
              setShowHandleCred(DIALOG_DATA_NONE);
            },
            content: 'Create new credential',
            show: true,
          };
          return (
            <>
              <SubNavAction data={data} visible={creds.length > 0} />
              <Wrapper
                empty={{
                  is: creds?.length === 0,
                  title: 'This is where you’ll manage your credentials.',
                  content: (
                    <p>
                      You can create a new credential and manage the listed
                      credentials.
                    </p>
                  ),
                  action: {
                    content: 'Create credential',
                    prefix: <Plus />,
                    onClick: () => {
                      setShowHandleCred(DIALOG_DATA_NONE);
                    },
                  },
                }}
                tools={<Tools />}
              >
                <CredResources items={creds} />
              </Wrapper>
            </>
          );
        }}
      </LoadingComp>
      <HandleCrCred setShow={setShowHandleCred} show={showHandleCred} />
    </>
  );
};

export default ContainerRegistryAccessManagement;