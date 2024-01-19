import {
  LANGUAGES_KEY,
  INTEREST_KEY,
  PROJECTS_KEY,
  GOOD_FIRST_ISSUE_KEY,
} from "@/data/filters";

export type FilterOption = {
  label: string;
  emoji: string;
  value: string;
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
  [key in FilterKeys]: string[];
};
