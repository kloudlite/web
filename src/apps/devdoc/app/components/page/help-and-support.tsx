import { TextInput } from 'kl-design-system/atoms/input';
import {
  Search,
  ChevronRight,
  GearSix,
  Domain,
  Link as LinkIcon,
  Webhook,
} from '@jengaicons/react';
import Link from 'next/link';
import { BrandLogo } from 'kl-design-system/branding/brand-logo';
import { GraphExtended, GraphItem } from '~/app/components/graph';
import { ReactNode } from 'react';
import Wrapper from '../wrapper';
import SectionWrapper from '../website/section-wrapper';

const popularArticles = [
  {
    title: 'What is NoOps?',
    link: '/',
  },
  {
    title: "What is a 'Project' on Kloudlite?",
    link: '/',
  },
  {
    title: 'What is Platform Engineering?',
    link: '/',
  },
  {
    title: 'How to use tags on Kloudlite?',
    link: '/',
  },
  {
    title: 'How to add custom domain to Kloudlite?',
    link: '/',
  },
  {
    title: "How Kloudlite's pro plan work?",
    link: '/',
  },
];

const supportTopics = [
  {
    icon: <BrandLogo size={32} color="currentColor" />,
    title: 'Kloudlite Overview',
    desc: 'Learn about Kloudlite and how it can help you',
    link: '/',
  },
  {
    icon: <GearSix size={32} />,
    title: 'Getting started',
    desc: 'Learn how to get started with Kloudlite',
    link: '/',
  },
  {
    icon: <LinkIcon size={32} />,
    title: 'Link management',
    desc: 'Learn how to manage your links on Kloudlite',
    link: '/',
  },
  {
    icon: <Domain size={32} />,
    title: 'Custom domains',
    desc: 'Learn how to use custom domain with Kloudlite',
    link: '/',
  },
  {
    icon: <Webhook size={32} />,
    title: 'API',
    desc: 'Learn how to use the Kloudlite API',
    link: '/',
  },
];

const unknownTopics = [
  {
    icon: <LinkIcon size={32} />,
    title: 'Best practice guides',
    desc: 'Make the most out of Kloudlite',
    link: '/',
  },
  {
    icon: <Domain size={32} />,
    title: 'Community',
    desc: 'Get help from like-minded developers',
    link: '/',
  },
  {
    icon: <Webhook size={32} />,
    title: 'Contact support',
    desc: 'Our support team is ready to assist',
    link: '/',
  },
];

const PopularArticleItem = ({
  title,
  link,
}: {
  title: ReactNode;
  link: string;
}) => {
  return (
    <Link
      href={link}
      className="bodyLg-medium text-text-strong py-lg px-xl flex flex-row gap-xl items-center"
    >
      <span className="flex-1">{title}</span>
      <span>
        <ChevronRight size={16} />
      </span>
    </Link>
  );
};

const TopicItem = ({
  link,
  title,
  icon,
  desc,
}: {
  title: ReactNode;
  link: string;
  icon: ReactNode;
  desc: ReactNode;
}) => {
  return (
    <Link
      href={link}
      className="p-3xl lg:!px-5xl lg:!pt-8xl lg:!pb-5xl flex flex-col gap-5xl bg-surface-basic-default h-full lg:min-h-[288px] help-card-graph"
    >
      <div className="bg-surface-basic-default flex w-8xl h-8xl rounded-full items-center justify-center p-2xl border border-border-default text-icon-default">
        {icon}
      </div>
      <div className="flex flex-col gap-3xl">
        <h4 className="headingXl-marketing text-text-default">{title}</h4>
        <p className="text-text-soft bodyLg line-clamp-2">{desc}</p>
      </div>
    </Link>
  );
};

const HelpAndSupportRoot = () => {
  return (
    <Wrapper className="relative flex flex-col items-center pt-6xl md:!pt-8xl lg:!pt-10xl">
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-6xl text-center w-full">
          <div className="flex flex-col gap-3xl">
            <h1 className="heading3xl-marketing md:!heading4xl-marketing lg:!heading5xl-marketing text-text-default">
              👋 How can we help you today?
            </h1>
            <p className="bodyMd-medium md:!bodyLg-medium lg:!bodyXl-medium text-text-soft">
              Discover solutions through our documentation, guides, and
              community
            </p>
          </div>
          <div className="max-w-[700px] w-full md:w-[700px] m-auto">
            <TextInput
              placeholder="Search for articles..."
              suffix={<span className="bodyMd text-text-soft">⌘K</span>}
              prefixIcon={<Search />}
              size="lg"
            />
          </div>
        </div>
        <GraphExtended className="lg:mt-5xl">
          <GraphItem>
            <div className="px-xl md:!px-3xl py-4xl md:!py-5xl gap-4xl md:!gap-5xl flex flex-col bg-surface-basic-default min-h-[289px]">
              <h2 className="px-xl heading2xl-marketing text-text-default">
                Popular articles
              </h2>
              <div className="flex flex-col md:!flex-row flex-wrap gap-x-6xl gap-y-xl">
                {popularArticles.map((pa) => (
                  <div key={pa.title} className="md:w-[calc(50%-40px)]">
                    <PopularArticleItem {...pa} />
                  </div>
                ))}
              </div>
            </div>
          </GraphItem>
          <div className="grid grid-cols-1 md:!grid-cols-3 gap-3xl md:!gap-5xl mt-3xl md:!mt-5xl">
            {supportTopics.map((st) => (
              <GraphItem key={st.title}>
                <TopicItem {...st} />
              </GraphItem>
            ))}
          </div>
        </GraphExtended>
      </div>
      <SectionWrapper className="flex flex-col w-full">
        <div className="flex flex-col gap-3xl text-center">
          <h2 className="heading3xl-marketing md:!heading4xl-marketing lg:!heading5xl-marketing text-text-default">
            Couldn’t fine what you needed?
          </h2>
          <p className="bodyMd-medium md:!bodyLg-medium lg:!bodyXl-medium text-text-soft">
            Don’t worry, we’ve got more options for you
          </p>
        </div>
        <GraphExtended className="lg:mt-5xl">
          <div className="grid grid-cols-1 md:!grid-cols-3 gap-3xl md:!gap-5xl">
            {unknownTopics.map((ut) => (
              <GraphItem key={ut.title}>
                <TopicItem {...ut} />
              </GraphItem>
            ))}
          </div>
        </GraphExtended>
      </SectionWrapper>
    </Wrapper>
  );
};

export default HelpAndSupportRoot;
