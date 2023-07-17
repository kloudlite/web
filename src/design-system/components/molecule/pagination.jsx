import { TextInput } from '../atoms/input';

const Pagination = ({}) => {
  return (
    <div className="flex flex-row items-center gap-3xl">
      <div className="flex flex-row items-center flex-1 gap-lg text-icon-default">
        <span>Item per page</span>
        <TextInput value={15} />
        <span>1-15 of 150 items</span>
      </div>
      <div />
    </div>
  );
};

export default Pagination;
