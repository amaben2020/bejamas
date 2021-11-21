import React from 'react';
import { categoryCheckbox } from '../../utils/categoryCheckbox';
import styles from '../styles/checkbox.module.scss';
import { priceCheckbox } from '../../utils/priceChekbox';
import useSelectCategory from '../../hooks/useSelectCategory';
import useSelectPrices from '../../hooks/useSelectPrice';
import { ICategory, IPrice } from '../../interface/products';

interface IProps {
  categoryData: ICategory[];
  pricesData: IPrice[];
  ids: number[];
  priceIds: number[];
}

const CheckBoxArea = ({ categoryData, pricesData, ids, priceIds }: IProps) => {
  const { selectCategory } = useSelectCategory();
  const { selectPrices } = useSelectPrices();
  return (
    <div>
      <h2 className={styles.myCheckBoxTitle}>Category</h2>
      {categoryData.length > 0 &&
        categoryData.map((category) =>
          categoryCheckbox(category, ids, selectCategory)
        )}
      <hr />

      <h2 className={styles.myCheckBoxTitle}>Price range</h2>
      {pricesData.length > 0 &&
        pricesData.map((prices) =>
          priceCheckbox(prices, priceIds, selectPrices)
        )}
    </div>
  );
};

export default CheckBoxArea;
