import useCart from '../hooks/useCart';
import { IProduct, SingleProduct } from '../interface/products';
import style from './../styles/featured.module.scss';
import AddToCartButton from './Button/AddToCartButton';
import Image from 'next/image';

const Featured = ({ product }: SingleProduct) => {
  const featuredProduct = product.filter(
    (p: { featured: boolean }) => p.featured
  );

  const { onAddToCart } = useCart();

  return (
    <div className={style.featured}>
      {featuredProduct?.map((prod: IProduct) => (
        <div key={prod.id}>
          <div className={style.featured__textBtn}>
            <h1 className={style.featured__headerText}>{prod.name}</h1>
            <div className={style.featured__hide}>
              <AddToCartButton
                onClick={() => onAddToCart(prod)}
                title={'Add To Cart'}
              />
            </div>
          </div>

          <div className={style.featured__wrapper}>
            <Image
              height="550"
              width="1700"
              //@ts-ignore
              src={prod.image && prod.image.formats.large.url}
              className={style.featured__featuredImage}
              alt="featured image"
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
