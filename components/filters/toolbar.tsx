"use client";
import {
  LANGUAGES_OPTIONS,
  INTERESTS_OPTIONS,
  PROJECTS_OPTIONS,
} from "@/data/filters";
import { useFilters } from "@/hooks/useFilters";
import useSticky from "@/hooks/useSticky";
import { SearchParams } from "@/types/filters";
import ClearFilters from "./clear-filters";
import SelectFilter from "./select-filter";
import { useRef } from "react";
interface IToolbarProps {
  searchParams: SearchParams;
}

const Toolbar = ({ searchParams }: IToolbarProps) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const isToolbarSticky = useSticky(toolbarRef);

  const { filters, updateFilter, clearFilter, clearAllFilters } = useFilters({
    initialParams: searchParams,
  });

  const handleSelect = (paramKey: string) => (value: string) => {
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
      <div className="container mx-auto max-w-7xl px-6 pt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4 items-start overflow-hidden lg:flex-row lg:items-center">
          <div className="flex flex-nowrap overflow-x-auto gap-4 w-full sm:w-auto">
            <SelectFilter
              placeholder="Languages"
              mainEmoji="🌐"
              options={LANGUAGES_OPTIONS}
              selectedKey={filters.languages}
              onSelect={handleSelect("languages")}
            />
            <SelectFilter
              placeholder="Interests"
              mainEmoji="🪄"
              options={INTERESTS_OPTIONS}
              selectedKey={filters.interests}
              onSelect={handleSelect("interests")}
            />
            <SelectFilter
              placeholder="Projects"
              mainEmoji="🖥️"
              options={PROJECTS_OPTIONS}
              selectedKey={filters.projects}
              onSelect={handleSelect("projects")}
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
