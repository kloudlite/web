import { ReactNode } from 'react';
import { cn } from '../utils';

interface IContainer {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: IContainer) => {
  return (
    <div className={cn('flex flex-1 justify-center px-8xl', className)}>
      <div className="flex-1 w-full  min-w-[320px] max-w-screen-2xl">
        {children}
      </div>
    </div>
  );
};

export default Container;
