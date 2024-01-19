import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { FilterKeys, Filters } from "@/types/filters";
import { initFilters } from "@/utils/filters";

export interface IConfigProps {
  initialFilters: Filters;
}

export interface IFiltersContext {
  filters: Filters;
  updateFilter: (key: FilterKeys, values: string[]) => void;
  clearFilter: (key: FilterKeys) => void;
  clearAllFilters: () => void;
}

export const useFilters = ({
  initialFilters,
}: IConfigProps): IFiltersContext => {
  const router = useRouter();
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = useCallback((key: FilterKeys, values: string[]) => {
    setFilters((prev) => {
      const updatedArray = prev[key] ? [...prev[key]] : [];

      values.forEach((value) => {
        const valueIndex = updatedArray.indexOf(value);
        if (valueIndex >= 0) {
          // If the value exists, remove it
          updatedArray.splice(valueIndex, 1);
        } else {
          // If the value doesn't exist, add it
          updatedArray.push(value);
        }
      });

      return { ...prev, [key]: updatedArray };
    });
  }, []);

  const clearFilter = useCallback(
    (key: FilterKeys) => setFilters((prev) => ({ ...prev, [key]: [] })),
    [],
  );

  const clearAllFilters = useCallback(() => {
    const emptyFilters = initFilters();
    setFilters(emptyFilters);
    router.replace("/explore/open-contributions", { scroll: false });
  }, [router]);

  return {
    filters,
    updateFilter,
    clearFilter,
    clearAllFilters,
  };
};
