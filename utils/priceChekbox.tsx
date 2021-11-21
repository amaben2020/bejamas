import PriceInput from '../components/sortAndFilter/PriceInput';
import { IPrice } from '../interface/products';

/** Code is self documenting */

/**
 * Prices in the database using one-to-one relationship
 * @param {IPrice} prices
 * @param {number[]} priceIds
 * @returns {Categories}
 */
export function priceCheckbox(
  prices: IPrice,
  priceIds: number[],
  selectPrices: (event: React.ChangeEvent<HTMLInputElement>) => void
) {
  return (
    <div key={prices.id}>
      <PriceInput
        prices={prices}
        selectPrices={selectPrices}
        priceIds={priceIds}
      />
    </div>
  );
}
