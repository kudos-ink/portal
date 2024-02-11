import StaticTable from "@/components/table/static-table";
import Toolbar from "@/components/filters/toolbar";
import { container } from "@/components/primitives";
import { FiltersProvider } from "@/contexts/filters";
import { queryDatabase } from "@/lib/notion";
import { fetchFilterOptions } from "@/lib/repository-metadata";
import { initFilters } from "@/utils/filters";
import { transformNotionDataToContributions } from "@/utils/notion";

export default async function Home() {
  const filterOptions = await fetchFilterOptions();
  const filters = initFilters();
  const data = await queryDatabase();
  const contributions = transformNotionDataToContributions(data);

  return (
    <FiltersProvider
      initialFilters={filters}
      initialFilterOptions={filterOptions}
    >
      <div className="flex flex-col">
        <Toolbar />
        <section className={container()}>
          <StaticTable data={contributions} />
        </section>
      </div>
    </FiltersProvider>
  );
}
