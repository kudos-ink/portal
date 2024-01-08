"use client";
import { LANGUAGES_OPTIONS, INTERESTS_OPTIONS, PROJECTS_OPTIONS } from "@/data/filters";
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
  const clearLanguagesFilter = () => {
    clearFilter('languages')
  }
  const clearInterestsFilter = () => {
    clearFilter('interests')
  }
  const clearProjectsFilter = () => {
    clearFilter('projects')
  }
  const numberOfFilters = Object.keys(filters).length;

  return (
    <>
      <div className="flex justify-around items-stretch gap-4">
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

      {
        numberOfFilters > 0 &&
        <div className="flex justify-left items-stretch gap-4">

          {searchParams?.languages && (
            <ClearFilters onClear={clearLanguagesFilter} value={searchParams.languages} param="languages" />
          )}
          {searchParams?.interests && (
            <ClearFilters onClear={clearInterestsFilter} value={searchParams.interests} param="interests" />
          )}
          {searchParams?.projects && (
            <ClearFilters onClear={clearProjectsFilter} value={searchParams.projects} param="projects" />
          )}
          {numberOfFilters > 1 && (
            <ClearFilters onClear={clearAllFilters} value="All filters" />
          )}
        </div>

      }
    </>
  );
};

export default Toolbar;
