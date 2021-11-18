import { Product } from '../interface/products';

export type Props = {
  children: React.ReactNode;
};

export type CartInitialState = {
  cartItems: Product[];
  showCart: boolean;
};

export type CartContextType = {
  onAddToCart: (product: Product) => void;
  onCloseCart: () => void;
  cartState: object;
  onClearCart: () => void;
};
