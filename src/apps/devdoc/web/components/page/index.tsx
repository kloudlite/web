import DynamicImage from '~/app/components/dynamic-image';
import { GraphExtended } from '~/app/components/graph';
import FaqSection from '~/app/components/website/home/faq';
import HowItWorksSection from '~/app/components/website/home/how-it-works';
import KeepExploring from '~/app/components/website/home/keep-exploring';
import KloudliteDevelopment from '~/app/components/website/home/kloudlite-development';
import DontBelieve from '~/app/components/website/home/messages';
import OpenSource from '~/app/components/website/home/opensource';
import PartnerSection from '~/app/components/website/home/partners';
import SecureAtCore from '~/app/components/website/home/secure-at-core';
import SuperCharge from '~/app/components/website/home/supercharge';
import Wrapper from '~/app/components/wrapper';
import hero from '~/images/homeNew/hero';
import HomeIllustrationMobileDark from '~/images/homeNew/illustration-mobile-dark.svg';
import HomeIllustrationMobileWeb from '~/images/homeNew/illustration-mobile.webp';
import Button from '../button';
import { PlayCircle } from '@jengaicons/react';
import { ArrowRight } from '~/app/icons/icons';
import Link from 'next/link';
import { authUrl } from '~/app/utils/config';
import PopupVideo from '../popup-video';
import { useState } from 'react';
import Events from '../website/home/events';
import consts from '~/app/utils/const';

const Title = () => {
  return (
    <div className="wb-flex wb-flex-col wb-gap-3xl wb-text-center wb-items-center">
      <h1 className="wb-heading4xl-marketing md:wb-heading6xl-marketing lg:wb-heading7xl-marketing wb-text-text-default wb-text-center lg:wb-w-[896px] xl:wb-w-[1024px] 2xl:wb-w-[1060px]">
        <div className="wb-hidden md:wb-block">
          Building distributed applications
          <span className="wb-heading7xl-1-marketing"> isn’t</span> complex
          <span className="wb-heading7xl-1-marketing"> anymore!</span>
        </div>

        <div className="wb-block md:wb-hidden">
          Building distributed apps
          <span className="wb-heading4xl-1-marketing"> is&apos;nt</span> complex
          <span className="wb-heading4xl-1-marketing"> anymore!</span>
        </div>
      </h1>
      <p className="wb-bodyLg md:wb-bodyXl lg:wb-bodyXXl wb-text-text-soft wb-text-center wb-max-w-[528px] lg:wb-w-[688px] lg:wb-max-w-full xl:wb-w-[920px]">
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
    </div>
  );
};

const Illustration = () => {
  return (
    <Wrapper className="-wb-mt-5xl">
      <div className="hidden md:block wb-pb-[36px] 2xl:wb-pb-[128px]">
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
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div>
      <Wrapper className="wb-relative wb-flex wb-justify-center lg:wb-justify-start wb-py-6xl md:wb-pt-8xl lg:wb-pt-10xl">
        <div className="wb-z-[51] wb-hidden">
          <div
            className="fixed wb-right-[10px] wb-bottom-[10px] wb-z-[1]"
            dangerouslySetInnerHTML={{
              __html: `<a href="https://www.producthunt.com/posts/kloudlite?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-kloudlite" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=462798&theme=neutral" alt="Kloudlite - Distributed&#0032;Development&#0032;Environments&#0032;as&#0032;a&#0032;Service | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>`,
            }}
          />
        </div>
        <div className="wb-w-full wb-z-[1]">
          <Title />
          <div className="wb-pt-6xl wb-flex md:wb-flex-row wb-flex-col wb-gap-4xl md:wb-items-center wb-justify-center">
            <div
              id="join-waitlist"
              className="md:wb-w-[610px] wb-flex wb-flex-col wb-gap-xl wb-items-center"
            >
              <span className="wb-flex wb-flex-col wb-flex-col-reverse md:wb-flex-row wb-items-center wb-gap-xl wb-max-w-[432px] wb-w-full">
                <Button
                  content="Discover Kloudlite"
                  variant="tertiary"
                  size="lg"
                  prefix={<PlayCircle />}
                  block
                  onClick={() => {
                    setShowVideo(true);
                  }}
                />
                <Button
                  content="Get started"
                  variant="primary"
                  size="lg"
                  suffix={<ArrowRight />}
                  block
                  linkComponent={Link}
                  to={`${authUrl}/login`}
                  toLabel="href"
                />
              </span>
            </div>
          </div>
        </div>
      </Wrapper>
      <Illustration />
      <Wrapper>
        <KloudliteDevelopment />
        <SecureAtCore />
        <PartnerSection />
        <HowItWorksSection />
        <DontBelieve />
        <FaqSection />
        {consts.eventBanner.enabled && <Events />}
        <KeepExploring />
        <OpenSource />
        <SuperCharge />
      </Wrapper>
      <PopupVideo show={showVideo} onClose={() => setShowVideo(false)} />
    </div>
  );
};

export default Index;
