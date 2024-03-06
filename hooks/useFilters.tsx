import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FilterKeys,
  FilterOption,
  FilterOptions,
  Filters,
} from "@/types/filters";
import { getNewFilterOption, initFilters } from "@/utils/filters";
import { GOOD_FIRST_ISSUE_KEY, KUDOS_ISSUE_KEY } from "@/data/filters";

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
  const router = useRouter();
  const [filters, setFilters] = useState(initialFilters);
  const [filterOptions, _] = useState(initialFilterOptions);

  const updateFilter = useCallback(
    (key: FilterKeys, values: string[]) => {
      setFilters((prev) => {
        // Handle the boolean value for GOOD_FIRST_ISSUE_KEY & KUDOS_ISSUE_KEY
        if (key === GOOD_FIRST_ISSUE_KEY) {
          return { ...prev, [GOOD_FIRST_ISSUE_KEY]: values.includes("true") };
        } else if (key === KUDOS_ISSUE_KEY) {
          return { ...prev, [KUDOS_ISSUE_KEY]: values.includes("true") };
        }

        const newOptions: FilterOption[] = [];
        values.forEach((value) => {
          const newOption = getNewFilterOption(key, value, filterOptions);
          if (newOption) {
            newOptions.push(newOption);
          }
        });

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
    router.replace("/explore/open-contributions", { scroll: true });
  }, [router]);

  return {
    filters,
    filterOptions,
    updateFilter,
    clearFilter,
    clearAllFilters,
  };
};
