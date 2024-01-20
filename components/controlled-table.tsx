import React from "react";
import ContributionsTable from "@/components/table/table";
import Toolbar from "@/components/filters/toolbar";
import { container } from "@/components/primitives";
import { FiltersProvider } from "@/contexts/filters";
import { PaginatedCustomDataResponse } from "@/types";
import { Contribution } from "@/types/contribution";
import { Filters } from "@/types/filters";
import { DEFAULT_PAGE_SIZE } from "@/data/fetch";

interface IControlledTableProps {
  items: PaginatedCustomDataResponse<Contribution>;
  filters: Filters;
  queryFilter: any;
}
const ControlledTable = ({
  filters,
  items,
  queryFilter,
}: IControlledTableProps) => {
  return (
    <FiltersProvider initialFilters={filters}>
      <div className="flex flex-col">
        <Toolbar />
        <section className={container()}>
          <ContributionsTable
            items={items}
            queries={{
              page_size: DEFAULT_PAGE_SIZE,
              filter: queryFilter,
            }}
          />
        </section>
      </div>
    </FiltersProvider>
  );
};

export default ControlledTable;
