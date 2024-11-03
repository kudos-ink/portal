import { DEFAULT_QUERY_FILTERS, DEFAULT_PAGINATION } from "@/data/fetch";
import { IssueQueryParams, IssueDto, Issue } from "@/types/issue";
import {
  PaginationQueryParams,
  PaginatedCustomResponse,
  PaginatedCustomResponseDto,
} from "@/types/pagination";
import { mergeWithDefaultFilters } from "@/utils/url";
import { fetchFromApi } from "./_client";
import { dtoToIssue, issueQueryParamsToDto } from "./_transformers";
import { getAllLanguages } from "./languages";

const ISSUES_PATH = "/issues";

export async function getIssues(
  query: IssueQueryParams & PaginationQueryParams = DEFAULT_PAGINATION,
  tag?: string,
): Promise<PaginatedCustomResponse<Issue>> {
  const mergedQuery = mergeWithDefaultFilters(query, {
    ...DEFAULT_PAGINATION,
    ...DEFAULT_QUERY_FILTERS,
  });

  const allLanguages = mergedQuery.technologies?.length
    ? await getAllLanguages({ labels: mergedQuery.labels })
    : [];
  const queryDto = issueQueryParamsToDto(mergedQuery, allLanguages);

  const res = await fetchFromApi<PaginatedCustomResponseDto<IssueDto>>(
    ISSUES_PATH,
    queryDto,
    tag,
  );

  return {
    totalCount: res.total_count ?? 0,
    hasNextPage: res.has_next_page,
    hasPreviousPage: res.has_previous_page,
    data: res.data.map(dtoToIssue),
  };
}

export default { getIssues };
