import React from 'react';
import { ICategory } from '../interface/products';

interface CategoryInputProps {
  category: ICategory;
  selectCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ids: number[];
}

const CategoryInput = ({
  category,
  selectCategory,
  ids,
}: CategoryInputProps) => {
  return (
    <div>
      {' '}
      <div key={category.id}>
        <span>{category.id}</span>
        <span>{category.name}</span>
        <span>
          <input
            type="checkbox"
            value={category.id}
            //onChange={selectCategory}
            onChange={(event) => selectCategory(event)}
            checked={ids.includes(category.id) ? true : false}
          />
        </span>
      </div>
    </div>
  );
};

export default CategoryInput;
