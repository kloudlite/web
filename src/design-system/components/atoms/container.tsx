import { ReactNode } from 'react';
import { cn } from '../utils';

interface IContainer {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: IContainer) => {
  return (
    <div className={cn('flex flex-1 justify-center px-8xl', className)}>
      <div className="flex-1 w-full  min-w-[320px]">{children}</div>
    </div>
  );
};

export default Container;
