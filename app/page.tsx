import ContributionsTable from "@/components/contributions-table/table";
import Toolbar from "@/components/filters/toolbar";
import CtaBanner from "@/components/cta-banner";
import { title } from "@/components/primitives";
import { queryDatabase } from "@/lib/notion";
import { containerStyle } from "@/styles";
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
    <>
      <section
        className={`flex flex-col items-center text-center pt-10 pb-24 ${containerStyle}`}
      >
        <h1 className={title()}>Find Collaborations,</h1>
        <h1 className={title()}>Collect Kudos</h1>
      </section>
      <section className={containerStyle}>
        <CtaBanner />
      </section>
      <div className="flex flex-col pt-10">
        <Toolbar searchParams={searchParams} />
        <section className={containerStyle}>
          <ContributionsTable
            items={items}
            queries={{
              page_size: 10,
              filter,
            }}
          />
        </section>
      </div>
    </>
  );
}
