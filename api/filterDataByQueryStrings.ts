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
    (id: number) => `price.price_lte=${id}`
  );

  const price20To100 = key.queryKey[2].price.map(
    (id: number) => `price.price_gte=20&price.price_eq=${id}`
  );
  const inputtedPriceValue = Number(priceId);

  const price100To200 = key.queryKey[2].price.map(
    (id: number) => `price.price_gte=100&price.price_lt=${id}`
  );

  const priceGte200 = key.queryKey[2].price.map(
    (id: number) => `price.price_gte=200&price.price_lte=${id}`
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
      `${API_URL}/${resource}?${sortQueryString}&${categoryQueryString}&${price100To200}`
    );
    return resp.json();
  } else if (inputtedPriceValue === 1000) {
    const resp = await fetch(
      `${API_URL}/${resource}?${sortQueryString}&${categoryQueryString}&${priceGte200}`
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
