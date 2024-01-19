import { FilterKeys, FilterOption, Filters } from "@/types/filters";
import {
  GOOD_FIRST_ISSUE_KEY,
  LANGUAGES_OPTIONS,
  PROJECTS_OPTIONS,
} from "@/data/filters";
import { initFilters } from "./filters";

type Keys = FilterKeys | typeof GOOD_FIRST_ISSUE_KEY;

export const createUrl = (key: string, values: string[], pathname: string) => {
  const slugParts = pathname.split("/");
  const currentSlug = slugParts[slugParts.length - 1];

  // Decode existing filters from the slug
  let filters = decodingSlug(currentSlug);

  // Update the specific filter based on the provided key and value
  const keyLowerCase = key.toLowerCase() as Keys;
  if (values.length > 0) {
    // Add the new value to the existing array for the specific filter, avoiding duplicates
    if (keyLowerCase === GOOD_FIRST_ISSUE_KEY) {
      filters[GOOD_FIRST_ISSUE_KEY] = values;
    } else {
      const updatedValues = new Set([
        ...(filters[keyLowerCase] as string[]),
        ...values,
      ]);
      filters[keyLowerCase] = Array.from(updatedValues);
    }
  } else {
    if (keyLowerCase === GOOD_FIRST_ISSUE_KEY) {
      filters[GOOD_FIRST_ISSUE_KEY] = ["false"];
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
    values: string[] | undefined,
    prefix: string = "",
  ): string => {
    if (!values || values.length === 0) {
      return "";
    }
    return `${prefix}${values.join("-and-").toLowerCase()}`;
  };

  const projectLabels = projects.map(extractProjectLabel);

  const languagesSegment = createSegment(languages);
  const interestsSegment = createSegment(interests, "in-");
  const projectsSegment = createSegment(projectLabels, "for-");
  const goodFirstSegment = filters[GOOD_FIRST_ISSUE_KEY].includes("true")
    ? "good-first"
    : "";

  let urlParts = [
    languagesSegment,
    goodFirstSegment,
    "open-contributions",
    interestsSegment,
    projectsSegment,
  ];
  return urlParts.filter((part) => part).join("-");
};

export const decodingSlug = (slug: string): Filters => {
  const filters = initFilters();

  // Check for 'good-first' and extract languages
  const isGoodFirstIssue = slug.includes("good-first-");
  filters[GOOD_FIRST_ISSUE_KEY] = isGoodFirstIssue ? ["true"] : ["false"];
  const languagePart = isGoodFirstIssue
    ? slug.split("good-first-open-contributions")[0]
    : slug.split("open-contributions")[0];
  filters.languages = extractValuesFromOptions(languagePart, LANGUAGES_OPTIONS);

  // Check for 'in' and 'for' and extract interests and projects
  const hasInterests = slug.includes("-in-");
  const hasProjects = slug.includes("-for-");
  filters.interests = extractValues(
    hasInterests
      ? hasProjects
        ? slug.split("-in-")[1].split("-for-")[0]
        : slug.split("-in-")[1]
      : "",
  );
  filters.projects = extractValuesFromOptions(
    hasProjects ? slug.split("-for-")[1] : "",
    PROJECTS_OPTIONS,
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
): string[] => {
  const labels = extractValues(section);

  return labels
    .map(
      (label) =>
        options.find(
          (project) =>
            project.label.toLocaleLowerCase().replaceAll(" ", "-") === label,
        )?.value,
    )
    .filter((value): value is string => value !== undefined);
};

const extractProjectLabel = (value: string): string => {
  const maybeProject = PROJECTS_OPTIONS.find(
    (project) => project.value === value,
  );

  if (!maybeProject) {
    return "";
  }

  return maybeProject.label.toLocaleLowerCase().replaceAll(" ", "-");
};
