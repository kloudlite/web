import {
  Link,
  Outlet,
  useLoaderData,
  useOutletContext,
  useParams,
} from '@remix-run/react';
import {
  ChevronRight,
  GearSix,
  GitMerge,
  NoOps,
  Nodeless,
} from '@jengaicons/react';
import Breadcrum from '~/console/components/breadcrum';
import { CommonTabs } from '~/console/components/common-navbar-tabs';

import { IRemixCtx, LoaderResult } from '~/root/lib/types/common';
import { GQLServerHandler } from '~/console/server/gql/saved-queries';
import logger from '~/root/lib/client/helpers/log';
import { IPackageContext } from '~/console/routes/_main+/$account+/packages+/_layout';

const LocalBreadcrum = ({ repo }: { repo: string }) => {
  const { account } = useParams();
  return (
    <div className="flex flex-row items-center">
      <Breadcrum.Button
        to={`/${account}/packages`}
        LinkComponent={Link}
        content={
          <div className="flex flex-row gap-md items-center">
            <ChevronRight size={14} />{' '}
            <div className="flex flex-row items-center gap-lg">
              Container Repos
            </div>
            <ChevronRight size={14} />{' '}
          </div>
        }
      />
      <Breadcrum.Button
        to={`/${account}/repo/${repo}`}
        LinkComponent={Link}
        content={<span>{repo}</span>}
      />
    </div>
  );
};

const Tabs = () => {
  const { repo, account } = useParams();
  const iconSize = 16;
  return (
    <CommonTabs
      baseurl={`/${account}/repo/${repo}`}
      tabs={[
        {
          label: (
            <span className="flex flex-row items-center gap-lg">
              <Nodeless size={iconSize} />
              Images
            </span>
          ),
          value: '/images',
          to: '/images',
        },
        {
          label: (
            <span className="flex flex-row items-center gap-lg">
              <GitMerge size={iconSize} />
              Build Integrations
            </span>
          ),
          value: '/builds',
          to: '/builds',
        },
        {
          label: (
            <span className="flex flex-row items-center gap-lg">
              <NoOps size={iconSize} />
              Build Runs
            </span>
          ),
          value: '/buildruns',
          to: '/buildruns',
        },
        {
          label: (
            <span className="flex flex-row items-center gap-lg">
              <GearSix size={iconSize} />
              Settings
            </span>
          ),
          value: '/settings',
          to: '/settings',
        },
      ]}
    />
  );
};

export const loader = async (ctx: IRemixCtx) => {
  const { repo } = ctx.params;

  const repoName = atob(repo || '');

  try {
    const { data, errors } = await GQLServerHandler(ctx.request).getLogins({});

    if (errors) {
      throw errors[0];
    }

    const { data: e, errors: dErrors } = await GQLServerHandler(
      ctx.request
    ).loginUrls({});

    if (dErrors) {
      throw dErrors[0];
    }

    return {
      loginUrls: e,
      logins: data,
      repoName,
    };
  } catch (err) {
    logger.error(err);
  }

  return {
    logins: {},
    loginUrls: {},
    repoName,
  };
};

export const handle = ({ repoName }: LoaderResult<typeof loader>) => {
  return {
    navbar: <Tabs />,
    breadcrum: () => <LocalBreadcrum repo={repoName} />,
  };
};

export type IRepoContext = IPackageContext & LoaderResult<typeof loader>;

const Repo = () => {
  const rootContext = useOutletContext<IPackageContext>();
  const { logins, loginUrls } = useLoaderData<typeof loader>();
  return <Outlet context={{ ...rootContext, logins, loginUrls }} />;
};

export default Repo;
