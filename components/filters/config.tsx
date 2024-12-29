import type { JSX } from "react";
import { KudosCertifiedIcon } from "@/assets/icons";
import {
  TECHNOLOGY_KEY,
  PURPOSE_KEY,
  PROJECTS_KEY,
  STACK_LEVEL_KEY,
  PROJECT_TYPE_KEY,
  KUDOS_ISSUE_KEY,
} from "@/data/filters";
import {
  SelectFilterKeys,
  IFilterOption,
  BooleanFilterKeys,
} from "@/types/filters";
import { KudosIssueTooltipContent } from "../table/row";

export interface SelectFilterConfig {
  key: SelectFilterKeys;
  options: IFilterOption[];
  isAdvanced?: boolean;
}

export interface CheckboxFilterConfig {
  key: BooleanFilterKeys;
  placeholder: string;
  content: JSX.Element;
  icon: JSX.Element;
  isAdvanced?: boolean;
}

const DEFAULT_SELECT_FILTERS: SelectFilterConfig[] = [
  { key: TECHNOLOGY_KEY, options: [] },
  { key: PURPOSE_KEY, options: [] },
  { key: PROJECT_TYPE_KEY, options: [] },
  { key: STACK_LEVEL_KEY, options: [] },
  // { key: PROJECTS_KEY, options: [], isAdvanced: true },
];

const DEFAULT_CHECKBOX_FILTERS: CheckboxFilterConfig[] = [
  {
    key: KUDOS_ISSUE_KEY,
    placeholder: "Kudos Issues Only",
    content: <KudosIssueTooltipContent />,
    icon: <KudosCertifiedIcon className="w-5 h-5" size={16} />,
  },
];

export { DEFAULT_SELECT_FILTERS, DEFAULT_CHECKBOX_FILTERS };
