import {
  GOOD_FIRST_ISSUE_KEY,
  INTERESTS_OPTIONS,
  INTEREST_KEY,
  LANGUAGES_KEY,
  LANGUAGES_OPTIONS,
  PROJECTS_KEY,
  PROJECTS_OPTIONS,
  REPOSITORIES_BY_INTERESTS,
} from "@/data/filters";
import { FilterKeys, FilterOption, Filters } from "@/types/filters";

export const findInterestsByProject = (project: string) => {
  const matchingInterests = [];

  for (const interest in REPOSITORIES_BY_INTERESTS) {
    if (REPOSITORIES_BY_INTERESTS[interest].includes(project)) {
      const interestObject = INTERESTS_OPTIONS.find(
        ({ value }) => value === interest,
      );
      if (interestObject) {
        matchingInterests.push(interestObject);
      }
    }
  }

  return matchingInterests;
};

export const findLanguages = (languages: string[]) =>
  LANGUAGES_OPTIONS.filter(({ value }) => languages.includes(value));

// Fisher-Yates (or Knuth) shuffle algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const initFilters = (): Filters => {
  return {
    [INTEREST_KEY]: [],
    [LANGUAGES_KEY]: [],
    [PROJECTS_KEY]: [],
    [GOOD_FIRST_ISSUE_KEY]: false,
  };
};

export const countNonEmptyFilters = (filters: Filters): number => {
  let nonEmptyCount = 0;

  (Object.keys(filters) as FilterKeys[]).forEach((key) => {
    const value = filters[key];

    if (key === GOOD_FIRST_ISSUE_KEY) {
      // Count as non-empty if the value is 'true'
      if (value === true) {
        nonEmptyCount++;
      }
    } else {
      if (Array.isArray(value) && value.length > 0) {
        nonEmptyCount++;
      }
    }
  });

  return nonEmptyCount;
};

export function getNewFilterOption(
  key: FilterKeys,
  value: string,
): FilterOption | undefined {
  let optionsArray;

  switch (key) {
    case LANGUAGES_KEY:
      optionsArray = LANGUAGES_OPTIONS;
      break;
    case INTEREST_KEY:
      optionsArray = INTERESTS_OPTIONS;
      break;
    case PROJECTS_KEY:
      optionsArray = PROJECTS_OPTIONS;
      break;
    default:
      return undefined;
  }

  return optionsArray.find((option) => option.value === value);
}
