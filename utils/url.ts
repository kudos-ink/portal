import {
  FilterKeys,
  FilterOption,
  FilterOptions,
  Filters,
} from "@/types/filters";
import { GOOD_FIRST_ISSUE_KEY, KUDOS_ISSUE_KEY } from "@/data/filters";
import { getNewFilterOption, initFilters } from "./filters";

type Keys = FilterKeys | typeof GOOD_FIRST_ISSUE_KEY | typeof KUDOS_ISSUE_KEY;

export const createUrl = (
  key: string,
  values: string[],
  pathname: string,
  filterOptions: FilterOptions,
) => {
  const slugParts = pathname.split("/");
  const currentSlug = slugParts[slugParts.length - 1];

  // Decode existing filters from the slug
  let filters = decodingSlug(currentSlug, filterOptions);

  // Update the specific filter based on the provided key and value
  const keyLowerCase = key.toLowerCase() as Keys;
  if (values.length > 0) {
    // Add the new value to the existing array for the specific filter, avoiding duplicates
    if (keyLowerCase === GOOD_FIRST_ISSUE_KEY) {
      filters[GOOD_FIRST_ISSUE_KEY] = values.includes("true");
    } else if (keyLowerCase === KUDOS_ISSUE_KEY) {
      filters[KUDOS_ISSUE_KEY] = values.includes("true");
    } else {
      const newOptions = values
        .map((value) => getNewFilterOption(keyLowerCase, value, filterOptions))
        .filter((option): option is FilterOption => option !== undefined);
      filters[keyLowerCase] = newOptions;
    }
  } else {
    if (keyLowerCase === GOOD_FIRST_ISSUE_KEY) {
      filters[GOOD_FIRST_ISSUE_KEY] = false;
    } else if (keyLowerCase === KUDOS_ISSUE_KEY) {
      filters[KUDOS_ISSUE_KEY] = false;
    } else {
      filters[keyLowerCase] = [];
    }
  }

  // Use encodingSlug to create a slug from the updated filters
  const newSlug = encodingSlug(filters);

  // Reconstruct the pathname with the new slug
  slugParts[slugParts.length - 1] = newSlug;
  return slugParts.join("/");
};

export const encodingSlug = (filters: Filters): string => {
  const { languages, interests, projects } = filters;

  const createSegment = (
    options: FilterOption[] | undefined,
    prefix: string = "",
  ): string => {
    if (!options || options.length === 0) {
      return "";
    }
    return `${prefix}${options
      .map(({ name }) => name.toLocaleLowerCase().replaceAll(" ", "-"))
      .join("-and-")
      .toLowerCase()}`;
  };

  const languagesSegment = createSegment(languages);
  const interestsSegment = createSegment(interests, "in-");
  const projectsSegment = createSegment(projects, "for-");
  const goodFirstSegment = filters[GOOD_FIRST_ISSUE_KEY] ? "good-first" : "";
  const certifiedSegment = filters[KUDOS_ISSUE_KEY] ? "certified" : "";

  let urlParts = [
    languagesSegment,
    certifiedSegment,
    goodFirstSegment,
    "open-contributions",
    interestsSegment,
    projectsSegment,
  ];
  return urlParts.filter((part) => part).join("-");
};

export const decodingSlug = (
  slug: string,
  filterOptions: FilterOptions,
): Filters => {
  const filters = initFilters();

  // Check for 'good-first', 'certified' and extract languages
  const isCertified = slug.includes("certified-");
  filters[KUDOS_ISSUE_KEY] = isCertified;
  const isGoodFirstIssue = slug.includes("good-first-");
  filters[GOOD_FIRST_ISSUE_KEY] = isGoodFirstIssue;
  const languagePart = isCertified
    ? slug.split("certified")[0]
    : isGoodFirstIssue
      ? slug.split("good-first-open-contributions")[0]
      : slug.split("open-contributions")[0];
  filters.languages = extractValuesFromOptions(
    languagePart,
    filterOptions.languages,
  );

  // Check for 'in' and 'for' and extract interests and projects
  const hasInterests = slug.includes("-in-");
  const hasProjects = slug.includes("-for-");
  filters.interests = extractValuesFromOptions(
    hasInterests
      ? hasProjects
        ? slug.split("-in-")[1].split("-for-")[0]
        : slug.split("-in-")[1]
      : "",
    filterOptions.interests,
  );
  filters.projects = extractValuesFromOptions(
    hasProjects ? slug.split("-for-")[1] : "",
    filterOptions.repositories,
  );

  return filters;
};

const extractValues = (section: string): string[] => {
  if (!section) return [];
  return section.split("-and-").map((s) => s.replace(/-$/, ""));
};

const extractValuesFromOptions = (
  section: string,
  options: FilterOption[],
): FilterOption[] => {
  const labels = extractValues(section);

  return labels
    .map((name) =>
      options.find(
        (project) =>
          project.name.toLocaleLowerCase().replaceAll(" ", "-") === name,
      ),
    )
    .filter((option): option is FilterOption => option !== undefined);
};

export const sanitizeUrl = (url: string): string => {
  return url.replace(/\/+$/, "");
};
