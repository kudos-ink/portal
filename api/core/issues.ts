import { DEFAULT_QUERY } from "@/data/fetch";
import { Issue, IssueWithProject, IssueQueryParams } from "@/types/issue";
import {
  PaginationQueryParams,
  PaginatedCustomResponse,
} from "@/types/pagination";
import { prepareUrl } from "@/utils/url";
import { coreApiClient } from "./_client";

const ISSUES_PATH = "/issues";

export async function getIssues(
  query: IssueQueryParams & PaginationQueryParams = DEFAULT_QUERY,
) {
  const url = prepareUrl(ISSUES_PATH, query);
  return coreApiClient.get<PaginatedCustomResponse<IssueWithProject>>(url);
}

export async function getIssuesByProject(
  slug: string,
  query: Omit<IssueQueryParams, "projectIds"> &
    PaginationQueryParams = DEFAULT_QUERY,
) {
  const url = prepareUrl(`${ISSUES_PATH}`, { slug, ...query });
  return coreApiClient.get<PaginatedCustomResponse<Issue>>(url);
}

export default { getIssues, getIssuesByProject };
