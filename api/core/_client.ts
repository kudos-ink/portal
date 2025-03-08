import APIClient from "@/api/client";
import { logError } from "@/utils/error";
import { prepareUrl, sanitizeUrl } from "@/utils/url";

const CORE_API_URL = sanitizeUrl(process.env.NEXT_PUBLIC_API_URL || "");

export async function fetchFromApi<T>(
  endpoint: string,
  queryParams: Record<string, any>,
  tag?: string,
): Promise<T> {
  const url = prepareUrl(endpoint, queryParams);
  // const config = tag ? { tag } : { noStoreCache: true };
  const config = { noStoreCache: true };
  try {
    return await coreApiClient.get<T>(url, config);
  } catch (error) {
    logError("fetchFromApi", error, { endpoint, queryParams, url, config });
    throw error;
  }
}

export const coreApiClient = new APIClient(CORE_API_URL);
