import React, { useEffect, useState } from 'react';
import styles from './../../styles/navigationBar.module.scss';
import { Container, Navbar } from 'react-bootstrap';
import CartItems from '../Cart/CartItems';
import Image from 'next/image';
import useCart from '../../hooks/useCart';

const NavigationBar = () => {
  const { onCloseCart, onAddToCart, cartState, onClearCart } = useCart();

  const { cartItems, showCart } = cartState;

  const [isOpen, setIsOpen] = useState(false);

  const toggleClose = () => {
    onCloseCart();
    setIsOpen((previousState) => !previousState);
  };

  useEffect(() => {
    if (showCart === true) {
      setIsOpen((previousState) => !previousState);
    }
  }, [showCart]);

  return (
    <div className={styles.mynav}>
      <Container>
        <div className={styles.mynav__wrapper}>
          <div className={styles.mynav__wrapper__minMargin}>
            <Navbar.Brand>
              <Image src="/bejamasSvg.svg" alt="me" width="194" height="24" />
            </Navbar.Brand>
          </div>

          <div>
            <Navbar.Brand className={styles.mynav__icon} onClick={toggleClose}>
              <div className={styles.mynav__CartIcon}>
                <Image src="/Group 3.1.png" alt="me" width="37" height="34" />{' '}
                <p
                  className={
                    !cartItems?.length
                      ? styles.dNone
                      : styles.mynav__CartIcon__value
                  }
                >
                  {cartItems?.length}
                </p>
              </div>
            </Navbar.Brand>
          </div>

          {isOpen && <CartItems onClose={toggleClose} />}
        </div>
      </Container>
    </div>
  );
};

export default NavigationBar;
