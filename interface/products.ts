export interface IProduct {
  filter(arg0: (product: { featured: boolean }) => any);
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  featured: boolean;
  value: number;
  bestseller: boolean;
  categoryName: string;
}

export interface SingleProduct {
  product: Product;
}
export interface Product extends IProduct {
  productsData: IProduct[];
}

// export interface IProduct {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   value: number;
//   description: string;
//   categoryName: string;
// }

export interface ICategory {
  map(arg0: (category: ICategory) => JSX.Element): import('react').ReactNode;
  name: string;
  id: number;
}

export interface IPrice {
  name: number;
  id: number;
  price: number;
  label: string;
}

// export interface Product extends IProduct {
//   productsData: IProduct[];
//   //products: IProduct[];
// }

export interface ProductAndCategory extends Product {
  categoryData: ICategory[];
}

export interface ProductCategoryAndPrice extends ProductAndCategory {
  pricesData: IPrice[];
}
