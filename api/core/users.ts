import { fetchFromApi, fetchFromApiGitHubAuth, fetchFromApiGitHubAuthPost, fetchFromApiGitHubAuthPut } from "./_client";

const USERS_ME_PATH = "/users/me";
const USERS_ME_NOTIFICATIONS_PATH = "/users/me/notifications";
const USERS_ME_PROFILE_PATH = "/users/me/profile";
const USERS_USERNAME_PATH = "/users/username/";


export type User = {
  id: number;
  username: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  github_id: number;
  email_notifications_enabled: boolean;
  email: string;
  bio: string | null;
  skills: (string | null)[] | null;
  interests: (string | null)[] | null;
  telegram: string | null;
  twitter: string | null;
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

export async function getUserByUsername(username: string): Promise<User> {
  return await fetchFromApi<User>(USERS_USERNAME_PATH + username, {});
}


export async function updateEmailNotifications(
  token: string,
  email_notifications_enabled: boolean
): Promise<User> {
  const body = { email_notifications_enabled };
  return await fetchFromApiGitHubAuthPut<User, typeof body>(
    USERS_ME_NOTIFICATIONS_PATH,
    body,
    token
  );
}

export type UpdateProfileBody = {
  bio?: string | null;
  skills?: (string | null)[] | null;
  interests?: (string | null)[] | null;
  telegram?: string | null;
  twitter?: string | null;
};

export async function updateProfile(
  token: string,
  body: UpdateProfileBody
): Promise<User> {
  return await fetchFromApiGitHubAuthPut<User, UpdateProfileBody>(
    USERS_ME_PROFILE_PATH,
    body,
    token
  );
}

export default { getCurrentUser, createCurrentUser, updateCurrentUser, getUserByUsername, updateEmailNotifications, updateProfile };
