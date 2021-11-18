import React from 'react';
import styles from './../../styles/addToCart.module.scss';
interface IProps {
  title: string;
  onClick: () => void;
  inverted?: string;
  fullWidth?: string;
}

const Button = ({ title, onClick, inverted, fullWidth }: IProps) => {
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
