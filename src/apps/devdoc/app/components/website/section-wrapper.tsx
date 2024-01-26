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
    <div
      className={cn(
        'px-3xl md:!px-5xl lg:!px-8xl flex flex-col py-6xl m-auto xl:max-w-[1024px] 2xl:max-w-[1120px] box-content',
        className
      )}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
