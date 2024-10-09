import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";
import { Repository, RepositoryDto } from "@/types/repository";
import tags from "@/utils/tags";
import { prepareUrl } from "@/utils/url";
import { coreApiClient } from "./_client";
import { dtoToRepository } from "./_transformers";

type QueryParams = {
  slugs?: string[];
  names?: string[];
  languageIds?: string[];
  projectIds?: string[];
};

const REPOSITORIES_PATH = "/repositories";

async function getRepositories(query: QueryParams & PaginationQueryParams) {
  const url = prepareUrl(REPOSITORIES_PATH, query);
  const tag = tags.repositories(query.slugs?.join("-") || "");
  return coreApiClient.get<PaginatedCustomResponse<Repository>>(url, { tag });
}

async function getRepositoryById(repositoryId: number): Promise<Repository> {
  const url = `${REPOSITORIES_PATH}/${repositoryId}`;
  const res = await coreApiClient.get<RepositoryDto>(url, {
    tag: `repository-${repositoryId}`,
  });

  return dtoToRepository(res);
}

export default { getRepositories, getRepositoryById };
