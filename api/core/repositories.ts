import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";
import { Repository } from "@/types/repository";
import tags from "@/utils/tags";
import { prepareUrl } from "@/utils/url";
import { coreApiClient } from "./_client";

type QueryParams = {
  slugs?: string[];
  names?: string[];
  languageIds?: string[];
  projectIds?: string[];
};

const REPOSITORIES_PATH = "/repositories";

export async function getRepositories(
  query: QueryParams & PaginationQueryParams,
) {
  const url = prepareUrl(REPOSITORIES_PATH, query);
  const tag = tags.repositories(query.slugs?.join("-") || "");
  return coreApiClient.get<PaginatedCustomResponse<Repository>>(url, { tag });
}
