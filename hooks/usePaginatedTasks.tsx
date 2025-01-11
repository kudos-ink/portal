import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { DEFAULT_PAGE_SIZE } from "@/data/fetch";
import TasksApi from "@/api/core/tasks";
import { Task, TaskQueryParams } from "@/types/task";
import { PaginatedCustomResponse } from "@/types/pagination";

export const usePaginatedTasks = (
  query: TaskQueryParams = {},
  offset: number = 0,
  limit: number = DEFAULT_PAGE_SIZE,
) => {
  const fetchTasks = async ({
    queryKey,
  }: QueryFunctionContext<
    [string, TaskQueryParams, { offset: number; limit: number }]
  >) => {
    const [, query, pagination] = queryKey;
    return TasksApi.getTasks({
      ...query,
      ...pagination,
    }) as Promise<PaginatedCustomResponse<Task>>;
  };

  return useQuery<
    PaginatedCustomResponse<Task>,
    Error,
    PaginatedCustomResponse<Task>,
    [string, TaskQueryParams, { offset: number; limit: number }]
  >({
    queryKey: ["contributions", query, { offset, limit }],
    queryFn: fetchTasks,
    placeholderData: (previousData) => previousData,
  });
};
