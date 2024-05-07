import {
  LANGUAGES_KEY,
  INTEREST_KEY,
  PROJECTS_KEY,
  GOOD_FIRST_ISSUE_KEY,
  KUDOS_ISSUE_KEY,
  PURPOSE_KEY,
  PROJECT_TYPE_KEY,
  TECHNOLOGY_KEY,
  STACK_LEVEL_KEY,
} from "@/data/filters";

// TODO: Replace FilterOption by NewFilterOption and rename
export type FilterOption = {
  name: string;
  emoji: string;
  value: string;
  interests?: string[];
  id?: string;
  icon?: string;
  repository_url?: string;
};

export type NewFilterOption = {
  value: string;
  label: string;
  emoji?: string;
};

export type NewFilterKeys =
  | typeof PURPOSE_KEY
  | typeof PROJECT_TYPE_KEY
  | typeof TECHNOLOGY_KEY
  | typeof STACK_LEVEL_KEY
  | typeof PROJECTS_KEY;

export type NewFilters = {
  [key in NewFilterKeys]: NewFilterOption[];
};

export type FilterOptions = {
  interests: FilterOption[];
  languages: FilterOption[];
  repositories: Repository[];
};

export type SearchParams = {
  [key: string]: string | undefined;
};

export type FilterKeys =
  | typeof LANGUAGES_KEY
  | typeof INTEREST_KEY
  | typeof PROJECTS_KEY
  | typeof GOOD_FIRST_ISSUE_KEY
  | typeof KUDOS_ISSUE_KEY;

type ExcludedFilterKeys = Exclude<
  FilterKeys,
  typeof GOOD_FIRST_ISSUE_KEY | typeof KUDOS_ISSUE_KEY
>;

export type Filters = {
  [key in ExcludedFilterKeys]: FilterOption[];
} & {
  [GOOD_FIRST_ISSUE_KEY]: boolean;
  [KUDOS_ISSUE_KEY]: boolean;
};

export interface Repository extends FilterOption {
  repository_url: string;
  topics: string[];
  about: string;
  icon: string;
  project: string;
}
