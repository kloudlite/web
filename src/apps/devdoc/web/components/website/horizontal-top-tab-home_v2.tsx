import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Radio from 'kl-design-system/atoms/radio';
import { cn } from '~/app/utils/commons';
import consts from '~/app/utils/const';
import { GraphItem } from '../graph';
import { Block, BlockV2 } from '../commons';
import Slider from '../slider';
import ResponsiveContainer from '../responsive-container';

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
        'wb-h-full wb-flex wb-flex-col wb-gap-3xl md:wb-gap-4xl wb-p-2xl md:wb-p-4xl lg:wb-p-2xl xl:wb-p-3xl 2xl:wb-px-3xl 2xl:wb-py-4xl 3xl:wb-p-4xl wb-relative wb-cursor-pointer wb-transition-all',
        active
          ? 'wb-bg-surface-basic-default lg:wb-bg-surface-primary-subdued'
          : 'wb-bg-surface-basic-default',
        className,
      )}
      onClick={onClick}
    >
      <h3
        className={cn(
          'wb-headingXl-marketing md:wb-headingXl wb-transition-all lg:wb-min-h-[84px] xl:wb-min-h-[auto] 3xl:wb-min-h-[auto] wb-shrink-0',
          {
            'wb-text-text-default lg:wb-text-text-primary': active,
            'wb-text-text-default': !active,
          },
        )}
      >
        {label}
      </h3>
      <p
        className={cn('wb-bodyLg wb-transition-all', {
          'wb-text-text-strong': !active,
          'wb-text-text-strong lg:wb-text-text-default': active,
        })}
      >
        {desc}
      </p>
      {active && (
        <motion.div
          transition={{ type: 'ease-in', bounce: 0.1, duration: 3 }}
          initial={{
            width: 0,
          }}
          animate={{
            width: '100%',
          }}
          className="wb-hidden lg:wb-block wb-absolute wb-bottom-0 wb-left-0 wb-right-0 wb-h-[3px] wb-bg-border-focus"
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
    item: Omit<IHorizontalTopTabItem, 'active' | 'onClick'>,
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
    <BlockV2 title={title}>
      <div className="wb-flex wb-flex-col lg:wb-gap-5xl">
        {/**
            Desktop mode 
       * */}
        <ResponsiveContainer>
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
        </ResponsiveContainer>
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
                <div className="wb-border-t wb-border-border-dark wb-bg-surface-basic-subdued wb-flex wb-items-center wb-justify-center">
                  <div className="wb-hidden dark-block">
                    <img
                      alt="slide-light"
                      className="wb-flex wb-h-[160px] md:wb-h-[380px] wb-p-2xl wb-items-center wb-justify-center"
                      // @ts-ignore
                      src={images[t.id].r768Dark}
                    />
                  </div>

                  <div className="dark-hidden">
                    <img
                      alt="slide-dark"
                      className="wb-h-[160px] md:wb-h-[380px] wb-p-2xl wb-flex wb-items-center wb-justify-center"
                      // @ts-ignore
                      src={images[t.id].r768}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <GraphItem className="wb-hidden lg:wb-flex wb-bg-surface-basic-subdued">
          <div
            className={cn(
              'wb-bg-surface-basic-subdued md:wb-h-[380px] xl:wb-h-[480px] xl:wb-max-h-[480px] wb-w-full',
              tabContentClassName,
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
    </BlockV2>
  );
};

export default HorizontalTopTab;
