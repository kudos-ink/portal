"use client";
import { useRef } from "react";
import { container } from "@/components/primitives";
import { useFilters } from "@/contexts/filters";
import {
  LANGUAGES_OPTIONS,
  INTERESTS_OPTIONS,
  PROJECTS_OPTIONS,
  GOOD_FIRST_ISSUE_KEY,
  INTEREST_KEY,
  LANGUAGES_KEY,
  PROJECTS_KEY,
} from "@/data/filters";
import useSticky from "@/hooks/useSticky";
import { SearchParams } from "@/types/filters";
import CheckboxFilter from "./checkbox-filter";
import ClearFilters from "./clear-filters";
import SelectFilter from "./select-filter";
interface IToolbarProps {
  searchParams: SearchParams;
}

const Toolbar = ({ searchParams }: IToolbarProps) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const isToolbarSticky = useSticky(toolbarRef);

  const { filters, updateFilter, clearFilter, clearAllFilters } = useFilters();

  const handleSelect = (paramKey: string) => (value: string | null) => {
    if (value) {
      updateFilter(paramKey, value);
    } else {
      clearFilter(paramKey);
    }
  };
  const numberOfFilters = Object.keys(filters).length;

  return (
    <div
      className={`sticky top-0 z-10 bg-background ${
        isToolbarSticky ? "bg-background" : "bg-transparent"
      }`}
      ref={toolbarRef}
    >
      <div className={`pt-6 flex flex-col gap-4 ${container()}`}>
        <div className="flex flex-col gap-4 items-start overflow-hidden lg:flex-row lg:items-center">
          <div className="flex flex-nowrap overflow-x-auto overflow-y-hidden gap-4 w-full sm:w-auto xl:overflow-visible">
            <SelectFilter
              placeholder={LANGUAGES_KEY}
              mainEmoji="🌐"
              options={LANGUAGES_OPTIONS}
              selectedKey={filters.languages}
              onSelect={handleSelect(LANGUAGES_KEY)}
            />
            <SelectFilter
              placeholder={INTEREST_KEY}
              mainEmoji="🪄"
              options={INTERESTS_OPTIONS}
              selectedKey={filters.interests}
              onSelect={handleSelect(INTEREST_KEY)}
            />
            <SelectFilter
              placeholder={PROJECTS_KEY}
              mainEmoji="🖥️"
              options={PROJECTS_OPTIONS}
              selectedKey={filters.projects}
              onSelect={handleSelect(PROJECTS_KEY)}
            />
            <CheckboxFilter
              paramKey={GOOD_FIRST_ISSUE_KEY}
              placeholder="Good first issues Only"
              isSelected={filters[GOOD_FIRST_ISSUE_KEY] === "true"}
              onSelect={handleSelect(GOOD_FIRST_ISSUE_KEY)}
            />
          </div>

          {numberOfFilters > 1 && (
            <ClearFilters onClear={clearAllFilters} value="Clear all filters" />
          )}
        </div>
        <div className="py-4 px-3 bg-default-100 border-small rounded-t-md">
          <span className="text-lg font-bold">Good First Contributions</span>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
