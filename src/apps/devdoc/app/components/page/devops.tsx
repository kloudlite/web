import Chips from 'kl-design-system/atoms/chips';
import { useState } from 'react';
import HorizontalTopTabDevops from '~/app/components/website/horizontal-top-tab-devops';
import Discover from '~/app/components/website/discover-component';
import ReadyToOps from '~/app/components/website/ready-to-ops';
import GetStarted from '~/app/components/website/get-started';
import SuccessStories from '~/app/components/website/success-stories';
import { successStories } from '~/app/utils/dummy-data';
import consts from '~/app/utils/const';
import EmbeddedData from '../../../images/embedded-data.svg';
import TroubleFree from '../../../images/trouble-free.svg';
import SeamlessDev from '../../../images/seamless-dev.svg';
import FasterDev from '../../../images/faster-dev.svg';
import ConfigDevops from '../../../images/devops/config-devops.svg';
import CreateProject1980 from '../../../images/devops/create_project/1980.svg';
import CreateProject1440 from '../../../images/devops/create_project/1440.svg';
import CreateProject1280 from '../../../images/devops/create_project/1280.svg';
import CreateProject1024 from '../../../images/devops/create_project/1024.svg';
import CreateProject768 from '../../../images/devops/create_project/768.svg';
import CreateProjectMobile from '../../../images/devops/create_project/mobile.svg';

import SetupBackSVC1980 from '../../../images/devops/setup_back_svc/1920.svg';
import SetupBackSVC1440 from '../../../images/devops/setup_back_svc/1440.svg';
import SetupBackSVC1280 from '../../../images/devops/setup_back_svc/1280.svg';
import SetupBackSVC1024 from '../../../images/devops/setup_back_svc/1024.svg';
import SetupBackSVC768 from '../../../images/devops/setup_back_svc/768.svg';
import SetupBackSVCMobile from '../../../images/devops/setup_back_svc/mobile.svg';
import DeployDevops from '../../../images/devops/deploy-devops.svg';
import Cover from '../../../images/devops/cover-devops.svg';
import Wrapper from '../wrapper';
import Button from '../button';
import ResponsiveImage from '../website/responsive-image';

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
            className="h-full w-full object-fill"
          />
        );
      case 'embedded-data':
        return (
          <img
            alt="embedded-data"
            src={EmbeddedData.src}
            className="h-full w-full object-fill"
          />
        );
      case 'seamless-env':
        return (
          <img
            alt="seamless-env"
            src={SeamlessDev.src}
            className="h-full w-full object-fill"
          />
        );
      case 'faster-dev':
      default:
        return (
          <img
            alt="faster-dev"
            src={FasterDev.src}
            className="h-full w-full object-fill"
          />
        );
    }
  };

  return (
    <HorizontalTopTabDevops
      tabContainerClassName="grid grid-cols-4 xl:!grid-cols-[256px_224px_224px_224px] 2xl:!grid-cols-4 3xl:!grid-cols-[352px_320px_320px_320px] gap-3xl lg:!gap-5xl"
      tabs={consts.devops.advantages}
      onTabChange={(item) => setSelectedTab(item.id)}
      activeTab={selectedTab}
      tab={getTab()}
    />
  );
};

export const DiscoverSection = () => {
  return (
    <Discover
      className="grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 2xl:!grid-cols-4 3xl:!grid-cols-[352px_320px_320px_320px] gap-3xl lg:!gap-5xl "
      title={
        <>
          Discover{' '}
          <span className="text-text-primary">
            <br className="block md:!hidden" />
            Kl-DevOps
          </span>
        </>
      }
      desc="Simplify software development and testing with automated environments, tools, and configurations"
      features={consts.devops.features}
    />
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
          <div className="relative h-full overflow-hidden flex items-center justify-center lg:!items-end">
            <img alt="config" src={ConfigDevops.src} />
          </div>
        );
      case 'deploy':
        return (
          <div className="relative h-full overflow-hidden flex items-center justify-center lg:!items-end">
            <img alt="deploy" src={DeployDevops.src} />
          </div>
        );
      case 'setup':
        return (
          <div className="h-full flex items-center justify-center p-2xl md:!p-0">
            <ResponsiveImage
              alt="Setup backing service"
              r1920={SetupBackSVC1980.src}
              r1440={SetupBackSVC1440.src}
              r1280={SetupBackSVC1280.src}
              r1024={SetupBackSVC1024.src}
              r768={SetupBackSVC768.src}
              rmobile={SetupBackSVCMobile.src}
              hasFilter
            />
          </div>
        );
      case 'create':
      default:
        return (
          <div className="h-full flex items-center justify-center p-2xl md:!p-0">
            <ResponsiveImage
              alt="Create project"
              rmobile={CreateProjectMobile.src}
              r768={CreateProject768.src}
              r1024={CreateProject1024.src}
              r1280={CreateProject1280.src}
              r1440={CreateProject1440.src}
              r1920={CreateProject1980.src}
              hasFilter
            />
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

const _SuccessStorySection = () => {
  return (
    // @ts-ignore
    <SuccessStories tabs={successStories} />
  );
};

const ReadyTo = () => {
  return <ReadyToOps />;
};

const DevopsPage = () => {
  return (
    <div>
      <Wrapper className="relative flex justify-center lg:justify-start py-6xl md:!py-8xl lg:!py-10xl">
        <div className="flex flex-col z-10 w-full">
          <div className="md:absolute inset-0 distribution-cover-graph z-0 w-full" />
          <div className="w-full flex flex-col lg:!flex-row items-center lg:!items-start lg:!gap-10xl z-10 text-center lg:!text-left justify-between 3xl:pr-10xl">
            <div className="flex flex-col gap-6xl md:!max-w-[400px] xl:!max-w-[621px]">
              <div className="flex flex-col items-center lg:!items-start gap-3xl">
                <Chips.Chip
                  item="infraops"
                  label={<div className="bodyLg-medium">Kl-DevOps</div>}
                />
                <h1 className="heading4xl-marketing md:!heading5xl-marketing lg:!heading6xl-marketing text-text-default">
                  <span className="text-text-primary">NoOps</span> in any stage
                  of development
                </h1>
                <p className="bodyXl md:!bodyXXl text-text-soft">
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
            <div className="z-10 relative lg:min-w-[400px] xl:min-w-[448px] lg:top-[10%] 2xl:!top-0 pt-6xl md:!pt-6xl lg:!py-0">
              <img src={Cover.src} />
            </div>
          </div>
        </div>
      </Wrapper>
      <Wrapper>
        <AdvantageSection />
        <DiscoverSection />
        <GetStartedSection />
        <ReadyTo />
      </Wrapper>
    </div>
  );
};

export default DevopsPage;
