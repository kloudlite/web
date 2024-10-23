import { XFill } from '@jengaicons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, useEffect, useMemo, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Player from 'video.js/dist/types/player';
import Button from './button';
import { cn } from '../utils/commons';
import consts from '../utils/const';
import * as Dialog from '@radix-ui/react-dialog';

export const VideoJS = (props: {
  options: any;
  onReady?: (player: Player) => void;
  onTimeUpdate?: (
    currentTime: number | undefined,
    totalTime: number | undefined,
  ) => void;
  onEnded?: (e: ChangeEvent<HTMLVideoElement>) => void;
  className?: string;
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
        // @ts-ignore
        videoRef.current?.classList.remove('vjs-waiting');
      });

      player.on('timeupdate', () => {
        props.onTimeUpdate?.(player.currentTime(), player.duration());
      });

      player.on('ended', (e: ChangeEvent<HTMLVideoElement>) => {
        props.onEnded?.(e);
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
    <div
      onClick={(e) => e.stopPropagation()}
      data-vjs-player
      className={cn(
        'wb-w-full wb-rounded-xl wb-overflow-hidden',
        props.className,
      )}
    >
      <div ref={videoRef} className="wb-w-full wb-h-full vjs-waiting" />
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
    const article = document.querySelector('#kl-article') as HTMLDivElement;
    const nav = document.querySelector('#kl-nav') as HTMLDivElement;
    if (show) {
      document.body.style.overflowY = 'hidden';
      document.body.style.zIndex = '10';
      if (article) {
        article.style.zIndex = '10';
      }
      if (nav) {
        nav.style.zIndex = '11';
      }
    } else {
      document.body.style.overflowY = 'auto';
      if (article) {
        article.style.zIndex = '50';
      }
      if (nav) {
        nav.style.zIndex = '9999';
      }
    }
    return () => {
      document.body.style.overflowY = 'auto';
      if (article) {
        article.style.zIndex = '50';
      }
      if (nav) {
        nav.style.zIndex = '9999';
      }
    };
  }, [show]);

  const videoJsOptions = useMemo(
    () => ({
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
      sources: consts.homeNew.introVideo,
    }),
    [],
  );

  return (
    <Dialog.Root>
      <AnimatePresence>
        {show ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'anticipate' }}
                className={cn(
                  'wb-fixed wb-inset-0 wb-z-[9999999]',
                  'wb-bg-surface-basic-overlay-bg/60',
                )}
                /* className={cn(
                'wb-flex wb-items-center wb-justify-center wb-z-[99999] wb-bg-surface-basic-overlay-bg/60 wb-fixed wb-inset-0',
              )} */
                onClick={onClose}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ x: '-50%', y: '10%', opacity: 0 }}
                animate={{ x: '-50%', y: '0%', opacity: 1 }}
                exit={{ x: '-50%', y: '10%', opacity: 0 }}
                transition={{
                  ease: 'anticipate',
                }}
                className="wb-w-full wb-z-[99999999] wb-fixed wb-inset-0 wb-left-1/2 wb-flex wb-items-center wb-justify-center"
                onClick={onClose}
              >
                <div className="wb-z-[99999] wb-absolute wb-top-[20px] wb-right-[20px]">
                  <Button
                    onClick={onClose}
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
                  onClick={(e) => {
                    onClose?.();
                    e.stopPropagation();
                  }}
                  className="wb-m-2xl wb-max-h-[90vh] md:wb-max-h-[80vh] wb-h-[90vh] md:wb-h-[80vh] wb-max-w-[90vw] md:wb-max-w-[80vw]  wb-overflow-hidden wb-rounded wb-aspect-video wb-flex wb-items-center"
                >
                  <VideoJS options={videoJsOptions} />
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default PopupVideo;
