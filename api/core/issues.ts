import { DEFAULT_QUERY } from "@/data/fetch";
import { IssueQueryParams, IssueDto, Issue } from "@/types/issue";
import {
  PaginationQueryParams,
  PaginatedCustomResponse,
  PaginatedCustomResponseDto,
} from "@/types/pagination";
import { prepareUrl } from "@/utils/url";
import { coreApiClient } from "./_client";
import { dtoToIssue } from "./_transformers";

const ISSUES_PATH = "/issues";

export async function getIssues(
  query: Omit<IssueQueryParams, "projectIds"> &
    PaginationQueryParams = DEFAULT_QUERY,
): Promise<PaginatedCustomResponse<Issue>> {
  const url = prepareUrl(`${ISSUES_PATH}`, query);
  const res =
    await coreApiClient.get<PaginatedCustomResponseDto<IssueDto>>(url);
  return {
    totalCount: res.total_count ?? 0,
    hasNextPage: res.has_next_page,
    hasPreviousPage: res.has_previous_page,
    data: res.data.map(dtoToIssue),
  };
}

export default { getIssues };
