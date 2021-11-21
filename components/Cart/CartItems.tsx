import Image from 'next/image';
import styles from './../../styles/navigationBar.module.scss';
import ClearCartButton from '../Button/AddToCartButton';
import useCart from '../../hooks/useCart';
import { ICartItems, IClose } from '../../interface/cart';

const CartItems = ({ onClose }: IClose) => {
  const { cartState, onClearCart } = useCart();
  const { cartItems } = cartState;
  const cartItem = [...cartItems];

  const clearItems = () => {
    onClearCart();
    setTimeout(() => {
      onClose();
    }, 1300);
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
                  src={c && c.image.formats.thumbnail.url}
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
