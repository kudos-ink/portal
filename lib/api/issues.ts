import IssuesApi from "@/api/core/issues";
import { DEFAULT_PAGINATED_RESPONSE } from "@/data/fetch";
import { Issue, IssueQueryParams } from "@/types/issue";
import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";
import tags from "@/utils/tags";

export async function fetchIssues(
  query: IssueQueryParams & PaginationQueryParams,
): Promise<PaginatedCustomResponse<Issue>> {
  return IssuesApi.getIssues(query, tags.latestIssues).catch((error) => {
    console.error("Error fetching ISSUES:", error);
    return DEFAULT_PAGINATED_RESPONSE;
  });
}

export async function fetchProjectIssues(
  slug: string,
  query?: IssueQueryParams,
): Promise<PaginatedCustomResponse<Issue>> {
  return IssuesApi.getIssues({
    projects: [slug],
    ...query,
  }).catch((error) => {
    console.error(`Error fetching ISSUES for PROJECT "${slug}":`, error);
    return DEFAULT_PAGINATED_RESPONSE;
  });
}
