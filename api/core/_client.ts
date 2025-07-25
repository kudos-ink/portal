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

export const coreApiClient = new APIClient(CORE_API_URL);
