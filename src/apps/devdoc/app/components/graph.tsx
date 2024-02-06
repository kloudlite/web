import { ReactNode, memo, useEffect, useRef, useState } from 'react';
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
        'before:hidden xl:before:!flex',
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

export const GraphExtended = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <Graph
      className={cn(
        '-mx-11xl 3xl:!-mx-12xl py-7xl md:!py-8xl lg:!py-10xl',
        className
      )}
    >
      <div className="px-11xl 3xl:!px-12xl">{children}</div>
    </Graph>
  );
};

const LineVertical = memo(() => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [res, setRes] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const draw = (drawEvent?: 'normal' | 'resize') => {
    if (!ref.current) {
      return;
    }

    const canvas = ref.current;

    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio || 1;
    let r = res;

    if (!res || drawEvent === 'resize') {
      const temp = {
        width: canvas.clientWidth * pixelRatio,
        height: canvas.clientHeight * pixelRatio,
      };

      r = temp;
      if (!r) {
        return;
      }

      canvas.width = r.width;
      canvas.height = r.height;

      setRes(temp);
    }

    if (!ctx || !r) {
      return;
    }

    // Set the line properties
    ctx.strokeStyle = '#D4D4D8';
    ctx.clearRect(0, 0, r.width, r.height);
    const width = 1 * pixelRatio;
    ctx.lineWidth = width;

    const offset = 32 * pixelRatio;
    const offsetGraphHorizontal = 3;
    const offsetGraphHorizontalBottom = 1;
    const offsetGraphVerticalRight = 3;
    const offsetGraphVerticalLeft = 1;

    // Draw the line
    ctx.beginPath();

    // left
    ctx.moveTo(width + offset - offsetGraphVerticalLeft, 0);
    ctx.lineTo(width + offset - offsetGraphVerticalLeft, r.height + offset * 2);

    // right
    ctx.moveTo(r.width - width - offset + offsetGraphVerticalRight, 0);
    ctx.lineTo(
      r.width - width - offset + offsetGraphVerticalRight,
      r.height + offset * 2
    );

    // top
    ctx.moveTo(
      0 - offsetGraphHorizontal,
      width + offset - offsetGraphHorizontal
    );
    ctx.lineTo(
      r.width + offset * 2 - offsetGraphHorizontal,
      width + offset - offsetGraphHorizontal
    );

    // botom
    ctx.moveTo(0, r.height - offset - offsetGraphHorizontalBottom);
    ctx.lineTo(r.width, r.height - offset - offsetGraphHorizontalBottom);

    ctx.stroke();
  };

  useEffect(() => {
    draw();
    const drawEvent = () => {
      draw('resize');
    };
    window.addEventListener('resize', drawEvent);
    return () => {
      window.removeEventListener('resize', drawEvent);
    };
  }, [ref.current]);

  return <canvas ref={ref} className="h-full w-full pointer-events-none" />;
});

const Lines = memo(() => {
  return (
    <div className="pointer-events-none absolute -left-[32px] -right-[32px] -top-[32px] -bottom-[32px] z-[21]">
      <LineVertical />
    </div>
  );
});

export const GraphItem = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div className={`relative ${className || ''}`}>
      <Lines />

      {children}
    </div>
  );
};
