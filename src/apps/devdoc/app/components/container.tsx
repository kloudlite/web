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
    <div
      className={cn(
        'wb-w-full wb-flex-1 wb-m-auto wb-flex wb-max-w-[1440px]',
        className
      )}
    >
      {children}
    </div>
  );
};
export default Container;
