import { CheckCircleFill, ArrowRight, Stack } from '@jengaicons/react';
import { Button } from 'kl-design-system/atoms/button';
import Image from 'next/image';
import { ReactNode } from 'react';
import Container from '~/app/components/container';
import ReadyToOps from '~/app/components/website/ready-to-ops';
import { Graph, GraphItem } from '~/app/components/graph';
import { cn } from '~/app/utils/commons';
import Link from 'next/link';
import Cover from '../../../images/product-landing/cover-product.svg';
import InfraOps from '../../../images/product-landing/infra.svg';
import DevOps from '../../../images/product-landing/dev.svg';
import Dist from '../../../images/product-landing/dist.svg';
import SectionWrapper from '../website/section-wrapper';

const products = [
  {
    type: 'InfraOps',
    title: 'Cloud-native at the core',
    desc: 'Flexible & Cost Effective Kubernetes Cluster Management with simple and user-friendly interface',
    features: [
      {
        title: 'Cloud agnostic',
      },
      {
        title: 'Spot fleet',
      },
      {
        title: 'GPU enabled nodes',
      },
      {
        title: 'Auto scalable nodepools',
      },
    ],
    link: '/infraops',
    logo: InfraOps,
  },
  {
    type: 'DevOps',
    title: 'NoOps development',
    desc: 'Self-Serve environments crafted for development, staging & production workloads',
    features: [
      {
        title: 'Ephemeral workspaces',
      },
      {
        title: 'Scalable environments',
      },
      {
        title: 'Secure VPN for remote local',
      },
      {
        title: 'Automated backing services',
      },
    ],
    link: '/devops',
    logo: DevOps,
  },
  {
    type: 'Distribution',
    title: 'Simply build and deploy',
    desc: 'Cloud accelerated build system and container registry to build and ship containers anywhere',
    features: [
      {
        title: 'Integrated container registry',
      },
      {
        title: 'Auto build & deploy',
      },
      {
        title: 'Major repo integrations',
      },
      {
        title: 'Optimized building processes',
      },
    ],
    link: '/distribution',
    logo: Dist,
  },
];

const benefitsItems = [
  {
    title: 'Developers',
    items: [
      {
        title: 'Auto - Provision',
        icon: Stack,
      },
      {
        title: 'Run Anywhere',
        icon: Stack,
      },
      {
        title: 'Enhanced Application Security',
        icon: Stack,
      },
      {
        title: 'Collaborative Environments',
        icon: Stack,
      },
      {
        title: 'Comprehensive Monitoring and Insights',
        icon: Stack,
      },
      {
        title: 'Plug your own CICDs and Observability',
        icon: Stack,
      },
      {
        title: 'Streamlined Application Development',
        icon: Stack,
      },
      {
        title: 'Cost - Efficient Resource Management',
        icon: Stack,
      },
    ],
  },
  {
    title: 'Platform Engineers',
    items: [
      {
        title: 'Faster Deployment',
        icon: Stack,
      },
      {
        title: 'Flexible Autoscaling',
        icon: Stack,
      },
      {
        title: 'Developer Centric',
        icon: Stack,
      },
      {
        title: 'Reduce Development Inner loop',
        icon: Stack,
      },
      {
        title: 'Simplified Infrastructure Management',
        icon: Stack,
      },
      {
        title: 'Build system for faster deployments',
        icon: Stack,
      },
      {
        title: 'Declarative Infrastructure, Projects, and Maintenance',
        icon: Stack,
      },
      {
        title: 'Effective and Efficient Development Process',
        icon: Stack,
      },
    ],
  },
];

const recommendedTabs = [
  {
    title: 'InfraOps',
    desc: 'Dive in to set up your InfraOps effortlessly',
    content: 'Explore our knowledge bank',
    subContent:
      'Tap into our extensive collection of resources and guides tailored to help you navigate around platform',
    link: '/',
    id: 'infraops',
  },
  {
    title: 'DevOps',
    desc: 'Dive in to set up your InfraOps effortlessly',
    content: 'Explore our knowledge bank',
    subContent:
      'Tap into our extensive collection of resources and guides tailored to help you navigate around platform',
    link: '/',
    id: 'devops',
  },
  {
    title: 'Distribution',
    desc: 'Dive in to set up your InfraOps effortlessly',
    content: 'Explore our knowledge bank',
    subContent:
      'Tap into our extensive collection of resources and guides tailored to help you navigate around platform',
    link: '/',
    id: 'distribution',
  },
];

