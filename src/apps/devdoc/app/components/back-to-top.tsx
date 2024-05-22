import { ArrowCircleUp } from '@jengaicons/react';
import { Button, IButton } from 'kl-design-system/atoms/button';
import type { ReactElement } from 'react';
import { useEffect, useRef } from 'react';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function BackToTop({
  className,
  variant = 'plain',
  suffix = <ArrowCircleUp />,
  prefix,
  content,
  size,
}: IButton): ReactElement {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function toggleVisible() {
      const { scrollTop } = document.documentElement;
      ref.current?.classList.toggle('!wb-hidden', scrollTop < 300);
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
      content={content || 'Scroll on top'}
      suffix={suffix}
      prefix={prefix}
      onClick={scrollToTop}
      variant={variant}
      size={size || 'lg'}
    />
  );
}
