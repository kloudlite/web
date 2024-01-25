import Chips from 'kl-design-system/atoms/chips';
import Container from '~/app/components/container';
import HorizontalTopTabDevops from '~/app/components/website/horizontal-top-tab-devops';
import Discover from '~/app/components/website/discover-component';
import ReadyToOps from '~/app/components/website/ready-to-ops';
import GetStarted from '~/app/components/website/get-started';
import SuccessStories from '~/app/components/website/success-stories';
import { successStories } from '~/app/utils/dummy-data';
import consts from '~/app/utils/const';
import { useState } from 'react';
import { Button } from 'kl-design-system/atoms/button';
import EmbeddedData from '../../../images/embedded-data.svg';
import TroubleFree from '../../../images/trouble-free.svg';
import SeamlessDev from '../../../images/seamless-dev.svg';
import FasterDev from '../../../images/faster-dev.svg';
import ConfigDevops from '../../../images/devops/config-devops.svg';
import CreateDevops from '../../../images/devops/create-project-devops.svg';
import DeployDevops from '../../../images/devops/deploy-devops.svg';
import SetupDevops from '../../../images/devops/setup-devops.svg';
import Cover from '../../../images/devops/cover-devops.svg';
import SectionWrapper from '../website/section-wrapper';

export const AdvantageSection = () => {
  const [selectedTab, setSelectedTab] = useState(
    consts.devops.advantages[0].id
  );

  const getTab = () => {
    switch (selectedTab) {
      case 'trouble-free':
        return (
          <img
            alt="trouble-fre"
            src={TroubleFree.src}
            className="h-full w-full object-cover"
          />
        );
      case 'embedded-data':
        return (
          <img
            alt="embedded-data"
            src={EmbeddedData.src}
            className="h-full w-full object-cover"
          />
        );
      case 'seamless-env':
        return (
          <img
            alt="seamless-env"
            src={SeamlessDev.src}
            className="h-full w-full object-cover"
          />
        );
      case 'faster-dev':
      default:
        return (
          <img
            alt="faster-dev"
            src={FasterDev.src}
            className="h-full w-full object-cover"
          />
        );
    }
  };

  return (
    <HorizontalTopTabDevops
      tabContainerClassName="grid grid-cols-4 xl:!grid-cols-[256px_224px_224px_224px] 2xl:!grid-cols-4  gap-3xl lg:!gap-5xl md:!pt-8xl lg:!pt-10xl px-10xl"
      tabs={consts.devops.advantages}
      onTabChange={(item) => setSelectedTab(item.id)}
      activeTab={selectedTab}
      tab={getTab()}
    />
  );
};

export const DiscoverSection = () => {
  return (
    <div className="flex flex-col 2xl:pt-10xl">
      <Discover
        className="grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 2xl:!grid-cols-4 gap-3xl lg:!gap-5xl "
        title={
          <>
            Discover <span className="text-text-primary">DevOps</span>
          </>
        }
        desc="Simplify software development and testing with automated environments, tools, and configurations"
        features={consts.devops.features}
      />
    </div>
  );
};

export const GetStartedSection = () => {
  const [selectedTab, setSelectedTab] = useState(
    consts.devops.getstarted[0].id
  );
  const getTab = () => {
    switch (selectedTab) {
      case 'config':
        return (
          <div className="relative h-full overflow-hidden flex items-center justify-center lg:!items-start lg:!justify-start">
            <img alt="config" src={ConfigDevops.src} />
          </div>
        );
      case 'deploy':
        return (
          <div className="relative h-full overflow-hidden flex items-center justify-center lg:!items-start lg:!justify-start">
            <img alt="deploy" src={DeployDevops.src} />
          </div>
        );
      case 'setup':
        return (
          <div className="relative h-full p-xl lg:!p-0 overflow-hidden flex items-center justify-center lg:!items-start lg:!justify-start">
            <img alt="setup" src={SetupDevops.src} />
          </div>
        );
      case 'create':
      default:
        return (
          <div className="h-full flex items-center justify-center flex items-center lg:!items-start">
            <img alt="create" src={CreateDevops.src} />
          </div>
        );
    }
  };

  return (
    <GetStarted
      title="In 4 simple steps"
      tabs={consts.devops.getstarted}
      onTabChange={(item) => setSelectedTab(item.id || '')}
      tab={getTab()}
      activeTab={selectedTab}
    />
  );
};

export const SuccessStorySection = () => {
  return (
    <div className="flex flex-col py-6xl md:!py-8xl 2xl:!pt-10xl">
      {/** @ts-ignore * */}
      <SuccessStories tabs={successStories} />
    </div>
  );
};

const ReadyTo = () => {
  return <ReadyToOps />;
};

const DevopsPage = () => {
  return (
    <div>
      <Container className="relative flex justify-center lg:justify-start">
        <div className="flex flex-col px-3xl md:!px-5xl lg:!px-8xl xl:!px-11xl 2xl:!px-12xl z-10">
          <div className="md:absolute inset-0 distribution-cover-graph z-0" />
          <div className="flex flex-col lg:!flex-row items-center lg:!items-start lg:!gap-10xl lg:!py-10xl 2xl:!py-10xl z-10 text-center lg:!text-left xl:max-w-[1024px] 2xl:max-w-[1120px] box-content">
            <div className="flex flex-col gap-6xl md:!max-w-[630px] py-6xl md:!py-8xl lg:!py-0">
              <div className="flex flex-col items-center lg:!items-start gap-3xl">
                <Chips.Chip item="infraops" label="DevOps" />
                <h1 className="heading4xl-marketing md:!heading5xl-marketing lg:!heading6xl-marketing text-text-default">
                  <span className="text-text-primary">NoOps</span> in any stage
                  of development
                </h1>
                <p className="bodyLg-medium md:!bodyXl-medium text-text-soft">
                  Dev-Prod parity for developers, by developers: DevOps
                  automation that redefines productivity
                </p>
              </div>
              <div className="flex md:!flex-row flex-col gap-4xl md:!items-center justify-center lg:!justify-start">
                <div>
                  <Button
                    block
                    size="lg"
                    content="Start your free trial"
                    variant="primary"
                  />
                </div>
                <div>
                  <Button
                    block
                    size="lg"
                    content="Schedule a demo"
                    variant="basic"
                  />
                </div>
              </div>
            </div>
            <div className="z-10 pb-6xl">
              <img
                src={Cover.src}
                className="lg:scale-[1.3] md:min-w-[394px] lg:pt-5xl"
              />
            </div>
          </div>
        </div>
      </Container>
      <Container className="flex flex-col">
        <SectionWrapper>
          <AdvantageSection />
          <DiscoverSection />
          <GetStartedSection />
          <SuccessStorySection />
        </SectionWrapper>
        <ReadyTo />
      </Container>
    </div>
  );
};

export default DevopsPage;
