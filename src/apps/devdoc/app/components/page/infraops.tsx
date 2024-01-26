import { TextInput } from 'kl-design-system/atoms/input';
import { ArrowRight, GithubLogoFill } from '@jengaicons/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Container from '~/app/components/container';
import CodeEditorPlaceholder from '~/app/components/website/code-editor-placeholder';
import HorizontalTopTab from '~/app/components/website/horizontal-top-tab';
import Discover from '~/app/components/website/discover-component';
import GetStarted from '~/app/components/website/get-started';
import ReadyToOps from '~/app/components/website/ready-to-ops';
import SuccessStories from '~/app/components/website/success-stories';
import { successStories } from '~/app/utils/dummy-data';
import consts from '~/app/utils/const';
import { Button } from 'kl-design-system/atoms/button';
import Chips from 'kl-design-system/atoms/chips';
import NodePoolImg from '../../../images/nodepool-simple-to-use.svg';
import FlexibleImage from '../../../images/flexible-illustration.svg';
import CostIllustration from '../../../images/cost-illustration.svg';
import providersImage from '../../../images/infraops/providers.svg';
import SectionWrapper from '../website/section-wrapper';
import cover from '../../../images/infraops/cover.svg';

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
            className="h-full w-full object-cover"
          />
        );
      case 'cost-effective':
        return (
          <img
            alt="cost-effective"
            src={CostIllustration.src}
            className="h-full w-full object-cover"
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
      tabContainerClassName="grid grid-cols-3 gap-3xl lg:!gap-5xl md:!pt-8xl lg:!pt-10xl px-10xl"
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
          <motion.div
            className="relative h-full max-w-[521px] m-auto overflow-hidden"
            style={{
              filter:
                'drop-shadow(0px 2px 16px rgba(33, 43, 54, 0.08)) drop-shadow(0px 0px 0px rgba(6, 44, 82, 0.10))',
            }}
          >
            <div className="flex flex-col-reverse md:!flex-row items-center justify-between relative md:!absolute -bottom-[30px] right-0 left-0 md:p-2xl xl:!p-0">
              <div className="rounded-lg border border-border-default p-4xl flex flex-col gap-3xl w-[305px] bg-surface-basic-active pointer-events-none">
                <div className="flex flex-col gap-3xl pointere">
                  <TextInput label="Name" value="Dev cluster 3" size="md" />
                  <TextInput
                    label="Nodepool 1"
                    placeholder="Min 2 nodes"
                    size="md"
                  />
                  <TextInput placeholder="Max 5 nodes" size="md" />
                </div>
                <Button content="Create" block />
              </div>
              <span className="text-icon-disabled -rotate-90 md:!rotate-0">
                <ArrowRight size={32} />
              </span>
              <div className="rounded border border-border-default bg-surface-basic-default p-3xl shadow-filter">
                <span className="">
                  <GithubLogoFill size={60} />
                </span>
              </div>
            </div>
          </motion.div>
        );
      case 'access':
        return (
          <motion.div
            className="relative h-full max-w-[584px] m-auto overflow-hidden"
            style={{
              filter:
                'drop-shadow(0px 2px 16px rgba(33, 43, 54, 0.08)) drop-shadow(0px 0px 0px rgba(6, 44, 82, 0.10))',
            }}
          >
            <div className="flex flex-col-reverse md:!flex-row items-center justify-between relative md:!absolute bottom-0 right-0 left-0 px-2xl pt-2xl xl:!px-0 xl:!pt-0">
              <div className="w-full h-full">
                <CodeEditorPlaceholder />
              </div>
              <span className="text-icon-disabled -rotate-90 md:!rotate-0">
                <ArrowRight size={32} />
              </span>
              <div className="rounded border border-border-default bg-surface-basic-default p-3xl shadow-filter">
                <span className="">
                  <GithubLogoFill size={60} />
                </span>
              </div>
            </div>
          </motion.div>
        );
      case 'attach':
      default:
        return (
          <motion.div className="h-full flex items-center justify-center p-2xl md:!p-0">
            <img src={providersImage.src} />
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
    <div className="flex flex-col py-6xl 2xl:pt-10xl">
      <Discover
        className="grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 2xl:!grid-cols-4 gap-3xl lg:!gap-5xl "
        title={
          <>
            Discover <span className="text-text-primary">InfraOps</span>
          </>
        }
        desc="Dive-in to know how InfraOps can transform your infrastructure management"
        features={consts.infraops.features}
      />
    </div>
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

const InfraRoot = () => {
  return (
    <div>
      <Container className="relative flex justify-center lg:justify-start">
        <div className="flex flex-col px-3xl md:!px-5xl lg:!px-8xl xl:!px-11xl 2xl:!px-12xl z-10">
          <div className="md:absolute inset-0 distribution-cover-graph z-0" />
          <div className="flex flex-col lg:!flex-row items-center lg:!items-start lg:!gap-10xl lg:!py-10xl 2xl:!py-10xl z-10 text-center lg:!text-left xl:max-w-[1024px] 2xl:max-w-[1120px] box-content">
            <div className="flex flex-col gap-6xl md:!max-w-[630px] py-6xl md:!py-8xl lg:!py-0">
              <div className="flex flex-col items-center lg:!items-start gap-3xl">
                <Chips.Chip item="infraops" label="InfraOps" />
                <h1 className="heading4xl-marketing md:!heading5xl-marketing lg:!heading6xl-marketing text-text-default">
                  Simple, cost-effective, cloud agnostic
                </h1>
                <p className="bodyLg-medium md:!bodyXl-medium text-text-soft">
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
            <div className="z-10 pb-6xl">
              <img
                src={cover.src}
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

export default InfraRoot;
