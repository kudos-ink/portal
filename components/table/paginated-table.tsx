"use client";

import React, { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/pagination";
import { useFilters } from "@/contexts/filters";
import { usePaginatedIssues } from "@/hooks/usePaginatedIssues";
import { filtersToIssuesQuery } from "@/lib/filters";
import { Issue, IssueQueryParams } from "@/types/issue";
import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";

import StaticTable from "./static-table";
import TableSkeleton from "./skeleton";
import { DEFAULT_PAGE_SIZE } from "@/data/fetch";

interface IPaginatedTableProps {
  query: IssueQueryParams;
  pagination: PaginationQueryParams;
  emptyContent?: string;
  withProjectData?: boolean;
}

const PaginatedTable = ({
  query,
  pagination,
  emptyContent,
  withProjectData,
}: IPaginatedTableProps) => {
  const { filters } = useFilters();
  const [page, setPage] = useState(1);
  const limit = pagination.limit ?? DEFAULT_PAGE_SIZE;
  const offset = (page - 1) * limit;

  const filteredQuery = filtersToIssuesQuery(filters);
  const combinedQuery = {
    ...query,
    ...filteredQuery,
  };

  const {
    data: results,
    isPlaceholderData,
    isFetching,
  } = usePaginatedIssues(combinedQuery, offset, limit);

  const totalCount = results?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  const handleChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(1);
  }, [filters]);

  if (isFetching && results === undefined) {
    return <TableSkeleton pageSize={DEFAULT_PAGE_SIZE} />;
  }

  return (
    <>
      <StaticTable
        data={results?.data || []}
        emptyContent={emptyContent}
        withProjectData={withProjectData}
      />
      {totalPages > 1 && (
        <div className="flex w-full justify-end items-center pt-8">
          <Pagination
            isDisabled={isPlaceholderData}
            showControls
            total={totalPages}
            initialPage={1}
            page={page}
            onChange={handleChange}
            variant="light"
          />
        </div>
      )}
    </>
  );
};

export default PaginatedTable;
