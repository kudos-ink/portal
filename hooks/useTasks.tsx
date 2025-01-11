import {
  useInfiniteQuery,
  InfiniteData,
  QueryKey,
} from "@tanstack/react-query";
import { DEFAULT_BIG_PAGE_SIZE } from "@/data/fetch";
import { Task, TaskQueryParams } from "@/types/task";
import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";
import { fetchTasks } from "@/lib/api/tasks";

export const useTasks = (
  initialItems: PaginatedCustomResponse<Task>,
  query: TaskQueryParams = {},
) => {
  const queryFn = ({ pageParam }: { pageParam: PaginationQueryParams }) =>
    fetchTasks({ ...query, ...pageParam });

  return useInfiniteQuery<
    PaginatedCustomResponse<Task>,
    Error,
    InfiniteData<PaginatedCustomResponse<Task>>,
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
