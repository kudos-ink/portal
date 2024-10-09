import IssuesApi from "@/api/core/issues";
import { DEFAULT_QUERY, DEFAULT_PAGINATED_RESPONSE } from "@/data/fetch";
import { Issue, IssueQueryParams } from "@/types/issue";
import { PaginatedCustomResponse } from "@/types/pagination";

export async function fetchProjectIssues(
  slug: string,
  query: IssueQueryParams,
): Promise<PaginatedCustomResponse<Issue>> {
  return IssuesApi.getIssues({
    projects: [slug],
    ...DEFAULT_QUERY,
    ...query,
  }).catch((error) => {
    console.error(`Error fetching issues for project "${slug}":`, error);
    return DEFAULT_PAGINATED_RESPONSE;
  });
}
