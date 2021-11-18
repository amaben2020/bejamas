import { ICategory, IProduct } from './products';
export interface ProductCardElement {
  product: IProduct;
  onAdd: (product: IProduct) => any;
  // categoryData: ICategory[];
}
