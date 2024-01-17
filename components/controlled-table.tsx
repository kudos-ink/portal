import React from "react";
import ContributionsTable from "@/components/contributions-table/table";
import Toolbar from "@/components/filters/toolbar";
import { container } from "@/components/primitives";
import { FiltersProvider } from "@/contexts/filters";
import { PaginatedCustomDataResponse } from "@/types";
import { Contribution } from "@/types/contribution";
import { SearchParams } from "@/types/filters";

interface IControlledTableProps {
  filter: any;
  items: PaginatedCustomDataResponse<Contribution>;
  searchParams: SearchParams;
}
const ControlledTable = ({
  filter,
  items,
  searchParams,
}: IControlledTableProps) => {
  return (
    <FiltersProvider initialParams={searchParams}>
      <div className="flex flex-col">
        <Toolbar searchParams={searchParams} />
        <section className={container()}>
          <ContributionsTable
            items={items}
            queries={{
              page_size: 10,
              filter,
            }}
          />
        </section>
      </div>
    </FiltersProvider>
  );
};

export default ControlledTable;
