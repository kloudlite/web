import { useState } from 'react';
import { GraphExtended } from '~/app/components/graph';
import HomeIllustration from '~/images/homeNew/svg-comp/illustration';
import HomeIllustration1024 from '~/images/homeNew/svg-comp/illustration-1024';
import HomeIllustration768 from '~/images/homeNew/svg-comp/illustration-768';
import HomeIllustration1280 from '~/images/homeNew/svg-comp/illustration-1280';
import HomeIllustrationMobileDark from '~/images/homeNew/illustration-mobile-dark.svg';
import HomeIllustrationMobile from '~/images/homeNew/illustration-mobile.svg';
import Wrapper from '../wrapper';
import InviteCodeDialog from '../website/invite-code-dialog';
import OpenSource from '../website/home/opensource';
import KeepExploring from '../website/home/keep-exploring';
import FaqSection from '../website/home/faq';
import HowItWorksSection from '../website/home/how-it-works';
import PartnerSection from '../website/home/partners';
import SecureAtCore from '../website/home/secure-at-core';
import KloudliteDevelopment from '../website/home/kloudlite-development';
import TextInputBig from '../textinput-big';
import SuperCharge from '../website/home/supercharge';

const Title = () => {
  return (
    <div className="wb-flex wb-flex-col wb-gap-3xl wb-text-center wb-items-center">
      <h1 className="wb-heading4xl-marketing md:wb-heading6xl-marketing lg:wb-heading7xl-marketing wb-text-text-default dark:wb-text-text-darktheme-default wb-text-center lg:wb-w-[830px] 3xl:wb-w-[884px]">
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
      <p className="wb-bodyLg md:wb-bodyXl lg:wb-bodyXXl wb-text-text-soft dark:wb-text-text-darktheme-soft wb-text-center wb-max-w-[528px] lg:wb-w-[688px] lg:wb-max-w-[688px]">
        <span className="wb-hidden md:wb-block">
          with Kloudlite’s unified remote local environments, Now Integrate the
          comfort of local coding with the power of remote environments
        </span>
        <span className="wb-block md:wb-hidden">
          with Kloudlite, now Integrate the comfort of local coding with the
          power of remote environments.
        </span>
      </p>
    </div>
  );
};

const Illustration = () => {
  return (
    <Wrapper className="-wb-mt-5xl">
      <div className="hidden md:block">
        <GraphExtended
          innerClass="md:-wb-mx-[160px] -wb-mt-[2px] wb-flex wb-justify-center !wb-pt-[32px]"
          className="!wb-pb-[20px]"
          style={{
            paddingBottom: '64px !important',
            backgroundPosition: 'top',
          }}
        >
          <HomeIllustration768 className="wb-hidden md:wb-block lg:wb-hidden" />
          <HomeIllustration1024 className="wb-hidden lg:wb-block xl:wb-hidden" />
          <HomeIllustration1280 className="wb-hidden xl:wb-block 2xl:wb-hidden" />
          <HomeIllustration className="wb-hidden 2xl:wb-block" />
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
      <KloudliteDevelopment />
    </Wrapper>
  );
};

const Index = () => {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [superChargeValue, setSuperChargeValue] = useState('');
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  return (
    <div>
      <Wrapper className="wb-relative wb-flex wb-justify-center lg:wb-justify-start wb-py-6xl md:wb-pt-8xl lg:wb-pt-10xl">
        <div className="wb-w-full wb-z-[1]">
          <Title />
          <div className="wb-pt-6xl wb-flex md:wb-flex-row wb-flex-col wb-gap-4xl md:wb-items-center wb-justify-center">
            <div className="md:wb-w-[610px] wb-flex wb-flex-col wb-gap-xl wb-text-center">
              <TextInputBig
                value={waitlistEmail}
                onChange={({ target }) => {
                  setWaitlistEmail(target.value);
                }}
                onEnter={() => {
                  if (waitlistEmail) {
                    setShowInviteDialog(true);
                  }
                }}
                onSuffixClicked={() => setShowInviteDialog(true)}
              />
              <span className="wb-text-text-soft wb-bodyLg">
                Got an invite code? Click{' '}
                <span className="wb-bodyLg-underline wb-text-text-default dark:wb-text-text-darktheme-default wb-cursor-pointer">
                  here
                </span>{' '}
                to access
              </span>
            </div>
          </div>
        </div>
      </Wrapper>
      <Illustration />
      <div className="wb-hidden lg:wb-block wb-px-3xl lg:wb-px-0 2xl:wb-max-w-[1440px] 3xl:wb-max-w-[1600px] wb-m-auto">
        <SecureAtCore />
      </div>
      <Wrapper>
        <PartnerSection />
        <HowItWorksSection />
        <FaqSection />
        <KeepExploring />
        <OpenSource />
        <SuperCharge
          value={superChargeValue}
          onChange={setSuperChargeValue}
          onEnter={() => setShowInviteDialog(true)}
        />
      </Wrapper>
      <InviteCodeDialog
        show={showInviteDialog}
        onOpenChange={setShowInviteDialog}
      />
    </div>
  );
};

export default Index;
