import { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[1440px] flex-1 m-auto px-4xl flex flex-row">
      {children}
    </div>
  );
};
export default Container;
