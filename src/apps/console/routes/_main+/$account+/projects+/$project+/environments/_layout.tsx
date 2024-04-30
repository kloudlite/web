import { Outlet, useOutletContext } from '@remix-run/react';
import { IProjectContext } from '../_layout';

const EnvsLayout = () => {
  const rootContext = useOutletContext<IProjectContext>();
  return <Outlet context={rootContext} />;
};

export default EnvsLayout;

export const handle = () => {
  return {
    breadcrumV2: () => [
      {
        type: 'advance',
        path: 'Projects',
        optionValue: '',
      },
      {
        type: 'separator',
      },
      {
        type: 'plain',
        content: 'Environments',
      },
    ],
  };
};
