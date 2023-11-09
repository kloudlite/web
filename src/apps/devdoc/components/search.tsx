import { Search, X } from '@jengaicons/react';
import { Button, IconButton } from 'kl-design-system/atoms/button';
import { cn } from '~/utiltities/commons';
import useSearch from '~/utiltities/use-search';

const SearchBox = ({ className }: { className?: string }) => {
  const { setShow } = useSearch();
  return (
    <div className={cn('flex flex-row items-center gap-xl', className)}>
      <button
        onClick={() => {
          setShow(true);
        }}
        className="flex md:hidden lg:flex flex-row items-center rounded border border-border-default bg-surface-basic-default h-[36px] min-w-[200px] w-full"
      >
        <span className="text-icon-default py-lg pl-lg pr-md">
          <Search size={20} />
        </span>
        <span className="text-text-disabled bodyMd">Search</span>
      </button>
      <div className="hidden md:flex lg:hidden">
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
