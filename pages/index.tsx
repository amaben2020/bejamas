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
import Loading from '../components/loading/Loading';
import Featured from '../components/featured/Featured';
import DescriptionLayout from '../components/Layout/DescriptionLayout';
import Description from '../components/Description/Description';
import styles from './../styles/product.module.scss';
import { Col, Row } from 'react-bootstrap';
import useSort from '../hooks/useSort';
import ProductCard from '../components/card/ProductCard';
import SortAndFilter from '../components/sortAndFilter/SortAndFilter';
import { fetchAPI } from '../lib/api';
import { API_URL } from '../data/endpoint';
import { resource } from '../components/data/endpoint';
import ModalImage from '../components/Modal/ModalImage';
import CustomModal from '../components/Modal/CustomModal';
import AddToCartButton from '../components/Button/AddToCartButton';
import style from './../styles/modal.module.scss';

// using function composition technique to reduce code length
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

  const { onAddToCart, onClearCart } = useCart();

  /** Implementing Pagination on the client side due to SEO, server side pagination is super easy to implement as well. */
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 6;
  //non-null assertion operator to always get the value of products
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

  //This function is responsible for dispatching products to the cartState
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
      {status === 'loading' && <Loading />}
      {status === 'error' && <p>Something went wrong, refresh the page.</p>}

      <div className={styles.photography__section}>
        <SortAndFilter handleSort={handleSort} setOrderValue={setOrderValue} />
        <div className={styles.photography__section__modal}>
          <div onClick={() => setStatus(true)}>
            <ModalImage />
          </div>

          <div>
            {isModalOpen && (
              //This has to be done on page level
              <CustomModal closeModal={() => setStatus(false)}>
                <p className={style.modalText}>Filter</p>
                {categoryData.length > 0 &&
                  categoryData.map((category) =>
                    categoryCheckbox(category, ids, selectCategory)
                  )}
                <hr />
                <p className={style.modalText}>Price range</p>
                {pricesData.length > 0 &&
                  pricesData.map((prices) =>
                    priceCheckbox(prices, priceIds, selectPrices)
                  )}
                <div className={style.modalButtonArea}>
                  {' '}
                  <AddToCartButton
                    inverted="inverted"
                    title="Clear"
                    onClick={() => onClearCart()}
                  />
                  <AddToCartButton
                    title="Save"
                    onClick={() => setStatus(false)}
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
