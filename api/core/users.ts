import { fetchFromApiGitHubAuth, fetchFromApiGitHubAuthPost, fetchFromApiGitHubAuthPut } from "./_client";

const USERS_ME_PATH = "/users/me";

export type User = {
  id: number;
  username: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  github_id: number;
  email_notifications_enabled: boolean;
  email: string;
};

export async function getCurrentUser(token: string): Promise<User> {
  return await fetchFromApiGitHubAuth<User>(USERS_ME_PATH, {}, token);
}

export async function createCurrentUser(token: string): Promise<User> {
  return await fetchFromApiGitHubAuthPost<User, {}>(USERS_ME_PATH, {}, token);
}

export async function updateCurrentUser(token: string, email_notifications_enabled: boolean): Promise<void> {
  const body: { email_notifications_enabled: boolean } = { email_notifications_enabled };
  await fetchFromApiGitHubAuthPut<void, typeof body>(
    USERS_ME_PATH,
    body,
    token
  );
}

export default { getCurrentUser, createCurrentUser, updateCurrentUser };
