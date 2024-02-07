import ControlledTable from "@/components/controlled-table";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "@/data/fetch";
import { queryDatabase } from "@/lib/notion";
import { fetchFilterOptions } from "@/lib/repository-metadata";
import { PaginatedCustomDataResponse } from "@/types";
import { Contribution } from "@/types/contribution";
import { initFilters } from "@/utils/filters";
import { transformNotionDataToContributions } from "@/utils/notion";

export default async function Home() {
  const filterOptions = await fetchFilterOptions();
  const filters = initFilters();
  const data = await queryDatabase({
    page_size: MAX_PAGE_SIZE,
  });
  const contributions = transformNotionDataToContributions(data);
  const contributionsByRepository: Set<string> = new Set();
  const uniqueContributions: Contribution[] = [];

  contributions.forEach((contribution) => {
    if (!contributionsByRepository.has(contribution.repository)) {
      contributionsByRepository.add(contribution.repository);
      uniqueContributions.push(contribution);
    }
  });
  // const contributionsToShow =
  //   uniqueContributions.length < DEFAULT_PAGE_SIZE
  //     ? contributions
  //     : uniqueContributions.slice(0, DEFAULT_PAGE_SIZE);

  const items: PaginatedCustomDataResponse<Contribution> = {
    data: uniqueContributions,
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
