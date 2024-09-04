import { useEffect, useState } from 'react';
import { InnerContent } from './privacy-container';
import Wrapper from '../wrapper';
import { GraphExtended, GraphItem } from '../graph';
import ResponsiveContainer from '../responsive-container';
import OptionList from 'kl-design-system/atoms/option-list';
import PrivacyPolicy from '~/app/components/website/privacy/privacy-policy.mdx';
import PolicyGuidlines from '~/app/components/website/privacy/policy-and-guidlines.mdx';
import CancellationRefund from '~/app/components/website/privacy/cancellation-refund.mdx';
import { Headings } from './privacy/components';

const tabs = [
  {
    label: 'Privacy & Policy',
    subtitle: (
      <div className="wb-text-text-soft dark:wb-text-text-darktheme-soft wb-bodyLg">
        Last updated:{' '}
        <span className="wb-headingMd wb-text-text-default dark:wb-text-text-darktheme-default">
          12th Dec, 2023
        </span>
      </div>
    ),
    content: <PrivacyPolicy />,
  },
  {
    label: 'Policies & Guidlines',
    subtitle: (
      <div className="wb-flex wb-flex-col wb-gap-lg">
        <Headings>TERMS OF USE</Headings>
        <span className="wb-text-text-soft dark:wb-text-text-darktheme-soft wb-bodySm">
          Updated: 12th Dec 2023 (Giving this date, considering the website
          go-live date)
        </span>
      </div>
    ),
    content: <PolicyGuidlines />,
  },
  {
    label: 'Cancellation & Refund Policy',
    subtitle: <Headings>Effective Date: july 01, 2024</Headings>,
    content: <CancellationRefund />,
  },
];

const PrivacyPolicyTab = () => {
  const [selected, setSelected] = useState(tabs[0]);
  const className = 'wb-pb-6xl';

  useEffect(() => {
    document.body.scrollIntoView();
  }, [selected]);

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
                  <div
                    key={tab.label}
                    onClick={() => {
                      setSelected(tab);
                    }}
                  >
                    <OptionList.OptionItemRaw
                      active={selected.label === tab.label}
                      className="!wb-p-3xl"
                    >
                      <div className="wb-flex wb-flex-row wb-items-center wb-gap-xl !wb-bodyLg">
                        <span>{tab.label}</span>
                      </div>
                    </OptionList.OptionItemRaw>
                  </div>
                );
              })}
            </GraphItem>
            <ResponsiveContainer extResize={selected}>
              <GraphItem>
                <InnerContent
                  className={className}
                  title={selected.label}
                  subTitle={selected.subtitle}
                >
                  {selected.content}
                </InnerContent>
              </GraphItem>
            </ResponsiveContainer>
          </div>
        </GraphExtended>
      </div>
      <div className="wb-block lg:wb-hidden">
        <InnerContent
          className={className}
          title={selected.label}
          subTitle={selected.subtitle}
        >
          {selected.content}
        </InnerContent>
      </div>
    </Wrapper>
  );
};

export default PrivacyPolicyTab;
