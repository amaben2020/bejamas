import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import AddToCartButton from '../Button/AddToCartButton';
import CustomModal from './CustomModal';
import { priceCheckbox } from '../../utils/priceChekbox';
import style from './../../styles/modal.module.scss';
import { ICategory, IPrice, IProduct } from '../../interface/products';
import { categoryCheckbox } from '../../utils/categoryCheckbox';
import useSelectCategory from '../../hooks/useSelectCategory';
import useSelectPrices from '../../hooks/useSelectPrice';
interface ModalDisplayProps {
  //ids: number[];
  onAddToCart: (products: IProduct) => void;
  onClearCart: () => void;
  onCloseCart: () => void;
  setStatus: (status: boolean) => void;
  categoryData: ICategory[];
  pricesData: IPrice[];
  // priceIds: number[];
}

const ModalDisplay = ({
  setStatus,
  categoryData,
  pricesData,
  onClearCart,
  onAddToCart,
  onCloseCart,
}: ModalDisplayProps) => {
  const { selectCategory, ids } = useSelectCategory();
  const { selectPrices, priceIds } = useSelectPrices();

  return (
    <div>
      <CustomModal closeModal={() => setStatus(false)}>
        <p className={style.modalText}>Filter</p>
        {categoryData.length > 0 &&
          categoryData.map((category) =>
            categoryCheckbox(category, ids, selectCategory)
          )}
        <hr />
        <p className={style.modalText}>Price range</p>
        {pricesData.length > 0 &&
          pricesData.map((prices) =>
            priceCheckbox(prices, priceIds, selectPrices)
          )}
        <div className={style.modalButtonArea}>
          {' '}
          <AddToCartButton
            inverted="inverted"
            title="Clear"
            onClick={() => onClearCart()}
          />
          <AddToCartButton title="Save" onClick={() => onCloseCart()} />
        </div>
      </CustomModal>
    </div>
  );
};

export default ModalDisplay;
