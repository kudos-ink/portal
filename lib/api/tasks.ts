import TasksApi from "@/api/core/tasks";
import { DEFAULT_PAGINATED_RESPONSE } from "@/data/fetch";
import { Task, TaskQueryParams } from "@/types/task";
import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";
import tags from "@/utils/tags";

export async function fetchTasks(
  query: TaskQueryParams & PaginationQueryParams,
): Promise<PaginatedCustomResponse<Task>> {
  return TasksApi.getTasks(query, tags.latestTasks).catch((error) => {
    console.error("Error fetching TASKS:", error);
    return DEFAULT_PAGINATED_RESPONSE;
  });
}

export async function fetchProjectTasks(
  slug: string,
  query?: TaskQueryParams,
): Promise<PaginatedCustomResponse<Task>> {
  return TasksApi.getTasks({
    projects: [slug],
    ...query,
  }).catch((error) => {
    console.error(`Error fetching TASKS for PROJECT "${slug}":`, error);
    return DEFAULT_PAGINATED_RESPONSE;
  });
}
