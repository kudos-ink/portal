import { DEFAULT_QUERY } from "@/data/fetch";
import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";
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

export default { getProjects };
