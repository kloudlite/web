import consts from '~/app/utils/const';
import DocItemGrid from '../doc-item-grid';

const FaqGrid = () => {
  const items = () => {
    return Object.entries(consts.helpandsupport.kloudliteOverviewFaqs).map(
      ([_, item]) => {
        return { title: item.label, icon: item.icon, to: item.to };
      },
    );
  };
  return <DocItemGrid className="wb-mt-5xl" items={items()} />;
};

export default FaqGrid;
