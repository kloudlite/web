import { CSSProperties, ReactNode } from 'react';
import { cn } from '~/app/utils/commons';

const SectionWrapper = ({
  children,
  className,
  noPadding = false,
  style,
}: {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  style?: CSSProperties | undefined;
}) => {
  return (
    <div
      style={style}
      className={cn(
        'wb-flex',
        !noPadding ? 'wb-pt-6xl md:wb-pt-8xl xl:wb-pt-10xl' : '',
        className
      )}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
