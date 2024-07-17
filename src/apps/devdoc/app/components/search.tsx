import { Search } from '@jengaicons/react';
import { IconButton } from 'kl-design-system/atoms/button';
import { cn } from '../utils/commons';
import useSearch from '../utils/use-search';

const SearchBox = ({ className }: { className?: string }) => {
  const { setShow } = useSearch();
  return (
    <div
      className={cn('wb-flex wb-flex-row wb-items-center wb-gap-xl', className)}
    >
      <button
        onClick={() => {
          setShow(true);
        }}
        className="wb-hidden xl:wb-flex wb-flex-row wb-items-center wb-rounded wb-border wb-border-border-default wb-bg-surface-basic-default wb-h-[38px] xl:wb-min-w-[200px] wb-w-full wb-box-content"
      >
        <span className="wb-text-icon-default wb-py-lg wb-pl-lg wb-pr-md">
          <Search size={20} />
        </span>
        <span className="wb-text-text-disabled wb-bodyMd">Search</span>
      </button>
      <div className="wb-flex xl:wb-hidden">
        <IconButton
          icon={<Search />}
          variant="plain"
          onClick={() => {
            setShow(true);
          }}
        />
      </div>
    </div>
  );
};

export default SearchBox;