const ProductCards = ({
  type,
  title,
  desc,
  features,
  logo,
  link,
}: {
  type: string;
  title: ReactNode;
  desc: ReactNode;
  features: typeof products;
  link: string;
  logo: string;
}) => {
  return (
    <Container>
      <div className="py-6xl md:!py-8xl lg:!py-10xl w-full flex flex-col lg:!flex-row gap-6xl lg:gap-10xl lg:min-h-[512px]">
        <div className="flex flex-col gap-5xl flex-1 xl:w-[480px] 2xl:!w-[512px]">
          <div className="flex flex-col gap-4xl">
            <div className="flex flex-col gap-md">
              <h5 className="bodyLg-medium lg:!bodyXl-medium text-text-disabled">
                {type}
              </h5>
              <h3 className="heading3xl-marketing lg:!heading5xl-marketing text-text-default">
                {title}
              </h3>
            </div>
            <p className="bodyLg-medium lg:!bodyXl-medium text-text-soft">
              {desc}
            </p>
          </div>
          <ul className="flex flex-col gap-2xl bodyLg-medium text-text-soft">
            {features?.map((f) => (
              <li key={f.title} className="flex flex-row items-center gap-lg">
                <span className="text-icon-primary">
                  <CheckCircleFill size={16} />
                </span>
                <span>{f.title}</span>
              </li>
            ))}
          </ul>
          <Button
            content={`Learn more about ${type}`}
            suffix={<ArrowRight />}
            LinkComponent={Link}
            to={link}
            toLabel="href"
            variant="primary-outline"
          />
        </div>
        <Graph className="-mx-10xl -my-8xl py-8xl ">
          <div className="grid grid-cols-1 lg:h-full px-10xl ">
            <GraphItem className="flex items-center justify-center md:min-w-[491px] xl:!min-w-[512px] xl:h-[512px] ">
              <div className=" bg-surface-basic-subdued p-3xl w-full h-full md:!p-5xl xl:!p-0 flex items-center justify-center">
                {/** @ts-ignore * */}
                <img src={logo.src} />
              </div>
            </GraphItem>
          </div>
        </Graph>
      </div>
    </Container>
  );
};

