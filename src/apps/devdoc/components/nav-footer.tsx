import { ReactNode } from 'react';

const NavFooter = ({ children }: { children: ReactNode }) => {
  return (
    <div className="sticky bottom-0">
      <div className="border-t border-border-default my-5xl" />
      {children}
    </div>
  );
};

export default NavFooter;
