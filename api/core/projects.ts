import { DEFAULT_BIG_PAGE_SIZE, DEFAULT_QUERY } from "@/data/fetch";
import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";
import { IFilterOption } from "@/types/filters";
import { Project } from "@/types/project";
import tags from "@/utils/tags";
import { prepareUrl } from "@/utils/url";
import { coreApiClient } from "./_client";

type QueryParams = {
  slugs?: string[];
  categories?: string[];
  stackLevels?: string[];
  technologies?: string[];
};

const PROJECTS_PATH = "/projects";

async function getProjects(
  query: QueryParams & PaginationQueryParams = DEFAULT_QUERY,
  tag?: string,
) {
  const url = prepareUrl(PROJECTS_PATH, query);
  const nextTag = tag ?? tags.projects(query.slugs?.join("-") || "");

  return coreApiClient.get<PaginatedCustomResponse<Project>>(url, {
    tag: nextTag,
  });
}

async function getAllProjectOptions() {
  let offset = 0;
  let hasMore = true;
  let projects: IFilterOption[] = [];

  while (hasMore) {
    const paginationParams = {
      offset,
      limit: DEFAULT_BIG_PAGE_SIZE,
      tag: "all-projects",
    };
    const response = await getProjects(paginationParams, tags.projectOptions);

    projects = projects.concat(
      response.data.map((project) => ({
        value: project.slug,
        label: project.name,
      })),
    );

    hasMore = response.hasNextPage;
    offset += DEFAULT_BIG_PAGE_SIZE;
  }

  return projects;
}

export default { getProjects, getAllProjectOptions };