const Benefits = () => {
  return (
    <Container>
      <div className="w-full py-6xl md:!py-8xl lg:!py-10xl flex flex-col gap-7xl lg:gap-10xl md:items-center lg:!items-start">
        <div className="flex flex-col gap-3xl w-full text-center md:!w-[500px] lg:!w-auto">
          <h1 className="heading3xl-marketing lg:!heading6xl-marketing text-text-default">
            We understand because we&apos;ve been there too
          </h1>
          <p className="bodyLg-medium lg:!bodyXl-medium text-text-soft">
            So, we meticulously engineered our platform to provide you the below
            benefits
          </p>
        </div>
        <Graph className="-m-10xl p-10xl">
          <div className="grid grid-cols-1 md:!grid-cols-2 gap-3xl lg:!gap-5xl">
            {benefitsItems.map((bi) => (
              <div
                key={bi.title}
                className="grid grid-rows-[96px_auto] gap-3xl lg:!gap-5xl"
              >
                <GraphItem>
                  <div className="bg-surface-basic-subdued p-2xl flex items-center justify-center heading3xl-marketing text-text-default h-full">
                    {bi.title}
                  </div>
                </GraphItem>
                <div className="grid grid-cols-1 lg:!grid-cols-2 gap-3xl lg:!gap-5xl">
                  {bi.items.map((bii) => (
                    <GraphItem key={bii.title}>
                      <div className="xl:h-[192px] xl:w-[256px] bg-surface-basic-subdued flex flex-col gap-4xl p-4xl">
                        <span className="rounded-full border-2 border-border-default w-fit p-2xl">
                          <bii.icon size={32} />
                        </span>
                        <span className="headingMd lg:!bodyLg-medium text-text-default flex-1">
                          {bii.title}
                        </span>
                      </div>
                    </GraphItem>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Graph>
      </div>
    </Container>
  );
};

const RecommendedItemButton = ({
  title,
  desc,
  onClick,
  active: _,
}: {
  title: ReactNode;
  desc: ReactNode;
  onClick: () => void;
  active?: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className="p-4xl bg-surface-basic-default flex flex-col  h-full gap-4xl"
    >
      <span className="heading2xl-marketing text-text-default">{title}</span>
      <span className="bodyLg text-text-soft">{desc}</span>
    </div>
  );
};

const RecommendedCard = ({
  content,
  subContent,
  image,
  link: _,
}: {
  content: ReactNode;
  subContent: ReactNode;
  image?: string;
  link: string;
}) => {
  return (
    <div className="bg-surface-basic-default flex flex-col md:!flex-row gap-3xl lg:!gap-8xl md:!h-[416px]">
      <div className="flex flex-col p-5xl gap-5xl md:w-1/2">
        <div className="flex flex-col gap-4xl">
          <div className="flex flex-col gap-md">
            <span className="bodyLg-medium md:!bodyXl-medium text-text-disabled">
              Recommended resources
            </span>
            <h3 className="heading3xl-marketing md:!heading4xl lg:!heading5xl-marketing text-text-default line-clamp-2">
              {content}
            </h3>
          </div>
          <p className="bodyLg-medium md:!bodyXl-medium text-text-soft line-clamp-3">
            {subContent}
          </p>
        </div>
        <Button
          content="Explore Docs"
          suffix={<ArrowRight />}
          size="sm"
          variant="basic"
        />
      </div>
      <div className="h-[320px] md:!h-auto md:w-1/2">
        {image ? (
          <Image src={image} alt="success-story" />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(180deg, #E4E4E7 0%, #F3F4F6 100%)',
            }}
          />
        )}
      </div>
    </div>
  );
};

const RecommendedResources = ({
  tabs,
  activeTab,
  onTabChange,
  tabContainerClassName,
}: {
  tabs: typeof recommendedTabs;
  activeTab?: string;
  onTabChange?: (value: (typeof recommendedTabs)[number]) => void;
  tabContainerClassName?: string;
  title?: string;
}) => {
  return (
    <Graph className="-m-10xl p-10xl">
      <div className="grid lg:!grid-rows-[auto_160px] gap-3xl lg:!gap-5xl">
        <GraphItem>
          <RecommendedCard
            {...(tabs.find((tb) => tb.id === activeTab) || tabs[0])}
          />
        </GraphItem>
        <div
          className={cn(
            'grid grid-cols-1 md:!grid-cols-3 gap-3xl lg:!gap-5xl',
            tabContainerClassName
          )}
        >
          {tabs.map((ss) => (
            <GraphItem key={ss.subContent?.toString()}>
              <RecommendedItemButton
                {...ss}
                onClick={() => onTabChange?.(ss)}
                active={activeTab === ss.id}
              />
            </GraphItem>
          ))}
        </div>
      </div>
    </Graph>
  );
};

const RecommendedSection = () => {
  return (
    <Container>
      <div className="flex flex-col py-6xl md:!py-8xl lg:!py-10xl xl:!py-11xl w-full">
        <RecommendedResources tabs={recommendedTabs} />
      </div>
    </Container>
  );
};

const ReadyTo = () => {
  return <ReadyToOps />;
};

const ProductRoot = () => {
  return (
    <div>
      <Container className="relative flex justify-center lg:justify-start">
        <div className="flex flex-col px-3xl md:!px-5xl lg:!px-8xl lg:!py-10xl py-6xl md:!py-8xl 2xl:px-11xl 2xl:py-10xl z-10 w-full items-center">
          <div className="flex flex-col gap-6xl lg:!items-center text-center max-w-[870px]">
            <div className="flex flex-col gap-3xl">
              <h1 className="heading4xl-marketing md:!heading5xl-marketing lg:!heading6xl-marketing text-text-default">
                Kloudlite - a One click console for your code to cloud journey
              </h1>
              <p className="bodyLg-medium md:!bodyXl-medium text-text-soft">
                Upgrade your development and deployment by merging efficient
                DevOps, scalable cloud infrastructure, and continuous
                optimization into a seamless, productive workflow
              </p>
            </div>
            <div className="flex md:!flex-row flex-col gap-4xl md:!items-center justify-center xl:!justify-start">
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
        </div>
      </Container>
      <Container className="flex flex-col">
        <SectionWrapper>
          <div className="product-graph">
            <img src={Cover.src} />
          </div>

          {products.map((p) => (
            /** @ts-ignore * */
            <ProductCards key={p.type} {...p} />
          ))}
          <Benefits />
          <RecommendedSection />
        </SectionWrapper>
        <ReadyTo />
      </Container>
    </div>
  );
};

export default ProductRoot;
