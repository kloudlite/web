import { ReactNode, useEffect, useId, useState } from 'react';
import { cn } from '../utils/commons';
import { IconButton } from 'kl-design-system/atoms/button';
import { XFill } from '@jengaicons/react';
import { AnimatePresence, motion } from 'framer-motion';

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
  const layoutId = useId();
  const transitionDuration = 0.3;

  return (
    <>
      {fullscreen && (
        <div
          className={cn({
            'wb-z-50': true,
          })}
        >
          <div className="wb-max-h-[90vh] wb-h-[min-content] wb-mt-3xl">
            {children?.({ fullscreen: true })}
          </div>
        </div>
      )}
      <AnimatePresence>
        <div
          className={cn({
            'wb-max-w-screen wb-max-h-screen wb-inset-0 wb-z-50': true,
            'wb-fixed wb-w-screen wb-h-screen wb-bg-surface-basic-overlay-bg':
              fullscreen,
          })}
        >
          <motion.div
            transition={{ ease: 'backInOut', duration: transitionDuration }}
            onClick={toggleFullscreen}
            layoutId={layoutId}
            className={cn({
              'wb-z-50 wb-h-full wb-w-full wb-flex wb-flex-col wb-items-center wb-justify-center':
                true,
              'wb-cursor-zoom-in': !fullscreen,
              'wb-cursor-zoom-out': fullscreen,
            })}
          >
            {fullscreen && (
              <div className="wb-self-end wb-absolute wb-top-2xl wb-right-2xl">
                <IconButton icon={<XFill />} variant="plain" />
              </div>
            )}
            <motion.div className="wb-max-h-[90vh] wb-h-[min-content] wb-mt-3xl">
              {children?.({ fullscreen: true })}
            </motion.div>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default Fullscreen;
