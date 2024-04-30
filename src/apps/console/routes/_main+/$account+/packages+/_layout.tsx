import { Outlet, useOutletContext, useParams } from '@remix-run/react';
import { CommonTabs } from '~/console/components/common-navbar-tabs';
import { tabIconSize } from '~/console/utils/commons';
import { Container, HelmLogo, Users } from '~/console/components/icons';
import { IAccountContext } from '../_layout';

export interface IPackageContext extends IAccountContext {}

const iconSize = tabIconSize;
const tabs = [
  {
    label: (
      <span className="flex flex-row items-center gap-lg">
        <Container size={iconSize} />
        Container Repos
      </span>
    ),
    to: '/repos',
    value: '/repos',
  },
  {
    label: (
      <span className="flex flex-row items-center gap-lg">
        <HelmLogo size={iconSize} />
        Helm Repos
      </span>
    ),
    to: '/helm-repos',
    value: '/helm-repos',
  },

  {
    label: (
      <span className="flex flex-row items-center gap-lg">
        <Users size={iconSize} />
        Access Management
      </span>
    ),
    to: '/access-management',
    value: '/access-management',
  },
];

const Tabs = () => {
  const { account } = useParams();

  return <CommonTabs baseurl={`/${account}/packages`} tabs={tabs} />;
};

export const handle = () => {
  return {
    breadcrumV2: () => [
      {
        type: 'plain',
        content: 'Packages',
      },
    ],
    navbar: <Tabs />,
  };
};

const ContainerRegistry = () => {
  const rootContext = useOutletContext<IPackageContext>();

  return <Outlet context={rootContext} />;
};

export default ContainerRegistry;
