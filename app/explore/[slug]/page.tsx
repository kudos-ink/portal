import { PaginatedCustomDataResponse } from "@/types";
import { Contribution } from "@/types/contribution";
import {
  processNotionFilters,
  transformNotionDataToContributions,
} from "@/utils/notion";
import { decodingSlug } from "@/utils/url";
import { queryDatabase } from "@/lib/notion";
import ControlledTable from "@/components/controlled-table";

export default async function ExplorePage({
  params,
}: {
  params: { slug: string };
}) {
  const filters = decodingSlug(params.slug);
  const queryFilter = processNotionFilters(filters);
  const data = await queryDatabase({
    page_size: 10,
    filter: queryFilter,
  });
  const contributions = transformNotionDataToContributions(data);
  const items: PaginatedCustomDataResponse<Contribution> = {
    data: contributions,
    hasMore: data.has_more,
    nextCursor: data.next_cursor ?? undefined,
  };
  return (
    <>
      <div className="pt-10">
        <ControlledTable
          items={items}
          filters={filters}
          queryFilter={queryFilter}
        />
      </div>
    </>
  );
}
