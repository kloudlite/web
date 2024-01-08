import { useState } from 'react';
import Pagination from '../../components/molecule/pagination';

export default {
  title: 'Molecules/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {},
};

const PaginationHook = ({}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const onPageChanged = (e: number) => {
    setTimeout(() => {
      setCurrentPage(e);
    }, 500);
  };

  const onItemsPerPageChanged = (e: number) => {
    setItemsPerPage(e);
  };

  return (
    <Pagination
      onPageChanged={onPageChanged}
      currentPage={currentPage}
      totalItems={200}
      itemsPerPage={itemsPerPage}
      onItemsPerPageChanged={onItemsPerPageChanged}
    />
  );
};
export const DefaultPagination = {
  render: () => <PaginationHook />,
};
