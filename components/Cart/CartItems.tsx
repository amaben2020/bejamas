import React, { useState } from 'react';
import { useContext } from 'react';
//import CartContext from '../../context/CartContext';
import Image from 'next/image';
import styles from './../../styles/navigationBar.module.scss';
import ClearCartButton from '../Button/AddToCartButton';
import useCart from '../../hooks/useCart';
interface ICartItems {
  price?: number;
  image?: { formats: { thumbnail: { url: string } } };
  name?: string;
  _id?: string;
  value?: number;
}

interface IClose {
  //void doesn't return any value in the execution context.
  onClose: () => void;
}

const CartItems = ({ onClose }: IClose) => {
  // const { cartItems, removeFromCart } = useContext(CartContext);
  console.log('ONCLOSE FN', onClose);

  const { cartState, onClearCart, onCloseCart } = useCart();
  const { cartItems, showCart } = cartState;
  const cartItem = [...cartItems];

  const clearItems = () => {
    return onClearCart();
  };

  return (
    <div className={styles.cartItems}>
      <div className={styles.sticky}>
        <div className={styles.cartItems__paddingarea}>
          {cartItems.length > 0 && (
            <p onClick={onClose} className={styles.cartItems__paddingarea__X}>
              &#10006;
            </p>
          )}

          {cartItems.length === 0 && (
            <div className="d-flex justify-content-center mt-4">
              <p> Please add items to cart &#x1F6D2;</p>
            </div>
          )}
          {cartItem?.map((c: ICartItems) => (
            <div key={c._id} className={styles.cartItems__flexarea}>
              <div>
                <p className={styles.cartItems__flexarea__text}>{c.name}</p>
                <p className={styles.cartItems__flexarea__price}>${c.value}</p>
              </div>
              <div className={styles.cartItems__flexarea__img}>
                <Image
                  src={c && c.image.formats?.thumbnail?.url}
                  alt={c.name}
                  width={140}
                  height={80}
                />
              </div>
            </div>
          ))}

          {cartItem.length > 0 && (
            <div className={styles.cartItems__clearBtn}>
              <ClearCartButton
                inverted="inverted"
                title={' Clear'}
                onClick={clearItems}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
