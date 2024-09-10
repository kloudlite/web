import { InnerContent } from './privacy-container';
import PrivacyPolicy from '~/app/components/website/privacy/privacy-policy.mdx';
import PolicyGuidlines from '~/app/components/website/privacy/policy-and-guidlines.mdx';
import CancellationRefund from '~/app/components/website/privacy/cancellation-refund.mdx';
import { Headings } from './privacy/components';

const tabs = [
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
  const { subtitle, label } = {
    label: 'Privacy & Policy',
    subtitle: (
      <div className="wb-text-text-soft dark:wb-text-text-darktheme-soft wb-bodyLg">
        Last updated:{' '}
        <span className="wb-headingMd wb-text-text-default dark:wb-text-text-darktheme-default">
          12th Dec, 2023
        </span>
      </div>
    ),
  };

  const className = 'wb-pb-6xl';
  return (
    <InnerContent className={className} title={label} subTitle={subtitle}>
      <PrivacyPolicy />
    </InnerContent>
  );
};

export default PrivacyPolicyTab;
