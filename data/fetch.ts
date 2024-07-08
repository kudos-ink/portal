import { PaginatedCustomResponse } from "@/types/pagination";

export const DEFAULT_PAGE_SIZE = 25;
export const DEFAULT_BIG_PAGE_SIZE = 100;

export const DEFAULT_PAGINATED_RESPONSE: PaginatedCustomResponse<never> = {
  data: [],
  totalCount: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

export const DEFAULT_QUERY = {
  offset: 0,
  limit: DEFAULT_BIG_PAGE_SIZE,
};

export const UNASSIGNED_CONTRIBUTION_FILTER = {
  property: "Assignee",
  url: {
    is_empty: true as true,
  },
};
