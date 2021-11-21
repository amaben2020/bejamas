import React, { useState } from 'react';

const useSelectCategory = () => {
  const [ids, setIds] = useState<Array<number>>([]);

  const selectCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(event.target.value);
    // Check if "ids" contains "selectedIds"
    // If true, this checkbox is already checked
    // Otherwise, it is not selected yet
    if (ids.includes(selectedId)) {
      const newIds = ids.filter((id: number) => id !== selectedId);
      setIds(newIds);
    } else {
      const newIds = [...ids];
      newIds.push(selectedId);
      setIds(newIds);
    }
  };
  return { selectCategory, ids, setIds };
};

export default useSelectCategory;
