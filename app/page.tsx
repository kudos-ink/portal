import ControlledTable from "@/components/controlled-table";
import CtaBanner from "@/components/cta-banner";
import { container, title } from "@/components/primitives";
import { queryDatabase } from "@/lib/notion";
import { PaginatedCustomDataResponse } from "@/types";
import { Contribution } from "@/types/contribution";
import { initFilters } from "@/utils/filters";
import { transformNotionDataToContributions } from "@/utils/notion";

export default async function Home() {
  const filters = initFilters();
  const data = await queryDatabase({
    page_size: 10,
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
          filters={filters}
          items={items}
          queryFilter={undefined}
        />
      </div>
    </>
  );
}
