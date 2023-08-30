import { ReactNode } from 'react';
import { cn } from '../utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div className={cn('flex flex-1 justify-center px-3xl', className)}>
      <div className="flex-1 w-full max-w-8xl min-w-[320px]">{children}</div>
    </div>
  );
};

export default Container;
