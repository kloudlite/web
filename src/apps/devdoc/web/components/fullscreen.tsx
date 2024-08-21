import { ReactNode, RefObject, useEffect, useState } from 'react';
import { cn } from '../utils/commons';
import { IconButton } from 'kl-design-system/atoms/button';
import { XFill } from '@jengaicons/react';

const useFullscreen = () => {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [fullscreen]);

  const toggleFullscreen = () => {
    setFullscreen((p) => !p);
  };
  return { fullscreen, toggleFullscreen };
};

const Fullscreen = ({
  children,
}: {
  children?: ({ fullscreen }: { fullscreen: boolean }) => ReactNode;
}) => {
  const { fullscreen, toggleFullscreen } = useFullscreen();
  return (
    <div
      className={cn(
        fullscreen
          ? 'wb-fixed inset-0 wb-z-[99999999999] wb-flex wb-flex-col wb-items-center wb-justify-center wb-bg-surface-basic-overlay-bg wb-p-3xl wb-gap-2xl'
          : '',
      )}
      onClick={toggleFullscreen}
    >
      {fullscreen && (
        <div className="wb-self-end">
          <IconButton icon={<XFill />} variant="plain" />
        </div>
      )}
      <div className="wb-max-h-[90vh] wb-h-[min-content]">
        {children?.({ fullscreen })}
      </div>
    </div>
  );
};

export default Fullscreen;
