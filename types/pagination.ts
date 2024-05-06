export type PaginationQueryParams = {
  offset?: number;
  limit?: number;
};

export type PaginatedCustomResponse<TData> = {
  totalCount?: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  data: TData[];
};
