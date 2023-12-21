import { ReactNode } from 'react';
import { cn } from '../utils/commons';

export const Graph = ({
  className,
  children,
  blurSize = 'md',
  responsive = false,
}: {
  className?: string;
  children: ReactNode;
  blurSize?: 'md' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  responsive?: boolean;
}) => {
  return (
    <div
      className={cn(
        'graph',
        {
          'before:bg-[100%_5%,100%_5%,5%_100%,5%_100%]': blurSize === 'xs',
          'before:bg-[100%_7%,100%_7%,7%_100%,7%_100%]': blurSize === 'sm',
          'before:bg-[100%_10%,100%_10%,5%_100%,5%_100%] 2xl:before:bg-[100%_10%,100%_10%,10%_100%,10%_100%]':
            blurSize === 'md' && responsive,
          'before:bg-[100%_10%,100%_10%,10%_100%,10%_100%]':
            blurSize === 'md' && !responsive,
          'before:bg-[100%_13%,100%_13%,13%_100%,13%_100%]': blurSize === 'lg',
          'before:bg-[100%_15%,100%_15%,15%_100%,15%_100%]': blurSize === 'xl',
          'before:bg-[100%_17%,100%_17%,17%_100%,17%_100%]': blurSize === '2xl',
          'before:bg-[100%_20%,100%_20%,20%_100%,20%_100%]': blurSize === '3xl',
          'before:bg-[100%_23%,100%_23%,23%_100%,23%_100%]': blurSize === '4xl',
          'before:bg-[100%_25%,100%_25%,25%_100%,25%_100%]': blurSize === '5xl',
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export const GraphItem = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  const lineVertical = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2"
      height="100%"
      viewBox="0 0 2 480"
      fill="none"
      preserveAspectRatio="none"
    >
      <path d="M1 0.000488281L1.00002 480.001" stroke="#D4D4D8" />
    </svg>
  );

  const lineHorizontal = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="2"
      viewBox="0 0 1184 2"
      fill="none"
      preserveAspectRatio="none"
    >
      <path d="M0 1.00122L1184 1.00132" stroke="#D4D4D8" />
    </svg>
  );

  return (
    <div className={cn('relative', className)}>
      <div className="absolute pointer-events-none inset-0 z-10">
        <div className="h-[calc(100%+40px)] md:h-[calc(100%+64px)] absolute -left-xs -top-[20px] md:-top-[32px]">
          {lineVertical()}
        </div>
        <div className="h-[calc(100%+40px)] md:h-[calc(100%+64px)] absolute -right-xs -top-[20px] md:-top-[32px]">
          {lineVertical()}
        </div>
        <div className="w-[calc(100%+40px)] md:w-[calc(100%+64px)] absolute -top-xs -left-[20px] md:-left-[32px]">
          {lineHorizontal()}
        </div>
        <div className="w-[calc(100%+40px)] md:w-[calc(100%+64px)] absolute -bottom-xs -left-[20px] md:-left-[32px]">
          {lineHorizontal()}
        </div>
      </div>
      {children}
    </div>
  );
};
