import React from 'react';
import { useContext } from 'react';
//import CartContext from '../../context/CartContext';
import styles from '../../styles/card.module.scss';
import Image from 'next/image';
import useCart from '../../hooks/useCart';
import { ProductCardElement } from '../../interface/product';

const ProductCard = ({ product, onAdd }: ProductCardElement) => {
  //const { addToCart } = useContext(CartContext);
  const { onAddToCart } = useCart();
  //const { _id, image, name, price, category, bestseller } = product;
  const { image, name, price, id } = product;

  return (
    <div>
      <div className={styles.card} key={id}>
        {/* <div>
          {bestseller && (
            <p className={styles.card__bestseller}> Best Seller</p>
          )}
        </div> */}
        {/* <Image
          width="500"
          height="680"
          className={styles.card__img}
          src={image && image.url}
          alt={name}
        /> */}

        <button className={styles.card__btn} onClick={() => onAdd(product)}>
          ADD TO CART
        </button>
      </div>
      <div className={styles.card__priceArea}>
        {/* <p className={styles.card__priceArea__smallText}>{category}</p> */}
        <p className={styles.card__priceArea__largeText}>{name}</p>
        <p className={styles.card__priceArea__smallText}> $ {price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
