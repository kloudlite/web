import { ReactNode, useEffect, useRef } from 'react';
import { cn } from '../utils/commons';

const ResponsiveContainer = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resize = () => {
      if (ref.current) {
        if (window.innerWidth >= 1280) {
          ref.current.style.height = '';
          const bounds = ref.current?.getBoundingClientRect();
          if (bounds) {
            const newHeight = Math.ceil(bounds.height / 32) * 32;
            ref.current.style.height = newHeight + 'px';
          }
        } else {
          ref.current.style.height = '';
        }
      }
    };

    resize();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [ref.current]);

  return (
    <div
      ref={ref}
      className={cn('wb-grid wb-gap-3xl md:wb-gap-5xl', className)}
    >
      {children}
    </div>
  );
};

export default ResponsiveContainer;
