import { Button } from 'kl-design-system/atoms/button';
import { Avatar } from 'kl-design-system/atoms/avatar';
import Profile from 'kl-design-system/molecule/profile';
import { AWSlogoFill, TwitterNewLogo, UsersThree } from '@jengaicons/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import ProgressTracker from '~/app/components/progress-tracker';
import { Graph, GraphItem } from '~/app/components/graph';
import ReadyToOps from '~/app/components/website/ready-to-ops';
import Container from '~/app/components/container';

import { cn } from '~/app/utils/commons';
import illustration from '../../../images/illustraion1.svg';
import devopsIcon from '../../../images/home/devops.svg';
import infraopsIcon from '../../../images/home/infraops.svg';
import distributionIcon from '../../../images/home/distribution.svg';
import SectionWrapper from '../website/section-wrapper';

const suites = [
  {
    title: 'DevOps',
    desc: 'Self-Serve environments crafted for development, staging and production workloads',
    img: <img src={devopsIcon.src} />,
    imgPad: 'w-[160px]',
    to: 'devops',
  },
  {
    title: 'InfraOps',
    desc: 'Flexible & Cost Effective Kubernetes Cluster Management at your fingertips',
    imgPad: 'w-[180px]',
    img: <img src={infraopsIcon.src} />,
    to: 'infraops',
  },
  {
    title: 'Distribution',
    desc: 'Cloud accelerated build system and container registry to build and ship containers anywhere',
    imgPad: 'w-[160px]',
    img: <img src={distributionIcon.src} />,
    to: 'distribution',
  },
];

const teamTasks = [
  {
    title: 'Develop, Git Push',
    color: '#2563EB',
  },
  {
    title: 'CI/CD',
    color: '#D97706',
  },
  {
    title: 'DevOps',
    color: '#2563EB',
  },
  {
    title: 'Environments',
    color: '#16A34A',
  },
  {
    title: 'Run Local Env',
    color: '#2563EB',
  },
];

const messages = [
  {
    title: 'Astroman',
    subtitle: 'subtitle',
    company: <TwitterNewLogo size={24} />,
    message:
      'We use @Kloudlite on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI',
    time: '10:01 PM · Apr 7, 2022',
  },
  {
    title: 'Astroman 1',
    subtitle: 'subtitle',
    company: <TwitterNewLogo size={24} />,
    message:
      'We use @Kloudlite on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI',
    time: '10:01 PM · Apr 7, 2022',
  },
  {
    title: 'Astroman 2',
    subtitle: 'subtitle',
    company: <TwitterNewLogo size={24} />,
    message:
      'We use @Kloudlite on a daily basis for several internal processes, and I cannot rave enough about them. Incredible flexibility and features combined with super intuitive UI',
    time: '10:01 PM · Apr 7, 2022',
  },
];

const tutorials = [
  {
    title: 'Get started with Kl-InfraOps',
  },
  {
    title: 'Keep building with Kl-DevOps',
  },
  {
    title: 'Explore further into Kl-Distribution',
  },
];

const Partners = () => {
  return (
    <div>
      <div className="hidden md:!flex flex-row items-center justify-center flex-wrap gap-8xl">
        <AWSlogoFill size={56} />
        <AWSlogoFill size={56} />
        <AWSlogoFill size={56} />
        <AWSlogoFill size={56} />
        <AWSlogoFill size={56} />
      </div>
      <div className="flex md:!hidden flex-row items-center justify-center flex-wrap gap-5xl">
        <AWSlogoFill size={40} />
        <AWSlogoFill size={40} />
        <AWSlogoFill size={40} />
        <AWSlogoFill size={40} />
      </div>
    </div>
  );
};

