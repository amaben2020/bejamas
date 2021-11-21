import React, { useState } from 'react';

const useSelectPrices = () => {
  const [priceIds, setPriceIds] = useState<Array<number>>([]);

  const selectPrices = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(event.target.value);
    setPriceIds(
      event.target.checked
        ? [selectedId]
        : priceIds.filter((id) => id !== selectedId)
    );
  };
  return { selectPrices, priceIds };
};

export default useSelectPrices;
