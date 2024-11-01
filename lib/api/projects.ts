import ConfigApi from "@/api/config/api";
import ProjectApi from "@/api/core/projects";
import { DEFAULT_BIG_PAGE_SIZE, DEFAULT_QUERY } from "@/data/fetch";
import { IFilterOption } from "@/types/filters";
import { Project } from "@/types/project";
import tags from "@/utils/tags";

export async function fetchProjectInfo(slug: string) {
  return ConfigApi.getProjectInfos(slug).catch((error) => {
    console.error(`Error fetching project infos for "${slug}":`, error);
    return null;
  });
}

async function fetchPaginatedProjects(tag?: string): Promise<Project[]> {
  let offset = 0;
  let hasMore = true;
  let projects: Project[] = [];

  while (hasMore) {
    const paginationParams = {
      offset,
      limit: DEFAULT_BIG_PAGE_SIZE,
    };
    const response = await ProjectApi.getProjects(paginationParams, tag);

    projects = projects.concat(response.data);
    hasMore = response.hasNextPage;
    offset += DEFAULT_BIG_PAGE_SIZE;
  }

  return projects;
}

export async function fetchProject(slug: string): Promise<Project | undefined> {
  const res = await ProjectApi.getProjects({
    slugs: [slug],
    ...DEFAULT_QUERY,
  }).catch((error) => {
    console.error(`Error fetching issues for project "${slug}":`, error);
    return undefined;
  });

  return res?.data[0];
}

export async function getAllProjects(): Promise<Project[]> {
  return (await fetchPaginatedProjects(tags.allProjects)).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export async function getAllProjectOptions(): Promise<IFilterOption[]> {
  const projects = await fetchPaginatedProjects(tags.projectOptions);

  return projects
    .map((project) => ({
      value: project.slug,
      label: project.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
