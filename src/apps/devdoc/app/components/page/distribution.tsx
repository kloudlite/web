import { useState } from 'react';
import Discover from '~/app/components/website/discover-component';
import ReadyToOps from '~/app/components/website/ready-to-ops';
import GetStarted from '~/app/components/website/get-started';
import SuccessStories from '~/app/components/website/success-stories';
import consts from '~/app/utils/const';
import { successStories } from '~/app/utils/dummy-data';
import Cover from '~/images/distribution/distribution-cover.svg';
import BuildDis from '~/images/distribution/build-distribution.svg';
import DistributeDis from '~/images/distribution/distribute-distribution.svg';
import Wrapper from '../wrapper';
import ResponsiveImage from '../website/responsive-image';
import { HeroTwo } from '../commons';

const DiscoverSection = () => {
  return (
    <Discover
      className="grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 2xl:!grid-cols-4 3xl:!grid-cols-[352px_320px_320px_320px] gap-3xl lg:!gap-5xl"
      title={
        <>
          Discover{' '}
          <span className="text-text-primary">
            <br className="block md:!hidden" />
            Kl-Distribution
          </span>
        </>
      }
      desc="Dive-in to know how Distribution can transform the container image management"
      features={consts.distribution.features}
    />
  );
};

const GetStartedSection = () => {
  const [selectedTab, setSelectedTab] = useState(
    consts.distribution.getstarted[0].id
  );
  const getTab = () => {
    switch (selectedTab) {
      case 'push':
        return (
          <div className="relative h-full overflow-hidden flex items-end justify-center lg:!items-start lg:!justify-start 3xl:!justify-center">
            <img alt="push" src={BuildDis.src} />
          </div>
        );
      case 'distribute':
        return (
          <div className="relative h-full overflow-hidden flex items-center justify-center lg:!items-start lg:!justify-start 3xl:!justify-center">
            <img alt="distribute" src={DistributeDis.src} />
          </div>
        );
      case 'create':
      default:
        return (
          <div className="h-full flex items-center justify-center md:!items-end">
            <ResponsiveImage
              alt="Create your repository"
              {...consts.distribution.getStartedImages.repo}
            />
          </div>
        );
    }
  };

  return (
    <GetStarted
      title="In 3 simple steps"
      tabs={consts.distribution.getstarted}
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

const DistributionRoot = () => {
  return (
    <div>
      <HeroTwo
        heading={<>Package & Distribute your Environments</>}
        desc="Cloud-accelerated Build System, Container Registry, & Helm Repos built to distribute and deploy with ease"
        headClassName="md:!max-w-[630px] 2xl:!min-w-[630px]"
        align="left"
        tag="Kl-Distribution"
        cover={Cover.src}
      />
      <Wrapper>
        <DiscoverSection />
        <GetStartedSection />
        <ReadyTo />
      </Wrapper>
    </div>
  );
};

export default DistributionRoot;
