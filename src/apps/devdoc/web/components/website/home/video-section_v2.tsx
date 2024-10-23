import 'video.js/dist/video-js.css';
import { VideoJS } from '../../popup-video';
import { useMemo } from 'react';
import Player from 'video.js/dist/types/player';

const VideoSection = ({
  srcs,
  onReady,
}: {
  srcs: { src: string; type: string }[];
  onReady?: (player: Player) => void;
}) => {
  const videoJsOptions = useMemo(
    () => ({
      autoplay: true,
      controls: false,
      muted: true,
      loadingSpinner: true,
      bigPlayButton: false,
      preload: 'auto',
      sources: srcs,
    }),
    [srcs],
  );
  return (
    <VideoJS
      options={videoJsOptions}
      onReady={onReady}
      className="wb-h-full wb-aspect-video !wb-rounded-none [&_video-js]:wb-h-0 [&_video-js]:wb-pt-[56.25%] [&_video-js]:wb-w-full [&_video-js]:wb-max-w-full md:[&_video-js]:wb-pt-[0] md:[&_video-js]:wb-h-[416px] md:[&_video-js]:wb-aspect-auto"
    />
  );
};

export default VideoSection;
