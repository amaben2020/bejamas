import CategoryInput from '../components/CategoryInput';
import { ICategory } from '../interface/products';

/** Code is self documenting */

/**
 * Categories in the database using one-to-many relationship
 * @param {string[]} category
 * @param {number[]} ids
 * @returns {Categories}
 */
export function categoryCheckbox(
  category: ICategory,
  ids: number[],
  selectCategory: (event: React.ChangeEvent<HTMLInputElement>) => void
) {
  return (
    <div key={category.id}>
      <CategoryInput
        category={category}
        selectCategory={selectCategory}
        ids={ids}
      />
    </div>
  );
}
