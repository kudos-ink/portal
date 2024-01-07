"use client";
import { LANGUAGES_OPTIONS, INTERESTS_OPTIONS } from "@/data/filters";
import { useFilters } from "@/hooks/useFilters";
import { SearchParams } from "@/types/filters";
import ClearFilters from "./clear-filters";
import SelectFilter from "./select-filter";

interface IToolbarProps {
  searchParams: SearchParams;
}

const Toolbar = ({ searchParams }: IToolbarProps) => {
  const { filters, updateFilter, clearAllFilters } = useFilters({
    initialParams: searchParams,
  });

  const handleSelect = (paramKey: string) => (value: string) => {
    updateFilter(paramKey, value);
  };

  const hasFilters = Object.keys(filters).length > 0;

  return (
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

      {hasFilters && (
        <ClearFilters onClear={clearAllFilters} value="All filters" />
      )}
    </div>
  );
};

export default Toolbar;