const TeamTaskCard = ({
  color,
  title,
}: {
  color: string;
  title: ReactNode;
}) => {
  return (
    <div className="bg-surface-basic-subdued p-lg md:!px-2xl md:!py-xl flex flex-col-reverse xl:!flex-row xl:!items-center gap-lg md:!gap-2xl">
      <div className="flex flex-col gap-lg flex-1">
        <div
          className="h-lg w-[44px] rounded-full"
          style={{ background: color }}
        />
        <div className="headingMd text-text-default hidden md:!block">
          {title}
        </div>
      </div>
      <div className="headingMd text-text-default block md:!hidden">
        {title}
      </div>
      <Avatar color="one" size="md" />
    </div>
  );
};

const MessageCard = ({
  title,
  subtitle,
  company,
  message,
  time,
}: {
  title: string;
  subtitle: string;
  company: ReactNode;
  message: ReactNode;
  time: ReactNode;
}) => {
  return (
    <div className="flex flex-col justify-between gap-3xl p-3xl bg-surface-basic-default min-h-[224px]">
      <div className="flex flex-row items-center gap-3xl">
        <span className="flex-1">
          <Profile name={title} subtitle={subtitle} color="one" size="md" />
        </span>
        <span>{company}</span>
      </div>
      <p className="bodyMd text-text-soft line-clamp-3">{message}</p>
      <span className="bodySm text-text-soft">{time}</span>
    </div>
  );
};

const UntoldCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('p-4xl bg-surface-basic-default', className)}>
      {children}
    </div>
  );
};

const TutorialItemCard = ({
  logo,
  children,
  to,
}: {
  logo?: any;
  children: ReactNode;
  to: string;
}) => {
  return (
    <Link href={to} className="flex flex-row items-center gap-xl">
      <span
        className={cn(
          'h-[52px] w-[52px] rounded',
          !logo ? 'bg-surface-basic-subdued' : ''
        )}
      >
        {logo}
      </span>
      <span className="headingMd-marketing xl:headingLg-marketing text-text-default">
        {children}
      </span>
    </Link>
  );
};

const TutorialCard = () => {
  return (
    <UntoldCard className="flex flex-col gap-4xl h-full">
      <span className="bodyLg-medium text-text-disabled">Latest tutorials</span>
      <div className="flex flex-col gap-2xl">
        {tutorials.map((tut) => (
          <TutorialItemCard key={tut.title} to="/">
            {tut.title}
          </TutorialItemCard>
        ))}
      </div>
    </UntoldCard>
  );
};

const FeaturedCard = () => {
  return (
    <UntoldCard className="flex flex-col gap-3xl h-full">
      <div className="flex flex-col">
        <span className="bodyLg-medium text-text-disabled">Featured</span>
        <span className="heading2xl-marketing xl:heading3xl-marketing text-text-default">
          Develop, Deploy, Distribute
        </span>
      </div>
      <div className="bg-surface-basic-subdued h-[160px]" />
      <p className="bodyMd text-text-soft">
        From developing the code to deploying to, distributing, we got you
        covered at each touch point.
      </p>
    </UntoldCard>
  );
};

const CommunityCard = () => {
  return (
    <UntoldCard className="flex flex-col gap-3xl h-full min-h-[256px] max-h-[288px]">
      <span className="p-2xl rounded-full border border-border-disabled w-fit">
        <UsersThree size={32} />
      </span>
      <div className="flex flex-col">
        <span className="bodyLg-medium text-text-disabled">Community</span>
        <span className="heading2xl-marketing xl:heading3xl-marketing text-text-default">
          Stay up to date with all that&apos;s tech
        </span>
      </div>
      <Button
        content="Join the Community"
        variant="primary-outline"
        size="md"
      />
    </UntoldCard>
  );
};

const progressItems = [
  {
    title: 'We are committed to constant improvement in serving our community.',
    subtitle: '10:01 PM · Apr 7, 2022',
  },
  {
    title:
      'Stay tuned for the latest versions of our features, modules, and applications',
    subtitle: '10:01 PM · Apr 7, 2022',
  },
];

