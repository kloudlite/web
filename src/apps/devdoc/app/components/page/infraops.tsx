import { ArrowRight, GithubLogoFill } from '@jengaicons/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Chips from 'kl-design-system/atoms/chips';
import HorizontalTopTab from '~/app/components/website/horizontal-top-tab';
import Discover from '~/app/components/website/discover-component';
import GetStarted from '~/app/components/website/get-started';
import ReadyToOps from '~/app/components/website/ready-to-ops';
import SuccessStories from '~/app/components/website/success-stories';
import { successStories } from '~/app/utils/dummy-data';
import consts from '~/app/utils/const';
import NodePoolImg from '../../../images/nodepool-simple-to-use.svg';
import FlexibleImage from '../../../images/flexible-illustration.svg';
import CostIllustration from '../../../images/cost-illustration.svg';

import cover from '../../../images/infraops/cover.svg';
import Wrapper from '../wrapper';
import Button from '../button';
import ResponsiveImage from '../website/responsive-image';

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
              rmobile={consts.infraops.getStartedImages.createCluster.rmobile}
              r768={consts.infraops.getStartedImages.createCluster.r768}
              r1024={consts.infraops.getStartedImages.createCluster.r1024}
              r1280={consts.infraops.getStartedImages.createCluster.r1280}
              r1440={consts.infraops.getStartedImages.createCluster.r1440}
              r1920={consts.infraops.getStartedImages.createCluster.r1920}
            />
          </motion.div>
        );
      case 'access':
        return (
          <motion.div className="h-full flex items-end justify-center relative p-3xl !pb-0 md:!p-0">
            <ResponsiveImage
              alt="Accesss & Deploy"
              rmobile={consts.infraops.getStartedImages.accessAndDeploy.rmobile}
              r768={consts.infraops.getStartedImages.accessAndDeploy.r768}
              r1024={consts.infraops.getStartedImages.accessAndDeploy.r1024}
              r1280={consts.infraops.getStartedImages.accessAndDeploy.r1280}
              r1440={consts.infraops.getStartedImages.accessAndDeploy.r1440}
              r1920={consts.infraops.getStartedImages.accessAndDeploy.r1920}
            />
          </motion.div>
        );
      case 'attach':
      default:
        return (
          <motion.div className="h-full flex items-center justify-center p-3xl md:!p-0">
            <ResponsiveImage
              alt="Attach repository"
              rmobile={consts.infraops.getStartedImages.attachRepo.rmobile}
              r768={consts.infraops.getStartedImages.attachRepo.r768}
              r1024={consts.infraops.getStartedImages.attachRepo.r1024}
              r1280={consts.infraops.getStartedImages.attachRepo.r1280}
              r1440={consts.infraops.getStartedImages.attachRepo.r1440}
              r1920={consts.infraops.getStartedImages.attachRepo.r1920}
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
            Kl-InfraOps
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
      <Wrapper className="relative flex justify-center lg:justify-start py-6xl md:!py-8xl lg:!py-10xl">
        <div className="flex flex-col z-10 w-full">
          <div className="md:absolute inset-0 distribution-cover-graph z-0 w-full" />
          <div className="w-full flex flex-col lg:!flex-row items-center lg:!items-start 2xl:!gap-10xl z-10 text-center lg:!text-left justify-between 3xl:pr-10xl">
            <div className="flex flex-col gap-6xl md:!max-w-[630px] 2xl:min-w-[630px]">
              <div className="flex flex-col items-center lg:!items-start gap-3xl">
                <Chips.Chip
                  item="infraops"
                  label={<div className="bodyLg-medium">Kl-InfraOps</div>}
                />
                <h1 className="heading4xl-marketing md:!heading5xl-marketing lg:!heading6xl-marketing text-text-default">
                  Simple, cost-effective,
                  <br className="hidden 2xl:!block" /> cloud agnostic
                </h1>
                <p className="bodyXl lg:!bodyXXl text-text-soft">
                  The freedom of cloud agnosticism with effortless
                  infrastructure management—Any Provider, Any Scale, Absolute
                  Security
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
              <img src={cover.src} />
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

export default InfraRoot;
