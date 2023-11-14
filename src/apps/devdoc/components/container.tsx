import { ReactNode } from 'react';
import { cn } from '~/utiltities/commons';

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
        'w-full md:max-w-[1440px] flex-1 m-auto p-3xl md:py-0 md:px-4xl flex flex-row',
        className
      )}
    >
      {children}
    </div>
  );
};
export default Container;
