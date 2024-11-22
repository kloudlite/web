import AppWrapper from '~/console/page-components/app/app-wrapper';
import { Network } from '~/console/routes/_main+/$account+/env+/$environment+/workloads+/new-app/app-network';

const AppNetwork = () => {
  return (
    <AppWrapper title="Network">
      <Network />
    </AppWrapper>
  );
};

export default AppNetwork;
