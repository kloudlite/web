import { useRef, useState } from 'react';
import { cn } from '../utils/commons';
import Fullscreen from './fullscreen';

type IVideo = {
  src: string;
};
const VideoPlayer = ({ src }: IVideo) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  return (
    <Fullscreen>
      {({ fullscreen }) => {
        return (
          <div
            className={cn(
              'wb-relative wb-overflow-hidden wb-group',
              fullscreen
                ? 'wb-cursor-zoom-out wb-h-full'
                : 'wb-my-3xl wb-cursor-zoom-in',
            )}
          >
            <video
              onTimeUpdate={(e) => {
                const x = e.target as HTMLVideoElement;
                setProgress(Math.ceil((x.currentTime * 100) / x.duration));
              }}
              src={src}
              ref={ref}
              autoPlay={true}
              loop
              muted
              className={cn('wb-rounded-lg wb-w-full wb-h-full wb-max-h-full')}
            />
            <div className="wb-absolute wb-inset-0 wb-invisible group-hover:wb-visible opacity-0 group-hover:wb-opacity-100 wb-transition-all wb-duration-300 ">
              <div className="wb-absolute wb-bottom-0 wb-left-0 wb-right-0 wb-h-7xl wb-bg-gradient-to-t wb-from-black wb-to-transparent wb-px-3xl wb-rounded-b-lg">
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
        );
      }}
    </Fullscreen>
  );
};

export default VideoPlayer;
