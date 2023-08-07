import { RootAPIAction } from '~/root/lib/app-setup/api';
import { json } from 'react-router-dom';
import { GQLServerHandler } from '../server/gql/saved-queries';

export const loader = async () => {
  return json({ hi: 'hello' });
};

export const action = async (...etc) => {
  try {
    const res = await RootAPIAction(GQLServerHandler)(...etc);
    return res;
  } catch (err) {
    return json({ errors: [err.message] }, 500);
  }
};