import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { DEFAULT_PAGE_SIZE } from "@/data/fetch";
import IssuesApi from "@/api/core/issues";
import { Issue, IssueQueryParams } from "@/types/issue";
import { PaginatedCustomResponse } from "@/types/pagination";

export const usePaginatedIssues = (
  query: IssueQueryParams = {},
  offset: number = 0,
  limit: number = DEFAULT_PAGE_SIZE,
) => {
  const fetchIssues = async ({
    queryKey,
  }: QueryFunctionContext<
    [string, IssueQueryParams, { offset: number; limit: number }]
  >) => {
    const [, query, pagination] = queryKey;
    return IssuesApi.getIssues({
      ...query,
      ...pagination,
    }) as Promise<PaginatedCustomResponse<Issue>>;
  };

  return useQuery<
    PaginatedCustomResponse<Issue>,
    Error,
    PaginatedCustomResponse<Issue>,
    [string, IssueQueryParams, { offset: number; limit: number }]
  >({
    queryKey: ["contributions", query, { offset, limit }],
    queryFn: fetchIssues,
    placeholderData: (previousData) => previousData,
  });
};
