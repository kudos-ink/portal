import {
  GOOD_FIRST_ISSUE_KEY,
  KUDOS_ISSUE_KEY,
  PROJECTS_KEY,
  PROJECT_TYPE_KEY,
  PURPOSE_KEY,
  STACK_LEVEL_KEY,
  TECHNOLOGY_KEY,
} from "@/data/filters";
import {
  FilterKeys,
  IFilterOption,
  FilterOptions,
  Filters,
} from "@/types/filters";

export const findPurposesByProject = (
  project: string,
  purposes: IFilterOption[],
  repositories: IFilterOption[],
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
    [PURPOSE_KEY]: [],
    [PROJECT_TYPE_KEY]: [],
    [TECHNOLOGY_KEY]: [],
    [STACK_LEVEL_KEY]: [],
    [PROJECTS_KEY]: [],
    [GOOD_FIRST_ISSUE_KEY]: false,
    [KUDOS_ISSUE_KEY]: false,
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

export function createFilterOptions(
  items: readonly string[],
  emojiMap?: Record<string, string>,
): IFilterOption[] {
  const sortedItems = [...items].sort();
  return sortedItems.map((item) => ({
    value: item,
    label: item
      .replace("-", " ")
      .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase()),
    emoji: emojiMap ? emojiMap[item] : undefined,
  }));
}
