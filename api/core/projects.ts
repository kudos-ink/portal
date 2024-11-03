import { DEFAULT_PAGINATION, DEFAULT_QUERY_FILTERS } from "@/data/fetch";
import {
  PaginatedCustomResponse,
  PaginatedCustomResponseDto,
  PaginationQueryParams,
} from "@/types/pagination";
import {
  Project,
  ProjectDto,
  ProjectOptions,
  ProjectQueryParams,
} from "@/types/project";
import tags from "@/utils/tags";
import { mergeWithDefaultFilters } from "@/utils/url";
import { fetchFromApi } from "./_client";
import { dtoToProject, projectQueryParamsToDto } from "./_transformers";

const PROJECTS_PATH = "/projects";
const PROJECT_OPTIONS_PATH = "/projects/options";

export async function getProjects(
  query: ProjectQueryParams & PaginationQueryParams = DEFAULT_PAGINATION,
  tag?: string,
): Promise<PaginatedCustomResponse<Project>> {
  const nextTag = tag ?? tags.projects(query.slugs?.join("-") || "");
  const mergedQuery = mergeWithDefaultFilters(query, DEFAULT_PAGINATION);

  const res = await fetchFromApi<PaginatedCustomResponseDto<ProjectDto>>(
    PROJECTS_PATH,
    mergedQuery,
    nextTag,
  );

  return {
    totalCount: res.total_count ?? 0,
    hasNextPage: res.has_next_page,
    hasPreviousPage: res.has_previous_page,
    data: res.data.map(dtoToProject),
  };
}

export async function getProjectOptions(
  query: ProjectQueryParams,
): Promise<ProjectOptions> {
  const mergedQuery = mergeWithDefaultFilters(query, DEFAULT_QUERY_FILTERS);
  const queryDto = projectQueryParamsToDto(mergedQuery);

  return await fetchFromApi<ProjectOptions>(
    PROJECT_OPTIONS_PATH,
    queryDto,
    tags.projectOptions,
  );
}

export default { getProjects, getProjectOptions };
