import { unstable_noStore } from "next/cache";
import ControlledTable from "@/components/controlled-table";
import { DEFAULT_PAGE_SIZE } from "@/data/fetch";
import { queryDatabase } from "@/lib/notion";
import { fetchFilterOptions } from "@/lib/repository-metadata";
import { PaginatedCustomDataResponse } from "@/types";
import { Contribution } from "@/types/contribution";
import { initFilters } from "@/utils/filters";
import { transformNotionDataToContributions } from "@/utils/notion";

export default async function Home() {
  unstable_noStore();
  const filterOptions = await fetchFilterOptions();
  const filters = initFilters();
  const data = await queryDatabase({
    page_size: DEFAULT_PAGE_SIZE,
  });
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
