import {
  PROJECTS_KEY,
  GOOD_FIRST_ISSUE_KEY,
  KUDOS_ISSUE_KEY,
  PURPOSE_KEY,
  PROJECT_TYPE_KEY,
  TECHNOLOGY_KEY,
  STACK_LEVEL_KEY,
} from "@/data/filters";

export interface IFilterOption {
  value: string;
  label: string;
  emoji?: string;
}

export type FilterKeys =
  | typeof PURPOSE_KEY
  | typeof PROJECT_TYPE_KEY
  | typeof TECHNOLOGY_KEY
  | typeof STACK_LEVEL_KEY
  | typeof PROJECTS_KEY
  | typeof GOOD_FIRST_ISSUE_KEY
  | typeof KUDOS_ISSUE_KEY;

export type SelectFilterKeys =
  | typeof PURPOSE_KEY
  | typeof PROJECT_TYPE_KEY
  | typeof TECHNOLOGY_KEY
  | typeof STACK_LEVEL_KEY
  | typeof PROJECTS_KEY;

export type BooleanFilterKeys =
  | typeof GOOD_FIRST_ISSUE_KEY
  | typeof KUDOS_ISSUE_KEY;

export type FilterOptions = {
  [key in SelectFilterKeys]: IFilterOption[];
};

export type Filters = FilterOptions & {
  [key in BooleanFilterKeys]: boolean;
};
