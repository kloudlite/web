import DynamicImage from '~/app/components/dynamic-image';
import { GraphExtended } from '~/app/components/graph';
import Wrapper from '~/app/components/wrapper';
import hero from '~/images/homeNew/hero';
import HomeIllustrationMobileDark from '~/images/homeNew/illustration-mobile-dark.svg';
import HomeIllustrationMobileWeb from '~/images/homeNew/illustration-mobile.webp';
import { PlayCircle } from '@jengaicons/react';
import { ArrowRight } from '~/app/icons/icons';
import Link from 'next/link';
import { authUrl } from '~/app/utils/config';
import { useState } from 'react';
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

const Title = () => {
  return (
    <div className="wb-flex wb-flex-col wb-gap-3xl wb-text-center wb-items-center">
      <h1 className="wb-heading4xl-marketing md:wb-heading5xl-marketing wb-text-text-default wb-text-center lg:wb-w-[810px]">
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
      <p className="wb-bodyLg md:wb-bodyXl wb-text-text-soft wb-text-center wb-max-w-[528px] lg:wb-w-[703px] lg:wb-max-w-full">
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
                  content={
                    <span className="wb-bodyLg-medium md:wb-bodyLg-semibold">
                      Discover Kloudlite
                    </span>
                  }
                  variant="tertiary"
                  size="lg"
                  prefix={<PlayCircle strokeWidth={1.5} />}
                  block
                  onClick={() => {
                    setShowVideo(true);
                  }}
                />
                <Button
                  content={
                    <span className="wb-bodyLg-medium md:wb-bodyLg-semibold">
                      Get started
                    </span>
                  }
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
      <PopupVideo show={showVideo} onClose={() => setShowVideo(false)} />
    </div>
  );
};

export default Index;
