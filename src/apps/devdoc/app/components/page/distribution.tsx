import { useState } from 'react';
import Container from '~/app/components/container';
import Discover from '~/app/components/website/discover-component';
import ReadyToOps from '~/app/components/website/ready-to-ops';
import GetStarted from '~/app/components/website/get-started';
import SuccessStories from '~/app/components/website/success-stories';
import { Button } from 'kl-design-system/atoms/button';
import Chips from 'kl-design-system/atoms/chips';

import consts from '~/app/utils/const';

import { successStories } from '~/app/utils/dummy-data';
import Cover from '../../../images/distribution/distribution-cover.svg';
import BuildDis from '../../../images/distribution/build-distribution.svg';
import CreateDis from '../../../images/distribution/create-distribution.svg';
import DistributeDis from '../../../images/distribution/distribute-distribution.svg';
import SectionWrapper from '../website/section-wrapper';

const DiscoverSection = () => {
  return (
    <div className="flex flex-col 2xl:pt-10xl">
      <Discover
        className="grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 2xl:!grid-cols-4 gap-3xl lg:!gap-5xl "
        title={
          <>
            Discover <span className="text-text-primary">Distribution</span>
          </>
        }
        desc="Dive-in to know how Distribution can transform the container image management"
        features={consts.distribution.features}
      />
    </div>
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
          <div className="relative h-full overflow-hidden flex items-end justify-center lg:!items-start lg:!justify-start">
            <img alt="push" src={BuildDis.src} />
          </div>
        );
      case 'distribute':
        return (
          <div className="relative h-full overflow-hidden flex items-center justify-center lg:!items-start lg:!justify-start">
            <img alt="distribute" src={DistributeDis.src} />
          </div>
        );
      case 'create':
      default:
        return (
          <div className="relative h-full overflow-hidden flex items-end justify-center lg:!items-start lg:!justify-start">
            <img
              alt="create"
              src={CreateDis.src}
              className="lg:absolute bottom-0"
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

const SuccessStorySection = () => {
  return (
    <div className="flex flex-col 2xl:pt-10xl">
      {/** @ts-ignore * */}
      <SuccessStories tabs={successStories} />
    </div>
  );
};

const ReadyTo = () => {
  return <ReadyToOps />;
};

const DistributionRoot = () => {
  return (
    <div>
      <Container className="relative flex justify-center lg:justify-start">
        <div className="flex flex-col px-3xl lg:!px-8xl 2xl:!px-12xl z-10">
          <div className="md:absolute inset-0 distribution-cover-graph z-0" />
          <div className="flex flex-col lg:!flex-row items-center lg:!items-start lg:!gap-10xl lg:!py-10xl 2xl:!py-10xl z-10 text-center lg:!text-left">
            <div className="flex flex-col gap-6xl md:!max-w-[630px] py-6xl md:!py-8xl lg:!py-0">
              <div className="flex flex-col items-center lg:!items-start gap-3xl">
                <Chips.Chip item="distribution" label="Distributions" />
                <h1 className="heading4xl-marketing md:!heading5xl-marketing lg:!heading6xl-marketing text-text-default">
                  Package & Distribute your Environments
                </h1>
                <p className="bodyLg-medium md:!bodyXl-medium text-text-soft">
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
            <div className="z-10 pb-6xl">
              <img src={Cover.src} className="lg:scale-[1.3]" />
            </div>
          </div>
        </div>
      </Container>
      <Container className="flex flex-col">
        <SectionWrapper>
          <DiscoverSection />
          <GetStartedSection />
          <SuccessStorySection />
        </SectionWrapper>
        <ReadyTo />
      </Container>
    </div>
  );
};

export default DistributionRoot;
