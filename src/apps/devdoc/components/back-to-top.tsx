import { ArrowCircleUp } from '@jengaicons/react';
import { Button } from 'kl-design-system/atoms/button';
import type { ReactElement } from 'react';
import { useEffect, useRef } from 'react';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function BackToTop({ className }: { className?: string }): ReactElement {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function toggleVisible() {
      const { scrollTop } = document.documentElement;
      ref.current?.classList.toggle('opacity-0', scrollTop < 300);
    }

    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <Button
      className={className}
      ref={ref}
      content="Scroll on top"
      suffix={<ArrowCircleUp />}
      onClick={scrollToTop}
      variant="plain"
      size="lg"
    />
  );
}
