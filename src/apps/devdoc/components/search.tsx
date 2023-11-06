import { Search as SearchIcon } from '@jengaicons/react';
import { cn } from '~/utiltities/commons';
import useSearch from '~/utiltities/use-search';

const Search = ({ className }: { className?: string }) => {
  const { setShow } = useSearch();
  return (
    <div className={cn('flex flex-row items-center gap-xl', className)}>
      <button
        onClick={() => {
          setShow(true);
        }}
        className="flex flex-row items-center rounded border border-border-default bg-surface-basic-default h-[36px] min-w-[200px] w-full"
      >
        <span className="text-icon-default py-lg pl-lg pr-md">
          <SearchIcon size={20} />
        </span>
        <span className="text-text-disabled bodyMd">Search</span>
      </button>
    </div>
  );
};

export default Search;
