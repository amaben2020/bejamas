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
//import styles from '../styles/Home.module.css';
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
import AppPagination from '../components/Pagination/PaginationButton';
import { categoryCheckbox } from '../utils/categoryCheckbox';
import { priceCheckbox } from '../utils/priceChekbox';
import ProductCart from '../components/ProductCard';
import Loading from '../components/Loading';
import Featured from '../components/Featured';
import DescriptionLayout from '../components/Layout/DescriptionLayout';
import Description from '../components/Description/Description';
import styles from './../styles/product.module.scss';
import CustomModal from '../components/Modal/CustomModal';
import style from './../styles/modal.module.scss';
import AddToCartButton from '../components/Button/AddToCartButton';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import useSort from '../hooks/useSort';
import ProductCard from '../components/ProductCard';
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
  const { sortValue, handleSort, setOrderValue, orderValue } = useSort();

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

  useEffect(() => {
    toast.success(`Welcome to Bejamas`);
  }, []);

  const { onCloseCart, onAddToCart, cartState, onClearCart } = useCart();

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

  const [modalStatus, setStatus] = useState(false);

  const [o, setOrderBy] = useState('asc');

  return (
    <div>
      <Featured product={products} />
      {/* <DescriptionLayout>
        <Description
          text={productDetails.map((d: any) => d.details)}
          category={productDetails.map((d: any) => d.category)}
          title={productDetails.map((d: any) => d.name)}
          recommendations={recommendations}
        />
      </DescriptionLayout> */}
      {status === 'loading' && (
        <p>
          <Loading />
        </p>
      )}
      {status === 'error' && <p>Something went wrong</p>}
      {/* {status === 'success' &&
        paginatedProductData.length > 0 &&
        paginatedProductData?.map((product: IProduct) => (
          <div key={product.id}>
            <ProductCart product={product} onAdd={onAdd} />
          </div>
        ))} */}

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

        <AppPagination
          pageCount={pageCount}
          onPageChange={changePage}
          pageRangeDisplayed={6}
          currentCount={pageNumber}
        />
      </div>
      <div className={styles.photography__section}>
        <div>
          <p className={styles.photography__section__headingPrimary}>
            Photography /{' '}
            <span className={styles.photography__section__headingSecondary}>
              {' '}
              Premium Photos{' '}
            </span>
          </p>
        </div>
        <div className={styles.photography__section__sort}>
          {' '}
          <span onClick={() => setOrderBy('asc')} className={styles.sortArrow}>
            &#8593;
          </span>
          <span onClick={() => setOrderBy('desc')} className={styles.sortArrow}>
            &#8595;
          </span>
          <span className={styles.sortText}>Sort By</span>
          <label className={styles.sortText2} htmlFor="price">
            Price
          </label>
          <select>
            <option> </option>
            <option value="low"> </option>
            <option value="high"> </option>
          </select>
        </div>
        <div className={styles.photography__section__modal}>
          <div onClick={() => setStatus(true)}>
            {' '}
            <Image src="/modalIcon.svg" height="30" width="35" />{' '}
          </div>

          <div>
            {modalStatus && (
              <CustomModal closeModal={() => setStatus(false)}>
                <p className={style.modalText}>Filter</p>
                {/* <Checkboxes list={category} handleFilters={undefined} /> */}
                <hr />
                <p className={style.modalText}>Price range</p>
                {/* <Checkboxes list={price} handleFilters={undefined} /> */}
                <div className={style.modalButtonArea}>
                  {' '}
                  <AddToCartButton
                    inverted="inverted"
                    title="Clear"
                    onClick={() => console.log('yeah')}
                  />
                  <AddToCartButton
                    title="Save"
                    onClick={() => console.log('yeah')}
                  />
                </div>
              </CustomModal>
            )}
          </div>
        </div>
      </div>

      <Row className={styles.productSection__wrapper}>
        <Col lg={3} className={styles.checkboxArea}>
          <h2 className={styles.myCheckBoxTitle}>Category</h2>
          {/* <Checkboxes list={category} handleFilters={undefined} /> */}

          <hr />

          <h2 className={styles.myCheckBoxTitle}>Price range</h2>
          {/* <Checkboxes list={price} handleFilters={undefined} /> */}
        </Col>

        <Col lg={9} className={styles.productSection__wrapper__productArea}>
          {/* {filteredProductData?.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))} */}

          {/* {status === 'success' &&
            paginatedProductData.length > 0 &&
            paginatedProductData?.map((product: IProduct) => (
              <div key={product.id}>
                <ProductCard product={product} onAdd={onAdd} />
              </div>
            ))} */}

          <AppPagination
            pageCount={pageCount}
            onPageChange={changePage}
            pageRangeDisplayed={6}
            currentCount={pageNumber}
          />
        </Col>
      </Row>
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
