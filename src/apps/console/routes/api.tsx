import { RootAPIAction } from '~/root/lib/app-setup/api';
import { json } from 'react-router-dom';
import { parseError } from '~/root/lib/utils/common';
import { IRemixCtx } from '~/root/lib/types/common';
import { GQLServerHandler } from '../server/gql/saved-queries';

export const loader = async () => {
  return json({ hi: 'hello' });
};

export const action = async (ctx: IRemixCtx) => {
  try {
    const res = await RootAPIAction(GQLServerHandler)(ctx);
    return res;
  } catch (err) {
    return json({ errors: [parseError(err).message] }, 500);
  }
};
