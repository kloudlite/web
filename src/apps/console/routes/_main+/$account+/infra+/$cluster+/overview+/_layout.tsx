/* eslint-disable jsx-a11y/control-has-associated-label */
import { Outlet, useOutletContext } from '@remix-run/react';
import SidebarLayout from '~/console/components/sidebar-layout';
import { useSubNavData } from '~/root/lib/client/hooks/use-create-subnav-action';
import { IClusterContext } from '../_layout';

const ClusterOverview = () => {
  const rootContext = useOutletContext<IClusterContext>();
  const subNavAction = useSubNavData();
  return (
    <SidebarLayout
      navItems={[
        { label: 'Info', value: 'info' },
        { label: 'Logs & Metrics', value: 'logs-n-metrics' },
      ]}
      headerTitle=""
      parentPath="/overview"
      headerActions={subNavAction.data}
    >
      <Outlet context={{ ...rootContext }} />
    </SidebarLayout>
  );
};
export default ClusterOverview;
