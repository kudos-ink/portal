import { getGoodFirstIssues } from "@/lib/notion";
import ContributionsTable from "@/components/contributions-table/table";
import { transformNotionDataToContributions } from "@/utils/contribution";

export default async function Page() {
  const data = await getGoodFirstIssues({ page_size: 10 });
  const contributions = transformNotionDataToContributions(data);
  const items = {
    data: contributions,
    hasMore: data.has_more,
    nextCursor: data.next_cursor ?? undefined,
  };

  return (
    <div>
      <ContributionsTable items={items} />
    </div>
  );
}
