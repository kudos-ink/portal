import TasksApi from "@/api/core/tasks";
import { DEFAULT_PAGINATED_RESPONSE } from "@/data/fetch";
import { Task, TaskQueryParams } from "@/types/task";
import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";
import tags from "@/utils/tags";
import { safeFetch } from "@/utils/error";

export async function fetchTasks(
  query: TaskQueryParams & PaginationQueryParams,
): Promise<PaginatedCustomResponse<Task>> {
  return safeFetch(
    () => TasksApi.getTasks(query, tags.latestTasks),
    "fetchTasks",
    DEFAULT_PAGINATED_RESPONSE,
    { query }
  );
}

export async function fetchProjectTasks(
  slug: string,
  query?: TaskQueryParams,
): Promise<PaginatedCustomResponse<Task>> {
  return safeFetch(
    () => TasksApi.getTasks({
      projects: [slug],
      ...query,
    }),
    "fetchProjectTasks",
    DEFAULT_PAGINATED_RESPONSE,
    { slug, query }
  );
}