const ChangeLogCard = () => {
  return (
    <UntoldCard className="flex flex-col gap-3xl h-full min-h-[256px]">
      <span className="bodyLg-medium text-text-disabled">Changelog</span>
      <ProgressTracker
        items={progressItems.map((pi) => ({
          id: pi.title + pi.subtitle,
          render: () => (
            <div className="flex flex-col gap-lg">
              <span className="headingMd-marketing xl:headingLg-marketing text-text-default">
                {pi.title}
              </span>
              <span className="bodySm text-text-soft">{pi.subtitle}</span>
            </div>
          ),
        }))}
      />
    </UntoldCard>
  );
};

const SuiteCard = ({
  title,
  img,
  imgPad,
  desc,
  to,
}: {
  title: string;
  img: any;
  imgPad: string;
  desc: string;
  to: string;
}) => {
  return (
    <Link
      href={to}
      key={title}
      className="bg-surface-basic-default flex flex-col h-full md:min-h-[384px] xl:max-h-[416px] xl:min-h-[416px]"
    >
      <span
        className={cn(
          'min-h-[224px] self-center flex items-center justify-center',
          imgPad
        )}
      >
        {img}
      </span>
      <div className="flex flex-col gap-3xl px-4xl pb-4xl md:!p-xl md:!pt-0 xl:!px-4xl xl:!pb-4xl">
        <span className="heading3xl-marketing xl:!heading4xl-marketing text-text-default">
          {title}
        </span>
        <span className="bodyLg-medium xl:!bodyXl-medium text-text-strong line-clamp-3">
          {desc}
        </span>
      </div>
    </Link>
  );
};

const SuiteSection = () => {
  return (
    <SectionWrapper className="gap-7xl">
      <h2 className="heading3xl-marketing md:!heading4xl-marketing xl:!heading5xl-marketing text-text-default text-center">
        Dive in: Kloudlite suite
      </h2>
      <Graph className="-mx-10xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5xl px-10xl md:!py-8xl xl:!py-10xl">
          {suites.map((suite) => (
            <GraphItem key={suite.title}>
              <SuiteCard {...suite} />
            </GraphItem>
          ))}
        </div>
      </Graph>
    </SectionWrapper>
  );
};

const TeamTaskSection = () => {
  return (
    <SectionWrapper className="md:!flex-row lg:m-0 xl:m-auto lg:!px-8xl">
      <div className="flex flex-col gap-3xl md:gap-8xl justify-center md:max-w-[384px] mr-10xl">
        <h2 className="heading3xl-marketing md:!heading4xl-marketing xl:!heading5xl-marketing text-text-default">
          Why <br className="hidden md:!block" />
          Kloudlite?
        </h2>
        <p className="bodyLg-medium xl:!bodyXl-medium text-text-soft">
          A transformative solution for modern DevOps needs, built with
          precision and a deep understanding of developer and platform engineer
          challenges
        </p>
      </div>
      <div className="flex flex-col flex-1 relative pt-6xl md:!pt-0">
        <h4 className="headingMd-marketing md:!headingXl-marketing text-text-default text-center relative md:!absolute md:!left-1/2 md:!transform md:!-translate-x-1/2 z-[1]">
          Your team’s task
        </h4>
        <Graph className="-mx-10xl">
          <div className="px-10xl py-3xl md:py-8xl">
            <GraphItem>
              <div className="flex p-xl md:!p-5xl flex-row bg-gradient-to-b from-[#E4E4E7] to-[#F3F4F6] max-h-[512px] 2xl:min-w-[640px] overflow-hidden">
                <div className="flex flex-col gap-xl md:!gap-5xl flex-1">
                  {teamTasks.map((tt) => (
                    <TeamTaskCard
                      key={tt.title}
                      color={tt.color}
                      title={tt.title}
                    />
                  ))}
                </div>
                <div className="ml-xl md:!ml-8xl flex flex-col gap-xl md:!gap-5xl flex-1">
                  {teamTasks.map((tt) => (
                    <TeamTaskCard
                      key={tt.title}
                      color={tt.color}
                      title={tt.title}
                    />
                  ))}
                </div>
                <div />
              </div>
            </GraphItem>
          </div>
        </Graph>
      </div>
    </SectionWrapper>
  );
};

