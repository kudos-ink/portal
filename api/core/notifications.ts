import { fetchFromApiGitHubAuth } from "./_client";
import { Issue } from "@/types/issue";
import { coreApiClient } from "./_client";

const NOTIFICATIONS_PATH = "/notifications";

export type Notification = {
  id: number;
  task_id: number;
  task: Issue;
  created_at: string;
};

export async function getAllNotifications(token: string): Promise<Notification[]> {
  return await fetchFromApiGitHubAuth<Notification[]>(
    NOTIFICATIONS_PATH,
    {},
    token
  );
}

export async function deleteAllNotifications(token: string): Promise<void> {
  await fetchFromApiGitHubAuth(
    NOTIFICATIONS_PATH,
    {},
    token,
  );
}

export async function deleteNotificationById(id: number, token: string): Promise<void> {
  const url = `${NOTIFICATIONS_PATH}/${id}`;
  const apiUrl = `${coreApiClient.getBaseURL()}${url}`;
  const response = await fetch(apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!response.ok) {
    const error = new Error("HTTP Error") as any;
    error.status = response.status;
    error.response = await response.json();
    throw error;
  }
}

export default { getAllNotifications, deleteAllNotifications, deleteNotificationById };