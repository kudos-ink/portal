import {
  GOOD_FIRST_ISSUE_KEY,
  INTEREST_KEY,
  LANGUAGES_KEY,
  PROJECTS_KEY,
} from "@/data/filters";
import {
  FilterKeys,
  FilterOption,
  FilterOptions,
  Filters,
} from "@/types/filters";

export const findInterestsByProject = (
  project: string,
  interests: FilterOption[],
  repositories: FilterOption[],
) => {
  const matchingInterests = [];
  const repository = repositories.find(({ value }) => value == project);
  if (repository && !!repository.interests) {
    for (const interest of repository.interests) {
      const interestObject = interests.find(({ value }) => value === interest);
      if (interestObject) {
        matchingInterests.push(interestObject);
      }
    }
  }
  return matchingInterests;
};

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
  filterOptions: FilterOptions,
): FilterOption | undefined {
  let optionsArray;

  switch (key) {
    case LANGUAGES_KEY:
      optionsArray = filterOptions.languages;
      break;
    case INTEREST_KEY:
      optionsArray = filterOptions.interests;
      break;
    case PROJECTS_KEY:
      optionsArray = filterOptions.repositories;
      break;
    default:
      return undefined;
  }

  return optionsArray.find((option) => option.value === value);
}
