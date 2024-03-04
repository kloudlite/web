import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { ArrowRight } from '@jengaicons/react';
import Radio from 'kl-design-system/atoms/radio';
import { cn } from '~/app/utils/commons';
import { GraphExtended, GraphItem } from '../graph';
import SectionWrapper from './section-wrapper';
import Button from '../button';

interface IHorizontalTopTabItem {
  label: string;
  id: string;
  desc: string;
  active: boolean;
  className?: string;
  onClick: () => void;
}

const HorizontalTopTabDevopsItem = ({
  label,
  id: _id,
  desc,
  active,
  onClick,
  className,
}: IHorizontalTopTabItem) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4xl p-xl lg:!p-4xl bg-surface-basic-default relative cursor-pointer lg:min-h-[192px] lg:max-h-[192px] ',
        className
      )}
      onClick={onClick}
    >
      <h5
        className={cn('headingLg transition-all', {
          'text-text-primary': active,
          'text-text-default': !active,
        })}
      >
        {label}
      </h5>
      <p className="bodyLg text-text-soft line-clamp-2 md:line-clamp-3">
        {desc}
      </p>
      {active && (
        <motion.div
          transition={{ type: 'spring', bounce: 0.1, duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-border-primary"
        />
      )}
    </div>
  );
};

interface IHorizontalTopTab {
  tab: ReactNode;
  activeTab: string;
  tabs: Omit<IHorizontalTopTabItem, 'active' | 'onClick'>[];
  onTabChange: (
    item: Omit<IHorizontalTopTabItem, 'active' | 'onClick'>
  ) => void;
  tabContainerClassName?: string;
}
const HorizontalTopTabDevops = ({
  activeTab,
  tab,
  tabs,
  onTabChange,
  tabContainerClassName,
}: IHorizontalTopTab) => {
  return (
    <SectionWrapper className="flex-col">
      <div className="flex flex-col md:!flex-row gap-3xl md:!gap-8xl lg:!gap-10xl">
        <div className="flex flex-col gap-md flex-1">
          <p className="bodyLg-medium lg:!bodyXl-medium text-text-disabled">
            What does it offer?
          </p>
          <h2 className="heading3xl-marketing md:!heading4xl-marketing lg:!heading5xl-marketing text-text-default">
            Unlocking the advantages
          </h2>
        </div>
        <div className="flex flex-col gap-3xl md:!gap-4xl flex-1">
          <p className="bodyLg-medium lg:!bodyXl-medium text-text-soft">
            Simplify software development and testing with automated
            environments, tools, and configurations
          </p>
          <Button content="Read the docs" suffix={<ArrowRight />} size="lg" />
        </div>
      </div>
      <GraphExtended>
        <div className="flex flex-col gap-3xl lg:!gap-5xl">
          {' '}
          {/**
            Desktop mode 
       * */}
          <div className={cn(tabContainerClassName, 'hidden md:!grid')}>
            {tabs.map((tab) => (
              <GraphItem key={tab.id}>
                <HorizontalTopTabDevopsItem
                  {...tab}
                  onClick={() => onTabChange(tab)}
                  active={activeTab === tab.id}
                />
              </GraphItem>
            ))}
          </div>
          {/**
           Mobile mode 
       * */}
          <div className="grid grid-rows-[auto_50px] md:!hidden">
            <GraphItem>
              {/** @ts-ignore* */}
              <HorizontalTopTabDevopsItem
                {...(tabs.find((t) => t.id === activeTab) || {})}
                active
                onClick={() => {
                  //
                }}
              />
            </GraphItem>
            <GraphItem className="flex items-center justify-center">
              <div className="flex items-center justify-center">
                <Radio.Root
                  value={activeTab}
                  className="!flex-row"
                  /** @ts-ignore* */
                  onChange={(t) =>
                    // @ts-ignore
                    onTabChange(tabs.find((tab) => tab.id === t))
                  }
                >
                  {tabs.map((item) => (
                    /** @ts-ignore* */
                    <Radio.Item key={item.id} value={item.id} />
                  ))}
                </Radio.Root>
              </div>
            </GraphItem>
          </div>
          <GraphItem className="bg-surface-basic-subdued">
            <div className="bg-surface-basic-subdued md:h-[338px] xl:!h-[480px] xl:max-h-[480px]">
              {tab}
            </div>
          </GraphItem>
        </div>{' '}
      </GraphExtended>
    </SectionWrapper>
  );
};

export default HorizontalTopTabDevops;
