import { useState } from 'react';
import HorizontalTopTabDevops from '~/app/components/website/horizontal-top-tab-devops';
import Discover from '~/app/components/website/discover-component';
import ReadyToOps from '~/app/components/website/ready-to-ops';
import GetStarted from '~/app/components/website/get-started';
import SuccessStories from '~/app/components/website/success-stories';
import { successStories } from '~/app/utils/dummy-data';
import consts from '~/app/utils/const';
import EmbeddedData from '~/images/embedded-data.svg';
import TroubleFree from '~/images/trouble-free.svg';
import SeamlessDev from '~/images/seamless-dev.svg';
import FasterDev from '~/images/faster-dev.svg';
import Cover from '~/images/devops/cover-devops.svg';
import Wrapper from '../wrapper';
import ResponsiveImage from '../website/responsive-image';
import { HeroTwo } from '../commons';

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
            <ResponsiveImage
              alt="Config"
              {...consts.devops.images.getStartedImages.configDevops}
            />
          </div>
        );
      case 'deploy':
        return (
          <div className="relative h-full overflow-hidden flex items-center justify-center lg:!items-end">
            <ResponsiveImage
              alt="Deploy"
              {...consts.devops.images.getStartedImages.deployDevops}
            />
          </div>
        );
      case 'setup':
        return (
          <div className="h-full flex items-center justify-center p-2xl md:!p-0">
            <ResponsiveImage
              alt="Setup backing service"
              {...consts.devops.images.getStartedImages.setupBackingSvc}
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
              {...consts.devops.images.getStartedImages.createProject}
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
      <HeroTwo
        headClassName="md:!max-w-[500px] xl:!max-w-[621px]"
        align="left"
        heading={
          <>
            <span className="text-text-primary">NoOps</span> in any stage of
            development
          </>
        }
        desc="Dev-Prod parity for developers, by developers: DevOps automation that redefines productivity"
        tag="Kl-DevOps"
        cover={Cover.src}
        coverClassName=""
      />
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
