import LanguagesApi from "@/api/core/languages";
import ProjectsApi from "@/api/core/projects";
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
} from "@/data/filters";
import { IFilterOption, FilterOptions } from "@/types/filters";
import { createFilterOptions } from "@/utils/filters";

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
    [...languageValues, ...FTechnologies],
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
