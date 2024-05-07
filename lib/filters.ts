import { NewFilterOption, NewFilters } from "@/types/filters";
import { getLanguages } from "./core/languages";
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
import { createFilterOptions } from "@/utils/filters";
import { getAllProjectOptions } from "./core/projects";

export async function getFilters(): Promise<NewFilters> {
  let languageValues: string[];
  try {
    languageValues = await getLanguages();
  } catch (error) {
    console.error("Error fetching languages values:", error);
    languageValues = [];
  }

  let projects: NewFilterOption[] = [];
  try {
    projects = await getAllProjectOptions();
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
