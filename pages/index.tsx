import { useEffect, useState } from 'react';
import { QueryFunctionContext, useQuery, useQueryClient } from 'react-query';
import SortInput from '../components/SortInput';
import {
  ICategory,
  IPrice,
  IProduct,
  Product,
  ProductCategoryAndPrice,
} from '../interface/products';
import styles from '../styles/Home.module.css';
import useSelectCategory from '../hooks/useSelectCategory';
import React from 'react';
import useSelectPrices from '../hooks/useSelectPrice';
import { getProductQueryBody } from '../api/filterDataByQueryStrings';
import { toast } from 'react-toastify';
import useCart from '../hooks/useCart';
import { CartContext } from '../context/CartContext';
import { Key } from '../types/queryParams';
import { fetchDataBody } from '../api/fetchDataBody';
import CategoryInput from '../components/CategoryInput';
import PriceInput from '../components/PriceInput';
import usePagination from '../hooks/usePagination';
import AppPagination from '../components/pagination/Pagination';
import { categoryCheckbox } from '../utils/categoryCheckbox';
import { priceCheckbox } from '../utils/priceChekbox';
import ProductCart from '../components/ProductCard';
import Loading from '../components/Loading';

const API_URL = 'http://localhost:1337';
const resource = 'products';

// using function composition technique to reduce file size
const getProducts = async (key: Key): Promise<Product[]> => {
  return getProductQueryBody(key, API_URL, resource);
};

const Home = ({
  productsData,
  categoryData,
  pricesData,
}: ProductCategoryAndPrice) => {
  const { selectCategory, ids } = useSelectCategory();

  const { selectPrices, priceIds } = useSelectPrices();

  const sortValues = ['price'];
  const [sortValue, setSortValue] = useState(sortValues);

  const orderValues = ['asc'];
  const [orderValue, setOrderValue] = useState(orderValues);

  const { data: products, status } = useQuery(
    [
      'products',
      { category: ids },
      { price: priceIds },
      { order: orderValue },
      { sortBy: sortValue },
    ],
    //@ts-ignore
    getProducts,
    {
      initialData: productsData,
    }
  );

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue([e.target.value]);
  };

  useEffect(() => {
    toast.success(`Welcome to Bejamas`);
  }, []);

  const [myProducts, setMyProducts] = useState(products);

  const { onCloseCart, onAddToCart, cartState, onClearCart } = useCart();

  // const {
  //   filteredProductData,
  //   pageCount,
  //   changePage,
  //   pagesVisited,
  //   productsPerPage,
  //   pageNumber,
  // } = usePagination();

  // console.log(filteredProductData(myProducts));

  /** Doing this on the client side due to SEO, server side pagination is very easy to implement as well. */

  const [pageNumber, setPageNumber] = React.useState(0);
  const productsPerPage = 2;
  //non-null assertion operator on line 93, 95
  const pagesVisited = pageNumber * productsPerPage;
  const paginatedProductData = Object.values(products!).slice(
    pagesVisited,
    pagesVisited + productsPerPage
  );
  const pageCount = Math.ceil(products!.length / productsPerPage);

  const changePage = (selectedItem: { selected: number }): void => {
    const { selected } = selectedItem;
    return setPageNumber(selected);
  };

  const onAdd = (product: IProduct): void => {
    return onAddToCart(product);
  };

  return (
    <div className={styles.container}>
      {status === 'loading' && (
        <p>
          <Loading />
        </p>
      )}
      {status === 'error' && <p>Something went wrong</p>}
      {status === 'success' &&
        paginatedProductData.length > 0 &&
        paginatedProductData?.map((product: IProduct) => (
          <div key={product.id}>
            <ProductCart
              // categoryData={categoryData}
              product={product}
              onAdd={onAdd}
            />
          </div>
        ))}

      {categoryData.length > 0 &&
        categoryData.map((category) =>
          categoryCheckbox(category, ids, selectCategory)
        )}

      {pricesData.length > 0 &&
        pricesData.map((prices) =>
          priceCheckbox(prices, priceIds, selectPrices)
        )}

      {/* <SortInput sortValues={sortValues} handleSort={handleSort} /> */}

      {/* perfect */}
      <select onChange={handleSort}>
        <option value="name">Alphabetically</option>
        <option value="price">Price</option>
      </select>

      <div>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const { value } = e.target as HTMLButtonElement;
            setOrderValue([value]);
          }}
          value="asc"
        >
          &#8593;
        </button>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const { value } = e.target as HTMLButtonElement;
            setOrderValue([value]);
          }}
          value="desc"
        >
          &#8595;
        </button>

        <button
          onClick={() =>
            onAddToCart({
              id: '1',
              name: 'test',
              price: '1',
              image: 'test',
            })
          }
        >
          Add to cart
        </button>

        <AppPagination
          pageCount={pageCount}
          onPageChange={changePage}
          pageRangeDisplayed={6}
          currentCount={pageNumber}
        />
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps = async (): Promise<{
  props: {
    productsData: Product[];
    categoryData: ICategory[];
    pricesData: IPrice[];
  };
}> => {
  const products = await fetch(`${process.env.REACT_APP_API_URL}/products`);
  const productsData = await products.json();

  const category = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
  const categoryData = await category.json();

  const prices = await fetch(`${process.env.REACT_APP_API_URL}/prices`);
  const pricesData = await prices.json();

  return {
    props: {
      productsData,
      categoryData,
      pricesData,
    },
  };
};
