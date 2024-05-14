import { InfoIcon, KudosCertifiedIcon } from "@/assets/icons";
import {
  TECHNOLOGY_KEY,
  PURPOSE_KEY,
  PROJECTS_KEY,
  STACK_LEVEL_KEY,
  PROJECT_TYPE_KEY,
  GOOD_FIRST_ISSUE_KEY,
  GOOD_FIRST_ISSUE_LABELS,
  KUDOS_ISSUE_KEY,
} from "@/data/filters";
import {
  SelectFilterKeys,
  IFilterOption,
  BooleanFilterKeys,
} from "@/types/filters";
import { KudosIssueTooltipContent } from "../table/row";

interface SelectFilterConfig {
  key: SelectFilterKeys;
  options: IFilterOption[];
}

interface CheckboxFilterConfig {
  key: BooleanFilterKeys;
  placeholder: string;
  content: JSX.Element;
  icon: JSX.Element;
}

const selectFilters: SelectFilterConfig[] = [
  { key: TECHNOLOGY_KEY, options: [] },
  { key: PURPOSE_KEY, options: [] },
  { key: PROJECTS_KEY, options: [] },
  { key: STACK_LEVEL_KEY, options: [] },
  { key: PROJECT_TYPE_KEY, options: [] },
];

const checkboxFilters: CheckboxFilterConfig[] = [
  {
    key: GOOD_FIRST_ISSUE_KEY,
    placeholder: "Good first issues Only",
    content: (
      <div className="px-1 py-2">
        <div className="text-small font-bold">
          Based on the following GitHub labels
        </div>
        {GOOD_FIRST_ISSUE_LABELS.map((label, idx) => (
          <div className="text-tiny" key={idx}>
            • {label}
          </div>
        ))}
      </div>
    ),
    icon: <InfoIcon className="text-default-500" size={16} />,
  },
  {
    key: KUDOS_ISSUE_KEY,
    placeholder: "Kudos Issues Only",
    content: <KudosIssueTooltipContent />,
    icon: <KudosCertifiedIcon className="w-5 h-5" size={16} />,
  },
];

export { selectFilters, checkboxFilters };
