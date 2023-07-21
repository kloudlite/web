import { Header } from '~/root/src/apps/devdoc/components/header.jsx';
import { Sidebar } from '~/root/src/apps/devdoc/components/sidebar.jsx';
import { Outlet } from '@remix-run/react';

const Layout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-row min-h-screen max-w-7xl mx-auto w-full">
        <Sidebar />
        <div className="pl-docSidebarWidth flex flex-grow flex-col">
          <Outlet />
          <div>Footer</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
