import { Block } from '../../commons';
import { GraphItem } from '../../graph';
import { BrandLogo } from 'kl-design-system/branding/brand-logo';
import { CirclesThreePlus, VirtualMachine } from '@jengaicons/react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '~/app/utils/commons';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import Radio from 'kl-design-system/atoms/radio';

const iconSize = 16;
const videoItems = [
  {
    content: 'Kl-Intro',
    icon: <BrandLogo size={iconSize} detailed={false} />,
    video: '/docs/environment/app-settings.mp4',
  },
  {
    content: 'Kl-Environments',
    icon: <VirtualMachine size={iconSize} />,
    video: '/docs/environment/create-app.mp4',
  },
  {
    content: 'Kl-Workspaces',
    icon: <CirclesThreePlus size={iconSize} />,
    video: '/docs/environment/create-config.mp4',
  },
];
const VideoBottomButton = ({
  icon,
  content,
  active,
  progress,
  onClick,
}: {
  content: string;
  icon?: any;
  active?: boolean;
  progress?: number;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="wb-relative wb-bg-surface-basic-subdued wb-py-2xl wb-flex wb-items-center wb-justify-center wb-w-[213.3px] hover:wb-bg-surface-basic-hovered"
    >
      <div className="wb-flex wb-flex-row wb-items-center wb-gap-lg">
        <div className="wb-p-md wb-rounded wb-bg-surface-basic-active wb-text-text-default">
          {icon}
        </div>
        <span
          className={cn('wb-text-text-default', {
            'wb-headingMd': !!active,
            'wb-bodyLg': !active,
          })}
        >
          {content}
        </span>
      </div>
      {active && (
        <div
          className={cn(
            'wb-h-[3px] wb-absolute wb-left-0 wb-bottom-0 wb-bg-border-primary',
          )}
          style={{ width: `${progress}%` }}
        />
      )}
    </button>
  );
};

const VideoBottomBar = ({
  progress,
  active,
  onClick,
}: {
  progress: number;
  active: string;
  onClick: (index: number) => void;
}) => {
  return (
    <div className="wb-overflow-hidden wb-rounded wb-border wb-border-border-default wb-flex wb-flex-row wb-items-center">
      {videoItems.map((vi, i) => {
        return (
          <VideoBottomButton
            key={vi.content}
            {...vi}
            progress={progress}
            active={active === vi.content}
            onClick={() => onClick(i)}
          />
        );
      })}
    </div>
  );
};
const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement[] | null[]>([]);
  const sliderRef = useRef<Splide>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.go(active);
      videoRef.current.forEach((vf) => {
        if (vf) {
          vf.pause();
          vf.currentTime = 0;
        }
      });
      videoRef.current[active]?.play();
    }
    return () => {
      videoRef.current.forEach((vf) => {
        if (vf) {
          vf.pause();
          vf.currentTime = 0;
        }
      });
    };
  }, [sliderRef.current, active]);

  return (
    <Block
      graphClass="3xl:wb-max-w-[1408px] 3xl:wb-m-0"
      title="Take a Peek and See for Yourself: Kloudlite in Action"
    >
      <div className="wb-relative">
        <GraphItem className="wb-bg-surface-basic-subdued">
          <Splide
            ref={sliderRef}
            options={{
              arrows: false,
              pagination: false,
              type: 'fade',
            }}
            onMove={(e) => {
              setActive(e.index);
            }}
            hasTrack={false}
          >
            <SplideTrack>
              {videoItems.map((es, i) => {
                return (
                  <SplideSlide key={es.content}>
                    <div>
                      <video
                        //@ts-ignore
                        ref={(el) => (videoRef.current[i] = el)}
                        src={es.video}
                        className="wb-block wb-h-[210px] wb-max-h-[210px] md:wb-h-[480px] md:wb-max-h-[480px] wb-w-full wb-object-fill"
                        muted={true}
                        onTimeUpdate={(e) => {
                          const x = e.target as HTMLVideoElement;
                          setProgress(
                            Math.ceil((x.currentTime * 100) / x.duration),
                          );
                        }}
                        onEnded={() => {
                          setProgress(0);
                          setActive((prev) => (prev + 1) % videoItems.length);
                        }}
                      />
                      <div className="md:wb-hidden wb-bg-surface-basic-subdued wb-py-lg wb-px-2xl wb-flex wb-flex-row wb-items-center wb-justify-center">
                        <div className="wb-flex wb-flex-row wb-items-center wb-gap-lg">
                          <div className="wb-p-md wb-rounded wb-bg-surface-basic-active">
                            {es.icon}
                          </div>
                          <span>{es.content}</span>
                        </div>
                      </div>
                    </div>
                  </SplideSlide>
                );
              })}
            </SplideTrack>
          </Splide>
        </GraphItem>
        <div className="wb-hidden md:wb-flex wb-absolute -wb-bottom-[3px] wb-left-1/2 -wb-translate-x-1/2 wb-translate-y-1/2 wb-z-[50]">
          <VideoBottomBar
            progress={progress}
            active={videoItems[active].content}
            onClick={(i) => {
              if (i !== active) {
                setProgress(0);
              }
              setActive(i);
            }}
          />
        </div>
        <div className="md:wb-hidden wb-h-[31px] wb-bg-surface-basic-subdued wb-flex wb-flex-row wb-items-center wb-justify-center wb-z-10 wb-relative">
          <Radio.Root
            value={`${active}`}
            onChange={(e) => {
              if (sliderRef.current) {
                sliderRef.current.go(parseInt(e, 10) || 0);
              }
            }}
            className="!wb-flex-row wb-self-center"
          >
            {/* @ts-ignore */}
            {videoItems.map((_, index) => {
              const i = index;
              // @ts-ignore
              return <Radio.Item key={i} value={`${i}`} />;
            })}
          </Radio.Root>
        </div>
      </div>
    </Block>
  );
};
export default VideoSection;
