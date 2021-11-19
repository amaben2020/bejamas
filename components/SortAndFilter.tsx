import React from 'react';
import styles from './../styles/product.module.scss';

interface ISortAndFilter {
  handleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setOrderValue: (value: string[]) => void;
}

const SortAndFilter = ({ handleSort, setOrderValue }: ISortAndFilter) => {
  return (
    <>
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
        <button
          className={styles.sortArrow}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const { value } = e.target as HTMLButtonElement;
            setOrderValue([value]);
          }}
          value="asc"
        >
          &#8593;
        </button>
        <button
          className={styles.sortArrow}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const { value } = e.target as HTMLButtonElement;
            setOrderValue([value]);
          }}
          value="desc"
        >
          &#8595;
        </button>
        <span className={styles.sortText}>Sort By</span>
        <select
          style={{
            marginLeft: '2vw',
            padding: '2vh',
            outline: 'none',
            border: 'none',
          }}
          onChange={handleSort}
        >
          <option value="name" className={styles.sortText2}>
            Alphabetically
          </option>
          <option value="price" className={styles.sortText2}>
            Price
          </option>
        </select>
      </div>
    </>
  );
};

export default SortAndFilter;
