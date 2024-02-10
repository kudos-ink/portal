import ControlledTable from "@/components/controlled-table";
import { queryDatabase } from "@/lib/notion";
import { fetchFilterOptions } from "@/lib/repository-metadata";
import { PaginatedCustomDataResponse } from "@/types";
import { Contribution } from "@/types/contribution";
import { initFilters } from "@/utils/filters";
import { transformNotionDataToContributions } from "@/utils/notion";

export default async function Home() {
  const filterOptions = await fetchFilterOptions();
  const filters = initFilters();
  const data = await queryDatabase();
  const contributions = transformNotionDataToContributions(data);
  const items: PaginatedCustomDataResponse<Contribution> = {
    data: contributions,
    hasMore: data.has_more,
    nextCursor: data.next_cursor ?? undefined,
  };

  return (
    <ControlledTable
      filters={filters}
      items={items}
      queryFilter={undefined}
      filterOptions={filterOptions}
    />
  );
}