const _DontBelieve = () => {
  return (
    <SectionWrapper className="gap-7xl">
      <h2 className="heading3xl-marketing md:!heading4xl-marketing xl:!heading5xl-marketing text-text-default text-center">
        Don&apos;t believe? Read for yourself..
      </h2>
      <Graph className="-mx-10xl" blurSize="md" responsive>
        <div className="grid grid-cols-1 md:!grid-cols-3 gap-5xl px-10xl xl:py-10xl">
          {messages.map((message) => (
            <GraphItem key={message.title}>
              <MessageCard {...message} />
            </GraphItem>
          ))}
        </div>
      </Graph>
    </SectionWrapper>
  );
};

const Exploring = () => {
  return (
    <SectionWrapper className="gap-7xl">
      <h2 className="heading3xl-marketing md:!heading4xl-marketing xl:!heading5xl-marketing text-text-default text-center">
        Unveil the untold - Keep exploring
      </h2>
      <Graph className="-mx-10xl" responsive>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[480px_512px] 2xl:grid-cols-[544px_544px] gap-3xl xl:!gap-5xl px-10xl xl:py-10xl">
          <GraphItem>
            <TutorialCard />
          </GraphItem>
          <GraphItem>
            <FeaturedCard />
          </GraphItem>
          <GraphItem>
            <CommunityCard />
          </GraphItem>
          <GraphItem>
            <ChangeLogCard />
          </GraphItem>
        </div>
      </Graph>
    </SectionWrapper>
  );
};

const ReadyTo = () => {
  return <ReadyToOps />;
};

const _PartnerSection = () => {
  return (
    <SectionWrapper className="py-8xl px-5xl flex-col gap-6xl">
      <p className="headingMd-marketing md:!headingLg-marketing text-text-strong text-center">
        Join the cult of our early adopters, and discover the power of Kloudlite
      </p>
      <Partners />
    </SectionWrapper>
  );
};

const IndexRoot = () => {
  return (
    <div>
      <Container className="flex flex-col">
        <div className="px-3xl md:!px-5xl lg:!px-8xl xl:!px-11xl 2xl:!px-12xl py-6xl md:!pt-10xl">
          <div className="flex flex-col gap-3xl text-center items-center">
            <h1 className="heading3xl-marketing md:!heading5xl-marketing xl:!heading6xl-marketing text-text-default text-center md:!w-[615px]">
              <span className="relative text-center">
                <span className="text-text-warning absolute -top-2/3 left-1/2 transform -translate-x-1/2">
                  NoOps
                </span>
                {/** @ts-ignore * */}
                <strike className="no-underline strike">Advanced</strike>
              </span>{' '}
              platform engineering system
            </h1>
            <p className="bodyLg-medium md:!bodyXl-medium text-text-soft text-center md:!w-[528px] xl:!w-[806px]">
              Kloudlite is an open-source platform that provides developers &
              platform engineers with a one-click solution to move from code to
              cloud
            </p>
          </div>
          <div className="pt-6xl flex md:!flex-row flex-col gap-4xl md:items-center justify-center">
            <div>
              <Button
                block
                size="lg"
                content="Get started for free"
                to="https://auth.kloudlite.io"
                toLabel="href"
                LinkComponent={Link}
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
        <div className="w-full">
          <img
            alt="illustration"
            src={illustration.src}
            className="illustration"
          />
        </div>
        {/** <PartnerSection /> * */}
        <SuiteSection />
        <TeamTaskSection />
        {/** <DontBelieve />* */}
        <Exploring />
        <ReadyTo />
      </Container>
    </div>
  );
};

export default IndexRoot;
