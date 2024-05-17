import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Radio from 'kl-design-system/atoms/radio';
import { cn } from '~/app/utils/commons';
import consts from '~/app/utils/const';
import { GraphItem } from '../graph';
import { Block } from '../commons';
import Slider from '../slider';

interface IHorizontalTopTabItem {
  label: ReactNode;
  id: string;
  desc: ReactNode;
  active: boolean;
  className?: string;
  onClick: () => void;
}

const HorizontalTopTabItem = ({
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
        'wb-min-h-[244px] wb-h-full wb-flex wb-flex-col wb-gap-3xl md:wb-gap-4xl wb-p-2xl xl:wb-p-3xl 2xl:wb-px-3xl 2xl:wb-py-4xl 3xl:wb-p-4xl wb-relative wb-cursor-pointer lg:wb-min-h-[192px] lg:wb-min-h-[400px] lg:wb-max-h-[400px]  xl:wb-min-h-[352px] xl:wb-max-h-[352px] 2xl:wb-min-h-[320px] 2xl:wb-max-h-[320px] 3xl:wb-min-h-[256px] 3xl:wb-max-h-[256px]',
        active
          ? 'md:wb-bg-surface-primary-subdued md:dark:wb-bg-surface-darktheme-primary-subdued'
          : ' wb-bg-surface-basic-default dark:wb-bg-surface-darktheme-basic-default',
        className
      )}
      onClick={onClick}
    >
      <h5
        className={cn(
          'wb-heading2xl-marketing wb-transition-all lg:wb-min-h-[84px] xl:wb-min-h-[96px] 3xl:wb-min-h-[auto] wb-shrink-0',
          {
            'wb-text-text-primary dark:wb-text-text-darktheme-primary': active,
            'wb-text-text-default dark:wb-text-text-darktheme-default': !active,
          }
        )}
      >
        {label}
      </h5>
      <p
        className={cn('wb-bodyXl', {
          'wb-text-text-default dark:wb-text-text-darktheme-default': true,
        })}
      >
        {desc}
      </p>
      {active && (
        <motion.div
          transition={{ type: 'spring', bounce: 0.1, duration: 0.3 }}
          className="wb-hidden md:wb-block wb-absolute wb-bottom-0 wb-left-0 wb-right-0 wb-h-[3px] wb-bg-border-primary dark:wb-bg-border-darktheme-primary"
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
  tabContentClassName?: string;
  title?: ReactNode;
  images: typeof consts.homeNew.howitworks.images;
}
const HorizontalTopTab = ({
  activeTab,
  tab,
  tabs,
  onTabChange,
  tabContainerClassName,
  tabContentClassName,
  title,
  images,
}: IHorizontalTopTab) => {
  return (
    <Block title={title}>
      <div className="wb-flex wb-flex-col lg:wb-gap-5xl">
        {/**
            Desktop mode 
       * */}
        <div className={cn(tabContainerClassName, 'wb-hidden lg:wb-grid')}>
          {tabs.map((tab) => (
            <GraphItem key={tab.id}>
              <HorizontalTopTabItem
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
        <div className="lg:wb-hidden wb-w-full">
          <Slider
            autoPlay
            hasDots={false}
            onMove={(e) => {
              onTabChange(tabs[e]);
            }}
            active={`${tabs.findIndex((t) => t.id === activeTab)}`}
          >
            {tabs.map((t) => (
              <div key={t.id}>
                <HorizontalTopTabItem {...t} onClick={() => {}} active />
                <div className="wb-bg-surface-basic-subdued dark:wb-bg-surface-darktheme-basic-subdued wb-flex wb-items-center wb-justify-center">
                  <div className="wb-hidden dark:wb-block">
                    <img
                      className="wb-flex wb-h-[160px] wb-p-2xl wb-items-center wb-justify-center"
                      // @ts-ignore
                      src={images[t.id].rmobileDark}
                    />
                  </div>

                  <div className="dark:wb-hidden">
                    <img
                      className="wb-h-[160px] wb-p-2xl wb-flex wb-items-center wb-justify-center"
                      // @ts-ignore
                      src={images[t.id].rmobile}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <GraphItem className="wb-hidden lg:wb-flex wb-bg-surface-basic-subdued dark:wb-bg-surface-darktheme-basic-subdued">
          <div
            className={cn(
              'wb-bg-surface-basic-subdued dark:wb-bg-surface-darktheme-basic-subdued md:wb-h-[338px] xl:wb-h-[480px] xl:wb-max-h-[480px] wb-w-full',
              tabContentClassName
            )}
          >
            {tab}
          </div>
        </GraphItem>
        <div className="wb-flex wb-items-center wb-justify-center lg:wb-hidden wb-mt-3xl">
          <Radio.Root
            value={activeTab}
            className="!wb-flex-row"
            /** @ts-ignore* */
            onChange={(t) => {
              const x = tabs.find((tab) => tab.id === t);
              // @ts-ignore
              onTabChange(x);
            }}
          >
            {tabs.map((item) => (
              /** @ts-ignore* */
              <Radio.Item key={item.id} value={item.id} />
            ))}
          </Radio.Root>
        </div>
      </div>
    </Block>
  );
};

export default HorizontalTopTab;
