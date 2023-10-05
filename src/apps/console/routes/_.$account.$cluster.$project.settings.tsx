import { Outlet, useOutletContext } from '@remix-run/react';
import { useSubNavData } from '~/root/lib/client/hooks/use-create-subnav-action';
import SidebarLayout from '../components/sidebar-layout';
import { IProjectContext } from './_.$account.$cluster.$project';

const Settings = () => {
  const rootContext = useOutletContext<IProjectContext>();
  const subNavAction = useSubNavData();
  return (
    <SidebarLayout
      navItems={[
        { label: 'General', value: 'general' },
        { label: 'Access management', value: 'access-management' },
      ]}
      parentPath="/settings"
      headerTitle="Settings"
      headerActions={subNavAction.data}
    >
      <Outlet context={{ ...rootContext }} />
    </SidebarLayout>
  );
};

export default Settings;
