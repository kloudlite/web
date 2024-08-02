import { ReactNode, forwardRef, useRef, useState } from 'react';
import { cn } from '~/app/utils/commons';
import consts from '~/app/utils/const';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronRight } from '~/app/icons/icons';
import { GraphItem } from '../../graph';
import { Block } from '../../commons';

const FaqItem = forwardRef(
  (
    {
      label,
      children,
      value,
      mode,
      index,
    }: {
      label: ReactNode;
      children?: ReactNode;
      value: string;
      mode: 'mobile' | 'desktop';
      index?: number;
    },
    forwardRef,
  ) => {
    return (
      // @ts-ignore
      <Accordion.Item value={value} ref={forwardRef}>
        <Accordion.Header className="wb-flex">
          <Accordion.Trigger
            className={cn(
              'wb-group wb-py-2xl wb-px-4xl wb-bodyLg-medium md:wb-bodyXl-medium wb-text-text-default wb-flex wb-flex-row wb-items-center wb-gap-lg wb-w-full wb-cursor-pointer',
            )}
            asChild
          >
            <a
              {...(mode === 'mobile'
                ? {
                    id: `faq-${index}`,
                    href: `#faq-${index}`,
                  }
                : {})}
              className="wb-flex wb-flex-row wb-w-full"
            >
              <span className="wb-flex-1 wb-text-start">{label}</span>
              <span className="wb-transition-transform wb-duration-300 group-data-[state=open]:wb-rotate-90">
                <ChevronRight size={16} />
              </span>
            </a>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="collapse-item data-[state=open]:wb-animate-slideDown data-[state=closed]:wb-animate-slideUp wb-overflow-hidden">
          <div className="wb-px-4xl wb-pb-2xl wb-bodyLg md:wb-bodyXl wb-text-text-strong">
            {children}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    );
  },
);

const FaqSection = () => {
  const ref = useRef(null);
  const [className, setClassName] = useState('wb-pb-lg');
  return (
    <Block title="FAQs">
      <GraphItem className="wb-hidden md:wb-flex wb-bg-surface-basic-subdued">
        <Accordion.Root
          collapsible
          type="single"
          ref={ref}
          className={cn(className, 'wb-w-full')}
          onValueChange={(e) => {
            if (!e) {
              setClassName('wb-pb-lg');
            } else {
              setClassName(
                consts.homeNew.faqData.find((f) => f.title === e)?.classNames ||
                  'wb-pb-md',
              );
            }
          }}
        >
          {consts.homeNew.faqData.map((f) => (
            <FaqItem
              key={f.title}
              mode="desktop"
              label={f.title}
              value={f.title}
            >
              {f.desc}
            </FaqItem>
          ))}
        </Accordion.Root>
      </GraphItem>
      <GraphItem className="md:wb-hidden wb-bg-surface-basic-subdued">
        <Accordion.Root type="multiple" ref={ref} className={cn(className)}>
          {consts.homeNew.faqData.map((f, i) => (
            <FaqItem
              index={i}
              key={f.title}
              mode="mobile"
              label={f.title}
              value={f.title}
            >
              {f.desc}
            </FaqItem>
          ))}
        </Accordion.Root>
      </GraphItem>
    </Block>
  );
};

export default FaqSection;
