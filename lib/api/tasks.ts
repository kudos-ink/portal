import TasksApi from "@/api/core/tasks";
import { DEFAULT_PAGINATED_RESPONSE } from "@/data/fetch";
import { NewTaskPayload, Task, TaskQueryParams } from "@/types/task";
import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";
import tags from "@/utils/tags";
import { safeFetch } from "@/utils/error";
import { coreApiClient } from "@/api/core/_client";

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

export async function fetchTaskById(id: number): Promise<Task | null> {
  try {
    return await coreApiClient.get<Task>(`/tasks/${id}`);
  } catch (error) {
    console.error(`Failed to fetch task with id ${id}:`, error);
    return null;
  }
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

export async function createTask(taskData: NewTaskPayload): Promise<Task> {
  return coreApiClient.post<Task, NewTaskPayload>("/tasks", taskData);
}

export type WishSortKey = 'new' | 'top';

export async function fetchWishes(
  sortBy: WishSortKey = 'new',
  pagination: PaginationQueryParams = { limit: 20, offset: 0 }
): Promise<PaginatedCustomResponse<Task>> {
  const query: TaskQueryParams = {
    type_: 'wish',
    // The 'sort_by' param will be added to the TaskQueryParams type next
    // @ts-ignore
    sort_by: sortBy === 'top' ? 'top' : undefined,
    certified: undefined,
    labels: [],
  };

  return safeFetch(
    () => TasksApi.getTasks({ ...query, ...pagination }),
    "fetchWishes",
    DEFAULT_PAGINATED_RESPONSE,
    { query, pagination }
  );
}

/**
 * Deletes a user's vote for a specific task using the API client.
 * @param taskId The ID of the task from which to remove the vote.
 * @returns An empty promise on success (as the API returns 204 No Content).
 */
export async function deleteVote(taskId: number): Promise<void> {
  const payload = { task_id: taskId };

  return coreApiClient.delete<void, { task_id: number }>("/tasks/vote", payload);
}