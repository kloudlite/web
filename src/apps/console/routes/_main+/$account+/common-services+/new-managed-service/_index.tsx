import { ManagedServiceLayoutV2 } from './managed-service-layout-v2';

const NewManagedService = () => {
  return <ManagedServiceLayoutV2 />;
};

export const handle = {
  noMainLayout: true,
  noLayout: true,
};

export default NewManagedService;
