import { Outlet, useOutletContext } from '@remix-run/react';
import SidebarLayout from '~/console/components/sidebar-layout';
import { useHandleFromMatches } from '~/root/lib/client/hooks/use-custom-matches';
import { IAccountContext } from '../_layout';

const Infra = () => {
  const rootContext = useOutletContext<IAccountContext>();
  const noLayout = useHandleFromMatches('noLayout', null);

  if (noLayout) {
    return <Outlet context={rootContext} />;
  }
  return (
    <SidebarLayout
      navItems={[
        { label: 'Managed Services', value: 'managed-services' },
        { label: 'Helm Charts', value: 'helm-charts' },
      ]}
      parentPath="/common-services"
    >
      <Outlet context={rootContext} />
    </SidebarLayout>
  );
};

export default Infra;
