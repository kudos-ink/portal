import {
  LANGUAGES_KEY,
  INTEREST_KEY,
  PROJECTS_KEY,
  GOOD_FIRST_ISSUE_KEY,
} from "@/data/filters";

export type FilterOption = {
  name: string;
  emoji: string;
  value: string;
  interests?: string[];
  id?: string;
  icon?: string;
  repository_url?: string;
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
  | typeof GOOD_FIRST_ISSUE_KEY;

export type Filters = {
  [key in Exclude<FilterKeys, typeof GOOD_FIRST_ISSUE_KEY>]: FilterOption[];
} & {
  [GOOD_FIRST_ISSUE_KEY]: boolean;
};

export interface Repository extends FilterOption {
  repository_url: string;
  topics: string[];
  about: string;
  icon: string;
}
