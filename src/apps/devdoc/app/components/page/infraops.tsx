import { ArrowRight, GithubLogoFill } from '~/app/icons/icons';
import { motion } from 'framer-motion';
import { useState } from 'react';
import HorizontalTopTab from '~/app/components/website/horizontal-top-tab';
import Discover from '~/app/components/website/discover-component';
import GetStarted from '~/app/components/website/get-started';
import ReadyToOps from '~/app/components/website/ready-to-ops';
import SuccessStories from '~/app/components/website/success-stories';
import { successStories } from '~/app/utils/dummy-data';
import consts from '~/app/utils/const';
import NodePoolImg from '~/images/nodepool-simple-to-use.svg';
import FlexibleImage from '~/images/flexible-illustration.svg';
import CostIllustration from '~/images/cost-illustration.svg';

import cover from '~/images/infraops/cover.svg';
import Wrapper from '../wrapper';
import ResponsiveImage from '../website/responsive-image';
import { HeroTwo } from '../commons';

const AdvantageSection = () => {
  const [selectedTab, setSelectedTab] = useState(
    consts.infraops.advantages[0].id
  );

  const getTab = () => {
    switch (selectedTab) {
      case 'flexible':
        return (
          <img
            alt="flexible"
            src={FlexibleImage.src}
            className="h-full w-full object-fill"
          />
        );
      case 'cost-effective':
        return (
          <img
            alt="cost-effective"
            src={CostIllustration.src}
            className="h-full w-full object-fill"
          />
        );
      case 'simple-to-use':
      default:
        return (
          <div className="p-4xl lg:!p-8xl">
            <div className="max-w-[878px] m-auto flex flex-col-reverse gap-3xl md:!flex-row items-center justify-center">
              <img
                alt="simple-to-use"
                src={NodePoolImg.src}
                className="shadow-filter md:w-1/2 lg:!w-auto"
              />
              <span className="text-icon-disabled -rotate-90 md:rotate-0">
                <ArrowRight size={32} />
              </span>
              <div className="rounded border border-border-default bg-surface-basic-default p-3xl shadow-filter">
                <span className="">
                  <GithubLogoFill size={60} />
                </span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <HorizontalTopTab
      tabs={consts.infraops.advantages}
      tabContainerClassName="grid grid-cols-3 gap-3xl lg:!gap-5xl"
      onTabChange={(item) => setSelectedTab(item.id)}
      activeTab={selectedTab}
      tab={getTab()}
    />
  );
};

const GetStartedSection = () => {
  const [selectedTab, setSelectedTab] = useState(
    consts.infraops.getstarted[0].id
  );
  const getTab = () => {
    switch (selectedTab) {
      case 'create':
        return (
          <motion.div className="h-full flex items-end justify-center relative top-[18px] md:!top-0 p-3xl !pb-0 md:!p-0">
            <ResponsiveImage
              alt="Create cluster"
              {...consts.infraops.getStartedImages.createCluster}
            />
          </motion.div>
        );
      case 'access':
        return (
          <motion.div className="h-full flex items-end justify-center relative p-3xl !pb-0 md:!p-0">
            <ResponsiveImage
              alt="Accesss & Deploy"
              {...consts.infraops.getStartedImages.accessAndDeploy}
            />
          </motion.div>
        );
      case 'attach':
      default:
        return (
          <motion.div className="h-full flex items-center justify-center p-3xl md:!p-0">
            <ResponsiveImage
              alt="Attach repository"
              {...consts.infraops.getStartedImages.attachRepo}
              hasFilter
            />
          </motion.div>
        );
    }
  };

  return (
    <GetStarted
      title="In 3 simple steps"
      tabs={consts.infraops.getstarted}
      onTabChange={(item) => setSelectedTab(item.id || '')}
      tab={getTab()}
      activeTab={selectedTab}
    />
  );
};

const DiscoverSection = () => {
  return (
    <Discover
      className="grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 2xl:!grid-cols-4 3xl:!grid-cols-[352px_320px_320px_320px] gap-3xl lg:!gap-5xl"
      title={
        <>
          Discover{' '}
          <span className="text-text-primary">
            <br className="block md:!hidden" />
            InfraOps
          </span>
        </>
      }
      desc="Dive-in to know how InfraOps can transform your infrastructure management"
      features={consts.infraops.features}
    />
  );
};

const _SuccessStorySection = () => {
  // @ts-ignore
  return <SuccessStories tabs={successStories} />;
};

const ReadyTo = () => {
  return <ReadyToOps />;
};

const InfraRoot = () => {
  return (
    <div>
      <HeroTwo
        heading={
          <>
            Simple, cost-effective,
            <br className="hidden 2xl:!block" /> cloud agnostic
          </>
        }
        desc="The freedom of cloud agnosticism with effortless infrastructure management-Any Provider, Any Scale, Absolute Security"
        headClassName="md:!max-w-[630px] 2xl:!min-w-[630px]"
        align="left"
        tag="InfraOps"
        cover={cover.src}
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

export default InfraRoot;
