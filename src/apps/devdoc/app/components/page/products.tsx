import {
  ArrowRight,
  Stack,
  Globe,
  ClockCounterClockwise,
  SecureConfig,
  UsersThree,
  ChartBar,
  Search,
  Monitor,
  CostMonitoring,
  Autoscaling,
  Developer,
  Infinity as InfinityIcon,
  TreeStructure,
  GearSix,
  Config,
  Code,
} from '@jengaicons/react';
import Image from 'next/image';
import { ReactNode } from 'react';
import Link from 'next/link';
import Container from '~/app/components/container';
import ReadyToOps from '~/app/components/website/ready-to-ops';
import { Graph, GraphExtended, GraphItem } from '~/app/components/graph';
import { cn } from '~/app/utils/commons';
import Cover from '~/images/product-landing/cover-product.svg';
import InfraOps from '~/images/product-landing/infra.svg';
import DevOps from '~/images/product-landing/dev.svg';
import Dist from '~/images/product-landing/dist.svg';
import Wrapper from '../wrapper';
import Button from '../button';
import ListTrack from '../website/list-track';
import SectionWrapper from '../website/section-wrapper';
import { Block, Head } from '../commons';

const products = [
  {
    type: 'DevOps',
    title: (
      <span>
        NoOps <br className="hidden lg:!block" /> development
      </span>
    ),
    desc: (
      <span>
        Self-Serve environments crafted for <br className="hidden lg:!block" />
        development, staging & production workloads
      </span>
    ),
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
    logo: InfraOps,
  },
  {
    type: 'InfraOps',
    title: (
      <span>
        Cloud-native <br className="hidden lg:!block" /> at the core
      </span>
    ),
    desc: (
      <span>
        Flexible & Cost Effective Kubernetes Cluster{' '}
        <br className="hidden lg:!block" /> Management with simple and
        user-friendly interface
      </span>
    ),
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
    logo: DevOps,
  },
  {
    type: 'Distribution',
    title: (
      <span>
        Simply build <br className="hidden lg:!block" /> and deploy
      </span>
    ),
    desc: (
      <span>
        Cloud accelerated build system and container
        <br className="hidden lg:!block" /> registry to build and ship
        containers anywhere
      </span>
    ),
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
    title: 'Auto - Provision',
    icon: Stack,
  },
  {
    title: 'Run Anywhere',
    icon: Globe,
  },
  {
    title: 'Faster Deployment',
    icon: ClockCounterClockwise,
  },
  {
    title: 'Flexible Autoscaling',
    icon: Autoscaling,
  },
  {
    title: (
      <span>
        Developer <br className="hidden 2xl:!block 3xl:!hidden" />
        Centric
      </span>
    ),
    icon: Developer,
  },
  {
    title: 'Collaborative Environments',
    icon: UsersThree,
  },
  {
    title: 'Enhanced Application Security',
    icon: SecureConfig,
  },
  {
    title: 'Comprehensive Monitoring and Insights',
    icon: ChartBar,
  },
  {
    title: 'Reduce Development Inner loop',
    icon: InfinityIcon,
  },
  {
    title: 'Streamlined Application Development',
    icon: Monitor,
  },
  {
    title: 'Plug your own CICDs and Observability',
    icon: Search,
  },
  {
    title: 'Simplified Infrastructure Management',
    icon: TreeStructure,
  },
  {
    title: 'Build system for faster deployments',
    icon: GearSix,
  },
  {
    title: 'Cost - Efficient Resource Management',
    icon: CostMonitoring,
  },
  {
    title: 'Effective and Efficient Development Process',
    icon: Code,
  },
  {
    title: 'Declarative Infrastructure, Projects, and Maintenance',
    icon: Config,
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
    desc: 'Explore the DevOps APIs to build your app',
    content: 'Explore our knowledge bank',
    subContent:
      'Tap into our extensive collection of resources and guides tailored to help you navigate around platform',
    link: '/',
    id: 'devops',
  },
  {
    title: 'Distribution',
    desc: 'Access the resources to ensure a smooth build',
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
        <div className="flex flex-col gap-5xl flex-1 xl:w-[480px] 2xl:!w-[512px] ">
          <div className="flex flex-col gap-4xl">
            <div className="flex flex-col gap-md">
              <h5 className="bodyXl lg:!bodyXXl text-text-disabled">{type}</h5>
              <h3 className="heading4xl-marketing lg:!heading5xl-marketing text-text-default">
                {title}
              </h3>
            </div>
            <p className="bodyXl lg:!bodyXXl text-text-soft">{desc}</p>
          </div>
          <ul className="flex flex-col gap-2xl bodyXl lg:!bodyXXl text-text-soft">
            <ListTrack items={features} />
          </ul>
          <div className="w-full md:!w-fit">
            <Button
              content={`Learn more about ${type}`}
              suffix={<ArrowRight />}
              LinkComponent={Link}
              to={link}
              toLabel="href"
              block
              variant="primary-outline"
            />
          </div>
        </div>
        <Graph className="lg:-mx-10xl -mt-[60px] py-8xl ">
          <div className="grid grid-cols-1 lg:h-full lg:px-10xl ">
            <GraphItem className="flex items-center justify-center md:min-w-[491px] xl:!min-w-[512px] xl:h-[512px] 3xl:!w-[608px]">
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
    <Block
      title="We understand because we've been there too"
      desc="So, we meticulously engineered our platform to provide you the below
          benefits"
      titleClass="md:!max-w-[494px] lg:!max-w-[746px] m-auto"
      descClass="md:!max-w-[476px] xl:!max-w-none lg:!max-w-[588px]"
    >
      <div>
        <div className="grid grid-cols-1 md:!grid-cols-2 xl:!grid-cols-[512px_auto] 2xl:!grid-cols-2 gap-3xl lg:!gap-5xl 3xl:!gap-8xl">
          <GraphItem className="h-[96px] block md:!hidden">
            <div className="bg-surface-basic-subdued p-2xl flex flex-col items-center justify-center heading3xl-marketing text-text-default h-full">
              <span>Developers &</span>
              <span>Platform Engineers</span>
            </div>
          </GraphItem>
          <GraphItem className="h-[96px] hidden md:!block">
            <div className="bg-surface-basic-subdued p-2xl flex items-center justify-center heading3xl-marketing text-text-default h-full">
              Developers
            </div>
          </GraphItem>
          <GraphItem className="h-[96px] hidden md:!block">
            <div className="bg-surface-basic-subdued p-2xl flex items-center justify-center heading3xl-marketing text-text-default h-full">
              Platform Engineers
            </div>
          </GraphItem>
        </div>
        <div className="grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 2xl:!grid-cols-4 3xl:!grid-cols-5 gap-3xl lg:!gap-5xl pt-5xl">
          {benefitsItems.map((bii, index) => {
            const i = index;
            return (
              <GraphItem key={i}>
                <div className="xl:h-[192px] 2xl:max-w-[256px] bg-surface-basic-subdued flex flex-col gap-4xl p-4xl">
                  <span className="rounded-full w-fit p-2xl bg-icon-primary text-text-on-primary">
                    <bii.icon size={32} />
                  </span>
                  <span className="headingMd lg:!bodyLg-medium text-text-default flex-1">
                    {bii.title}
                  </span>
                </div>
              </GraphItem>
            );
          })}
        </div>
      </div>
    </Block>
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
      <span className="bodyXl text-text-soft">{desc}</span>
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
            <span className="bodyXl lg:!bodyXXl text-text-disabled">
              Recommended resources
            </span>
            <h3 className="heading3xl-marketing md:!heading4xl lg:!heading5xl-marketing text-text-default line-clamp-2">
              {content}
            </h3>
          </div>
          <p className="bodyXl lg:!bodyXXl text-text-soft line-clamp-3">
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
    <GraphExtended>
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
    </GraphExtended>
  );
};

const RecommendedSection = () => {
  return (
    <SectionWrapper>
      <RecommendedResources tabs={recommendedTabs} />
    </SectionWrapper>
  );
};

const ReadyTo = () => {
  return <ReadyToOps />;
};

const ProductRoot = () => {
  return (
    <div>
      <Wrapper className="relative flex justify-center lg:justify-start py-6xl md:!py-8xl lg:!py-10xl">
        <Head
          heading="Kloudlite - a One click console for your code to cloud journey
"
          desc="Upgrade your development and deployment by merging efficient
                DevOps, scalable cloud infrastructure, and continuous
                optimization into a seamless, productive workflow
"
        />
      </Wrapper>
      <Wrapper>
        <div className="product-graph flex items-center justify-center lg:!pb-10xl pb-6xl md:!pb-8xl 2xl:!pb-10xl ">
          <img alt="cover" src={Cover.src} />
        </div>

        {products.map((p) => (
          /** @ts-ignore * */
          <ProductCards key={p.type} {...p} />
        ))}
        <Benefits />
        <RecommendedSection />
        <ReadyTo />
      </Wrapper>
    </div>
  );
};

export default ProductRoot;
