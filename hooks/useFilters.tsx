import { useCallback, useState } from "react";
import { FilterKeys, FilterOptions, Filters } from "@/types/filters";
import { initFilters } from "@/utils/filters";
import { KUDOS_TASK_KEY } from "@/data/filters";

export interface IConfigProps {
  initialFilters: Filters;
  initialFilterOptions: FilterOptions;
}

export interface IFiltersContext {
  filters: Filters;
  filterOptions: FilterOptions;
  updateFilter: (key: FilterKeys, values: string[]) => void;
  clearFilter: (key: FilterKeys) => void;
  clearAllFilters: () => void;
}

export const useFilters = ({
  initialFilters,
  initialFilterOptions,
}: IConfigProps): IFiltersContext => {
  const [filters, setFilters] = useState(initialFilters);
  const [filterOptions, _] = useState(initialFilterOptions);

  const updateFilter = useCallback(
    (key: FilterKeys, values: string[]) => {
      setFilters((prev) => {
        // Boolean keys
        if (key === KUDOS_TASK_KEY) {
          return { ...prev, [key]: values.includes("true") };
        }

        // Select filter options
        const newOptions = values
          .map((value) =>
            filterOptions[key].find((option) => option.value === value),
          )
          .filter((option) => option !== undefined);

        return { ...prev, [key]: newOptions };
      });
    },
    [filterOptions],
  );

  const clearFilter = useCallback(
    (key: FilterKeys) => setFilters((prev) => ({ ...prev, [key]: [] })),
    [],
  );

  const clearAllFilters = useCallback(() => {
    const emptyFilters = initFilters();
    setFilters(emptyFilters);
  }, []);

  return {
    filters,
    filterOptions,
    updateFilter,
    clearFilter,
    clearAllFilters,
  };
};
