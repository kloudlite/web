import { ManagedServiceLayoutV3 } from './managed-service-layout-v3';

const NewManagedService = () => {
  // return <ManagedServiceLayout />;
  return <ManagedServiceLayoutV3 />;
};

export const handle = {
  noMainLayout: true,
  noLayout: true,
};

export default NewManagedService;
