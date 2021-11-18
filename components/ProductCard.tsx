import React from 'react';
import { ProductCardElement } from '../interface/product';

const ProductCard = ({ product, onAdd }: ProductCardElement) => {
  const { name, price, image, id, value, categoryName } = product;

  return (
    <div>
      <div key={id}>
        <p>{name}</p>
        <p>${value}</p>
        <p>{categoryName}</p>

        <button onClick={() => onAdd(product)}>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
