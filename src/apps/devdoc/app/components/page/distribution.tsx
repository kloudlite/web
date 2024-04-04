import { useState } from 'react';
import Discover from '~/app/components/website/discover-component';
import ReadyToOps from '~/app/components/website/ready-to-ops';
import GetStarted from '~/app/components/website/get-started';
import SuccessStories from '~/app/components/website/success-stories';
import Chips from 'kl-design-system/atoms/chips';
import consts from '~/app/utils/const';
import { successStories } from '~/app/utils/dummy-data';
import Cover from '../../../images/distribution/distribution-cover.svg';
import BuildDis from '../../../images/distribution/build-distribution.svg';
import CreateDis from '../../../images/distribution/create-distribution.svg';
import DistributeDis from '../../../images/distribution/distribute-distribution.svg';
import Wrapper from '../wrapper';
import Button from '../button';
import ResponsiveImage from '../website/responsive-image';

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
              rmobile={consts.distribution.getStartedImages.repo.rmobile}
              r768={consts.distribution.getStartedImages.repo.r768}
              r1024={consts.distribution.getStartedImages.repo.r1024}
              r1280={consts.distribution.getStartedImages.repo.r1280}
              r1440={consts.distribution.getStartedImages.repo.r1440}
              r1920={consts.distribution.getStartedImages.repo.r1920}
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
      <Wrapper className="relative flex justify-center lg:justify-start py-6xl md:!py-8xl lg:!py-10xl">
        <div className="flex flex-col z-10 w-full">
          <div className="md:absolute inset-0 distribution-cover-graph z-0 w-full" />
          <div className="w-full flex flex-col lg:!flex-row items-center lg:!items-start lg:!gap-10xl z-10 text-center lg:!text-left justify-between 3xl:pr-10xl">
            <div className="flex flex-col gap-6xl md:!max-w-[630px]">
              <div className="flex flex-col items-center lg:!items-start gap-3xl">
                <Chips.Chip
                  item="distribution"
                  label={<div className="bodyLg-medium">Kl-Distribution</div>}
                />
                <h1 className="heading4xl-marketing md:!heading5xl-marketing lg:!heading6xl-marketing text-text-default">
                  Package & Distribute your Environments
                </h1>
                <p className="bodyXl lg:!bodyXXl text-text-soft">
                  Cloud-accelerated Build System, Container Registry, & Helm
                  Repos built to distribute and deploy with ease
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
            <div className="z-10 relative lg:min-w-[448px] lg:top-[10%] 2xl:!top-0 pt-6xl md:!pt-6xl lg:!py-0">
              <img src={Cover.src} />
            </div>
          </div>
        </div>
      </Wrapper>
      <Wrapper>
        <DiscoverSection />
        <GetStartedSection />
        <ReadyTo />
      </Wrapper>
    </div>
  );
};

export default DistributionRoot;
