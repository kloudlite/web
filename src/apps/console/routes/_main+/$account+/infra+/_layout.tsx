import { Outlet, useOutletContext } from '@remix-run/react';

// const Tabs = () => {
//   const { account } = useParams();
//
//   return <CommonTabs baseurl={`/${account}/packages`} tabs={tabs} />;
// };

const Infra = () => {
  const rootContext = useOutletContext();
  return <Outlet context={rootContext} />;
};

export const handle = () => {
  return {
    breadcrumV2: () => [
      {
        type: 'plain',
        content: 'Infra',
      },
    ],

    // navbar: <Tabs />,
  };
};
export default Infra;
