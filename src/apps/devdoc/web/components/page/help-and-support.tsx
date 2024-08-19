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
      className="wb-bodyLg-medium wb-py-lg wb-px-xl wb-flex wb-flex-row wb-gap-xl wb-items-center wb-rounded wb-text-text-strong hover:wb-bg-surface-basic-hovered"
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
    <div className="wb-p-3xl lg:wb-p-5xl wb-flex wb-flex-col wb-gap-5xl wb-h-full lg:wb-min-h-[256px] lg:wb-max-h-[288px] wb-bg-surface-basic-default">
      <div className="wb-flex wb-w-8xl wb-h-8xl wb-rounded-full wb-items-center wb-justify-center wb-p-2xl wb-text-icon-on-primary wb-bg-icon-primary">
        {icon}
      </div>
      <div className="wb-flex wb-flex-col wb-gap-3xl">
        <h4 className="wb-headingXl-marketing wb-text-text-default">{title}</h4>
        <p className="wb-bodyLg wb-line-clamp-2 wb-text-text-soft">{desc}</p>
      </div>
    </div>
  );
};

const HelpAndSupportRoot = () => {
  return (
    <Wrapper className="wb-relative wb-flex wb-flex-col wb-items-center wb-pt-6xl md:wb-pt-8xl lg:wb-pt-10xl">
      <div className="wb-flex wb-flex-col wb-w-full">
        <div className="wb-flex wb-flex-col wb-gap-6xl wb-text-center wb-w-full">
          <div className="wb-flex wb-flex-col wb-gap-3xl">
            <h1 className="wb-heading3xl-marketing md:wb-heading4xl-marketing lg:wb-heading5xl-marketing wb-text-text-default">
              <HandWaving size={56} className="wb-hidden md:wb-inline" />
              <HandWaving size={32} className="wb-inline md:wb-hidden" />
              <span> How can we help you today?</span>
            </h1>
            <p className="wb-hidden md:wb-block md:wb-bodyXl lg:wb-bodyXXl wb-text-text-soft">
              Discover solutions through our documentation, guides, and
              community
            </p>

            <p className="md:wb-hidden wb-bodyMd-medium wb-text-text-soft">
              Discover solutions through our documentation, guides, and
              community
            </p>
          </div>
          <div className="wb-max-w-[700px] wb-w-full md:wb-w-[700px] wb-m-auto">
            <TextInput
              placeholder="Search for articles..."
              suffix={<span className="wb-bodyMd wb-text-text-soft">⌘K</span>}
              prefixIcon={<Search />}
              size="lg"
            />
          </div>
        </div>
        <GraphExtended className="lg:wb-mt-5xl">
          <GraphItem>
            <div className="wb-px-xl md:wb-px-3xl wb-py-4xl md:wb-py-5xl wb-gap-4xl md:wb-gap-5xl wb-flex wb-flex-col wb-min-h-[289px] 3xl:wb-min-h-[256px] 3xl:wb-max-h-[256px] wb-bg-surface-basic-default">
              <h2 className="wb-px-xl wb-heading2xl-marketing wb-text-text-default">
                Popular articles
              </h2>
              <div className="wb-grid wb-grid-cols-1 md:wb-grid-cols-2 3xl:wb-grid-cols-3 wb-gap-x-6xl wb-gap-y-xl">
                {popularArticles.map((pa) => (
                  <div key={pa.title} className="wb-basis-1/3">
                    <PopularArticleItem {...pa} />
                  </div>
                ))}
              </div>
            </div>
          </GraphItem>
          <div className="wb-grid wb-grid-cols-1 md:wb-grid-cols-3 wb-gap-3xl md:wb-gap-5xl wb-mt-3xl md:wb-mt-5xl">
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
      <SectionWrapper className="wb-flex wb-flex-col wb-w-full">
        <div className="wb-flex wb-flex-col wb-gap-3xl wb-text-center">
          <h2 className="wb-heading3xl-marketing md:wb-heading4xl-marketing lg:wb-heading5xl-marketing wb-text-text-default">
            Couldn’t fine what you needed?
          </h2>
          <p className="wb-hidden md:wb-block md:wb-bodyXl lg:wb-bodyXXl wb-text-text-soft">
            Don’t worry, we’ve got more options for you
          </p>
          <p className="wb-bodyMd-medium md:wb-hidden wb-text-text-soft">
            Don’t worry, we’ve got more options for you
          </p>
        </div>
        <GraphExtended className="lg:mt-5xl">
          <div className="wb-grid wb-grid-cols-1 md:wb-grid-cols-3 wb-gap-3xl md:wb-gap-5xl">
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
