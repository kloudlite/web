import consts from '~/app/utils/const';
import DocItemGrid from '../doc-item-grid';

const BasicConceptGrid = () => {
  return (
    <DocItemGrid
      className="wb-mt-5xl"
      items={consts.docs.basicConcepts.gridLinks}
    />
  );
};

export default BasicConceptGrid;
