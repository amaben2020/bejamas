import { useState } from 'react';
import { Product } from '../interface/products';

//Had to think out of the box for this solution
const usePagination = () => {
  // PAGINATION LOGIC AND SORT LOGIC
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 1;
  const pagesVisited = pageNumber * productsPerPage;

  // const filteredProductData = Object.values(products).slice(
  //   pagesVisited,
  //   pagesVisited + productsPerPage
  // );

  const filteredProductData = (data: any) => {
    // setProductsData(data);
    return Object.values(data).slice(
      pagesVisited,
      pagesVisited + productsPerPage
    );
  };

  const pageCount = () => {
    const result = Math.ceil(productsData.length / productsPerPage);
    console.log('result of pageCount', result);
    return result;
  };

  // const pageCount = Math.ceil(products.length / productsPerPage);
  const changePage = ({ selected }: any) => {
    console.log('selected change page', selected);
    return setPageNumber(selected);
  };

  console.log(typeof changePage);

  return {
    filteredProductData,
    pageCount,
    changePage,
    pagesVisited,
    productsPerPage,
    pageNumber,
    dataGrab,
  };
};

export default usePagination;
