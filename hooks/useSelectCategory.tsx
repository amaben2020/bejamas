import React, { useState } from 'react';

const useSelectCategory = () => {
  const [ids, setIds] = useState<Array<number>>([]);

  const selectCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(event.target.value);

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
