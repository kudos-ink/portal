import {
  useInfiniteQuery,
  InfiniteData,
  QueryKey,
} from "@tanstack/react-query";
import { DEFAULT_BIG_PAGE_SIZE } from "@/data/fetch";
import IssuesApi from "@/api/core/issues";
import { Issue, IssueQueryParams } from "@/types/issue";
import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";

export const useIssues = (
  initialItems: PaginatedCustomResponse<Issue>,
  query: IssueQueryParams = {},
) => {
  const fetchIssues = ({ pageParam }: { pageParam: PaginationQueryParams }) =>
    IssuesApi.getIssues({ ...query, ...pageParam }) as Promise<
      PaginatedCustomResponse<Issue>
    >;

  return useInfiniteQuery<
    PaginatedCustomResponse<Issue>,
    Error,
    InfiniteData<PaginatedCustomResponse<Issue>>,
    QueryKey,
    PaginationQueryParams
  >({
    queryKey: ["contributions", query],
    queryFn: fetchIssues,
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
        offset: lastPageParam.offset + DEFAULT_BIG_PAGE_SIZE,
      };
    },
  });
};
