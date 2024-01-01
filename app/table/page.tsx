import { getGoodFirstIssues } from "@/lib/notion";
import ContributionsTable from "@/components/contributions-table/table";
import { transformNotionDataToContributions } from "@/utils/contribution";

export default async function Page() {
  const data = await getGoodFirstIssues({ page_size: 10 });
  const contributions = transformNotionDataToContributions(data);

  return (
    <div>
      <ContributionsTable items={contributions} />
    </div>
  );
}
