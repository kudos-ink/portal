"use client";

import React, { useState } from "react";
import { DEFAULT_PAGE_SIZE } from "@/data/fetch";
import { usePaginatedIssues } from "@/hooks/usePaginatedIssues";
import { Issue, IssueWithProject, IssueQueryParams } from "@/types/issue";
import { PaginatedCustomResponse } from "@/types/pagination";

import StaticTable from "./static-table";
import { Button } from "@nextui-org/button";

interface IPaginatedTableProps<I extends Issue | IssueWithProject> {
  initialItems: PaginatedCustomResponse<I>;
  query?: IssueQueryParams;
  slug?: string;
}

const PaginatedTable = <I extends Issue | IssueWithProject>({
  initialItems,
  query = {},
  slug,
}: IPaginatedTableProps<I>) => {
  const [page, setPage] = useState(0);
  const limit = DEFAULT_PAGE_SIZE;
  const offset = page * limit;

  const { data: results, isFetching } = usePaginatedIssues<I>(
    initialItems,
    query,
    slug,
    offset,
    limit,
  );

  const contributions = React.useMemo(() => {
    return results?.data || [];
  }, [results]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <StaticTable data={contributions} />
      <div className="flex w-full justify-end items-center pt-8 gap-4">
        <Button
          className="font-semibold"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0 || isFetching}
          variant={results?.hasPreviousPage && page !== 0 ? undefined : "flat"}
        >
          Previous
        </Button>
        <span>{page + 1}</span>
        <Button
          className="font-semibold"
          onClick={() => handlePageChange(page + 1)}
          disabled={!results?.hasNextPage || isFetching}
          variant={results?.hasNextPage ? undefined : "flat"}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default PaginatedTable;
