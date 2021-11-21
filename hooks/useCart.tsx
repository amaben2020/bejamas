import React from 'react';
import { CartContext } from '../context/CartContext';
import { CartContextType } from '../types/context';

//This custom hook simply returns the values derived from the CartContext
const useCart = () => {
  const useCartContextValue = React.useContext<CartContextType | undefined>(
    CartContext
  );

  const {
    //@ts-ignore
    onCloseCart,
    //@ts-ignore
    onAddToCart,
    //@ts-ignore
    cartState,
    //@ts-ignore
    onClearCart,
    //@ts-ignore
    onRemoveItemFromCart,
  } = useCartContextValue;

  return {
    onCloseCart,
    onAddToCart,
    cartState,
    onClearCart,
    onRemoveItemFromCart,
  };
};

export default useCart;
