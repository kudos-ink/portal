import ControlledTable from "@/components/controlled-table";
import CtaBanner from "@/components/cta-banner";
import { container, title } from "@/components/primitives";
import { queryDatabase } from "@/lib/notion";
import { PaginatedCustomDataResponse } from "@/types";
import { Contribution } from "@/types/contribution";
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
  const items: PaginatedCustomDataResponse<Contribution> = {
    data: contributions,
    hasMore: data.has_more,
    nextCursor: data.next_cursor ?? undefined,
  };

  return (
    <>
      <section
        className={`flex flex-col items-center text-center pt-10 pb-24 ${container()}`}
      >
        <h1 className={title()}>Find Collaborations,</h1>
        <h1 className={title()}>Collect Kudos</h1>
      </section>
      <section className={container()}>
        <CtaBanner />
      </section>
      <div className="pt-10">
        <ControlledTable
          filter={filter}
          items={items}
          searchParams={searchParams}
        />
      </div>
    </>
  );
}
