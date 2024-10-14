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
      height: 416,
    }),
    [srcs],
  );
  return (
    <VideoJS
      options={videoJsOptions}
      onReady={onReady}
      className="wb-h-full wb-aspect-video wb-rounded-none"
    />
  );
};

export default VideoSection;
