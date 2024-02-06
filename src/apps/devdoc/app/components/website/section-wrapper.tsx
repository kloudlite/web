import { ReactNode } from 'react';
import { cn } from '~/app/utils/commons';

const SectionWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex pt-7xl md:!pt-8xl xl:!pt-10xl', className)}>
      {children}
    </div>
  );
};

export default SectionWrapper;
