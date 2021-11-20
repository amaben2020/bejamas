import React from 'react';
import { CartContext } from '../context/CartContext';
import { CartContextType } from '../types/context';

//This custom hook simply returns the values derived from the CartContext
const useCart = () => {
  const useCartContextValue = React.useContext<CartContextType | undefined>(
    CartContext
  );
  //@ts-ignore
  const { onCloseCart, onAddToCart, cartState, onClearCart } =
    useCartContextValue;

  return { onCloseCart, onAddToCart, cartState, onClearCart };
};

export default useCart;
