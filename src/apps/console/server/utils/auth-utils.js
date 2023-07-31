import { minimalAuth } from '~/root/lib/server/helpers/minimal-auth';
import { redirect } from 'react-router-dom';
import logger from '~/root/lib/client/helpers/log';
import { GQLServerHandler } from '../gql/saved-queries';

const setTocontext = (ctx, data) => {
  ctx.consoleContextProps = (props) => ({
    ...props,
    ...data,
  });
};

const restActions = async (ctx) => {
  const ctxData = {};

  const returnData = await (async () => {
    const { account } = ctx.params;
    if (!account) {
      return redirect('/accounts');
    }

    const { data: accounts, errors: asError } = await GQLServerHandler(
      ctx.request
    ).listAccounts({});

    if (asError) {
      return redirect('/accounts');
    }

    ctxData.accounts = accounts;

    const { data: accountData, errors: aError } = await GQLServerHandler(
      ctx.request
    ).getAccount({
      accountName: account,
    });

    if (aError) {
      logger.error(aError[0]);
      if (accounts.length > 0) {
        ctxData.account = { ...accounts[0] };
        const np = `/${accounts[0].name}/projects`;
        const { pathname } = new URL(ctx.request.url);
        if (np === pathname) {
          return false;
        }
        return redirect(np);
      }
      return redirect('/accounts');
    }

    ctxData.account = accountData;
    return false;
  })();

  setTocontext(ctx, ctxData);
  return returnData;
};

export const setupConsoleContext = async (ctx) => {
  return (await minimalAuth(ctx)) || restActions(ctx);
};