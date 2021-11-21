import React from 'react';
import { IPrice } from '../../interface/products';
import styles from './../../styles/checkbox.module.scss';

interface PriceInputProps {
  prices: IPrice;
  selectPrices: (event: React.ChangeEvent<HTMLInputElement>) => void;
  priceIds: number[];
}

const PriceInput = ({ prices, selectPrices, priceIds }: PriceInputProps) => {
  console.log('PRICES', prices);
  console.log('PRICE IDS', priceIds);

  return (
    <div className={styles.myCheckbox}>
      <input
        className={styles.myCheckbox__input}
        type="checkbox"
        value={prices.price}
        onChange={(event) => selectPrices(event)}
        checked={priceIds.includes(prices.price) ? true : false}
      />
      <label className={styles.myCheckbox__label} htmlFor={prices.label}>
        {prices.label}
      </label>
    </div>
  );
};

export default PriceInput;
