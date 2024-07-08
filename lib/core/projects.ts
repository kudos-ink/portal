import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";
import { Project } from "@/types/project";
import tags from "@/utils/tags";
import { sanitizeUrl, serializeQueryParams } from "@/utils/url";
import { fetchData } from "../fetch";
import { IFilterOption } from "@/types/filters";
import {
  DEFAULT_BIG_PAGE_SIZE,
  DEFAULT_PAGINATED_RESPONSE,
  DEFAULT_QUERY,
} from "@/data/fetch";

type QueryParams = {
  slugs?: string[];
  categories?: string[];
  stackLevels?: string[];
  technologies?: string[];
};

const PROJECTS_PATH = sanitizeUrl(process.env.API_URL || "") + "/projects";

export async function getProjects(
  query: QueryParams & PaginationQueryParams = DEFAULT_QUERY,
  tag?: string,
) {
  const queryString = serializeQueryParams(query);
  const url = `${PROJECTS_PATH}${queryString ? `?${queryString}` : ""}`;
  const nextTag = tag ?? tags.projects(query.slugs?.join("-") || "");
  return fetchData<PaginatedCustomResponse<Project>>(
    url,
    { tag: nextTag },
    DEFAULT_PAGINATED_RESPONSE,
  );
}

export async function getAllProjectOptions() {
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
