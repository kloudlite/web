import consts from '~/app/utils/const';
import FAQSection from '../../faq_v2';

const FaqSection = () => {
  return (
    <FAQSection
      items={consts.helpandsupport.kloudliteOverviewFaqs}
      def="general"
    />
  );
};

export default FaqSection;
