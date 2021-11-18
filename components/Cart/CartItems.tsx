import React from 'react';
import { useContext } from 'react';
//import CartContext from '../../context/CartContext';
import Image from 'next/image';
import styles from './../../styles/navigationBar.module.scss';
import AddToCartButton from '../Button/AddToCartButton';
import useCart from '../../hooks/useCart';
interface ICartItems {
  price: number;
  image: { formats: { thumbnail: { url: string } } };
  name: string;
  _id: string;
}

const CartItems = ({ onClose }: any) => {
  // const { cartItems, removeFromCart } = useContext(CartContext);

  const { onCloseCart, onAddToCart, cartState, onClearCart } = useCart();
  const { cartItems } = cartState;
  const cartItem = [...cartItems];

  const clearItems = () => {
    return onClearCart();
  };

  return (
    <div className={styles.cartItems}>
      {' '}
      {cartItem?.map((c: ICartItems) => (
        <div key={c._id} className={styles.cartItems__paddingarea}>
          <p onClick={onClose} className={styles.cartItems__paddingarea__X}>
            &#10006;
          </p>
          <div className={styles.cartItems__flexarea}>
            <div>
              <p className={styles.cartItems__flexarea__text}>{c.name}</p>
              <p className={styles.cartItems__flexarea__price}>${c.price}</p>
            </div>
            <div className={styles.cartItems__flexarea__img}>
              {/* 
              For some reason, image is not loading when it is in the cart.
              <Image
                src={c.image.formats.thumbnail.url}
                alt={c.name}
                width={140}
                height={80}
              /> */}
            </div>
          </div>
          <div className={styles.cartItems__clearBtn}>
            <AddToCartButton
              inverted="inverted"
              title={' Clear'}
              onClick={clearItems}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
