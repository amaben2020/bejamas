export type QueryParams = {
  queryKey: [
    string,
    { category: number[] },
    { price: number[] },
    { order: string[] },
    { sortBy: string[] }
  ];
};

export type Key = {
  queryKey: QueryParams['queryKey'];
  pageParam: undefined;
  meta: undefined;
};
