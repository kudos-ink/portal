import LanguagesApi from "@/api/core/languages";
import ProjectsApi from "@/api/core/projects";
import RepositoriesApi from "@/api/core/repositories";
import { DEFAULT_BIG_PAGE_SIZE } from "@/data/fetch";
import {
  FProjectTypes,
  FPurposes,
  FStackLevels,
  FTechnologies,
  emojiMapForProjectTypes,
  emojiMapForPurposes,
  emojiMapForStackLevels,
  emojiMapForTechnologies,
  PURPOSE_KEY,
  PROJECT_TYPE_KEY,
  TECHNOLOGY_KEY,
  STACK_LEVEL_KEY,
  PROJECTS_KEY,
  GOOD_FIRST_ISSUE_KEY,
  GOOD_FIRST_ISSUE_LABELS,
  KUDOS_ISSUE_KEY,
} from "@/data/filters";
import { IFilterOption, FilterOptions, Filters } from "@/types/filters";
import { IssueQueryParams } from "@/types/issue";
import { PaginationQueryParams } from "@/types/pagination";
import { createFilterOptions } from "@/utils/filters";

export async function getProjectFilterOptions(
  repositoryIds: number[],
): Promise<FilterOptions> {
  let languageValues: string[] = [];

  try {
    const languagePromises = repositoryIds.map((id) =>
      RepositoriesApi.getRepositoryById(id).then((repo) => repo.language),
    );

    languageValues = await Promise.all(languagePromises);
  } catch (error) {
    console.error("Error fetching language values - ", error);
    languageValues = [];
  }

  const technologies = createFilterOptions(
    languageValues.map((v) => v.toLocaleLowerCase().replaceAll('"', "")),
    emojiMapForTechnologies,
  );

  return {
    [PROJECT_TYPE_KEY]: [],
    [PURPOSE_KEY]: [],
    [STACK_LEVEL_KEY]: [],
    [TECHNOLOGY_KEY]: technologies,
    [PROJECTS_KEY]: [],
  };
}

export async function getFilterOptions(): Promise<FilterOptions> {
  let languageValues: string[];
  try {
    languageValues = await LanguagesApi.getAllLanguages();
  } catch (error) {
    console.error("Error fetching languages values - ", error);
    languageValues = [];
  }

  let projects: IFilterOption[] = [];
  try {
    projects = await ProjectsApi.getAllProjectOptions();
  } catch (error) {
    console.error("Error fetching projects options:", error);
  }

  const purposes = createFilterOptions(FPurposes, emojiMapForPurposes);
  const technologies = createFilterOptions(
    [
      ...languageValues.map((v) => v.toLocaleLowerCase().replaceAll('"', "")),
      ...FTechnologies,
    ],
    emojiMapForTechnologies,
  );
  const stackLevels = createFilterOptions(FStackLevels, emojiMapForStackLevels);
  const projectTypes = createFilterOptions(
    FProjectTypes,
    emojiMapForProjectTypes,
  );

  return {
    [PROJECT_TYPE_KEY]: projectTypes,
    [PURPOSE_KEY]: purposes,
    [STACK_LEVEL_KEY]: stackLevels,
    [TECHNOLOGY_KEY]: technologies,
    [PROJECTS_KEY]: projects,
  };
}

export function filtersToIssuesQuery(
  filters: Filters,
): IssueQueryParams & PaginationQueryParams {
  const query: IssueQueryParams & PaginationQueryParams = {
    offset: 0,
    limit: DEFAULT_BIG_PAGE_SIZE,
    open: true,
  };

  if (filters[TECHNOLOGY_KEY].length > 0) {
    query.technologies = filters[TECHNOLOGY_KEY].map((tech) => tech.value);
  }

  if (filters[PURPOSE_KEY].length > 0) {
    query.purposes = filters[PURPOSE_KEY].map((tech) => tech.value);
  }

  if (filters[PROJECTS_KEY].length > 0) {
    query.projects = filters[PROJECTS_KEY].map((tech) => tech.value);
  }

  if (filters[PROJECT_TYPE_KEY].length > 0) {
    query.types = filters[PROJECT_TYPE_KEY].map((tech) => tech.value);
  }

  if (filters[STACK_LEVEL_KEY].length > 0) {
    query.stackLevels = filters[STACK_LEVEL_KEY].map((tech) => tech.value);
  }

  if (filters[GOOD_FIRST_ISSUE_KEY]) {
    query.labels = GOOD_FIRST_ISSUE_LABELS;
  }

  if (filters[KUDOS_ISSUE_KEY]) {
    query.certified = true;
  }

  return query;
}
