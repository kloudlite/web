import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '../utils/commons';

const ResponsiveContainer = ({
  children,
  className,
  extResize,
}: {
  children?: ReactNode;
  className?: string;
  extResize?: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    resize();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [ref.current]);

  useEffect(() => {
    resize();
  }, [extResize]);

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
