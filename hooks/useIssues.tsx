import {
  useInfiniteQuery,
  InfiniteData,
  QueryKey,
} from "@tanstack/react-query";
import { DEFAULT_BIG_PAGE_SIZE } from "@/data/fetch";
import { Issue, IssueQueryParams } from "@/types/issue";
import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";
import { fetchIssues } from "@/lib/api/issues";

export const useIssues = (
  initialItems: PaginatedCustomResponse<Issue>,
  query: IssueQueryParams = {},
) => {
  const queryFn = ({ pageParam }: { pageParam: PaginationQueryParams }) =>
    fetchIssues({ ...query, ...pageParam });

  return useInfiniteQuery<
    PaginatedCustomResponse<Issue>,
    Error,
    InfiniteData<PaginatedCustomResponse<Issue>>,
    QueryKey,
    PaginationQueryParams
  >({
    queryKey: ["contributions", query],
    queryFn,
    initialData: {
      pages: [initialItems],
      pageParams: [{ offset: 0, limit: DEFAULT_BIG_PAGE_SIZE }],
    },
    initialPageParam: { offset: 0, limit: DEFAULT_BIG_PAGE_SIZE },
    getNextPageParam: (lastPageResponse, _, lastPageParam) => {
      const { hasNextPage } = lastPageResponse;
      if (!hasNextPage) return null;
      return {
        ...lastPageParam,
        offset: (lastPageParam.offset ?? 0) + DEFAULT_BIG_PAGE_SIZE,
      };
    },
  });
};
