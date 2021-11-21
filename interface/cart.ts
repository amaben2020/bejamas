import { Product, IProduct } from './products';

export interface IAction {
  type: string;
  payload?: Product;
}

export interface IState {
  cartItems: Product[];
  showCart: boolean;
}

export interface ICartItems {
  image: { formats: { thumbnail: { url: string } } };
  name: string;
  id: string;
  value: number;
}

export interface IClose {
  //void doesn't return any value in the local execution context.
  onClose: () => void;
}
