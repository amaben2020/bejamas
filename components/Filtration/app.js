import React, { useState, useEffect } from 'react';
import Checkboxes from './Checkboxes/checkboxes';

const App = () => {
  const [products, setProducts] = useState([]);

  const fetchData = React.useCallback(() => {
    window
      .fetch('http://localhost:1337/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const category = products?.map((product) => product.category);
  //evaluation array
  const [selected, setSelected] = useState({
    category: [],
    price: [],
  });

  /**
   * This function will perform the filtration process based on the key value.
   *
   * @param {number[]} checkboxState - It will take the final state of checkboxes
   * @param {string} key - It will help us to determine the type of filtration
   */
  const handleFilters = (checkboxState, key) => {
    const logic = 'AND';
    //This is how we filter based on category, it holds the array value
    //checkboxState gives the index of the newFiltered state using indexOf
    const newFilters = { ...selected };
    // key is the array index from the checkbox state
    newFilters[key] = checkboxState;

    const hasCategory = newFilters.category.length > 0;
    const hasPrice = newFilters.price.length > 0;
    //advanced pattern to ensure strict criteria

    const filterCategory = (module) =>
      newFilters.category.includes('') ||
      newFilters.category.includes(module.category);

    const filterPrice = (module) =>
      newFilters.price.includes('') || newFilters.price.includes(module.price);

    //this filteredProducts simply extracts the movies based on the categories
    const filteredProducts = products.filter(
      logic === 'OR'
        ? (m) => !hasFilters || filterCategory(m) || filterPrice(m) // OR
        : (m) =>
            !hasFilters ||
            ((!hasPrice || filterPrice(m)) &&
              (!hasCategory || filterCategory(m))) // AND
    );

    setProducts(filteredProducts);
    setSelected(newFilters);
  };

  return (
    <div>
      {filteredProducts.map((product) => (
        <div key={product.id}>
          <div>Category: {product.category}</div>
          <hr />
          <div>Price: {product.price}</div>

          <hr />
        </div>
      ))}

      <div className="row">
        <div className="col">
          <h1>Filter by Category</h1>
          <Checkboxes
            list={category}
            handleFilters={(checkboxState) =>
              handleFilters(checkboxState, 'category')
            }
          />
        </div>

        <div className="col">
          <h1>Filter by Price</h1>
          <Checkboxes
            list={price}
            handleFilters={(checkboxState) =>
              handleFilters(checkboxState, 'price')
            }
          />
        </div>
      </div>
    </div>
  );
};

export default App;
