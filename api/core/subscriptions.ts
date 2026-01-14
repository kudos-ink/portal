import { fetchFromApiGitHubAuth, fetchFromApiGitHubAuthPost } from "./_client";
import { coreApiClient } from "./_client";

const SUBSCRIPTIONS_PATH = "/subscriptions";

export type Subscription = {
  id: number;
  github_id: number;
  purpose?: string | null;
  stack_level?: string | null;
  technology?: string | null;
  created_at: string;
};

export async function getSubscriptions(token: string): Promise<Subscription[]> {
  return await fetchFromApiGitHubAuth<Subscription[]>(SUBSCRIPTIONS_PATH, {}, token);
}

export async function createSubscription(
  token: string,
  data: { purpose?: string; stack_level?: string; technology?: string }
): Promise<Subscription> {
  return await fetchFromApiGitHubAuthPost<Subscription, typeof data>(SUBSCRIPTIONS_PATH, data, token);
}

export async function deleteSubscription(
  token: string,
  data: { purpose?: string; stack_level?: string; technology?: string }
): Promise<void> {
  const url = `${coreApiClient.getBaseURL()}${SUBSCRIPTIONS_PATH}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!response.ok) {
    const error = new Error("HTTP Error") as any;
    error.status = response.status;
    error.response = await response.json();
    throw error;
  }
}
