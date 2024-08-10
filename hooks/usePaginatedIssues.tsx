import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { DEFAULT_PAGE_SIZE } from "@/data/fetch";
import IssuesApi from "@/api/core/issues";
import { Issue, IssueWithProject, IssueQueryParams } from "@/types/issue";
import { PaginatedCustomResponse } from "@/types/pagination";

export const usePaginatedIssues = <T extends IssueWithProject | Issue>(
  initialItems: PaginatedCustomResponse<T>,
  query: IssueQueryParams = {},
  slug?: string,
  offset: number = 0,
  limit: number = DEFAULT_PAGE_SIZE,
) => {
  const fetchIssues = async ({
    queryKey,
  }: QueryFunctionContext<
    [string, IssueQueryParams, { offset: number; limit: number }]
  >) => {
    const [, query, pagination] = queryKey;
    if (slug) {
      return IssuesApi.getIssuesByProject(slug, {
        ...query,
        ...pagination,
      }) as Promise<PaginatedCustomResponse<T>>;
    } else {
      return IssuesApi.getIssues({
        ...query,
        ...pagination,
      }) as Promise<PaginatedCustomResponse<T>>;
    }
  };

  return useQuery<
    PaginatedCustomResponse<T>,
    Error,
    PaginatedCustomResponse<T>,
    [string, IssueQueryParams, { offset: number; limit: number }]
  >({
    queryKey: ["contributions", query, { offset, limit }],
    queryFn: fetchIssues,
    initialData: initialItems,
  });
};
