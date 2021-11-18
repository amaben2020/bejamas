import { IAction, IState } from '../interface/cart';
import { ADD_TO_CART, CLEAR_CART, CLOSE_CART_DROPDOWN, LOADING } from './types';

export const CartReducer = (state: IState, action: IAction): IState => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, payload],
      };
    case CLOSE_CART_DROPDOWN:
      return {
        ...state,
        showCart: !state.showCart,
      };

    case CLEAR_CART: {
      return {
        ...state,
        cartItems: [],
      };
    }

    default:
      return state;
  }
};
