import { ReactNode } from 'react';
import { cn } from '../utils/commons';

const Wrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'lg:wb-m-auto lg:wb-max-w-[1024px] wb-w-full wb-px-3xl md:wb-px-5xl lg:wb-px-8xl xl:wb-px-11xl 2xl:wb-px-12xl xl:wb-max-w-[1280px] 2xl:wb-max-w-[1440px] 3xl:wb-max-w-[1408px] lg:wb-box-border 3xl:wb-box-content',
        className,
      )}
    >
      {children}
    </div>
  );
};
export default Wrapper;
