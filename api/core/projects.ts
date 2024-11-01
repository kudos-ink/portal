import { DEFAULT_QUERY } from "@/data/fetch";
import {
  PaginatedCustomResponseDto,
  PaginationQueryParams,
} from "@/types/pagination";
import { ProjectDto, ProjectQueryParams } from "@/types/project";
import tags from "@/utils/tags";
import { prepareUrl } from "@/utils/url";
import { coreApiClient } from "./_client";
import { dtoToProject } from "./_transformers";

const PROJECTS_PATH = "/projects";

export async function getProjects(
  query: ProjectQueryParams & PaginationQueryParams = DEFAULT_QUERY,
  tag?: string,
) {
  const url = prepareUrl(PROJECTS_PATH, query);
  const nextTag = tag ?? tags.projects(query.slugs?.join("-") || "");

  const res = await coreApiClient.get<PaginatedCustomResponseDto<ProjectDto>>(
    url,
    {
      tag: nextTag,
    },
  );

  return {
    totalCount: res.total_count ?? 0,
    hasNextPage: res.has_next_page,
    hasPreviousPage: res.has_previous_page,
    data: res.data.map(dtoToProject),
  };
}

export default { getProjects };
