import ReactPaginate from 'react-paginate';
import { svgLeft, svgRight } from './svg';
import styles from './../../styles/pagination.module.scss';

interface IProps {
  pageCount: number;
  onPageChange: (a: any) => void;
  pageRangeDisplayed: number;
  currentCount: number;
}

const Pagination = ({ pageCount, onPageChange, currentCount }: IProps) => {
  return (
    <div className={styles.myPage}>
      <div className={styles.paginationWrapper}>
        <span className={styles.paginationText}></span>
        <ReactPaginate
          previousLabel={currentCount < 1 ? null : svgLeft}
          nextLabel={currentCount >= 3 ? null : svgRight}
          pageCount={pageCount}
          pageRangeDisplayed={6}
          marginPagesDisplayed={4}
          onPageChange={onPageChange}
          containerClassName={styles.paginationBtns}
          previousLinkClassName={styles.previousBtns}
          nextLinkClassName={styles.nextBtns}
          disabledClassName={styles.paginationDisabled}
          activeClassName={styles.paginationActive}
        />
      </div>
    </div>
  );
};
export default Pagination;
