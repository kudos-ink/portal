import { PaginatedCustomResponse } from "@/types/pagination";
import { TRACKED_LABELS } from "./filters";

export const DEFAULT_PAGE_SIZE = 12;
export const DEFAULT_HOMEPAGE_PAGE_SIZE = 25;
export const DEFAULT_BIG_PAGE_SIZE = 100;

export const DEFAULT_PAGINATED_RESPONSE: PaginatedCustomResponse<never> = {
  data: [],
  totalCount: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

export const DEFAULT_PAGINATION = {
  offset: 0,
  limit: DEFAULT_PAGE_SIZE,
};

export const UNASSIGNED_CONTRIBUTION_FILTER = {
  property: "Assignee",
  url: {
    is_empty: true as true,
  },
};

export const DEFAULT_QUERY_FILTERS = {
  open: true,
  certified: true,
  labels: TRACKED_LABELS,
};

export const DEFAULT_PROJECT_OPTIONS = {
  types: [],
  purposes: [],
  stack_levels: [],
  technologies: [],
};

export const DEFAULT_ALL_LANGUAGES = [
  "javascript",
  "haskell",
  "c",
  "go",
  "markdown",
  "rust",
  "c#",
  "python",
  "css",
  "typescript",
  "java",
  "swift",
  "kotlin",
  "vue",
  "solidity",
  "c++",
  "tex",
];
