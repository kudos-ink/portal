import ContributionsTable from "@/components/table/table";
import { DEFAULT_PAGE_SIZE } from "@/data/fetch";
import { queryDatabase } from "@/lib/notion";
import { PaginatedCustomDataResponse } from "@/types";
import { Contribution } from "@/types/contribution";
import { transformNotionDataToContributions } from "@/utils/notion";

export default async function Home() {
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
    <ContributionsTable
      items={items}
      queries={{
        page_size: DEFAULT_PAGE_SIZE,
      }}
    />
  );
}
