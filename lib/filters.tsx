import { KudosCertifiedIcon } from "@/assets/icons";
import { CheckboxFilterConfig } from "@/components/filters/config";
import { KudosIssueTooltipContent } from "@/components/table/row";
import { DEFAULT_BIG_PAGE_SIZE } from "@/data/fetch";
import {
  emojiMapForProjectTypes,
  emojiMapForPurposes,
  emojiMapForStackLevels,
  emojiMapForTechnologies,
  PURPOSE_KEY,
  PROJECT_TYPE_KEY,
  TECHNOLOGY_KEY,
  STACK_LEVEL_KEY,
  PROJECTS_KEY,
  KUDOS_ISSUE_KEY,
} from "@/data/filters";
import { FilterOptions, Filters } from "@/types/filters";
import { IssueQueryParams } from "@/types/issue";
import { PaginationQueryParams } from "@/types/pagination";
import { ProjectMetrics } from "@/types/project";
import { createFilterOptions } from "@/utils/filters";
import { fetchProjectOptions, getAllProjectOptions } from "./api/projects";
import { fetchLanguages } from "./api/languages";

export async function getProjectFilterOptions(
  projects: string[],
): Promise<FilterOptions> {
  let languages = await fetchLanguages({ projects });
  const technologies = createFilterOptions(
    languages.map((v) => v.toLocaleLowerCase().replaceAll('"', "")),
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
  const languages = await fetchLanguages({
    withTechnologies: true,
  });

  let projects = await getAllProjectOptions();
  let { purposes, stack_levels, types } = await fetchProjectOptions({});
  const technologies = createFilterOptions(
    [...languages.map((v) => v.toLocaleLowerCase().replaceAll('"', ""))],
    emojiMapForTechnologies,
  );

  return {
    [PROJECT_TYPE_KEY]: createFilterOptions(types, emojiMapForProjectTypes),
    [PURPOSE_KEY]: createFilterOptions(purposes, emojiMapForPurposes),
    [STACK_LEVEL_KEY]: createFilterOptions(
      stack_levels,
      emojiMapForStackLevels,
    ),
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
    certified: true,
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

  if (filters[KUDOS_ISSUE_KEY]) {
    query.certifiedOnly = true;
  }

  return query;
}

export function buildCheckboxFilters(
  metrics: ProjectMetrics,
): CheckboxFilterConfig[] {
  const filters: CheckboxFilterConfig[] = [];

  if (metrics.certifiedTotal > 0) {
    filters.push({
      key: KUDOS_ISSUE_KEY,
      placeholder: "Kudos Issues Only",
      content: <KudosIssueTooltipContent />,
      icon: <KudosCertifiedIcon className="w-5 h-5" size={16} />,
      isAdvanced: true,
    });
  }

  return filters;
}
