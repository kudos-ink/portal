import { fetchFromApi, fetchFromApiGitHubAuth } from "@/api/core/_client";
import { User } from "@/types/user";
import { safeFetch } from "@/utils/error";

const USERS_PATH = "/users";

export type UserSearchParams = {
  query?: string;
  limit?: number;
  offset?: number;
};

export async function searchUsers(
  params: UserSearchParams = {},
  token?: string
): Promise<User[]> {
  const { query, limit = 20, offset = 0 } = params;
  const queryParams: Record<string, any> = { limit, offset };
  if (query) {
    queryParams.search = query;
  }

  return safeFetch(
    async () => {
      if (token) {
        return fetchFromApiGitHubAuth<User[]>(USERS_PATH, queryParams, token);
      }
      return fetchFromApi<User[]>(USERS_PATH, queryParams);
    },
    "searchUsers",
    [],
    params
  );
}

export async function fetchUserById(id: number): Promise<User | null> {
  try {
    return await fetchFromApi<User>(`${USERS_PATH}/${id}`, {});
  } catch (error) {
    console.error(`Failed to fetch user with id ${id}:`, error);
    return null;
  }
}
