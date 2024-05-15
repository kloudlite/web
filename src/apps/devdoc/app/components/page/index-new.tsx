import { ReactNode, forwardRef, useEffect, useRef, useState } from 'react';
import { TextInput } from 'kl-design-system/atoms/input';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import * as Accordion from '@radix-ui/react-accordion';
import Profile from 'kl-design-system/molecule/profile';
import { IconButton } from 'kl-design-system/atoms/button';
import Marquee from 'react-fast-marquee';

import { GraphExtended, GraphItem } from '~/app/components/graph';
import { cn } from '~/app/utils/commons';
import consts from '~/app/utils/const';
import {
  ArrowRight,
  ChevronRight,
  Star,
  GithubLogoFill,
} from '~/app/icons/icons';
import HomeIllustration from '~/images/homeNew/svg-comp/illustration';
import HomeIllustration1024 from '~/images/homeNew/svg-comp/illustration-1024';
import HomeIllustration768 from '~/images/homeNew/svg-comp/illustration-768';
import HomeIllustration1280 from '~/images/homeNew/svg-comp/illustration-1280';
import SecureAtCore1920 from '~/images/homeNew/svg-comp/secure-at-core-1920';
import SecureAtCore1440 from '~/images/homeNew/svg-comp/secure-at-core-1440';
import SecureAtCore1280 from '~/images/homeNew/svg-comp/secure-at-core-1280';
import SecureAtCore1024 from '~/images/homeNew/svg-comp/secure-at-core-1024';
import { BrandLogo } from 'kl-design-system/branding/brand-logo';
import Wrapper from '../wrapper';
import Button from '../button';
import SectionWrapper from '../website/section-wrapper';
import GetStartedNew from '../website/get-started-new';
import { Block } from '../commons';
import HorizontalTopTab from '../website/horizontal-top-tab-home';
import InviteCodeDialog from '../website/invite-code-dialog';
import Slider, { SliderItem } from '../slider';

const HowItWorksSection = () => {
  const [selectedTab, setSelectedTab] = useState(
    consts.homeNew.howitworks.items[0].id
  );

  const imgs = consts.homeNew.howitworks.images;
  const getTab = () => {
    switch (selectedTab) {
      case 'collaborate':
        return (
          <div className="wb-flex wb-items-center wb-justify-center wb-h-full">
            <img
              className="dark:wb-hidden  wb-max-h-full"
              alt="distribute"
              src={imgs.collaborate.r1440}
            />
            <img
              className="wb-hidden dark:wb-block  wb-max-h-full"
              alt="distribute"
              src={imgs.collaborate.r1440Dark}
            />
          </div>
        );
      case 'nocommit':
        return (
          <div className="wb-flex wb-items-center wb-justify-center wb-h-full">
            <img
              className="dark:wb-hidden  wb-max-h-full"
              alt="distribute"
              src={imgs.nocommit.r1440}
            />
            <img
              className="wb-hidden dark:wb-block  wb-max-h-full"
              alt="distribute"
              src={imgs.nocommit.r1440Dark}
            />
          </div>
        );
      case 'integrate':
        return (
          <div className="wb-flex wb-items-center wb-justify-center wb-h-full">
            <img
              className="dark:wb-hidden  wb-max-h-full"
              alt="distribute"
              src={imgs.integrate.r1440}
            />
            <img
              className="wb-hidden dark:wb-block  wb-max-h-full"
              alt="distribute"
              src={imgs.integrate.r1440Dark}
            />
          </div>
        );
      case 'connect':
      default:
        return (
          <div className="wb-flex wb-items-center wb-justify-center wb-h-full">
            <img
              className="dark:wb-hidden wb-max-h-full"
              alt="distribute"
              src={imgs.connect.r1440}
            />
            <img
              className="wb-hidden dark:wb-block wb-max-h-full"
              alt="distribute"
              src={imgs.connect.r1440Dark}
            />
          </div>
        );
    }
  };

  return (
    <HorizontalTopTab
      title={
        <div className="2xl:!wb-max-w-[746px] wb-m-auto">
          How Kloudlite transforms your workflows?
        </div>
      }
      tabContainerClassName="wb-grid wb-grid-cols-4 xl:wb-grid-cols-[256px_224px_224px_224px] 2xl:wb-grid-cols-4 3xl:wb-grid-cols-[352px_320px_320px_320px] wb-gap-3xl lg:wb-gap-5xl"
      tabContentClassName="wb-px-xl md:wb-px-0 wb-py-md"
      tabs={consts.homeNew.howitworks.items}
      onTabChange={(item) => setSelectedTab(item.id)}
      activeTab={selectedTab}
      tab={getTab()}
    />
  );
};

