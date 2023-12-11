import { redirect } from '@remix-run/node';
import {
  Link,
  Outlet,
  useLoaderData,
  useOutletContext,
  useParams,
} from '@remix-run/react';
import withContext from '~/root/lib/app-setup/with-contxt';
import { IExtRemixCtx } from '~/root/lib/types/common';
import { BrandLogo } from '~/components/branding/brand-logo';
import { ChevronRight } from '@jengaicons/react';
import { CommonTabs } from '../components/common-navbar-tabs';
import {
  IClusters,
  type ICluster,
} from '../server/gql/queries/cluster-queries';
import { GQLServerHandler } from '../server/gql/saved-queries';
import { ensureAccountSet, ensureClusterSet } from '../server/utils/auth-utils';
import { IAccountContext } from './_.$account';
import Breadcrum from '../components/breadcrum';
import { ExtractNodeType, parseName } from '../server/r-utils/common';
import LogoWrapper from '../components/logo-wrapper';

export interface IClusterContext extends IAccountContext {
  cluster: ICluster;
}

const Cluster = () => {
  const rootContext = useOutletContext<IAccountContext>();
  const { cluster } = useLoaderData();
  return <Outlet context={{ ...rootContext, cluster }} />;
};

const ClusterTabs = () => {
  const { account, cluster } = useParams();
  return (
    <CommonTabs
      tabs={[
        {
          label: 'Overview',
          to: '/overview',
          value: '/overview',
        },
        {
          label: 'Compute',
          to: '/nodepools',
          value: '/nodepools',
        },
        {
          label: 'Storage',
          to: '/storage',
          value: '/storage',
        },
        {
          label: 'Network',
          to: '/network/vpn',
          value: '/network',
        },
        {
          label: 'Settings',
          to: '/settings/general',
          value: '/settings',
        },
      ]}
      baseurl={`/${account}/${cluster}`}
    />
  );
};

const NetworkBreadcrum = ({
  cluster,
}: {
  cluster: ExtractNodeType<IClusters>;
}) => {
  const { displayName } = cluster;
  const { account } = useParams();
  return (
    <div className="flex flex-row items-center">
      <Breadcrum.Button
        to={`/${account}/clusters`}
        LinkComponent={Link}
        content={
          <div className="flex flex-row gap-md items-center">
            <ChevronRight size={14} /> Clusters <ChevronRight size={14} />{' '}
          </div>
        }
      />
      <Breadcrum.Button
        to={`/${account}/${parseName(cluster)}/overview/info`}
        LinkComponent={Link}
        content={<span>{displayName}</span>}
      />
    </div>
  );
};

const Logo = () => {
  const { account } = useParams();
  return (
    <LogoWrapper to={`/${account}`}>
      <BrandLogo detailed={false} />
    </LogoWrapper>
  );
};

export const handle = ({
  cluster,
}: {
  cluster: ExtractNodeType<IClusters>;
}) => {
  return {
    navbar: <ClusterTabs />,
    breadcrum: () => <NetworkBreadcrum cluster={cluster} />,
    logo: <Logo />,
  };
};

export const loader = async (ctx: IExtRemixCtx) => {
  const { account, cluster } = ctx.params;
  ensureAccountSet(ctx);
  try {
    const { data, errors } = await GQLServerHandler(ctx.request).getCluster({
      name: cluster,
    });
    if (errors) {
      throw errors[0];
    }
    ensureClusterSet(ctx);
    return withContext(ctx, {
      cluster: data,
    });
  } catch (err) {
    return redirect(`/${account}/clusters`);
  }
};

export default Cluster;
