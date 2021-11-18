import { Product } from './products';

export interface IAction {
  type: string;
  payload?: Product;
}
export interface IState {
  cartItems: any;
  showCart: any;
  //state: object;
}
