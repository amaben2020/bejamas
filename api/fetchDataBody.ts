export const fetchDataBody = async () => {
  const products = await fetch(`${process.env.REACT_APP_API_URL}/products`);
  const productsData = await products.json();

  const category = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
  const categoryData = await category.json();

  const prices = await fetch(`${process.env.REACT_APP_API_URL}/prices`);
  const pricesData = await prices.json();
};
