import { useReducer, useCallback, useMemo } from 'react';
import { IState, IAction } from '../interface/cart';
import { Product } from '../interface/products';
import { CartContext } from './CartContext';
import { CartReducer } from './CartReducer';
import { ADD_TO_CART, CLOSE_CART_DROPDOWN, CLEAR_CART } from './types';
import { CartInitialState, Props } from '../types/context';
import { toast } from 'react-toastify';

export const initialState: CartInitialState = {
  cartItems: [],
  showCart: false,
};
//The children are the data the higher order component receives
export const CartProvider = ({ children }: Props) => {
  const [cartState, cartActionDispatcher] = useReducer<
    React.Reducer<IState, IAction>
  >(CartReducer, initialState);

  //preventing unnecessary recreation of functions using memoization technique. Although this is an overkill in this situation, we can still use it.

  const onAddToCart = useCallback((product: Product) => {
    //error proofing the function
    if (
      !product ||
      typeof product !== 'object' ||
      typeof product === 'undefined'
    ) {
      throw new Error(
        'Product is now available for dispatch into the CartReducer as payload, please check your configuration'
      );
    }

    cartActionDispatcher({
      type: ADD_TO_CART,
      payload: product,
    });

    cartActionDispatcher({
      type: CLOSE_CART_DROPDOWN,
    });

    toast.success(`${product.name} added to cart`);
  }, []);

  const onCloseCart = useCallback(() => {
    cartActionDispatcher({
      type: CLOSE_CART_DROPDOWN,
    });
  }, []);

  const onClearCart = useCallback(() => {
    cartActionDispatcher({
      type: CLEAR_CART,
    });

    toast.warn(`Cart is cleared, please add items`);
  }, []);

  //stopping the values from rerendering its children
  const value = useMemo(
    () => ({ onCloseCart, onAddToCart, cartState, onClearCart }),
    [onCloseCart, onAddToCart, cartState, onClearCart]
  );

  const { Provider } = CartContext;

  return <Provider value={value}>{children}</Provider>;
};