const SecureAtCore = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const zoom = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  useEffect(() => {
    scrollYProgress.onChange((e) => {
      console.log(e);
    });
  }, [scrollYProgress]);
  return (
    <motion.div ref={ref} style={{ opacity, scale: zoom }}>
      <Block
        title="Secure at the core"
        desc="Built using Kloudlite Global VPN Mesh with wireguard at it’s core"
        hasGraph={false}
      >
        <div className="wb-relative secure-graph wb-py-10xl wb-flex wb-flex-row wb-items-center wb-justify-center">
          <div className="wb-absolute wb-top-0 wb-left-0 wb-right-0 lg:wb-h-[150px] xl:wb-h-[200px] 2xl:wb-h-[200px] 3xl:wb-h-[150px] wb-bg-[linear-gradient(to_top,_transparent_0%,_#fafafa_100%)] dark:wb-bg-[linear-gradient(to_top,_transparent_0%,_#0F0F11_100%)]" />
          <div className="wb-absolute wb-bottom-0 wb-left-0 wb-right-0 lg:wb-h-[150px] xl:wb-h-[200px] 2xl:wb-h-[200px] 3xl:wb-h-[150px] wb-bg-[linear-gradient(to_bottom,_transparent_0%,_#fafafa_100%)] dark:wb-bg-[linear-gradient(to_bottom,_transparent_0%,_#0F0F11_100%)]" />
          <div className="wb-absolute wb-left-0 wb-top-0 wb-bottom-0 lg:wb-w-[150px] xl:wb-w-[200px] 2xl:wb-w-[200px] 3xl:wb-w-[350px] wb-bg-[linear-gradient(to_left,_transparent_0%,_#fafafa_100%)] dark:wb-bg-[linear-gradient(to_left,_transparent_0%,_#0F0F11_100%)]" />
          <div className="wb-absolute wb-right-0 wb-top-0 wb-bottom-0 lg:wb-w-[150px] xl:wb-w-[200px] 2xl:wb-w-[200px] 3xl:wb-w-[350px] wb-bg-[linear-gradient(to_right,_transparent_0%,_#fafafa_100%)] dark:wb-bg-[linear-gradient(to_right,_transparent_0%,_#0F0F11_100%)]" />
          <SecureAtCore1024 className="wb-hidden lg:wb-block xl:wb-hidden" />
          <SecureAtCore1280 className="wb-hidden xl:wb-block 2xl:wb-hidden" />
          <SecureAtCore1440 className="wb-hidden 2xl:wb-block 3xl:wb-hidden" />
          <SecureAtCore1920 className="wb-hidden 3xl:wb-block" />
        </div>
      </Block>
    </motion.div>
  );
};

