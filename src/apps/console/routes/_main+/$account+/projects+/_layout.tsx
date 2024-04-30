import { Outlet, useOutletContext } from '@remix-run/react';
import { IAccountContext } from '../_layout';

const ProjectsLayout = () => {
  const rootContext = useOutletContext<IAccountContext>();
  return <Outlet context={rootContext} />;
};

export default ProjectsLayout;

export const handle = () => {
  return {
    breadcrumV2: () => [
      {
        type: 'plain',
        content: 'Projects',
      },
    ],
  };
};
