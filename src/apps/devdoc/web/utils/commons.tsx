import classNames from 'classnames';
import { ReactNode, forwardRef } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronRight } from '@jengaicons/react';

type cnProps = (string | { [key: string]: boolean } | undefined)[];

export const cn = (...props: cnProps) => {
  return classNames(...props);
};

export const autoSize = (element: HTMLElement, event: string) => {
  const action = () => {
    if (!element) return;
    const parentHeight =
      (element?.getBoundingClientRect().height || 0) -
      parseInt(element?.style.paddingBottom || '0px', 10);
    const padding = 32 - (parentHeight % 32);
    if (padding !== 32) element.style.paddingBottom = `${padding}px`;
  };
  document.addEventListener(event, action);
  return () => {
    document.removeEventListener(event, action);
  };
};

export const CollapseItem = forwardRef(
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
        <Accordion.Content className="data-[state=open]:wb-animate-slideDown data-[state=closed]:wb-animate-slideUp wb-overflow-hidden">
          <div className="wb-px-4xl wb-pb-2xl wb-bodyLg md:wb-bodyXl wb-text-text-strong">
            {children}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    );
  },
);
