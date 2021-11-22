import React from 'react';
import { ProductCardElement } from '../../interface/product';
import styles from './../../styles/card.module.scss';
import Image from 'next/image';

const ProductCard = ({ product, onAdd }: ProductCardElement) => {
  const { name, image, id, value, categoryName, bestseller } = product;

  return (
    <div>
      <div className={styles.card} key={id}>
        <div>
          {bestseller && (
            <p className={styles.card__bestseller}> Best Seller</p>
          )}
        </div>
        <Image
          width="500"
          height="680"
          className={styles.card__img}
          src={image && image?.url}
          alt={name}
        />

        <button className={styles.card__btn} onClick={() => onAdd(product)}>
          ADD TO CART
        </button>
      </div>
      <div className={styles.card__priceArea}>
        <p className={styles.card__priceArea__smallText}>{categoryName}</p>
        <p className={styles.card__priceArea__largeText}>{product.name}</p>
        <p className={styles.card__priceArea__smallText}> $ {value}</p>
      </div>
    </div>
  );
};

export default ProductCard;
