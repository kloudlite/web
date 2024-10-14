import DynamicImage from '~/app/components/dynamic-image';
import { GraphExtended, GraphItem } from '~/app/components/graph';
import Wrapper from '~/app/components/wrapper';
import hero from '~/images/homeNew/hero';
import HomeIllustrationMobileDark from '~/images/homeNew/illustration-mobile-dark.svg';
import HomeIllustrationMobileWeb from '~/images/homeNew/illustration-mobile.webp';
import { PlayCircle } from '@jengaicons/react';
import { ArrowRight } from '~/app/icons/icons';
import Link from 'next/link';
import { authUrl } from '~/app/utils/config';
import { ReactNode, useEffect, useRef, useState } from 'react';
import consts from '~/app/utils/const';
import PopupVideo from '../popup-video';
import Events from '../website/home/events';
import HowItWorksSection from '../website/home/how-it-works_v2';
import Button from '../button';
import DontBelieve from '../website/home/messages_v2';
import KeepExploring from '../website/home/keep-exploring_v2';
import FaqSection from '../website/home/faq_v2';
import KloudliteDevelopment from '../website/home/kloudlite-development_v2';
import PartnerSection from '../website/home/partners_v2';
import SecureAtCore from '../website/home/secure-at-core_v2';
import SuperCharge from '../website/home/supercharge_v2';
import OpenSource from '../website/home/opensource_v2';
import { cn } from '~/app/utils/commons';
import VideoSection from '../website/home/video-section_v2';
import Player from 'video.js/dist/types/player';

const Title = () => {
  return (
    <div className="wb-flex wb-flex-col wb-gap-3xl wb-text-center xl:wb-text-start wb-z-10 wb-items-center xl:wb-items-start">
      <h1 className="wb-heading4xl-marketing md:wb-heading5xl-marketing wb-text-text-default xl:wb-text-start wb-text-center">
        <div className="wb-hidden md:wb-block">
          Building distributed applications
          <span className="wb-sriracha5xl"> isn’t</span> complex
          <span className="wb-sriracha5xl"> anymore!</span>
        </div>

        <div className="wb-block md:wb-hidden">
          Building distributed apps
          <span className="wb-sriracha4xl"> is’nt</span> complex
          <span className="wb-sriracha4xl"> anymore!</span>
        </div>
      </h1>
      <p className="wb-bodyLg md:wb-bodyXl wb-text-text-soft xl:wb-text-start wb-text-center">
        <span className="wb-hidden md:wb-block">
          With Kloudlite’s unified remote local environments,{' '}
          <br className="wb-hidden 3xl:wb-block" />
          integrate the comfort of local coding with the power of remote
          environments
        </span>
        <span className="wb-block md:wb-hidden">
          With Kloudlite, Integrate the comfort of local coding with the power
          of remote environments.
        </span>
      </p>
      <span className="wb-flex wb-flex-col wb-flex-col-reverse md:wb-flex-row wb-items-center wb-gap-xl wb-pt-6xl xl:wb-pt-7xl">
        <Button
          content={
            <span className="wb-bodyLg-medium md:wb-bodyLg-semibold">
              Get started
            </span>
          }
          variant="primary"
          size="lg"
          suffix={<ArrowRight />}
          linkComponent={Link}
          to={`${authUrl}/login`}
          toLabel="href"
        />
        <Button
          content={
            <span className="wb-bodyLg-medium md:wb-bodyLg-semibold">
              Request a demo
            </span>
          }
          variant="basic"
          size="lg"
          linkComponent={Link}
          to={`${authUrl}/login`}
          toLabel="href"
        />
      </span>
    </div>
  );
};

