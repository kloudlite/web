import { ReactNode } from 'react';
import { cn } from '../utils/commons';

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('w-full flex-1 m-auto flex max-w-[1440px]', className)}>
      {children}
    </div>
  );
};
export default Container;
