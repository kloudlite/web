import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '../utils';

const Pulsable = ({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isCalculating, setCalculating] = useState(true);
  useEffect(() => {
    setCalculating(true);
    if (isLoading) {
      if (!ref.current) {
        return;
      }
      const docs = ref.current.querySelectorAll('.pulsable');
      docs.forEach((element) => {
        element.classList.add('pulse-element');
        element.childNodes.forEach((ch) => {
          // @ts-ignore
          if (ch.classList && !ch.classList.contains('pulse-child')) {
            // @ts-ignore
            ch.classList?.add('pulse-child-element');
            // @ts-ignore
            console.log(ch?.getAttribute('disabled'));

            // if (ch?.hasAttribute('disabled')) {
            //   ch.classList?.add('pulse-has-disabled-attr');
            // }
            // ch.setAttribute('disabled', 'true');
          }
        });
        const pc = element.querySelector('.pulse-child');
        if (!pc) {
          const pulseEl = document.createElement('div');
          pulseEl.classList.add(
            'absolute',
            'z-20',
            '!bg-[#bebebe82]',
            'animate-pulse',
            'w-full',
            'h-full',
            'inset-0',
            'rounded',
            'pulse-child'
          );
          element.appendChild(pulseEl);
        }
      });

      setCalculating(false);
    } else {
      if (!ref.current) {
        return;
      }
      const pc = ref.current.querySelectorAll('.pulse-child');

      pc.forEach((v) => {
        v.parentNode?.removeChild(v);
      });

      const pc2 = ref.current.querySelectorAll('.pulse-element');
      pc2.forEach((v) => {
        v.classList.remove('pulse-element');
      });

      const docs = ref.current.querySelectorAll('.pulsable');
      docs.forEach((element) => {
        element.childNodes.forEach((ch) => {
          // @ts-ignore
          ch.classList?.remove('pulse-child-element');

          if (!ch?.classList.contains('pulse-has-disabled-attr')) {
            ch?.removeAttribute('disabled');
          }
        });
      });

      setCalculating(false);
    }
  }, [isLoading, ref.current]);

  return (
    <div
      ref={ref}
      className={cn('pulse-container', {
        'opacity-0 transition-all': isLoading && isCalculating,
      })}
    >
      {children}
    </div>
  );
};

export default Pulsable;
