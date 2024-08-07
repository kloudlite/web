import { Search } from '@jengaicons/react';
import { IconButton } from 'kl-design-system/atoms/button';
import { cn } from '../utils/commons';
import useSearch from '../utils/use-search';

const SearchBox = ({ className }: { className?: string }) => {
  const { setShow } = useSearch();
  return (
    <div className={cn('wb-flex', className)}>
      <IconButton
        variant="plain"
        size="lg"
        icon={<Search />}
        onClick={() => {
          setShow(true);
        }}
      />
    </div>
  );
};

export default SearchBox;
