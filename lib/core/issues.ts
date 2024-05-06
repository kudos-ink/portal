import { Issue } from "@/types/issue";
import { sanitizeUrl, serializeQueryParams } from "@/utils/url";
import { fetchData } from "../fetch";
import {
  PaginationQueryParams,
  PaginatedCustomResponse,
} from "@/types/pagination";

type QueryParams = {
  languageIds?: string[];
  projectIds?: string[];
};

const ISSUES_PATH =
  sanitizeUrl(process.env.PROJECT_CLASSIFICATION_URL || "") + "/issues";

export async function getIssues(query: QueryParams & PaginationQueryParams) {
  const queryString = serializeQueryParams(query);
  const url = `${ISSUES_PATH}${queryString ? `?${queryString}` : ""}`;
  return fetchData<PaginatedCustomResponse<Issue[]>>(url, {
    noStoreCache: true,
  });
}
