import { RootAPIAction } from '~/root/lib/app-setup/api';
import { json } from 'react-router-dom';
import { IRemixCtx } from '~/root/lib/types/common';
import { GQLServerHandler } from '~/auth/server/gql/saved-queries';

export const action = async (ctx: IRemixCtx) => {
  try {
    const res = await RootAPIAction(GQLServerHandler)(ctx);
    return res;
  } catch (err) {
    return json({
      errors: [
        {
          message: (err as Error).message,
        },
      ],
    });
  }
};
