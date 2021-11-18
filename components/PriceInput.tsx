import React from 'react';
import { IPrice } from '../interface/products';

interface PriceInputProps {
  prices: IPrice;
  selectPrices: (event: React.ChangeEvent<HTMLInputElement>) => void;
  priceIds: number[];
}

const PriceInput = ({ prices, selectPrices, priceIds }: PriceInputProps) => {
  return (
    <div>
      <span>{prices.label}</span>

      <span>
        <input
          type="checkbox"
          value={prices.price}
          onChange={(event) => selectPrices(event)}
          checked={priceIds.includes(prices.price) ? true : false}
        />
      </span>
    </div>
  );
};

export default PriceInput;