const KDElement = ({
  item,
  index,
  onAppear,
  active,
  isLastItem,
}: {
  item: (typeof consts.homeNew.kloudliteDevelopmentData)[0];
  index: number;
  onAppear: () => void;
  active: number;
  isLastItem: boolean;
}) => {
  const Icon = item.icon;
  const kd = item;

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    scrollYProgress.onChange(() => {
      if (ref.current) {
        const { top, height } = ref.current.getBoundingClientRect();
        if (top >= -75 && top <= height) {
          onAppear();
        }
      }
    });
  }, [ref, scrollYProgress]);

  const isActive = active === index;
  return (
    <div
      ref={ref}
      className={cn(
        'wb-flex wb-flex-row kd-item',
        isLastItem ? 'wb-pb-3xl' : 'wb-pb-6xl'
      )}
      data-index={index}
    >
      <div
        className={cn(
          'wb-relative wb-w-[40px] wb-shrink-0 wb-flex wb-flex-row wb-justify-center wb-pl-3xl md:wb-pl-4xl wb-box-content',
          isLastItem ? '-wb-mb-3xl' : '-wb-mb-6xl'
        )}
      >
        <div
          className={cn(
            'wb-w-[2px] wb-h-full wb-transition-all',
            'wb-bg-border-default dark:wb-bg-border-darktheme-default'
          )}
        />

        {isActive && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            className={cn(
              'wb-w-[2px] wb-h-full wb-absolute',
              'wb-bg-gradient-to-b wb-from-[#3B82F6] dark:wb-from-[#1D4ED8] wb-to-[#D4D4D8] dark:wb-to-[#3F3F46]'
            )}
          />
        )}
        <div
          className={cn(
            'wb-flex wb-items-center wb-justify-center wb-rounded wb-w-[40px] wb-h-[40px] wb-absolute wb-transition-all',
            isActive
              ? 'wb-text-icon-on-primary dark:wb-text-icon-darktheme-on-primary wb-bg-surface-primary-default dark:wb-bg-surface-darktheme-primary-default'
              : 'wb-text-icon-soft dark:wb-text-icon-darktheme-soft wb-bg-surface-basic-active dark:wb-bg-surface-darktheme-basic-active'
          )}
        >
          <Icon size={24} />
        </div>
      </div>
      <div
        className={cn('wb-flex wb-flex-col wb-px-3xl md:wb-px-6xl')}
        key={kd.label}
      >
        {/* <span className="heading2xl-marketing text-text-soft dark:text-text-darktheme-soft"> */}
        {/*   {kd.label} */}
        {/* </span> */}
        <span
          className={cn(
            'wb-headingLg md:wb-heading2xl lg:wb-heading3xl !wb-font-medium wb-transition-colors',
            isActive
              ? 'wb-text-text-default dark:wb-text-text-darktheme-default'
              : 'wb-text-text-soft dark:wb-text-text-darktheme-soft'
          )}
        >
          {kd.desc}
        </span>
      </div>
    </div>
  );
};

