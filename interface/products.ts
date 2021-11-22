type ObjectImageProps = {
  src: string;
  url: string;
  width?: number | string;
  height?: number | string;
  layout?: string;
  placeholder?: string;
  name?: string;
  size: number;
  size2: number;
};

export interface IProduct {
  recommendation: string;
  details: string;
  filter(arg0: (product: { featured: boolean }) => boolean): IProduct[];
  id: number;
  name: string;
  price: number;
  image: ObjectImageProps;
  description: string;
  featured: boolean;
  value: number;
  bestseller: boolean;
  categoryName: string;
}

export interface IRecommendation {
  details?: string;
  size2: string;
  image:
    | { formats: { thumbnail: { url: string } } }
    | { formats: { url: string } };
  size: string[];
}

export interface IRecommendationList {
  recommendations: IRecommendation;
}

export interface SingleProduct {
  product: Product;
}
export interface Product extends IProduct {
  productsData: IProduct[];
}

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

export interface ProductAndCategory extends Product {
  categoryData: ICategory[];
}

export interface ProductCategoryAndPrice extends ProductAndCategory {
  pricesData: IPrice[];
}
