import { PauseCircleFill, PlayCircleFill, XFill } from '@jengaicons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import Button from './button';

const PopupVideo = ({
  show,
  onClose,
}: {
  show?: boolean;
  onClose?: () => void;
}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, top: -20 }} // Initial state
          animate={{ opacity: 1, top: 0 }} // Animate to visible
          exit={{ opacity: 0, top: -20 }} // Animate to visible
          transition={{
            ease: 'anticipate',
          }}
          className="wb-flex wb-items-center wb-justify-center wb-z-[99999] wb-bg-surface-basic-overlay-bg/60 wb-fixed wb-inset-0"
          onClick={onClose}
        >
          <div className="wb-absolute wb-top-[20px] wb-right-[20px]">
            <Button
              variant="plain"
              content={
                <XFill
                  size={20}
                  className="wb-text-text-on-primary hover:wb-opacity-60"
                />
              }
            />
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="wb-group wb-relative wb-min-h-[90vh] wb-max-h-[90vh] wb-overflow-hidden wb-rounded"
          >
            <video
              autoPlay
              loop
              ref={ref}
              src="/docs/environment/app-settings.mp4"
              className="wb-max-h-[90vh]"
              onTimeUpdate={(e) => {
                const x = e.target as HTMLVideoElement;
                setProgress(Math.ceil((x.currentTime * 100) / x.duration));
              }}
              onPlay={() => {
                setIsPlaying(true);
              }}
              onPause={() => {
                setIsPlaying(false);
              }}
            />
            <div className="wb-bg-gradient-to-t wb-from-black wb-to-transparent wb-absolute wb-inset-0 wb-invisible group-hover:wb-visible opacity-0 group-hover:wb-opacity-100 wb-transition-all wb-duration-300 ">
              <button
                aria-label="play-pause"
                onClick={() => {
                  if (isPlaying) {
                    ref.current?.pause();
                  } else {
                    ref.current?.play();
                  }
                }}
                className="wb-text-text-on-primary wb-absolute wb-left-1/2 wb-top-1/2 -wb-translate-x-1/2 -wb-translate-y-1/2"
              >
                {isPlaying ? (
                  <PauseCircleFill size={64} />
                ) : (
                  <PlayCircleFill size={64} />
                )}
              </button>
              <div className="wb-absolute wb-bottom-0 wb-left-0 wb-right-0 wb-h-9xl wb-px-3xl wb-rounded-b-lg">
                <div className="wb-relative wb-flex wb-h-full wb-items-center">
                  <div
                    className="wb-h-md wb-bg-white wb-rounded-full wb-absolute wb-z-[10]"
                    style={{ width: progress + '%' }}
                  />
                  <div className="wb-h-md wb-bg-[#A9A9A9] wb-rounded-full wb-w-full wb-absolute " />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupVideo;