const KloudliteDevelopment = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState(
    consts.homeNew.kloudliteDevelopmentData[0]
  );
  const [activeMessage, setActiveMessage] = useState(0);

  return (
    <Block
      title="Why Kloudlite Development Environments?"
      desc="It is built with belief that you should develop your application as you run your application"
    >
      <div className="relative wb-grid wb-grid-cols-1 lg:wb-grid-cols-[384px_auto] 2xl:wb-grid-cols-[448px_auto] 3xl:wb-grid-cols-[512px_auto] wb-gap-3xl md:wb-gap-5xl wb-items-start">
        <div className="wb-hidden lg:wb-block wb-absolute lg:wb-w-[384px] 2xl:wb-w-[448px] 3xl:wb-w-[512px] wb-top-0 wb-right-0 wb-left-0 wb-bottom-0 wb-bg-surface-basic-subdued dark:wb-bg-surface-darktheme-basic-subdued">
          <div className="wb-h-xs wb-bg-border-dark dark:wb-bg-border-darktheme-dark wb-absolute wb-bottom-0 -wb-left-5xl wb-right-0 wb-z-[1]" />
          <div className="wb-w-xs wb-bg-border-dark dark:wb-bg-border-darktheme-dark wb-absolute wb-left-0 wb-top-0 -wb-bottom-5xl wb-z[1]" />
          <div className="wb-w-xs wb-bg-border-dark dark:wb-bg-border-darktheme-dark wb-absolute -wb-right-xs -wb-bottom-5xl wb-top-0 wb-z[1]" />
        </div>
        <GraphItem
          lines={{ bottom: false }}
          className="wb-bg-surface-basic-subdued dark:wb-bg-surface-darktheme-basic-subdued wb-p-3xl md:wb-p-5xl lg:wb-sticky wb-top-0"
        >
          <div className="lg:wb-hidden wb-h-xs wb-bg-border-dark dark:wb-bg-border-darktheme-dark wb-absolute wb-bottom-0 -wb-left-3xl -wb-right-3xl wb-z-[1]" />
          <AnimatePresence mode="wait">
            <motion.div
              key={message.label}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="wb-flex wb-flex-col wb-gap-3xl"
            >
              <span className="wb-text-icon-primary dark:wb-text-icon-darktheme-primary">
                <message.icon size={48} />
              </span>
              <div className="wb-flex wb-flex-col wb-gap-xl">
                <h3 className="wb-heading3xl-1-marketing md:wb-heading4xl-1-marketing lg:wb-heading5xl-1-marketing wb-text-text-primary dark:wb-text-text-darktheme-primary">
                  {message.label}
                </h3>
                <p className="wb-bodyLg md:wb-bodyXl wb-text-text-soft dark:wb-text-text-darktheme-soft">
                  Bridging Dev & Prod Environments
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </GraphItem>
        <GraphItem className="wb-bg-surface-basic-subdued dark:wb-bg-surface-darktheme-basic-subdued wb-flex wb-flex-row ">
          <div ref={ref} className="wb-pt-3xl md:wb-pt-6xl wb-flex wb-flex-col">
            {consts.homeNew.kloudliteDevelopmentData.map((kd, index) => {
              return (
                <KDElement
                  key={kd.label}
                  onAppear={() => {
                    setMessage(consts.homeNew.kloudliteDevelopmentData[index]);
                    setActiveMessage(index);
                  }}
                  active={activeMessage}
                  index={index}
                  item={kd}
                  isLastItem={
                    index - 1 === consts.homeNew.kloudliteDevelopmentData.length
                  }
                />
              );
            })}
          </div>
        </GraphItem>
      </div>
    </Block>
  );
};

// const animate = () => {};

