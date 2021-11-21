import React from 'react';
import { IButtonProps } from '../../interface/button';
import styles from './../../styles/addToCart.module.scss';

const Button = ({ title, onClick, inverted, fullWidth }: IButtonProps) => {
  return (
    <div>
      <button
        className={
          inverted
            ? styles.addToCartWhite
            : fullWidth
            ? styles.fullWidth
            : styles.addToCart
        }
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
