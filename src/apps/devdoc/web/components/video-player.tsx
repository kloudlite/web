import { forwardRef } from 'react';

type IVideo = {
  src: string;
};
const VideoPlayer = forwardRef<HTMLVideoElement, IVideo>(({ src }, ref) => {
  return (
    <div className="wb-my-3xl wb-rounded-md wb-overflow-hidden">
      <video src={src} ref={ref} autoPlay={true} loop muted controls />
    </div>
  );
});

export default VideoPlayer;