const HeroVideoTabItem = ({
  children,
  active,
  progress,
  onClick,
}: {
  children: ReactNode;
  active: boolean;
  progress: number;
  onClick: () => void;
}) => {
  return (
    <button
      className={cn('wb-py-xl wb-px-2xl wb-relative wb-pointer-events-auto', {
        'wb-headingSm': !!active,
        'wb-bodyMd': !active,
      })}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
      {active && (
        <div
          className="wb-h-[3px] wb-bg-border-primary wb-absolute wb-bottom-0 wb-left-0 wb-right-0"
          style={{ width: `${progress}%` }}
        />
      )}
    </button>
  );
};
const HeroVideoTab = ({
  items,
  progress,
  active,
  onClick,
}: {
  items: { label: ReactNode; value: string }[];
  active: number;
  progress: number;
  onClick: (item: number) => void;
}) => {
  return (
    <div
      className={cn(
        'wb-bg-surface-basic-subdued wb-border wb-border-border-default',
        'wb-h-[44px] wb-rounded-t-md wb-flex wb-flex-row',
      )}
    >
      {items.map((item, index) => (
        <HeroVideoTabItem
          key={item.value}
          active={active === index}
          progress={progress}
          onClick={() => onClick?.(index)}
        >
          {item.label}
        </HeroVideoTabItem>
      ))}
    </div>
  );
};
const IndexHero = () => {
  const items = consts.homeNew.heroVideos;
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef<Player | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    let player = playerRef.current;
    try {
      if (player) {
        player.pause();
        player.currentTime(0);
        player.play();
      }
    } catch {}
  }, [active, playerRef.current]);

  return (
    <div className="overflow-hidden wb-relative">
      <Wrapper className="wb-grid wb-grid-cols-1 xl:wb-grid-cols-[512px_auto] wb-gap-8xl lg:wb-gap-10xl xl:wb-gap-8xl 2xl:wb-gap-10xl 3xl:wb-gap-15xl wb-items-center wb-py-8xl lg:wb-py-10xl xl:wb-py-5xl">
        <Title />
        <div className="wb-relative xl:wb-static">
          <div className="wb-absolute wb-left-0 wb-right-0 wb-top-1/2 wb-transform -wb-translate-y-1/2 wb-grid wb-grid-cols-1 xl:wb-grid-cols-2 xl:wb-gap-11xl 2xl:wb-gap-10xl 3xl:wb-gap-11xl wb-h-full wb-max-h-[416px] xl:wb-h-[416px] wb-z-30 wb-pointer-events-none">
            <div className="wb-hidden xl:wb-block wb-pointer-events-none" />
            <div
              className="wb-flex wb-items-center wb-justify-center z-10 wb-cursor-pointer xl:wb-max-w-[864px] wb-pointer-events-auto"
              onClick={() => {
                setShowVideo(true);
              }}
            >
              <Button
                content="Watch now"
                variant="tertiary"
                prefix={<PlayCircle />}
                size="lg"
                onClick={() => {
                  setShowVideo(true);
                }}
              />
              <div
                className={cn(
                  'wb-absolute wb-bottom-0 wb-pointer-events-none',
                  'wb-transform wb-translate-y-5xl wb-z-30',
                )}
              >
                <HeroVideoTab
                  items={items}
                  active={active}
                  progress={progress}
                  onClick={(n) => {
                    setActive(n);
                  }}
                />
              </div>
            </div>
          </div>
          <GraphExtended>
            <GraphItem className="wb-h-[416px] xl:wb-min-w-[864px] wb-bg-surface-basic-default">
              <VideoSection
                srcs={items[active].video}
                onReady={(p) => {
                  playerRef.current = p;
                  if (p) {
                    p.on('ended', () => {
                      setProgress(0);
                      setActive((prev) => (prev + 1) % items.length);
                    });
                    p.on('timeupdate', () => {
                      setProgress(
                        Math.ceil(
                          ((p.currentTime() || 0) * 100) / (p.duration() || 1),
                        ),
                      );
                    });
                  }
                }}
              />
            </GraphItem>
          </GraphExtended>
        </div>
      </Wrapper>
      <PopupVideo show={showVideo} onClose={() => setShowVideo(false)} />
    </div>
  );
};

const Illustration = () => {
  return (
    <Wrapper className="-wb-mt-5xl">
      <div className="hidden md:block wb-pb-[36px] 2xl:wb-pb-8xl">
        <GraphExtended
          // graph="graphIllustration"
          innerClass="-wb-mt-[2px] wb-flex wb-justify-center !wb-pt-[32px] 3xl:-wb-mx-[256px]"
          className="!wb-pb-[32px] xl:[background-position: unset] 2xl:[background-position:top] 3xl:[background-position:unset] wb-overflow-hidden"
        >
          <div className="wb-relative xl:-wb-mx-[128px] 2xl:-wb-mx-[160px]">
            <DynamicImage
              light={hero.hero1920.src}
              dark={hero.hero1920Dark.src}
              media="1920"
            />
            <DynamicImage
              light={hero.hero1440.src}
              dark={hero.hero1440Dark.src}
              media="1440"
            />
            <DynamicImage
              light={hero.hero1280.src}
              dark={hero.hero1280Dark.src}
              media="1280"
            />
            <DynamicImage
              light={hero.hero1024.src}
              dark={hero.hero1024Dark.src}
              media="1024"
            />
            <DynamicImage
              light={hero.hero768.src}
              dark={hero.hero768Dark.src}
              media="768"
            />
          </div>
        </GraphExtended>
      </div>
      <div className="md:wb-hidden wb-flex wb-justify-center -wb-mx-3xl">
        <img
          alt="illustration-dark"
          className="wb-hidden dark-block wb-w-full wb-aspect-square"
          src={HomeIllustrationMobileDark.src}
        />
        <img
          alt="illustration-light"
          className="dark-hidden wb-w-full wb-aspect-square"
          src={HomeIllustrationMobileWeb.src}
        />
      </div>
    </Wrapper>
  );
};

const Index = () => {
  return (
    <div>
      <IndexHero />
      <Wrapper>
        <PartnerSection />
        <div className="md:wb-pt-8xl">
          <KloudliteDevelopment />
        </div>
        <SecureAtCore />
        <HowItWorksSection />
        <DontBelieve />
        {consts.eventBanner.enabled && <Events />}
        <KeepExploring />
        <FaqSection />
        <OpenSource />
        <SuperCharge />
      </Wrapper>
    </div>
  );
};

export default Index;
