import TasksApi from "@/api/core/tasks";
import { DEFAULT_PAGINATED_RESPONSE } from "@/data/fetch";
import { NewTaskPayload, Task, TaskQueryParams, UpdateTaskPayload } from "@/types/task";
import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";
import tags from "@/utils/tags";
import { safeFetch } from "@/utils/error";
import { coreApiClient, fetchFromApiGitHubAuthPost, fetchFromApiGitHubAuthDelete, fetchFromApiGitHubAuthPut } from "@/api/core/_client";

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

export async function createTask(taskData: NewTaskPayload, token: string): Promise<Task> {
  return fetchFromApiGitHubAuthPost<Task, NewTaskPayload>("/tasks", taskData, token);
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
 * Casts a vote for a specific task.
 * @param taskId The ID of the task to vote on.
 * @param voteType 'up' or 'down'.
 * @param token The user's authentication token.
 */
export async function castVote(taskId: number, voteType: 'up' | 'down', token: string): Promise<void> {
  const endpoint = voteType === 'up' ? '/tasks/upvotes' : '/tasks/downvotes';
  return fetchFromApiGitHubAuthPost<void, { task_id: number }>(endpoint, { task_id: taskId }, token);
}

/**
 * Deletes a user's vote for a specific task using the API client.
 * @param taskId The ID of the task from which to remove the vote.
 * @param token The user's authentication token.
 * @returns An empty promise on success (as the API returns 204 No Content).
 */
export async function deleteVote(taskId: number, token: string): Promise<void> {
  const payload = { task_id: taskId };
  return fetchFromApiGitHubAuthDelete<void, { task_id: number }>("/tasks/vote", payload, token);
}

/**
 * Updates a task (for assignment, status changes, etc.).
 * @param taskId The ID of the task to update.
 * @param payload The fields to update.
 * @param token The user's authentication token.
 * @returns The updated task.
 */
export async function updateTask(
  taskId: number,
  payload: UpdateTaskPayload,
  token: string
): Promise<Task> {
  return fetchFromApiGitHubAuthPut<Task, UpdateTaskPayload>(
    `/tasks/${taskId}`,
    payload,
    token
  );
}

/**
 * Assigns a user to a task.
 * @param taskId The ID of the task.
 * @param userId The ID of the user to assign.
 * @param token The user's authentication token.
 */
export async function assignTask(
  taskId: number,
  userId: number,
  token: string
): Promise<Task> {
  return updateTask(taskId, {
    assignee_user_id: userId,
    status: "in-progress",
  }, token);
}

/**
 * Unassigns a user from a task.
 * @param taskId The ID of the task.
 * @param token The user's authentication token.
 */
export async function unassignTask(taskId: number, token: string): Promise<Task> {
  return updateTask(taskId, {
    assignee_user_id: null,
    status: "open",
  }, token);
}