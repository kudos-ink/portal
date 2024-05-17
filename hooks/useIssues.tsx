import {
  useInfiniteQuery,
  InfiniteData,
  QueryKey,
} from "@tanstack/react-query";
import { DEFAULT_PAGE_SIZE } from "@/data/fetch";
import { getIssues, getIssuesByProject } from "@/lib/core/issues";
import { Issue, IssueWithProject, IssueQueryParams } from "@/types/issue";
import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";

export const useIssues = <T extends IssueWithProject | Issue>(
  initialItems: PaginatedCustomResponse<T>,
  query: IssueQueryParams = {},
  slug?: string,
) => {
  const fetchIssues = ({ pageParam }: { pageParam: PaginationQueryParams }) => {
    if (slug) {
      return getIssuesByProject(slug, { ...query, ...pageParam }) as Promise<
        PaginatedCustomResponse<T>
      >;
    } else {
      return getIssues({ ...query, ...pageParam }) as Promise<
        PaginatedCustomResponse<T>
      >;
    }
  };

  return useInfiniteQuery<
    PaginatedCustomResponse<T>,
    Error,
    InfiniteData<PaginatedCustomResponse<T>>,
    QueryKey,
    PaginationQueryParams
  >({
    queryKey: ["contributions", query],
    queryFn: fetchIssues,
    initialData: {
      pages: [initialItems],
      pageParams: [{ offset: 0, limit: DEFAULT_PAGE_SIZE }],
    },
    initialPageParam: { offset: 0, limit: DEFAULT_PAGE_SIZE },
    getNextPageParam: (lastPageResponse, _, lastPageParam) => {
      const { hasNextPage } = lastPageResponse;
      if (!hasNextPage) return null;
      return {
        ...lastPageParam,
        offset: lastPageParam.offset + DEFAULT_PAGE_SIZE,
      };
    },
  });
};
