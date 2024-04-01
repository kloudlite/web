import { Avatar } from 'kl-design-system/atoms/avatar';
import Profile from 'kl-design-system/molecule/profile';
import { AWSlogoFill, UsersThree } from '@jengaicons/react';
import Link from 'next/link';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { BrandLogo } from 'kl-design-system/branding/brand-logo';
import ProgressTracker from '~/app/components/progress-tracker';
import { Graph, GraphExtended, GraphItem } from '~/app/components/graph';
import ReadyToOps from '~/app/components/website/ready-to-ops';

import { cn } from '~/app/utils/commons';
import consts from '~/app/utils/const';
import illustration from '../../../images/illustraion1.svg';

import SectionWrapper from '../website/section-wrapper';
import Wrapper from '../wrapper';
import { teamTaskAnimationV3 } from './team-task-animation';
import HoverItem from '../hover-item';
import Button from '../button';

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
    <div className="team-card bg-surface-basic-subdued p-lg md:!px-2xl md:!py-xl flex flex-col md:!flex-col-reverse xl:!flex-row xl:!items-center gap-lg md:!gap-2xl w-full z-20">
      <div className="flex flex-col gap-lg flex-1">
        <div
          className="h-lg w-[44px] rounded-full"
          style={{ background: color }}
        />
        <div className="headingMd text-text-default hidden md:!block">
          {title}
        </div>
      </div>
      <div className="headingSm text-text-default block md:!hidden">
        {title}
      </div>
      <div className="hidden md:!block team-task-avatar">
        <Avatar color="one" size="md" />
      </div>
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
        {consts.home.tutorials.map((tut) => (
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
      <div className="bg-surface-basic-subdued h-[160px] 3xl:!h-[148px]" />
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
}: {
  title: string;
  img: any;
  imgPad: string;
  desc: string;
}) => {
  return (
    <div className="bg-surface-basic-default flex flex-col h-full md:min-h-[360px] xl:max-h-[416px] xl:min-h-[416px] 2xl:!min-h-[448px]">
      <span className={cn('self-center flex justify-center', imgPad)}>
        {img}
      </span>
      <div className="flex flex-col gap-3xl px-4xl pb-4xl md:!p-xl md:!pt-0 xl:!px-4xl xl:!pb-4xl">
        <span className="heading2xl-marketing lg:!heading3xl-marketing text-text-default">
          {title}
        </span>
        <span className="bodyXl text-text-strong line-clamp-3">{desc}</span>
      </div>
    </div>
  );
};

const SuiteSection = () => {
  return (
    <div className="flex flex-col pt-7xl md:!pt-8xl xl:!pt-10xl">
      <h2 className="heading3xl-marketing md:!heading4xl-marketing xl:!heading5xl-marketing text-text-default text-center">
        Dive in: Kloudlite suite
      </h2>
      <Graph className="-mx-10xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5xl px-10xl py-7xl md:!py-8xl xl:!py-10xl">
          {consts.home.suites.map((suite) => (
            <GraphItem key={suite.title}>
              <HoverItem to={suite.to}>
                <SuiteCard {...suite} />
              </HoverItem>
            </GraphItem>
          ))}
        </div>
      </Graph>
    </div>
  );
};

const TeamTaskSection = () => {
  const listOneRef = useRef<HTMLDivElement>(null);
  const listTwoRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [firsList, setFirstList] = useState(consts.home.teamTasks);
  const [secondList, setSecondList] = useState<typeof consts.home.teamTasks>(
    []
  );
  const firstItemTitle = 'Focus on your business needs';
  const firstItemColor = '#2563EB';

  useEffect(() => {
    const ani = teamTaskAnimationV3({
      listOneRef,
      listTwoRef,
      logoRef: logoRef.current?.innerHTML || '',
      orgLogo:
        document.querySelector('.team-card')?.querySelector('svg')?.outerHTML ||
        '',
    });
    return () => {
      if (ani) {
        clearInterval(ani);
      }
    };
    const iv = setInterval(() => {
      setFirstList((s) => {
        const mainList = s.filter((v, index) => {
          if (index === 0) {
            return false;
          }

          return true;
        });

        setSecondList((s2) => {
          let secondMList = s2;
          if (s2.length > 5) {
            secondMList = s2.filter((v, i) => {
              if (i === s2.length - 1) {
                mainList.push(v);
                return false;
              }
              return true;
            });
          }
          // @ts-ignore
          secondMList = [s[0], ...secondMList];

          return secondMList;
        });

        return mainList;
      });
    }, 1000);

    return () => {
      clearInterval(iv);
    };
  }, []);

  return (
    <div className="flex flex-col md:!flex-row pt-7xl md:!pt-8xl xl:!pt-10xl relative">
      <div className="flex flex-col gap-3xl md:gap-8xl justify-center md:max-w-[222px] lg:max-w-[384px] 3xl:max-w-[512px] md:!mr-6xl lg:!mr-8xl xl:!mr-10xl 3xl:!mr-12xl">
        <h2 className="heading3xl-marketing md:!heading4xl-marketing xl:!heading5xl-marketing text-text-default">
          Why <br className="hidden md:!block 3xl:!hidden" />
          Kloudlite?
        </h2>
        <p className="bodyXl lg:!bodyXXl text-text-soft">
          A transformative solution for modern DevOps needs, built with
          precision and a deep understanding of developer and platform engineer
          challenges
        </p>
      </div>
      <div className="flex flex-col flex-1 relative pt-6xl md:!pt-0">
        <Graph className="-mx-10xl">
          <div className="grid grid-cols-2 gap-5xl 2xl:!gap-8xl 3xl:!gap-5xl px-10xl py-3xl md:py-8xl overflow-hidden">
            <div className="w-full flex flex-col">
              <h4 className="headingMd-marketing md:!headingXl-marketing text-text-default relative -top-[32px] -mt-[28px] right-1/2 transform translate-x-1/2 text-center">
                Your team’s tasks
              </h4>
              <GraphItem className="basis-1/2">
                <div className="flex p-xl md:!p-5xl flex-col bg-gradient-to-b from-[#E4E4E7] to-[#F3F4F6] h-[512px] max-h-[512px] overflow-hidden">
                  <div className="pb-xl md:!pb-5xl">
                    <TeamTaskCard
                      title={firstItemTitle}
                      color={firstItemColor}
                    />
                  </div>
                  <div
                    ref={listOneRef}
                    className="first-container w-full flex flex-col gap-xl md:!gap-5xl flex-1"
                  >
                    {firsList.map((tt) => (
                      <TeamTaskCard
                        key={tt.title}
                        color={tt.color}
                        title={tt.title}
                      />
                    ))}
                  </div>
                </div>
              </GraphItem>
            </div>

            <div className="w-full">
              <h4 className="headingMd-marketing md:!headingXl-marketing text-text-default relative -top-[32px] -mt-[28px] right-1/2 transform translate-x-1/2 text-center">
                Kloudlite solves
              </h4>

              <GraphItem className="basis-1/2">
                <div className="flex p-xl md:!p-5xl flex-row bg-[linear-gradient(180deg,#93C5FD_0%,#DBEAFE_100%)] h-[512px] max-h-[512px] overflow-hidden">
                  <div
                    ref={listTwoRef}
                    className="first-container w-full flex flex-col flex-1 space-y-xl md:!space-y-5xl"
                  >
                    {secondList.map((tt) => (
                      <TeamTaskCard
                        key={tt.title}
                        color={tt.color}
                        title={tt.title}
                      />
                    ))}
                  </div>
                </div>
              </GraphItem>
            </div>
          </div>
        </Graph>
      </div>
      <div ref={logoRef} className="hidden">
        <BrandLogo detailed={false} />
      </div>
    </div>
  );
};

const _DontBelieve = () => {
  return (
    <SectionWrapper className="gap-7xl md:!gap-8xl">
      <h2 className="heading3xl-marketing md:!heading4xl-marketing xl:!heading5xl-marketing text-text-default text-center">
        Don&apos;t believe? Read for yourself..
      </h2>
      <Graph className="-mx-10xl" blurSize="md" responsive>
        <div className="grid grid-cols-1 md:!grid-cols-3 gap-5xl px-10xl">
          {consts.home.messages.map((message) => (
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
    <SectionWrapper className="flex-col">
      <h2 className="heading3xl-marketing md:!heading4xl-marketing xl:!heading5xl-marketing text-text-default text-center">
        Unveil the untold - Keep exploring
      </h2>
      <GraphExtended>
        <div className="grid grid-cols-1 md:!grid-cols-2 xl:!grid-cols-[480px_512px] 2xl:!grid-cols-[544px_544px] 3xl:!grid-cols-[672px_704px] gap-3xl xl:!gap-5xl">
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
      </GraphExtended>
    </SectionWrapper>
  );
};

const ReadyTo = () => {
  return <ReadyToOps />;
};

const _PartnerSection = () => {
  return (
    <div className="py-8xl px-5xl flex-col gap-6xl">
      <p className="headingMd-marketing md:!headingLg-marketing text-text-strong text-center">
        Join the cult of our early adopters, and discover the power of Kloudlite
      </p>
      <Partners />
    </div>
  );
};

const IndexRoot = () => {
  return (
    <div>
      <Wrapper className="flex flex-col py-6xl md:!pb-8xl md:!pt-11xl lg:!pt-[158px]">
        <div className="w-full">
          <div className="flex flex-col gap-3xl text-center items-center">
            <h1 className="heading3xl-marketing md:!heading5xl-marketing xl:!heading6xl-marketing text-text-default text-center md:!w-[830px]">
              <span>Opensource </span>
              <span className="relative text-center">
                <span className="text-text-warning absolute -top-2/3 left-1/2 transform -translate-x-1/2">
                  NoOps
                </span>
                {/** @ts-ignore * */}
                <strike className="no-underline strike">Advanced</strike>
              </span>{' '}
              <br /> platform engineering system
            </h1>
            <p className="bodyXl lg:!bodyXXl text-text-soft text-center max-w-[528px] lg:!w-[688px] lg:!max-w-[688px]">
              Cloud agnostic platform designed for developers & platform
              engineers to ease code to cloud journey.
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
        <div className="w-full pb-6xl md:!pb-8xl 2xl:!pb-10xl 3xl:!pb-11xl">
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
      </Wrapper>
    </div>
  );
};

export default IndexRoot;
