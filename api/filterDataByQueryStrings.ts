import { QueryParams } from '../types/queryParams';

export const getProductQueryBody = async (
  key: QueryParams,
  API_URL: string,
  resource: string
) => {
  const categoryID = key.queryKey[1].category.map(
    (id: number) => `category.id=${id}`
  );
  const categoryQueryString = categoryID.join('&');

  const priceId = key.queryKey[2].price;
  const priceQueryString = priceId.join('&');

  const priceLessThan20 = key.queryKey[2].price.map(
    (id: number) => `price.price_eq=${id}`
  );

  const price20To100 = key.queryKey[2].price.map(
    (id: number) => `price.price_eq=${id}`
  );
  const inputtedPriceValue = Number(priceId);

  const priceEqual200 = key.queryKey[2].price.map(
    (id: number) => `price.price_eq=${id}`
  );

  const priceEQ1000 = key.queryKey[2].price.map(
    (id: number) => `price.price_eq=${id}`
  );

  const orderId = key.queryKey[3].order;
  const sortId = key.queryKey[4].sortBy;
  const sortQueryString = `_sort=${sortId}:${orderId}`;

  if (inputtedPriceValue === 20) {
    const response = await fetch(
      `${API_URL}/${resource}?${sortQueryString}&${categoryQueryString}&${priceLessThan20}`
    );
    return response.json();
  } else if (inputtedPriceValue === 100) {
    const res = await fetch(
      `${API_URL}/${resource}?${sortQueryString}&${categoryQueryString}&${price20To100}`
    );
    return res.json();
  } else if (inputtedPriceValue === 200) {
    const resp = await fetch(
      `${API_URL}/${resource}?${sortQueryString}&${categoryQueryString}&${priceEqual200}`
    );
    return resp.json();
  } else if (inputtedPriceValue === 1000) {
    const resp = await fetch(
      `${API_URL}/${resource}?${sortQueryString}&${categoryQueryString}&${priceEQ1000}`
    );
    return resp.json();
  }
  if (categoryQueryString || priceQueryString || sortQueryString) {
    const response = await fetch(
      `${API_URL}/${resource}?${sortQueryString}&${categoryQueryString}&${priceQueryString}`
    );
    return response.json();
  }

  // This runs by default if no condition is specified or when the component mounts
  const response = await fetch(`${API_URL}/${resource}`);
  return response.json();
};
