"use client";
import {
  LANGUAGES_OPTIONS,
  INTERESTS_OPTIONS,
  PROJECTS_OPTIONS,
} from "@/data/filters";
import { useFilters } from "@/hooks/useFilters";
import { SearchParams } from "@/types/filters";
import ClearFilters from "./clear-filters";
import SelectFilter from "./select-filter";
interface IToolbarProps {
  searchParams: SearchParams;
}

const Toolbar = ({ searchParams }: IToolbarProps) => {
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
  );
};

export default Toolbar;
