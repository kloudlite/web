import { Outlet, useOutletContext } from '@remix-run/react';
import SidebarLayout from '~/console/components/sidebar-layout';
import { useHandleFromMatches } from '~/root/lib/client/hooks/use-custom-matches';
import { IEnvironmentContext } from '../_layout';

const Workloads = () => {
  const rootContext = useOutletContext<IEnvironmentContext>();
  const noLayout = useHandleFromMatches('noLayout', null);

  if (noLayout) {
    return <Outlet context={rootContext} />;
  }

  return (
    <SidebarLayout
      navItems={[
        { label: 'Apps', value: 'apps' },
        { label: 'Helm charts', value: 'helm-charts' },
      ]}
      parentPath="/workloads"
    >
      <Outlet context={rootContext} />
    </SidebarLayout>
  );
};

export default Workloads;
