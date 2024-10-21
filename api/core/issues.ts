import { DEFAULT_QUERY } from "@/data/fetch";
import { IssueQueryParams, IssueDto, Issue } from "@/types/issue";
import {
  PaginationQueryParams,
  PaginatedCustomResponse,
  PaginatedCustomResponseDto,
} from "@/types/pagination";
import { prepareUrl } from "@/utils/url";
import { coreApiClient } from "./_client";
import { dtoToIssue, issueQueryParamsToDto } from "./_transformers";
import { getAllLanguages } from "./languages";

const ISSUES_PATH = "/issues";

export async function getIssues(
  query: IssueQueryParams & PaginationQueryParams = DEFAULT_QUERY,
  tag?: string,
): Promise<PaginatedCustomResponse<Issue>> {
  let allLanguages: string[] = [];
  if (query?.technologies?.length) {
    allLanguages = await getAllLanguages();
  }

  const queryDto = issueQueryParamsToDto(query, allLanguages);
  const url = prepareUrl(`${ISSUES_PATH}`, queryDto);
  const res = await coreApiClient.get<PaginatedCustomResponseDto<IssueDto>>(
    url,
    tag ? { tag } : { noStoreCache: true },
  );

  return {
    totalCount: res.total_count ?? 0,
    hasNextPage: res.has_next_page,
    hasPreviousPage: res.has_previous_page,
    data: res.data.map(dtoToIssue),
  };
}

export default { getIssues };
