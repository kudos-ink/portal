import { useCallback, useState } from "react";
import { SearchParams } from "@/types/filters";

export interface IConfigProps {
  initialParams: SearchParams;
}

export interface IFiltersContext {
  filters: SearchParams;
  updateFilter: (key: string, value?: string) => void;
  clearFilter: (key: string) => void;
  clearAllFilters: () => void;
}

export const useFilters = ({
  initialParams,
}: IConfigProps): IFiltersContext => {
  const [filters, setFilters] = useState(initialParams);

  const updateFilter = useCallback((key: string, value?: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilter = useCallback((key: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    filters,
    updateFilter,
    clearFilter,
    clearAllFilters,
  };
};
