import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";
import { Repository } from "@/types/repository";
import tags from "@/utils/tags";
import { sanitizeUrl, serializeQueryParams } from "@/utils/url";
import { fetchData } from "../fetch";

type QueryParams = {
  slugs?: string[];
  names?: string[];
  languageIds?: string[];
  projectIds?: string[];
};

const REPOSITORIES_PATH =
  sanitizeUrl(process.env.PROJECT_CLASSIFICATION_URL || "") + "/repositories";

export async function getRepositories(
  query: QueryParams & PaginationQueryParams,
) {
  const queryString = serializeQueryParams(query);
  const url = `${REPOSITORIES_PATH}${queryString ? `?${queryString}` : ""}`;
  const tag = tags.repositories(query.slugs?.join("-") || "");
  return fetchData<PaginatedCustomResponse<Repository[]>>(url, { tag });
}
