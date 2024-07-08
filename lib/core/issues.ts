import { Issue, IssueWithProject, IssueQueryParams } from "@/types/issue";
import { sanitizeUrl, serializeQueryParams } from "@/utils/url";
import { fetchData } from "../fetch";
import {
  PaginationQueryParams,
  PaginatedCustomResponse,
} from "@/types/pagination";
import { DEFAULT_PAGINATED_RESPONSE, DEFAULT_QUERY } from "@/data/fetch";

const ISSUES_PATH = sanitizeUrl(process.env.API_URL || "") + "/issues";

export async function getIssues(
  query: IssueQueryParams & PaginationQueryParams = DEFAULT_QUERY,
) {
  const queryString = serializeQueryParams(query);
  const url = `${ISSUES_PATH}${queryString ? `?${queryString}` : ""}`;
  return fetchData<PaginatedCustomResponse<IssueWithProject>>(
    url,
    {
      noStoreCache: true,
    },
    DEFAULT_PAGINATED_RESPONSE,
  );
}

export async function getIssuesByProject(
  slug: string,
  query: Omit<IssueQueryParams, "projectIds"> &
    PaginationQueryParams = DEFAULT_QUERY,
) {
  const queryString = serializeQueryParams(query);
  const url = `${ISSUES_PATH}/${slug}/${queryString ? `?${queryString}` : ""}`;
  return fetchData<PaginatedCustomResponse<Issue>>(
    url,
    {
      noStoreCache: true,
    },
    DEFAULT_PAGINATED_RESPONSE,
  );
}
