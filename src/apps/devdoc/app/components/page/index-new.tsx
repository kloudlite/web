import { Badge } from 'kl-design-system/atoms/badge';
import hero from '~/images/homeNew/hero';
import HomeIllustrationMobile from '~/images/homeNew/illustration-mobile.svg';
import HomeIllustrationMobileDark from '~/images/homeNew/illustration-mobile-dark.svg';
import { GraphExtended } from '~/app/components/graph';
import { authUrl } from '~/app/utils/config';
import Wrapper from '../wrapper';
import OpenSource from '../website/home/opensource';
import KeepExploring from '../website/home/keep-exploring';
import FaqSection from '../website/home/faq';
import HowItWorksSection from '../website/home/how-it-works';
import PartnerSection from '../website/home/partners';
import SecureAtCore from '../website/home/secure-at-core';
import KloudliteDevelopment from '../website/home/kloudlite-development';
import DynamicImage from '../dynamic-image';
import ProviderUI from '../website/provider-ui';
import SuperCharge from '../website/home/supercharge';

const Title = () => {
  return (
    <div className="wb-flex wb-flex-col wb-gap-3xl wb-text-center wb-items-center">
      <div>
        <Badge type="info">
          <span className="wb-bodyMd md:wb-bodyLg">
            Open-Source (Apache 2.0)
          </span>
        </Badge>
      </div>
      <h1 className="wb-heading4xl-marketing md:wb-heading6xl-marketing lg:wb-heading7xl-marketing wb-text-text-default dark:wb-text-text-darktheme-default wb-text-center lg:wb-w-[896px] xl:wb-w-[1024px] 2xl:wb-w-[1060px]">
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
      <p className="wb-bodyLg md:wb-bodyXl lg:wb-bodyXXl wb-text-text-soft dark:wb-text-text-darktheme-soft wb-text-center wb-max-w-[528px] lg:wb-w-[688px] lg:wb-max-w-full xl:wb-w-[920px]">
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
      <div className="hidden md:block wb-pb-5xl">
        <GraphExtended
          innerClass="md:-wb-mx-[32px] lg:-wb-mx-[160px] -wb-mt-[2px] wb-flex wb-justify-center !wb-pt-[32px] 3xl:-wb-mx-[256px]"
          className="!wb-pb-[20px] xl:[background-position: unset] 2xl:[background-position:top] 3xl:[background-position:unset]"
          style={{
            paddingBottom: '64px !important',
          }}
        >
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
        </GraphExtended>
      </div>
      <div className="md:wb-hidden wb-flex wb-justify-center -wb-mx-3xl">
        <img
          className="wb-hidden dark:wb-block wb-w-full wb-aspect-square"
          src={HomeIllustrationMobileDark.src}
        />
        <img
          className="dark:wb-hidden wb-w-full wb-aspect-square"
          src={HomeIllustrationMobile.src}
        />
      </div>
    </Wrapper>
  );
};

const Index = () => {
  return (
    <div>
      <Wrapper className="wb-relative wb-flex wb-justify-center lg:wb-justify-start wb-py-6xl md:wb-pt-8xl lg:wb-pt-10xl">
        <div className="wb-w-full wb-z-[1]">
          <Title />
          <div className="wb-pt-6xl wb-flex md:wb-flex-row wb-flex-col wb-gap-4xl md:wb-items-center wb-justify-center">
            <div
              id="join-waitlist"
              className="md:wb-w-[610px] wb-flex wb-flex-col wb-gap-xl wb-items-center"
            >
              <ProviderUI />
              <span className="wb-text-text-strong dark:wb-text-text-darktheme-strong wb-bodyLg">
                Got an invite code?{' '}
                <a
                  href={`${authUrl}/signup`}
                  className="hover:wb-bodyLg-underline wb-underline-offset-4 "
                >
                  <span className="!wb-text-text-default dark:!wb-text-text-darktheme-default wb-cursor-pointer">
                    Click here
                  </span>{' '}
                  to access
                </a>
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
        <FaqSection />
        <KeepExploring />
        <OpenSource />
        <SuperCharge />
      </Wrapper>
    </div>
  );
};

export default Index;
