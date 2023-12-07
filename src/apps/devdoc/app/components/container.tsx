import { ReactNode } from 'react';
import { cn } from '~/utiltities/commons';

const Container = ({
  children,
  className,
  layout,
}: {
  children: ReactNode;
  className?: string;
  layout?: 'default' | 'full' | 'raw';
}) => {
  console.log(layout);

  return (
    <div
      className={cn(
        'w-full md:max-w-[1440px] flex-1 m-auto flex flex-row',
        className
      )}
    >
      {children}
    </div>
  );
};
export default Container;
