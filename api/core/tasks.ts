import { DEFAULT_QUERY_FILTERS, DEFAULT_PAGINATION } from "@/data/fetch";
import { TaskQueryParams, TaskDto, Task } from "@/types/task";
import {
  PaginationQueryParams,
  PaginatedCustomResponse,
  PaginatedCustomResponseDto,
} from "@/types/pagination";
import { mergeWithDefaultFilters } from "@/utils/url";
import { fetchFromApi } from "./_client";
import { dtoToTask, taskQueryParamsToDto } from "./_transformers";
import { getAllLanguages } from "./languages";

const TASKS_PATH = "/issues";

export async function getTasks(
  query: TaskQueryParams & PaginationQueryParams = DEFAULT_PAGINATION,
  tag?: string,
): Promise<PaginatedCustomResponse<Task>> {
  const mergedQuery = mergeWithDefaultFilters(query, {
    ...DEFAULT_PAGINATION,
    ...DEFAULT_QUERY_FILTERS,
  });

  const allLanguages = mergedQuery.technologies?.length
    ? await getAllLanguages({ labels: mergedQuery.labels })
    : [];
  const queryDto = taskQueryParamsToDto(mergedQuery, allLanguages);

  const res = await fetchFromApi<PaginatedCustomResponseDto<TaskDto>>(
    TASKS_PATH,
    queryDto,
    tag,
  );

  return {
    totalCount: res.total_count ?? 0,
    hasNextPage: res.has_next_page,
    hasPreviousPage: res.has_previous_page,
    data: res.data.map(dtoToTask),
  };
}

export default { getTasks };
