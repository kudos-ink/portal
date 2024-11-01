import { DEFAULT_QUERY } from "@/data/fetch";
import {
  PaginatedCustomResponse,
  PaginatedCustomResponseSnakeCase,
  PaginationQueryParams,
} from "@/types/pagination";
import { Project, ProjectQueryParams } from "@/types/project";
import tags from "@/utils/tags";
import { prepareUrl } from "@/utils/url";
import { coreApiClient } from "./_client";



const PROJECTS_PATH = "/projects";

export async function getProjects(
  query: ProjectQueryParams & PaginationQueryParams = DEFAULT_QUERY,
  tag?: string,
) {
  const url = prepareUrl(PROJECTS_PATH, query);
  const nextTag = tag ?? tags.projects(query.slugs?.join("-") || "");

  return coreApiClient.get<PaginatedCustomResponseSnakeCase<Project>>(url, {
    tag: nextTag,
  });
}

export default { getProjects };
