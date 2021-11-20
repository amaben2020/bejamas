export { useEffect, useState } from 'react';
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
