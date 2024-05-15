import { TextInput } from 'kl-design-system/atoms/input';
import {
  Search,
  ChevronRight,
  GearSix,
  Domain,
  Link as LinkIcon,
  Webhook,
  HandWaving,
} from '@jengaicons/react';
import Link from 'next/link';
import { BrandLogo } from 'kl-design-system/branding/brand-logo';
import { ReactNode } from 'react';
import { GraphExtended, GraphItem } from '~/app/components/graph';
import Wrapper from '../wrapper';
import SectionWrapper from '../website/section-wrapper';
import HoverItem from '../hover-item';

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
    link: '/help-and-support/kloudlite-overview',
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
      className="bodyLg-medium py-lg px-xl flex flex-row gap-xl items-center rounded text-text-strong dark:text-text-darktheme-strong hover:bg-surface-basic-hovered dark:hover:bg-surface-darktheme-basic-hovered"
    >
      <span className="flex-1">{title}</span>
      <span>
        <ChevronRight size={16} />
      </span>
    </Link>
  );
};

const TopicItem = ({
  title,
  icon,
  desc,
}: {
  title: ReactNode;
  icon: ReactNode;
  desc: ReactNode;
}) => {
  return (
    <div className="p-3xl lg:!p-5xl flex flex-col gap-5xl h-full lg:min-h-[256px] lg:max-h-[288px] bg-surface-basic-default dark:bg-surface-darktheme-basic-default">
      <div className="flex w-8xl h-8xl rounded-full items-center justify-center p-2xl text-icon-on-primary dark:text-icon-darktheme-on-primary bg-icon-primary dark:bg-surface-darktheme-primary-default">
        {icon}
      </div>
      <div className="flex flex-col gap-3xl">
        <h4 className="headingXl-marketing text-text-default dark:text-text-darktheme-default">
          {title}
        </h4>
        <p className="bodyLg line-clamp-2 text-text-soft dark:text-text-darktheme-soft">
          {desc}
        </p>
      </div>
    </div>
  );
};

const HelpAndSupportRoot = () => {
  return (
    <Wrapper className="relative flex flex-col items-center pt-6xl md:!pt-8xl lg:!pt-10xl">
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-6xl text-center w-full">
          <div className="flex flex-col gap-3xl">
            <h1 className="heading3xl-marketing md:!heading4xl-marketing lg:!heading5xl-marketing text-text-default dark:text-text-darktheme-default">
              <HandWaving size={56} className="hidden md:!inline" />
              <HandWaving size={32} className="inline md:!hidden" />
              <span> How can we help you today?</span>
            </h1>
            <p className="hidden md:!block md:!bodyXl lg:!bodyXXl text-text-soft dark:text-text-darktheme-soft">
              Discover solutions through our documentation, guides, and
              community
            </p>

            <p className="md:hidden bodyMd-medium text-text-soft">
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
            <div className="px-xl md:!px-3xl py-4xl md:!py-5xl gap-4xl md:!gap-5xl flex flex-col min-h-[289px] 3xl:!min-h-[256px] 3xl:max-h-[256px] bg-surface-basic-default dark:bg-surface-darktheme-basic-default">
              <h2 className="px-xl heading2xl-marketing text-text-default dark:text-text-darktheme-default">
                Popular articles
              </h2>
              <div className="grid grid-cols-1 md:!grid-cols-2 3xl:!grid-cols-3 gap-x-6xl gap-y-xl">
                {popularArticles.map((pa) => (
                  <div key={pa.title} className="basis-1/3">
                    <PopularArticleItem {...pa} />
                  </div>
                ))}
              </div>
            </div>
          </GraphItem>
          <div className="grid grid-cols-1 md:!grid-cols-3 gap-3xl md:!gap-5xl mt-3xl md:!mt-5xl">
            {supportTopics.map((st) => (
              <GraphItem key={st.title}>
                <HoverItem to={st.link}>
                  <TopicItem {...st} />
                </HoverItem>
              </GraphItem>
            ))}
          </div>
        </GraphExtended>
      </div>
      <SectionWrapper className="flex flex-col w-full">
        <div className="flex flex-col gap-3xl text-center">
          <h2 className="heading3xl-marketing md:!heading4xl-marketing lg:!heading5xl-marketing text-text-default dark:text-text-darktheme-default">
            Couldn’t fine what you needed?
          </h2>
          <p className="hidden md:!block md:!bodyXl lg:!bodyXXl text-text-soft dark:text-text-darktheme-soft">
            Don’t worry, we’ve got more options for you
          </p>
          <p className="bodyMd-medium md:hidden text-text-soft dark:text-text-darktheme-soft">
            Don’t worry, we’ve got more options for you
          </p>
        </div>
        <GraphExtended className="lg:mt-5xl">
          <div className="grid grid-cols-1 md:!grid-cols-3 gap-3xl md:!gap-5xl">
            {unknownTopics.map((ut) => (
              <GraphItem key={ut.title}>
                <HoverItem to={ut.link}>
                  <TopicItem {...ut} />
                </HoverItem>
              </GraphItem>
            ))}
          </div>
        </GraphExtended>
      </SectionWrapper>
    </Wrapper>
  );
};

export default HelpAndSupportRoot;
