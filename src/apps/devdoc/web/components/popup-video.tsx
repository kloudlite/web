import { CircleNotch, XFill } from '@jengaicons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Button from './button';
import { cn } from '../utils/commons';
import Player from 'video.js/dist/types/player';

export const VideoJS = (props: {
  options: any;
  onReady?: (player: Player) => void;
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>();
  const { options, onReady } = props;

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current?.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));

      player.on('playing', () => {
        //@ts-ignore
        videoRef.current?.classList.remove('vjs-waiting');
      });
      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player className="wb-w-full wb-rounded wb-overflow-hidden">
      <div ref={videoRef} className="wb-w-full vjs-waiting" />
    </div>
  );
};

const PopupVideo = ({
  show,
  onClose,
}: {
  show?: boolean;
  onClose?: () => void;
}) => {
  useEffect(() => {
    console.log('show', show);
    if (show) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [show]);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    controlBar: {
      fullscreenToggle: false,
      pictureInPictureToggle: false,
    },
    loadingSpinner: true,
    bigPlayButton: false,
    responsive: true,
    fluid: true,
    preload: 'auto',
    sources: [
      {
        src: 'intro.webm',
        type: 'video/webm',
      },
      {
        src: 'intro.mp4',
        type: 'video/mp4',
      },
    ],
  };

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0, top: -20 }} // Initial state
          animate={{ opacity: 1, top: 0 }} // Animate to visible
          exit={{ opacity: 0, top: -20 }} // Animate to visible
          transition={{
            ease: 'anticipate',
          }}
          className={cn(
            'wb-flex wb-items-center wb-justify-center wb-z-[99999] wb-bg-surface-basic-overlay-bg/60 wb-fixed wb-inset-0',
          )}
          onClick={onClose}
        >
          <div className="wb-text-text-on-primary wb-absolute wb-left-1/2 wb-top-1/2 -wb-translate-x-1/2 -wb-translate-y-1/2">
            <CircleNotch size={64} className="wb-animate-spin" />
          </div>
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
            className="wb-relative wb-m-2xl md:wb-max-h-[90vh] wb-overflow-hidden wb-rounded wb-h-[90vh] wb-aspect-video wb-flex wb-items-center"
          >
            <VideoJS options={videoJsOptions} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default PopupVideo;
