import { IProduct } from './products';
export interface ProductCardElement {
  product: IProduct;
  onAdd: (product: IProduct) => void;
}
