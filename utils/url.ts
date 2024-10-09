import {
  FilterKeys,
  IFilterOption,
  FilterOptions,
  Filters,
} from "@/types/filters";
import {
  GOOD_FIRST_ISSUE_KEY,
  KUDOS_ISSUE_KEY,
  PROJECTS_KEY,
  PROJECT_TYPE_KEY,
  PURPOSE_KEY,
  STACK_LEVEL_KEY,
} from "@/data/filters";
import { initFilters } from "./filters";

type Keys = FilterKeys;

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

  // Boolean keys
  if (
    keyLowerCase === GOOD_FIRST_ISSUE_KEY ||
    keyLowerCase === KUDOS_ISSUE_KEY
  ) {
    filters[keyLowerCase] = values.includes("true");
  } else {
    // Select filter options, avoid duplicates
    filters[keyLowerCase] = values
      .map((value) =>
        filterOptions[keyLowerCase]?.find((option) => option.value === value),
      )
      .filter((option): option is IFilterOption => option !== undefined);
  }

  // Use encodingSlug to create a slug from the updated filters
  const newSlug = encodingSlug(filters);

  // Reconstruct the pathname with the new slug
  slugParts[slugParts.length - 1] = newSlug;
  return slugParts.join("/");
};

export const encodingSlug = (filters: Filters): string => {
  const { technologies, purposes, projects } = filters;

  const createSegment = (
    options: IFilterOption[] | undefined,
    prefix: string = "",
  ): string => {
    if (!options || options.length === 0) {
      return "";
    }
    return `${prefix}${options
      .map(({ label }) => label.toLocaleLowerCase().replaceAll(" ", "-"))
      .join("-and-")
      .toLowerCase()}`;
  };

  const technologiesSegment = createSegment(technologies);
  const projectTypesSegment = createSegment(filters[PROJECT_TYPE_KEY], "for-");
  const stackLevelsSegment = createSegment(filters[STACK_LEVEL_KEY], "level-");
  const purposesSegment = createSegment(purposes, "in-");
  const projectsSegment = createSegment(projects, "at-");
  const goodFirstSegment = filters[GOOD_FIRST_ISSUE_KEY] ? "good-first" : "";
  const certifiedSegment = filters[KUDOS_ISSUE_KEY] ? "certified" : "";

  let urlParts = [
    technologiesSegment,
    certifiedSegment,
    goodFirstSegment,
    "open-contributions",
    projectTypesSegment,
    stackLevelsSegment,
    purposesSegment,
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
  const isGoodFirstIssue = slug.includes("good-first-");
  filters[KUDOS_ISSUE_KEY] = isCertified;
  filters[GOOD_FIRST_ISSUE_KEY] = isGoodFirstIssue;

  const technologiesPart = isCertified
    ? slug.split("certified")[0]
    : isGoodFirstIssue
      ? slug.split("good-first-open-contributions")[0]
      : slug.split("open-contributions")[0];
  filters.technologies = extractValuesFromOptions(
    technologiesPart,
    filterOptions.technologies,
  );

  // Check for 'in', "at-", "level-" and 'for' and extract queries
  const hasProjectTypes = slug.includes("-for-");
  const hasStackLevel = slug.includes("-level-");
  const hasPurposes = slug.includes("-in-");
  const hasProjects = slug.includes("-at-");

  filters[PROJECT_TYPE_KEY] = extractValuesFromOptions(
    hasProjectTypes
      ? hasStackLevel
        ? slug.split("-for-")[1].split("-level-")[0]
        : hasPurposes
          ? slug.split("-for-")[1].split("-in-")[0]
          : hasProjects
            ? slug.split("-for-")[1].split("-at-")[0]
            : slug.split("-for-")[1]
      : "",
    filterOptions[PROJECT_TYPE_KEY],
  );
  filters[STACK_LEVEL_KEY] = extractValuesFromOptions(
    hasStackLevel
      ? hasPurposes
        ? slug.split("-level-")[1].split("-in-")[0]
        : hasProjects
          ? slug.split("-level-")[1].split("-at-")[0]
          : slug.split("-level-")[1]
      : "",
    filterOptions[STACK_LEVEL_KEY],
  );
  filters[PURPOSE_KEY] = extractValuesFromOptions(
    hasPurposes
      ? hasProjects
        ? slug.split("-in-")[1].split("-at-")[0]
        : slug.split("-in-")[1]
      : "",
    filterOptions[PURPOSE_KEY],
  );
  filters[PROJECTS_KEY] = extractValuesFromOptions(
    hasProjects ? slug.split("-at-")[1] : "",
    filterOptions[PROJECTS_KEY],
  );

  return filters;
};

const extractValues = (section: string): string[] => {
  if (!section) return [];
  return section.split("-and-").map((s) => s.replace(/-$/, ""));
};

const extractValuesFromOptions = (
  section: string,
  options: IFilterOption[],
): IFilterOption[] => {
  const labels = extractValues(section);

  return labels
    .map((name) =>
      options.find(
        (project) =>
          project.label.toLocaleLowerCase().replaceAll(" ", "-") === name,
      ),
    )
    .filter((option): option is IFilterOption => option !== undefined);
};

export const sanitizeUrl = (url: string): string => {
  return url.replace(/\/+$/, "");
};

export function serializeQueryParams(params: Record<string, any>): string {
  return Object.keys(params)
    .filter((key) => {
      const value = params[key];
      return value != null && (!Array.isArray(value) || value.length > 0);
    })
    .map((key) => {
      const value = params[key];
      const formattedValue = Array.isArray(value) ? value.join(",") : value;
      return `${encodeURIComponent(key)}=${encodeURIComponent(formattedValue)}`;
    })
    .join("&");
}

export function prepareUrl(url: string, query: Record<string, any>) {
  const queryString = serializeQueryParams(query);
  return `${url}${queryString ? `?${queryString}` : ""}`;
}
