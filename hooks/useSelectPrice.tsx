import React, { useState } from 'react';

const useSelectPrices = () => {
  const [priceIds, setPriceIds] = useState<Array<number>>([]);
  const selectPrices = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(event.target.value);
    if (event.target.checked) {
      setPriceIds([selectedId]);
    }
  };
  return { selectPrices, priceIds };
};

export default useSelectPrices;
