import { IRemixCtx } from '../../types/common';

const getQueries = (ctx: IRemixCtx) => {
  const url = new URL(ctx.request.url);
  // logger.log(url.searchParams);
  return Object.fromEntries(url.searchParams.entries());
};

export default getQueries;
