"use client";
import { useCallback, useRef } from "react";
import { container } from "@/components/primitives";
import { useFilters } from "@/contexts/filters";
import useSticky from "@/hooks/useSticky";
import { FilterKeys } from "@/types/filters";
import { countNonEmptyFilters } from "@/utils/filters";
import { selectFilters, checkboxFilters } from "./config";
import CheckboxFilter from "./checkbox-filter";
import ClearFilters from "./clear-filters";
import SelectFilter from "./select-filter";

interface IToolbarProps {
  label: string;
}

const Toolbar = ({ label }: IToolbarProps) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const isToolbarSticky = useSticky(toolbarRef);

  const { filters, updateFilter, clearFilter, clearAllFilters, filterOptions } =
    useFilters();

  selectFilters.forEach(
    (filter) => (filter.options = filterOptions[filter.key]),
  );

  const handleSelect = useCallback(
    (key: FilterKeys) => (values: string[]) => {
      values.length > 0 ? updateFilter(key, values) : clearFilter(key);
    },
    [updateFilter, clearFilter],
  );

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
            {selectFilters.map(({ key, options }) => (
              <SelectFilter
                key={key}
                placeholder={key}
                options={options}
                selectKeys={filters[key].map(({ value }) => value)}
                onSelect={handleSelect(key)}
                filterOptions={filterOptions}
              />
            ))}
            <div className="flex gap-8">
              {checkboxFilters.map(({ key, placeholder, content, icon }) => (
                <CheckboxFilter
                  key={key}
                  paramKey={key}
                  placeholder={placeholder}
                  content={content}
                  icon={icon}
                  isSelected={filters[key]}
                  onSelect={handleSelect(key)}
                  filterOptions={filterOptions}
                />
              ))}
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
