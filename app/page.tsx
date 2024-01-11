import ContributionsTable from "@/components/contributions-table/table";
import Toolbar from "@/components/filters/toolbar";
import { title } from "@/components/primitives";
import { queryDatabase } from "@/lib/notion";
import { SearchParams } from "@/types/filters";
import {
  processNotionFilters,
  transformNotionDataToContributions,
} from "@/utils/notion";

interface IHomeProps {
  searchParams: SearchParams;
}

export default async function Home({ searchParams }: IHomeProps) {
  const filter = processNotionFilters(searchParams);
  const data = await queryDatabase({
    page_size: 10,
    filter,
  });
  const contributions = transformNotionDataToContributions(data);
  const items = {
    data: contributions,
    hasMore: data.has_more,
    nextCursor: data.next_cursor ?? undefined,
  };

  return (
    <div>
      <section className="flex flex-col items-center text-center pt-10 pb-28">
        <h1 className={title()}>Find Collaborations,</h1>
        <h1 className={title()}>Collect Kudos</h1>
      </section>
      <div className="flex flex-col gap-4">
        <Toolbar searchParams={searchParams} />
        <div>
          <ContributionsTable
            items={items}
            queries={{
              page_size: 10,
              filter,
            }}
          />
        </div>
      </div>
    </div>
  );
}
