import ConfigApi from "@/api/config/api";
import ProjectApi from "@/api/core/projects";
import {
  DEFAULT_BIG_PAGE_SIZE,
  DEFAULT_PAGINATED_RESPONSE,
  DEFAULT_PROJECT_OPTIONS,
} from "@/data/fetch";
import { IFilterOption } from "@/types/filters";
import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";
import { Project, ProjectOptions, ProjectQueryParams } from "@/types/project";
import tags from "@/utils/tags";
import { safeFetch } from "@/utils/error";

export async function fetchProjectInfo(slug: string) {
  return ConfigApi.getProjectInfos(slug).catch((error) => {
    console.error(`Error fetching project infos for "${slug}":`, error);
    return null;
  });
}

async function fetchAllProjects(tag?: string): Promise<Project[]> {
  let offset = 0;
  let hasMore = true;
  let projects: Project[] = [];

  while (hasMore) {
    const paginationParams = {
      offset,
      limit: DEFAULT_BIG_PAGE_SIZE,
    };
    const response = await safeFetch(
      () => ProjectApi.getProjects(paginationParams, tag),
      "fetchAllProjects",
      null,
      { paginationParams }
    );

    if (response === null) {
      break;
    }

    projects = projects.concat(response.data);
    hasMore = response.hasNextPage;
    offset += DEFAULT_BIG_PAGE_SIZE;
  }

  return projects;
}

export async function fetchProject(slug: string): Promise<Project | undefined> {
  return safeFetch(
    () => ProjectApi.getProjects({
      slugs: [slug],
    }).then(res => res.data[0]),
    "fetchProject",
    undefined,
    { slug }
  );
}

export async function fetchProjects(
  query: ProjectQueryParams & PaginationQueryParams,
): Promise<PaginatedCustomResponse<Project>> {
  return safeFetch(
    () => ProjectApi.getProjects(query),
    "fetchProjects",
    DEFAULT_PAGINATED_RESPONSE,
    { query }
  );
}

export async function fetchProjectOptions(
  query: ProjectQueryParams,
): Promise<ProjectOptions> {
  return safeFetch(
    () => ProjectApi.getProjectOptions(query),
    "fetchProjectOptions",
    DEFAULT_PROJECT_OPTIONS,
    { query }
  );
}

export async function getAllProjects(): Promise<Project[]> {
  return (await fetchAllProjects(tags.allProjects)).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export async function getAllProjectOptions(): Promise<IFilterOption[]> {
  const projects = await fetchAllProjects(tags.projectOptions);

  return projects
    .map((project) => ({
      value: project.slug,
      label: project.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
