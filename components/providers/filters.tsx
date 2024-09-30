import { FiltersProvider } from "@/contexts/filters";
import { getFilterOptions } from "@/lib/filters";
import { FilterOptions } from "@/types/filters";
import { initFilters } from "@/utils/filters";

export async function DefaultFiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const filters = initFilters();
  const filterOptions = await getFilterOptions().catch((error) => {
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
