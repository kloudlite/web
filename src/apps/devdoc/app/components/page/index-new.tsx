import { useState } from 'react';
import { GraphExtended } from '~/app/components/graph';
import HomeIllustrationMobileDark from '~/images/homeNew/illustration-mobile-dark.svg';
import HomeIllustrationMobile from '~/images/homeNew/illustration-mobile.svg';
import { Badge } from 'kl-design-system/atoms/badge';
import { useFirebase } from '~/app/utils/useFirebase';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import hero from '~/images/homeNew/hero';
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
import DynamicImage from '../dynamic-image';

const Title = () => {
  return (
    <div className="wb-flex wb-flex-col wb-gap-3xl wb-text-center wb-items-center">
      <div>
        <Badge type="info">Open-Source (Apache 2.0)</Badge>
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
          with Kloudlite’s unified remote local environments,{' '}
          <br className="wb-hidden 3xl:wb-block" />
          Now Integrate the comfort of local coding with the power of remote
          environments
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
      <KloudliteDevelopment />
    </Wrapper>
  );
};

const addWaitingList = async (
  app: FirebaseApp | null,
  data: { email: string }
) => {
  if (!app) {
    return;
  }
  const firestore = getFirestore(app);
  const col = collection(firestore, 'web-waiting-lists');

  const newUser = {
    ...data,
    createdAt: new Date(),
  };

  const user = await addDoc(col, newUser);
  console.log(user);
};

const Index = () => {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [superChargeValue, setSuperChargeValue] = useState('');
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  const { firebaseApp } = useFirebase();

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
                    addWaitingList(firebaseApp, { email: waitlistEmail });
                    setShowInviteDialog(true);
                  }
                }}
                onSuffixClicked={() => {
                  addWaitingList(firebaseApp, { email: waitlistEmail });
                  setShowInviteDialog(true);
                }}
              />
              <span className="wb-text-text-strong dark:wb-text-text-darktheme-strong wb-bodyLg">
                Got an invite code?{' '}
                <span className="hover:wb-bodyLg-underline wb-underline-offset-4 !wb-text-text-default dark:!wb-text-text-darktheme-default wb-cursor-pointer">
                  Click here
                </span>{' '}
                to access
              </span>
            </div>
          </div>
        </div>
      </Wrapper>
      <Illustration />
      <div className="wb-px-3xl lg:wb-px-0 2xl:wb-max-w-[1440px] 3xl:wb-max-w-[1600px] wb-m-auto">
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
          onEnter={() => {
            if (superChargeValue) {
              addWaitingList(firebaseApp, { email: superChargeValue });
              setShowInviteDialog(true);
            }
          }}
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
