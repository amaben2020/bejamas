import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
  ICategory,
  IPrice,
  IProduct,
  Product,
  ProductCategoryAndPrice,
} from '../interface/products';
import useSelectCategory from '../hooks/useSelectCategory';
import useSelectPrices from '../hooks/useSelectPrice';
import { getProductQueryBody } from '../api/filterDataByQueryStrings';
import { toast } from 'react-toastify';
import useCart from '../hooks/useCart';
import { Key } from '../types/queryParams';
import AppPagination from '../components/Pagination/PaginationButton';
import { categoryCheckbox } from '../utils/categoryCheckbox';
import { priceCheckbox } from '../utils/priceChekbox';
import Loading from '../components/Loading';
import Featured from '../components/Featured';
import DescriptionLayout from '../components/Layout/DescriptionLayout';
import Description from '../components/Description/Description';
import styles from './../styles/product.module.scss';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import useSort from '../hooks/useSort';
import ProductCard from '../components/ProductCard';
import SortAndFilter from '../components/SortAndFilter';
import ModalDisplay from '../components/ModalDisplay';
import { fetchAPI } from '../lib/api';
import { API_URL } from '../data/endpoint';
import { resource } from '../components/data/endpoint';

// using function composition technique to reduce index.js code length
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

  const { onCloseCart, onAddToCart, onClearCart } = useCart();

  /** Doing Pagination on the client side due to SEO, server side pagination is super easy to implement as well. */
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 6;
  //non-null assertion operator on line 75, 79
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
    if (!product) {
      throw new Error('Product is undefined');
    }
    return onAddToCart(product);
  };

  const [isModalOpen, setStatus] = useState(false);
  const productDetails = Object.values(products!).filter(
    (prod: IProduct) => prod.featured
  );

  const recommendations = Object.values(products!).filter(
    (product: IProduct) => product.recommendation
  );

  return (
    <div>
      <Featured product={productsData} />
      <DescriptionLayout>
        <Description
          featuredText={productDetails.map((d: IProduct) => d.details)}
          featuredCategory={productDetails.map((d: IProduct) => d.categoryName)}
          featuredTitle={productDetails.map((d: IProduct) => d.name)}
          recommendations={recommendations}
        />
      </DescriptionLayout>
      {status === 'loading' && (
        <p>
          <Loading />
        </p>
      )}
      {status === 'error' && <p>Something went wrong</p>}

      <div className={styles.photography__section}>
        <SortAndFilter handleSort={handleSort} setOrderValue={setOrderValue} />
        <div className={styles.photography__section__modal}>
          <div onClick={() => setStatus(true)}>
            {' '}
            <Image
              src="/modalIcon.svg"
              alt="modal-icon"
              height="30"
              width="35"
            />{' '}
          </div>

          <div>
            {isModalOpen && (
              <ModalDisplay
                categoryData={categoryData}
                pricesData={pricesData}
                onAddToCart={onAdd}
                onClearCart={onClearCart}
                onCloseCart={onCloseCart}
                setStatus={setStatus}
                priceIds={priceIds}
                ids={ids}
              />
            )}
          </div>
        </div>
      </div>

      <Row className={styles.productSection__wrapper}>
        <Col lg={3} className={styles.checkboxArea}>
          <h2 className={styles.myCheckBoxTitle}>Category</h2>
          {categoryData.length > 0 &&
            categoryData.map((category) =>
              categoryCheckbox(category, ids, selectCategory)
            )}
          <hr />

          <h2 className={styles.myCheckBoxTitle}>Price range</h2>
          {pricesData.length > 0 &&
            pricesData.map((prices) =>
              priceCheckbox(prices, priceIds, selectPrices)
            )}
        </Col>

        <Col lg={9} className={styles.productSection__wrapper__productArea}>
          {status === 'success' &&
            paginatedProductData.length > 0 &&
            paginatedProductData?.map((product: IProduct) => (
              <div key={product.id}>
                <ProductCard product={product} onAdd={onAdd} />
              </div>
            ))}

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
  const productsData = await fetchAPI('/products');
  const categoryData = await fetchAPI('/categories');
  const pricesData = await fetchAPI('/prices');
  return {
    props: {
      productsData,
      categoryData,
      pricesData,
    },
  };
};
