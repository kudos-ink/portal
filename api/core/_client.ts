import APIClient from "@/api/client";
import { prepareUrl, sanitizeUrl } from "@/utils/url";

const isServer = typeof window === 'undefined';

const CORE_API_URL = sanitizeUrl(
  isServer
    ? 'http://localhost:8000' // remote machine internal API URL
    : process.env.NEXT_PUBLIC_API_URL || ''
);

export async function fetchFromApi<T>(
  endpoint: string,
  queryParams: Record<string, any>,
  tag?: string,
): Promise<T> {
  const url = prepareUrl(endpoint, queryParams);
  const config = tag ? { tag } : { noStoreCache: true };

  try {
    return await coreApiClient.get<T>(url, config);
  } catch (error: any) {
    if (error?.response) {
      console.error(`[fetchFromApi] Error in ${endpoint}:`, {
        status: error.status,
        response: error.response,
      });
    } else {
      console.error(`[fetchFromApi] Unknown error in ${endpoint}:`, error);
    }
    throw error;
  }
}
export async function fetchFromApiGitHubAuth<T>(
  endpoint: string,
  queryParams: Record<string, any>,
  token: string,
  tag?: string,
): Promise<T> {
  try {
    const url = prepareUrl(endpoint, queryParams);
    const config = {
      tag,
      headers: { Authorization: `Bearer ${token}` },
      noStoreCache: true,
    };
    return await coreApiClient.get<T>(url, config);
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
}

export async function fetchFromApiGitHubAuthPost<T, D>(
  endpoint: string,
  data: D,
  token: string,
  tag?: string,
): Promise<T> {
  try {
    const url = endpoint;
    const config = {
      tag,
      headers: { Authorization: `Bearer ${token}` },
      noStoreCache: true,
    };
    return await coreApiClient.post<T, D>(url, data, config);
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    throw error;
  }
}

export async function fetchFromApiGitHubAuthPut<T, D>(
  endpoint: string,
  data: D,
  token: string,
  tag?: string,
): Promise<T> {
  try {
    const url = endpoint;
    return await coreApiClient.put<T, D>(url, data, {
      tag,
      headers: { Authorization: `Bearer ${token}` },
      noStoreCache: true,
    });
  } catch (error) {
    console.error(`Error putting data to ${endpoint}:`, error);
    throw error;
  }
}

export const coreApiClient = new APIClient(CORE_API_URL);
