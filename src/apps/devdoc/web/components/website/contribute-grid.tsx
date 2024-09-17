import consts from '~/app/utils/const';
import DocItemGrid from '../doc-item-grid';

const Grid = () => {
  return (
    <DocItemGrid
      className="wb-mt-5xl"
      items={consts.docs.contribute.gridLinks}
    />
  );
};

export default Grid;
