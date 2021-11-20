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

export interface MyProductsArrayInterface extends Array<Product> {}

// interface ProductCardProps {
//   product: MyProductsArrayInterface;
// }
const Featured = ({ product }: SingleProduct) => {
  const featuredProduct = product.filter(
    (product: { featured: boolean }): any => product.featured
  );

  //const { addToCart } = useContext(CartContext);

  const { onAddToCart } = useCart();

  //CONVERT FEATURED IMAGE TO USE NEXT IMAGE !!!!!!!!!!!!
  // <Image src="/Group 3.1.png" alt="me" width="37" height="34" />;

  return (
    <div className={style.featured}>
      {featuredProduct?.map(
        (product: {
          name:
            | boolean
            | React.ReactChild
            | React.ReactFragment
            | React.ReactPortal
            | null
            | undefined;
          image: { formats: { large: { url: string | undefined } } };
        }) => (
          <>
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
                src={product.image && product.image.formats.large.url}
                className={style.featured__featuredImage}
                alt=""
              />

              <div className={style.featured__photoOfTheDay}>
                Photo of the day
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Featured;
