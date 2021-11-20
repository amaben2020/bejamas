import { useState } from 'react';

const useSort = () => {
  const sortValues = ['name'];
  const [sortValue, setSortValue] = useState(sortValues);

  const orderValues = ['asc'];
  const [orderValue, setOrderValue] = useState(orderValues);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue([e.target.value]);
  };
  return { sortValue, handleSort, setOrderValue, orderValue };
};

export default useSort;
