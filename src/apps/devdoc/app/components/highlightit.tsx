import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import { cn } from '~/utiltities/commons';

const HighlightIt = ({
  language,
  inlineData = '',
  className = '',
}: {
  language: string;
  inlineData?: string;
  className?: string;
}) => {
  const ref = useRef(null);

  useEffect(() => {
    (async () => {
      if (ref.current) {
        // @ts-ignore
        ref.current.innerHTML = hljs.highlight(
          inlineData,
          {
            language,
          },
          false
        ).value;
      }
    })();
  }, [inlineData, language]);

  return (
    <div ref={ref} className={cn(className, 'inline')}>
      {inlineData}
    </div>
  );
};

export default HighlightIt;