const Partners = () => {
  return (
    <div className="wb-relative [mask:linear-gradient(90deg,transparent,white_10%,white_90%,transparent)]">
      <Marquee
        className="wb-cursor-pointer wb-max-w-[calc(100vw_-_46px)] md:wb-max-w-[calc(100vw_-_70px)] lg:!wb-w-auto wb-text-text-default dark:wb-text-text-on-primary"
        autoFill
        pauseOnHover
        speed={25}
      >
        {consts.homeNew.partners.map((p, i) => {
          const ii = i;
          return (
            <div
              key={ii}
              className="graph2 wb-py-8xl lg:wb-pb-10xl lg:wb-pt-8xl wb-px-2xl"
            >
              <GraphItem
                className={cn(
                  'wb-h-[64px] wb-flex wb-px-2xl wb-items-center wb-justify-center wb-bg-surface-basic-subdued dark:wb-bg-surface-darktheme-basic-subdued',
                  p.className
                )}
              >
                {p.icon}
              </GraphItem>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};
const PartnerSection = () => {
  return (
    <div className="wb-pt-8xl lg:wb-pb-8xl lg:wb-pt-12xl wb-flex wb-flex-col">
      <p className="wb-bodyLg-medium wb-text-text-strong dark:wb-text-text-darktheme-default wb-text-center">
        Join the cult of our early adopters, and discover the power of Kloudlite
      </p>
      <Partners />
    </div>
  );
};

const FaqItem = forwardRef(
  (
    {
      label,
      children,
      value,
    }: {
      label: ReactNode;
      children?: ReactNode;
      value: string;
    },
    forwardRef
  ) => {
    return (
      // @ts-ignore
      <Accordion.Item value={value} ref={forwardRef}>
        <Accordion.Header className="wb-flex">
          <Accordion.Trigger
            className={cn(
              'wb-group wb-py-2xl wb-px-4xl wb-bodyLg md:wb-bodyXl-medium wb-text-text-default dark:wb-text-text-darktheme-default wb-flex wb-flex-row wb-items-center wb-gap-lg wb-w-full'
            )}
          >
            <span className="wb-flex-1 wb-text-start">{label}</span>
            <span className="wb-transition-transform wb-duration-300 group-data-[state=open]:wb-rotate-90">
              <ChevronRight size={16} />
            </span>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="data-[state=open]:wb-animate-slideDown data-[state=closed]:wb-animate-slideUp wb-overflow-hidden">
          <div className="wb-px-4xl wb-pb-2xl wb-bodyXl wb-text-text-strong dark:wb-text-text-darktheme-soft">
            {children}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    );
  }
);

const FaqSection = () => {
  const ref = useRef(null);
  const [className, setClassName] = useState('wb-pb-lg');
  return (
    <Block title="FAQs">
      <GraphItem className="wb-bg-surface-basic-subdued dark:wb-bg-surface-darktheme-basic-subdued">
        <Accordion.Root
          collapsible
          type="single"
          ref={ref}
          className={cn(className)}
          onValueChange={(e) => {
            if (!e) {
              setClassName('wb-pb-lg');
            } else {
              setClassName(
                consts.homeNew.faqData.find((f) => f.title === e)?.classNames ||
                  'wb-pb-md'
              );
            }
          }}
        >
          {consts.homeNew.faqData.map((f) => (
            <FaqItem key={f.title} label={f.title} value={f.title}>
              {f.desc}
            </FaqItem>
          ))}
        </Accordion.Root>
      </GraphItem>
    </Block>
  );
};

const RecommendedItemButton = ({
  title,
  desc,
  onClick,
  active,
}: {
  title: ReactNode;
  desc: ReactNode;
  onClick: () => void;
  active?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'cursor-pointer p-4xl items-start text-start flex flex-col  h-full gap-4xl w-full outline-none',
        active
          ? 'bg-surface-basic-default dark:bg-surface-darktheme-basic-default'
          : 'bg-surface-basic-subdued dark:bg-surface-darktheme-basic-subdued'
      )}
    >
      {active && (
        <span className="absolute top-0 left-0 right-0 h-[3px] bg-border-primary dark:bg-border-darktheme-primary" />
      )}
      <span className="heading2xl-marketing text-text-default dark:text-text-darktheme-default">
        {title}
      </span>
      <span className="bodyXl text-text-soft dark:text-text-darktheme-soft">
        {desc}
      </span>
    </button>
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
    <div className="bg-surface-basic-default dark:bg-surface-darktheme-basic-default flex flex-col md:!flex-row gap-3xl lg:!gap-8xl md:!h-[416px]">
      <div className="flex flex-col p-5xl gap-5xl md:w-1/2">
        <div className="flex flex-col gap-4xl">
          <div className="flex flex-col gap-md">
            <span className="bodyXl lg:!bodyXXl text-text-disabled dark:text-text-darktheme-disabled">
              Recommended resources
            </span>
            <h3 className="heading3xl-marketing md:!heading4xl lg:!heading5xl-marketing text-text-default dark:text-text-darktheme-default line-clamp-2">
              {content}
            </h3>
          </div>
          <p className="bodyXl lg:!bodyXXl text-text-soft dark:text-text-darktheme-soft line-clamp-3">
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
          <img src={image} alt="success-story" className="w-full h-full" />
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

const _GetStartedSection = () => {
  const [selectedTab, setSelectedTab] = useState(
    consts.homeNew.howitworks.items[0].id
  );

  const imgs = consts.homeNew.howitworks.images;
  const getTab = () => {
    switch (selectedTab) {
      case 'collaborate':
        return (
          <motion.div className="h-full flex items-end justify-center relative top-[18px] md:!top-0 p-3xl !pb-0 md:!p-0">
            <img alt="distribute" src={imgs.collaborate.r1440} />
          </motion.div>
        );
      case 'nocommit':
        return (
          <motion.div className="h-full flex items-end justify-center relative p-3xl !pb-0 md:!p-0">
            <img alt="distribute" src={imgs.nocommit.r1440} />
          </motion.div>
        );
      case 'integrate':
        return (
          <motion.div className="h-full flex items-end justify-center relative p-3xl !pb-0 md:!p-0">
            <img alt="distribute" src={imgs.integrate.r1440} />
          </motion.div>
        );
      case 'connect':
      default:
        return (
          <motion.div className="h-full flex items-center justify-center p-3xl md:!p-0">
            <img alt="distribute" src={imgs.connect.r1440} />
          </motion.div>
        );
    }
  };

  return (
    <GetStartedNew
      title="How Kloudlite transforms your workflows?"
      desc="Built using Kloudlite Global VPN Mesh with wireguard at it’s core"
      tabs={consts.homeNew.howitworks.items}
      onTabChange={(item) => setSelectedTab(item.id || '')}
      tab={getTab()}
      activeTab={selectedTab}
    />
  );
};

const RecommendedResources = ({
  tabs,
  activeTab,
  onTabChange,
  tabContainerClassName,
}: {
  tabs: typeof consts.homeNew.recommendedTabs;
  activeTab?: string;
  onTabChange?: (
    value: (typeof consts.homeNew.recommendedTabs)[number]
  ) => void;
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

const _RecommendedSection = () => {
  const [active, setActive] = useState(consts.homeNew.recommendedTabs[0].id);
  return (
    <SectionWrapper style={{ paddingTop: '0px !important' }}>
      <RecommendedResources
        activeTab={active}
        onTabChange={(e) => setActive(e.id)}
        tabs={consts.homeNew.recommendedTabs}
      />
    </SectionWrapper>
  );
};

const MessageCard = ({
  title,
  subtitle,
  company,
  message,
}: {
  title: string;
  subtitle: string;
  company: ReactNode;
  message: ReactNode;
}) => {
  return (
    <div className="wb-flex wb-flex-col wb-gap-3xl wb-p-3xl wb-bg-surface-basic-default dark:wb-bg-surface-darktheme-basic-default wb-min-h-[224px]">
      <div className="wb-flex wb-flex-row wb-items-center wb-gap-3xl">
        <span className="wb-flex-1 dark:wb-hidden">
          <Profile
            responsive={false}
            name={title}
            subtitle={subtitle}
            color="one"
            size="md"
          />
        </span>
        <span className="wb-flex-1 wb-hidden dark:wb-block">
          <Profile
            responsive={false}
            name={title}
            subtitle={subtitle}
            color="dark"
            size="md"
          />
        </span>
        <span className="wb-text-text-default dark:wb-text-icon-darktheme-soft">
          {company}
        </span>
      </div>
      <p className="wb-bodyLg wb-text-text-soft dark:wb-text-text-darktheme-soft">
        {message}
      </p>
    </div>
  );
};

const _DontBelieve = () => {
  return (
    <Block title="Don't believe? Read for yourself..">
      <div className="wb-block md:wb-hidden">
        <Slider>
          {consts.home.messages.map((message) => (
            <SliderItem key={message.title}>
              <MessageCard {...message} />
            </SliderItem>
          ))}
        </Slider>
      </div>

      <div className="wb-hidden md:wb-grid wb-grid-cols-1 md:wb-grid-cols-3 wb-gap-3xl lg:wb-gap-5xl">
        {consts.home.messages.map((message) => (
          <GraphItem key={message.message}>
            <MessageCard {...message} />
          </GraphItem>
        ))}
      </div>
    </Block>
  );
};

const ExploringItem = ({
  label,
  desc,
  img,
}: {
  label: ReactNode;
  desc: ReactNode;
  img: string;
}) => {
  return (
    <div className="wb-h-full wb-flex wb-flex-col wb-bg-surface-basic-default dark:wb-bg-surface-darktheme-basic-default 2xl:wb-min-h-[176px]">
      <img
        className="wb-h-[156px] 2xl:wb-h-[192px] 3xl:wb-h-[264px]"
        src={img}
      />
      <div className="wb-flex wb-flex-col wb-gap-lg md:wb-gap-xl wb-p-3xl 2xl:wb-p-4xl">
        <h3 className="wb-headingLg-marketing md:wb-headingXl-marketing lg:wb-heading3xl-marketing wb-text-text-default dark:wb-text-text-darktheme-default">
          {label}
        </h3>
        <p className="wb-bodyLg lg:wb-bodyXl wb-text-text-strong dark:wb-text-text-darktheme-strong">
          {desc}
        </p>
      </div>
    </div>
  );
};

const KeepExploring = () => {
  return (
    <Block title="Unveil the untold - Keep exploring">
      <div className="wb-grid wb-grid-cols-1 md:wb-grid-cols-3 wb-gap-3xl lg:wb-gap-5xl">
        {consts.homeNew.exploring.map((e) => {
          return (
            <GraphItem key={e.label}>
              <ExploringItem {...e} />
            </GraphItem>
          );
        })}
      </div>
    </Block>
  );
};

const OpenSource = () => {
  return (
    <GraphExtended>
      <div className="wb-grid wb-grid-cols-1 md:wb-grid-cols-[auto_480px] wb-gap-3xl lg:wb-gap-5xl wb-grid-rows-[288px]">
        <GraphItem className="wb-bg-surface-basic-default dark:wb-bg-surface-darktheme-basic-default">
          <div className="wb-p-5xl wb-flex-col wb-flex wb-gap-5xl">
            <div className="wb-flex wb-flex-col wb-gap-3xl">
              <div className="wb-heading4xl-marketing wb-text-text-default dark:wb-text-text-darktheme-default">
                Open-source
              </div>

              <p className="wb-bodyXl wb-text-text-soft dark:wb-text-text-darktheme-soft">
                Avoid vendor lock-in Kloudlite is an open source project - for
                transparency, trust, and longevity. Drive by the community
              </p>
            </div>
            <div>
              <Button prefix={<Star />} content="Star Kloudlite on GitHub" />
            </div>
          </div>
        </GraphItem>
        <GraphItem className="wb-h-full wb-bg-surface-primary-subdued dark:wb-bg-surface-darktheme-primary-subdued">
          <div className="wb-p-5xl wb-flex-col wb-flex wb-gap-5xl wb-h-full">
            <div className="wb-flex wb-flex-row wb-gap-2xl wb-flex-1">
              <div className="wb-flex-1 wb-heading4xl wb-text-text-default dark:wb-text-text-darktheme-default">
                <span className="wb-heading4xl-md">kloudlite /</span>
                <br />
                <span>kloudlite</span>
              </div>
              <div className="wb-w-10xl wb-h-10xl wb-flex wb-items-center wb-justify-center wb-rounded wb-bg-surface-primary-pressed dark:wb-bg-surface-darktheme-primary-pressed">
                <BrandLogo size={48} detailed={false} darkBg />
              </div>
            </div>
            <div className="wb-flex wb-flex-row wb-items-center">
              <div className="wb-flex-1 wb-text-text-strong dark:wb-text-text-darktheme-strong">
                See why Kloudlite is the remote local environments of choice for
                modern
              </div>
              <div className="wb-w-10xl wb-text-icon-strong dark:wb-text-icon-darktheme-strong wb-flex wb-flex-row wb-justify-end">
                <GithubLogoFill size={40} />
              </div>
            </div>
          </div>
        </GraphItem>
      </div>
    </GraphExtended>
  );
};

const Index = () => {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  return (
    <div>
      <Wrapper className="wb-relative wb-flex wb-justify-center lg:wb-justify-start wb-py-6xl md:wb-pt-8xl lg:wb-pt-10xl">
        <div className="wb-w-full wb-z-[1]">
          <div className="wb-flex wb-flex-col wb-gap-3xl wb-text-center wb-items-center">
            <h1 className="wb-heading4xl-marketing md:wb-heading6xl-marketing lg:wb-heading7xl-marketing wb-text-text-default dark:wb-text-text-darktheme-default wb-text-center lg:wb-w-[830px] 3xl:wb-w-[884px]">
              Open-source unified remote local environments
            </h1>
            <p className="wb-bodyLg md:wb-bodyXl lg:wb-bodyXXl wb-text-text-soft dark:wb-text-text-darktheme-soft wb-text-center wb-max-w-[528px] lg:wb-w-[688px] lg:wb-max-w-[688px]">
              Integrate the comfort of local coding with the power of remote
              environments.
            </p>
          </div>
          <div className="wb-pt-6xl wb-flex md:wb-flex-row wb-flex-col wb-gap-4xl md:wb-items-center wb-justify-center">
            <div className="md:wb-w-[610px] wb-flex wb-flex-col wb-gap-xl wb-text-center">
              <div
                style={{ background: 'linear-gradient(#93C5FD, #3B82F6)' }}
                className="wb-p-[2px] wb-rounded-md"
                id="join-waitlist"
              >
                <TextInput
                  value={waitlistEmail}
                  onChange={({ target }) => {
                    setWaitlistEmail(target.value);
                  }}
                  placeholder="Enter email to join waitlist"
                  size="xl"
                  className="!wb-border-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && waitlistEmail) {
                      console.log('here');
                      setShowInviteDialog(true);
                      e.stopPropagation();
                      e.preventDefault();
                    }
                  }}
                  suffix={
                    <div>
                      {waitlistEmail ? (
                        <div>
                          <div className="wb-hidden md:wb-block">
                            <Button
                              size="sm"
                              content="Join waitlist"
                              suffix={<ArrowRight />}
                              variant="primary"
                              onClick={() => setShowInviteDialog(true)}
                            />
                          </div>
                          <div className="wb-block md:wb-hidden">
                            <Button
                              size="sm"
                              content="Join"
                              suffix={<ArrowRight />}
                              variant="primary-plain"
                              onClick={() => setShowInviteDialog(true)}
                            />
                          </div>
                        </div>
                      ) : (
                        <IconButton variant="outline" icon={<ArrowRight />} />
                      )}
                    </div>
                  }
                  focusRing={false}
                  textFieldClassName="!wb-bodyLg"
                />
              </div>
              <span className="wb-text-text-soft wb-bodyMd">
                Got an invite code? Enter it for immediate access!
              </span>
            </div>
          </div>
        </div>
      </Wrapper>
      <Wrapper className="md:!-wb-mt-5xl">
        <div className="hidden md:block">
          <GraphExtended
            innerClass="md:-wb-mx-[160px] -wb-mt-[2px] wb-flex wb-justify-center !wb-pt-[32px]"
            className="!wb-pb-[20px]"
            style={{
              paddingBottom: '64px !important',
              backgroundPosition: 'top',
            }}
          >
            <HomeIllustration768 className="wb-hidden md:wb-block lg:wb-hidden" />
            <HomeIllustration1024 className="wb-hidden lg:wb-block xl:wb-hidden" />
            <HomeIllustration1280 className="wb-hidden xl:wb-block 2xl:wb-hidden" />
            <HomeIllustration className="wb-hidden 2xl:wb-block" />
          </GraphExtended>
        </div>
        <KloudliteDevelopment />
      </Wrapper>
      <div className="wb-hidden lg:wb-block wb-px-3xl lg:wb-px-0 2xl:wb-max-w-[1440px] 3xl:wb-max-w-[1600px] wb-m-auto">
        <SecureAtCore />
      </div>
      <Wrapper>
        <PartnerSection />
        <HowItWorksSection />
        <FaqSection />
        <KeepExploring />
        {/* <DontBelieve /> */}
        <OpenSource />
      </Wrapper>
      <InviteCodeDialog
        show={showInviteDialog}
        onOpenChange={setShowInviteDialog}
      />
    </div>
  );
};

export default Index;
