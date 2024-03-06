"use client";
import { useRef } from "react";
import { KudosCertifiedIcon, InfoIcon } from "@/assets/icons";
import { KudosIssueTooltipContent } from "@/components/table/row";
import { container } from "@/components/primitives";
import { useFilters } from "@/contexts/filters";
import {
  GOOD_FIRST_ISSUE_KEY,
  GOOD_FIRST_ISSUE_LABELS,
  INTEREST_KEY,
  KUDOS_ISSUE_KEY,
  LANGUAGES_KEY,
  PROJECTS_KEY,
} from "@/data/filters";
import useSticky from "@/hooks/useSticky";
import CheckboxFilter from "./checkbox-filter";
import ClearFilters from "./clear-filters";
import SelectFilter from "./select-filter";
import { FilterKeys } from "@/types/filters";
import { countNonEmptyFilters } from "@/utils/filters";

interface IToolbarProps {
  label: string;
}

const Toolbar = ({ label }: IToolbarProps) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const isToolbarSticky = useSticky(toolbarRef);

  const { filters, updateFilter, clearFilter, clearAllFilters, filterOptions } =
    useFilters();
  const { languages, interests, repositories } = filterOptions;
  const handleSelect = (key: FilterKeys) => (values: string[]) => {
    if (values.length > 0) {
      updateFilter(key, values);
    } else {
      clearFilter(key);
    }
  };
  const numberOfFilters = countNonEmptyFilters(filters);

  return (
    <div
      className={`sticky top-0 z-10 transition-colors ease-in ${
        isToolbarSticky ? "bg-background" : "bg-transparent"
      }`}
      ref={toolbarRef}
    >
      <div className={`pt-6 flex flex-col gap-4 ${container()}`}>
        <div className="flex flex-col gap-4 items-start overflow-hidden lg:flex-row lg:items-center">
          <div className="flex flex-nowrap overflow-x-auto overflow-y-hidden gap-8 w-full sm:w-auto xl:overflow-visible">
            <div className="flex gap-4">
              <SelectFilter
                placeholder={LANGUAGES_KEY}
                mainEmoji="🌐"
                options={languages}
                selectKeys={filters.languages.map(({ value }) => value)}
                onSelect={handleSelect(LANGUAGES_KEY)}
                filterOptions={filterOptions}
              />
              <SelectFilter
                placeholder={INTEREST_KEY}
                mainEmoji="🪄"
                options={interests}
                selectKeys={filters.interests.map(({ value }) => value)}
                onSelect={handleSelect(INTEREST_KEY)}
                filterOptions={filterOptions}
              />
              <SelectFilter
                placeholder={PROJECTS_KEY}
                mainEmoji="🖥️"
                options={repositories}
                selectKeys={filters.projects.map(({ value }) => value)}
                onSelect={handleSelect(PROJECTS_KEY)}
                filterOptions={filterOptions}
              />
            </div>
            <div className="flex gap-8">
              <CheckboxFilter
                paramKey={GOOD_FIRST_ISSUE_KEY}
                placeholder="Good first issues Only"
                content={
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
                }
                icon={<InfoIcon className="text-default-500" size={16} />}
                isSelected={filters[GOOD_FIRST_ISSUE_KEY]}
                onSelect={handleSelect(GOOD_FIRST_ISSUE_KEY)}
                filterOptions={filterOptions}
              />
              <CheckboxFilter
                paramKey={KUDOS_ISSUE_KEY}
                placeholder="Kudos Issues Only"
                content={<KudosIssueTooltipContent />}
                icon={<KudosCertifiedIcon className="w-5 h-5" size={16} />}
                isSelected={filters[KUDOS_ISSUE_KEY]}
                onSelect={handleSelect(KUDOS_ISSUE_KEY)}
                filterOptions={filterOptions}
              />
            </div>
          </div>

          {numberOfFilters > 1 && (
            <ClearFilters
              onClear={clearAllFilters}
              value="Clear all filters"
              filterOptions={filterOptions}
            />
          )}
        </div>
        <div className="py-4 px-3 bg-default-100 border-small rounded-t-md">
          <span className="text-lg font-bold">{label}</span>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
