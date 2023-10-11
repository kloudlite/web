import { ReactNode, useState } from 'react';
import { cn } from '../utils';

interface IScrollArea {
  children: ReactNode;
  className?: string;
  leftblur?: boolean;
  rightblur?: boolean;
  blurfrom?: string;
}

const ScrollArea = ({
  children,
  className,
  leftblur = true,
  rightblur = true,
  blurfrom = '',
}: IScrollArea) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = ({ target }: any) => {
    setIsScrolled(target.scrollLeft > 0);
  };
  return (
    <div className={cn('w-0 relative', className)}>
      {isScrolled && leftblur && (
        <div
          className={cn(
            'z-20 bg-gradient-to-r to-transparent absolute h-full w-2xl -left-[3px] top-0',
            {
              'from-surface-basic-subdued': !blurfrom,
            },

            blurfrom
          )}
        />
      )}
      <div
        tabIndex={-1}
        className="no-scrollbar overflow-x-scroll flex flex-row py-[3px] pl-[3px] -ml-[3px] pr-2xl whitespace-nowrap"
        onScroll={handleScroll}
      >
        {children}
        {rightblur && <div className="w-[3px] min-w-[3px]" />}
      </div>
      {rightblur && (
        <div
          className={cn(
            'bg-gradient-to-l to-transparent absolute h-full w-2xl right-0 top-0 z-20',
            {
              'from-surface-basic-subdued': !blurfrom,
            },
            blurfrom
          )}
        />
      )}
    </div>
  );
};

export default ScrollArea;
