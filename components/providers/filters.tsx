import { FiltersProvider } from "@/contexts/filters";
import { getFilterOptions, getProjectFilterOptions } from "@/lib/filters";
import { FilterOptions } from "@/types/filters";
import { initFilters } from "@/utils/filters";

export async function DefaultFiltersProvider({
  children,
  slugs,
}: {
  children: React.ReactNode;
  slugs?: string[];
}) {
  const filters = initFilters();
  const filterOptions = await (
    slugs && slugs.length > 0
      ? getProjectFilterOptions(slugs)
      : getFilterOptions()
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
