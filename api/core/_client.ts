import { prepareUrl, sanitizeUrl } from "@/utils/url";
import APIClient from "@/api/client";

const CORE_API_URL = sanitizeUrl(process.env.NEXT_PUBLIC_API_URL || "");

export async function fetchFromApi<T>(
  endpoint: string,
  queryParams: Record<string, any>,
  tag?: string,
): Promise<T> {
  try {
    const url = prepareUrl(endpoint, queryParams);
    const config = tag ? { tag } : { noStoreCache: true };
    return await coreApiClient.get<T>(url, config);
  } catch (error) {
    console.error(
      `Error fetching data from ${endpoint} with the following params ${JSON.stringify(queryParams)}:`,
      error,
    );
    throw error;
  }
}

export const coreApiClient = new APIClient(CORE_API_URL);
