import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import consts from '~/app/utils/const';
import { cn } from '~/app/utils/commons';
import { GraphExtended, GraphItem } from '../../graph';

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
        if (top >= 0 && top <= height + 100) {
          onAppear();
        }
      }
    });
  }, [ref, scrollYProgress]);

  const isActive = active >= index;
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
        className={cn('wb-flex wb-flex-col wb-px-3xl md:wb-px-6xl wb-gap-xl')}
        key={kd.label}
      >
        <span
          className={cn(
            'wb-headingLg md:wb-heading2xl',
            isActive
              ? 'wb-text-text-default dark:wb-text-text-darktheme-default'
              : 'wb-text-text-soft dark:wb-text-text-darktheme-soft'
          )}
        >
          {kd.label}
        </span>
        <span
          className={cn(
            'wb-bodyLg md:wb-bodyXl wb-transition-colors wb-text-text-soft dark:wb-text-text-darktheme-soft'
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
  const [activeMessage, setActiveMessage] = useState(0);

  return (
    <GraphExtended>
      <div className="relative wb-grid wb-grid-cols-1 lg:wb-grid-cols-[384px_auto] 2xl:wb-grid-cols-[448px_auto] 3xl:wb-grid-cols-[512px_auto] wb-items-start">
        <div className="wb-hidden lg:wb-block wb-absolute lg:wb-w-[384px] 2xl:wb-w-[448px] 3xl:wb-w-[512px] wb-top-0 wb-right-0 wb-left-0 wb-bottom-0 wb-bg-surface-basic-subdued dark:wb-bg-surface-darktheme-basic-subdued">
          <div className="wb-h-[1.5px] wb-bg-border-dark dark:wb-bg-border-darktheme-dark wb-absolute wb-bottom-0 -wb-left-5xl wb-right-0 wb-z-[51]" />
          <div className="wb-w-[1.5px] wb-bg-border-dark dark:wb-bg-border-darktheme-dark wb-absolute wb-left-0 wb-top-0 -wb-bottom-5xl wb-z-[51]" />
          <div className="wb-w-[1.5px] wb-bg-border-dark dark:wb-bg-border-darktheme-dark wb-absolute -wb-right-xs -wb-bottom-5xl wb-top-0 wb-z-[51]" />
        </div>
        <GraphItem
          lines={{ bottom: false }}
          className="wb-relative wb-bg-surface-basic-subdued dark:wb-bg-surface-darktheme-basic-subdued wb-p-3xl md:wb-p-5xl wb-sticky wb-top-0 z-50"
        >
          <div className="wb-absolute wb-inset-0 wb-bg-surface-basic-subdued dark:wb-bg-surface-darktheme-basic-subdued wb-z-[-1] -wb-mx-3xl md:wb-hidden" />
          <div className="lg:wb-hidden wb-h-xs wb-bg-border-dark dark:wb-bg-border-darktheme-dark wb-absolute wb-bottom-0 -wb-left-3xl -wb-right-3xl wb-z-[1]" />
          <AnimatePresence mode="wait">
            <div className="wb-flex wb-flex-col wb-gap-3xl">
              <div className="wb-flex wb-flex-col wb-gap-xl">
                <h3 className="wb-heading4xl-1-marketing md:wb-heading4xl-1-marketing lg:wb-heading5xl-1-marketing wb-text-text-default dark:wb-text-text-darktheme-default">
                  Why Kloudlite?
                </h3>
                <p className="wb-hidden md:wb-block wb-bodyLg md:wb-bodyXl wb-text-text-soft dark:wb-text-text-darktheme-soft">
                  It is built with belief that you should develop your
                  application as you run your application
                </p>
              </div>
            </div>
          </AnimatePresence>
        </GraphItem>
        <GraphItem className="wb-bg-surface-basic-subdued dark:wb-bg-surface-darktheme-basic-subdued wb-flex wb-flex-row ">
          <div ref={ref} className="wb-pt-3xl md:wb-pt-6xl wb-flex wb-flex-col">
            {consts.homeNew.kloudliteDevelopmentData.map((kd, index) => {
              return (
                <KDElement
                  key={kd.label}
                  onAppear={() => {
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

      <GraphItem className="md:wb-hidden">
        <p className="wb-bodyLg md:wb-bodyXl wb-text-text-soft dark:wb-text-text-darktheme-soft wb-p-3xl md:wb-p-6xl">
          It is built with belief that you should develop your application as
          you run your application
        </p>
      </GraphItem>
    </GraphExtended>
  );
};

export default KloudliteDevelopment;
