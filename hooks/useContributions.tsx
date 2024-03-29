import {
  useInfiniteQuery,
  InfiniteData,
  QueryKey,
} from "@tanstack/react-query";
import { queryDatabase } from "@/lib/notion";
import { transformNotionDataToContributions } from "@/utils/notion";
import { PaginatedContributions } from "@/types/contribution";
import { KudosQueryParameters } from "@/lib/notion/types";
import { DEFAULT_PAGE_SIZE } from "@/data/fetch";
import { useFilters } from "@/contexts/filters";

type PageParamType = string | undefined;

export const useContributions = (
  initialItems: PaginatedContributions,
  queries: Partial<KudosQueryParameters> = {},
) => {
  const { filterOptions } = useFilters();
  return useInfiniteQuery<
    PaginatedContributions,
    Error,
    InfiniteData<PaginatedContributions>,
    QueryKey,
    PageParamType
  >({
    queryKey: ["contributions", queries, filterOptions.repositories],
    queryFn: async ({ pageParam: next_cursor }) => {
      const response = await queryDatabase({
        ...queries,
        start_cursor: next_cursor,
      });
      return {
        data: transformNotionDataToContributions(response),
        hasMore: response.has_more,
        nextCursor: response.next_cursor ?? undefined,
      };
    },
    initialData: { pages: [initialItems], pageParams: [undefined] },
    initialPageParam: undefined,
    getNextPageParam: (lastPageResponse) => {
      const { hasMore, nextCursor } = lastPageResponse;
      if (!hasMore || !nextCursor) return undefined;
      return nextCursor;
    },
  });
};
