/* eslint-disable react/no-unescaped-entities */
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Button } from 'kl-design-system/atoms/button';
import { ArrowRight } from '@jengaicons/react';
import { cn } from '~/app/utils/commons';
import { Graph, GraphItem } from '../graph';

interface IHorizontalTopTabItem {
  label: string;
  id: string;
  desc: string;
  active: boolean;
  onClick: () => void;
}
export const AdvantageItem = ({
  label,
  id: _id,
  desc,
  active,
  onClick,
}: IHorizontalTopTabItem) => {
  return (
    <div
      className="flex flex-col gap-4xl py-5xl px-4xl bg-surface-basic-default relative cursor-pointer"
      onClick={onClick}
    >
      <h5
        className={cn('heading2xl-marketing transition-all', {
          'text-text-primary': active,
          'text-text-default': !active,
        })}
      >
        {label}
      </h5>
      <p className="bodyLg text-text-soft">{desc}</p>
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

const HorizontalTopTab = ({
  activeTab,
  tab,
  tabs,
  onTabChange,
  tabContainerClassName,
}: IHorizontalTopTab) => {
  return (
    <div className="flex flex-col 2xl:pt-10xl">
      <div className="flex flex-row gap-10xl">
        <div className="flex flex-col gap-md flex-1">
          <p className="bodyXl-medium text-text-disabled">
            What does it offer?
          </p>
          <h2 className="heading5xl-marketing text-text-default">
            Unlocking the advantages
          </h2>
        </div>
        <div className="flex flex-col gap-4xl flex-1 justify-between">
          <p className="bodyXl-medium text-text-soft">
            Either you are a developer or a platform engineer, managing cloud
            infrastructure doesn't have to be complicated
          </p>
          <Button content="Read the docs" suffix={<ArrowRight />} size="lg" />
        </div>
      </div>
      <Graph className="-mx-10xl flex flex-col gap-5xl">
        <div className={cn(tabContainerClassName)}>
          {tabs.map((tab) => (
            <GraphItem key={tab.id}>
              <AdvantageItem
                {...tab}
                onClick={() => onTabChange(tab)}
                active={activeTab === tab.id}
              />
            </GraphItem>
          ))}
        </div>
        <div className="px-10xl pb-10xl">
          <GraphItem>
            <div className="bg-surface-basic-subdued min-h-[480px] max-h-[480px]">
              {tab}
            </div>
          </GraphItem>
        </div>
      </Graph>
    </div>
  );
};

export default HorizontalTopTab;
