import { Outlet, useOutletContext } from '@remix-run/react';
import { IAccountContext } from '../_layout';

const EnvsLayout = () => {
  const rootContext = useOutletContext<IAccountContext>();
  return <Outlet context={rootContext} />;
};

export default EnvsLayout;

export const handle = () => {
  return {
    breadcrumV2: () => [
      // {
      //   type: 'advance',
      //   path: 'Environments',
      //   optionValue: '',
      // },
      // {
      //   type: 'separator',
      // },
      {
        type: 'plain',
        content: 'Environments',
      },
    ],
  };
};
