import React, { useContext } from 'react';
import useCart from '../hooks/useCart';
import { IProduct, Product, SingleProduct } from '../interface/products';
import style from './../styles/featured.module.scss';
//import CartContext from './../context/CartContext';
import AddToCartButton from './Button/AddToCartButton';
import Image from 'next/image';
// interface Product {
//   _id: string;
//   details: null;
//   name: string;
//   category: string;
//   price: number;
//   featured: boolean;
//   bestseller: boolean;
//   image: object;
//   currency: string;
// }

// : {
//           name:
//             | boolean
//             | React.ReactChild
//             | React.ReactFragment
//             | React.ReactPortal
//             | null
//             | undefined;
//           image: {
//             formats: { large: { url: string | undefined | StaticImport } };
//           };
//         }

export interface MyProductsArrayInterface extends Array<Product> {}

// interface ProductCardProps {
//   product: MyProductsArrayInterface;
// }
const Featured = ({ product }: SingleProduct) => {
  const featuredProduct = product.filter(
    (product: { featured: boolean }) => product.featured
  );

  //const { addToCart } = useContext(CartContext);

  const { onAddToCart } = useCart();

  return (
    <div className={style.featured}>
      {featuredProduct?.map((product: IProduct) => (
        <div key={product.id}>
          <div className={style.featured__textBtn}>
            <h1 className={style.featured__headerText}>{product.name}</h1>
            <div className={style.featured__hide}>
              <AddToCartButton
                onClick={() => onAddToCart(product)}
                title={'Add To Cart'}
              />
            </div>
          </div>

          <div className={style.featured__wrapper}>
            <Image
              height="550"
              width="1700"
              //@ts-ignore
              src={product.image && product.image.formats.large.url}
              className={style.featured__featuredImage}
              alt="featured image"
              // onError={(e) => {
              //   src='https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60';
              // }}
            />

            <div className={style.featured__photoOfTheDay}>
              Photo of the day
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Featured;
