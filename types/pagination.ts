export type PaginationQueryParams = {
  offset: number;
  limit: number;
};

export type PaginatedCustomResponseDto<TData> = {
  total_count?: number;
  has_next_page: boolean;
  has_previous_page: boolean;
  data: TData[];
};

export type PaginatedCustomResponse<TData> = {
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  data: TData[];
};
