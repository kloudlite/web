import OptionList from 'kl-design-system/atoms/option-list';
import ScrollArea from 'kl-design-system/atoms/scroll-area';
import Tabs from 'kl-design-system/atoms/tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { GraphExtended, GraphItem } from '~/app/components/graph';
import ResponsiveContainer from '~/app/components/responsive-container';
import Wrapper from '~/app/components/wrapper';

const tabs = [
  {
    label: 'Privacy & Policy',
    value: '/legal/privacy-policy',
  },
  {
    label: 'Terms of Services',
    value: '/legal/terms-of-services',
  },
  {
    label: 'Cancellation & Refund Policy',
    value: '/legal/cancellation-refund-policy',
  },
];

const Layout = ({ children }: { children: ReactNode }) => {
  const path = usePathname();

  return (
    <Wrapper>
      <div className="wb-hidden lg:wb-block xl:wb-py-5xl 2xl:wb-py-8xl">
        <GraphExtended className="before:!wb-bg-[100%_1%,100%_1%,28%_100%,28%_100%] group-[theme=dark]:before/html:!wb-bg-[100%_0.4%,100%_0.4%,11%_100%,11%_100%]">
          <div className="wb-relative wb-grid wb-grid-cols-1 lg:wb-grid-cols-[288px_auto] 3xl:wb-grid-cols-[352px_auto] wb-gap-5xl wb-items-start">
            <div className="wb-hidden lg:wb-block wb-absolute lg:wb-w-[288px] 3xl:wb-w-[352px]  wb-top-0 wb-right-0 wb-left-0 wb-bottom-0 wb-bg-surface-basic-subdued">
              <div className="wb-h-[1.5px] wb-bg-border-dark wb-absolute wb-bottom-0 -wb-left-5xl wb-right-0 wb-z-[51]" />
              <div className="wb-w-[1.5px] wb-bg-border-dark wb-absolute wb-left-0 wb-top-0 -wb-bottom-5xl wb-z-[51]" />
              <div className="wb-w-[1.5px] wb-bg-border-dark wb-absolute -wb-right-xs -wb-bottom-5xl wb-top-0 wb-z-[51]" />
            </div>
            <GraphItem
              lines={{ bottom: false }}
              className="wb-sticky wb-top-0 wb-flex wb-text-text-default wb-bg-surface-basic-subdued wb-flex-col wb-min-h-[80vh]"
            >
              {tabs.map((tab) => {
                return (
                  <Link href={tab.value} key={tab.label}>
                    <OptionList.OptionItemRaw
                      active={tab.value === path}
                      className="!wb-p-3xl"
                    >
                      <div className="wb-flex wb-flex-row wb-items-center wb-gap-xl !wb-bodyLg">
                        <span>{tab.label}</span>
                      </div>
                    </OptionList.OptionItemRaw>
                  </Link>
                );
              })}
            </GraphItem>
            <ResponsiveContainer>
              <GraphItem>{children}</GraphItem>
            </ResponsiveContainer>
          </div>
        </GraphExtended>
      </div>
      <div className="wb-block xl:wb-hidden">
        <div className="wb-flex wb-w-full wb-pt-5xl from-surface-basic-default">
          <ScrollArea
            blurfrom="wb-from-surface-basic-default"
            rightblur={false}
            className="wb-ml-xl wb-flex-1"
          >
            <Tabs.Root
              value={path}
              variant="filled"
              size="sm"
              LinkComponent={Link}
            // toLabel="href"
            >
              {tabs.map((t) => (
                <Tabs.Tab
                  key={t.value}
                  label={t.label}
                  value={t.value}
                  to={t.value}
                />
              ))}
            </Tabs.Root>
          </ScrollArea>
        </div>
        {children}
      </div>
    </Wrapper>
  );
};

export default Layout;
