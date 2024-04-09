import { ReactNode } from 'react';
import { cn } from '~/app/utils/commons';

const SectionWrapper = ({
  children,
  className,
  noPadding = false,
}: {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}) => {
  return (
    <div
      className={cn(
        'flex',
        !noPadding ? 'pt-7xl md:!pt-8xl xl:!pt-10xl' : '',
        className
      )}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
