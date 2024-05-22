import {
  CSSProperties,
  ReactNode,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../utils/commons';

const strokeColor = 'wb-bg-border-dark dark:wb-bg-border-darktheme-dark';
export const Graph = ({
  className,
  children,
  blurSize = 'md',
  style,
}: {
  className?: string;
  children: ReactNode;
  blurSize?: 'md' | 'lg';
  style?: CSSProperties | undefined;
}) => {
  return (
    <div
      style={style}
      className={cn(
        'graph',
        'before:wb-hidden xl:before:!wb-flex ',
        {
          'before:wb-bg-[100%_6%,100%_6%,3%_100%,3%_100%]': blurSize === 'lg',
          'before:wb-bg-[100%_6%,100%_6%,11%_100%,11%_100%]': blurSize === 'md',
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
  innerClass,
  style,
}: {
  children?: ReactNode;
  className?: string;
  innerClass?: string;
  style?: CSSProperties | undefined;
}) => {
  return (
    <Graph
      className={cn(
        'lg:-wb-mx-11xl 3xl:-wb-mx-12xl wb-py-7xl md:wb-py-8xl lg:wb-py-10xl',
        className
      )}
      style={style}
    >
      <div className={cn('lg:wb-px-11xl 3xl:wb-px-12xl', innerClass)}>
        {children}
      </div>
    </Graph>
  );
};

const _LineVertical = memo(() => {
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
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);

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

  return (
    <canvas ref={ref} className="h-full w-full pointer-events-none test" />
  );
});

interface ILines {
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
}

const Lines = memo(
  ({ left = true, right = true, top = true, bottom = true }: ILines) => {
    return (
      <div className="wb-pointer-events-none wb-absolute wb-inset-0 wb-z-[21]">
        <div className="wb-relative wb-h-full wb-w-full">
          {left && (
            <div
              className={cn(
                'wb-absolute wb-left-0 -wb-top-[20px] lg:-wb-top-[32px] -wb-bottom-[20px] lg:-wb-bottom-[32px] wb-w-[1.5px]  wb-z-[21]',
                strokeColor
              )}
            />
          )}
          {right && (
            <div
              className={cn(
                'wb-absolute -wb-right-xs -wb-top-[20px] lg:-wb-top-[32px] -wb-bottom-[20px] lg:-wb-bottom-[32px] wb-w-[1.5px] wb-z-[21]',
                strokeColor
              )}
            />
          )}
          {top && (
            <div
              className={cn(
                'wb-absolute -wb-top-xs -wb-left-[20px] -wb-right-[20px] lg:-wb-left-[32px] lg:-wb-right-[32px] wb-h-[1.5px] wb-z-[21]',
                strokeColor
              )}
            />
          )}
          {bottom && (
            <div
              className={cn(
                'wb-absolute wb-bottom-0 -wb-left-[20px] -wb-right-[20px] lg:-wb-left-[32px] lg:-wb-right-[32px] wb-h-[1.5px] wb-z-[21]',
                strokeColor
              )}
            />
          )}
        </div>
      </div>
    );
  }
);

export const GraphItem = ({
  className,
  children,
  lines,
}: {
  className?: string;
  children?: ReactNode;
  lines?: ILines;
}) => {
  return (
    <div className={`wb-relative ${className || ''}`}>
      <Lines {...lines} />
      {children}
    </div>
  );
};
