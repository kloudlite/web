import { useState } from 'react';
import { cn } from '~/components/utils';

const ScrollArea = ({
  children,
  className,
  leftblur = true,
  rightblur = true,
  blurfrom = '',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = ({ target }) => {
    setIsScrolled(target.scrollLeft > 0);
  };
  return (
    <div className={cn('w-0 relative', className)}>
      {isScrolled && leftblur && (
        <div
          className={cn(
            'z-10 bg-gradient-to-r to-transparent absolute h-full w-2xl -left-[3px] top-0',
            {
              'from-surface-basic-subdued': !blurfrom,
            },
            blurfrom
          )}
        />
      )}
      <div
        className="no-scrollbar overflow-x-scroll overflow-y-hidden flex flex-row pl-[3px] -ml-[3px]"
        onScroll={handleScroll}
      >
        {children}
        {rightblur && <div className="min-w-[16px]" />}
      </div>
      {rightblur && (
        <div
          className={cn(
            'bg-gradient-to-l to-transparent absolute h-full w-2xl right-0 top-0',
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
