import { FiltersProvider } from "@/contexts/filters";
import { getFilterOptions, getProjectFilterOptions } from "@/lib/filters";
import { FilterOptions } from "@/types/filters";
import { initFilters } from "@/utils/filters";

export async function DefaultFiltersProvider({
  children,
  repositoryIds,
}: {
  children: React.ReactNode;
  repositoryIds?: number[];
}) {
  const filters = initFilters();
  const filterOptions = await (
    repositoryIds ? getProjectFilterOptions(repositoryIds) : getFilterOptions()
  ).catch((error) => {
    console.error("Error fetching filter options:", error);
    return {} as FilterOptions;
  });

  return (
    <FiltersProvider
      initialFilters={filters}
      initialFilterOptions={filterOptions}
    >
      {children}
    </FiltersProvider>
  );
}
