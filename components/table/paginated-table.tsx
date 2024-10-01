"use client";

import React, { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/pagination";
import { usePaginatedIssues } from "@/hooks/usePaginatedIssues";
import { Issue, IssueQueryParams } from "@/types/issue";
import {
  PaginatedCustomResponse,
  PaginationQueryParams,
} from "@/types/pagination";

import StaticTable from "./static-table";

interface IPaginatedTableProps {
  initialItems: PaginatedCustomResponse<Issue>;
  query: IssueQueryParams;
  pagination: PaginationQueryParams;
  withProjectData?: boolean;
}

const PaginatedTable = ({
  initialItems,
  query,
  pagination,
  withProjectData,
}: IPaginatedTableProps) => {
  const [page, setPage] = useState(1);
  const limit = pagination.limit;
  const offset = (page - 1) * limit;

  const { data: results, isPlaceholderData } = usePaginatedIssues(
    initialItems,
    query,
    offset,
    limit,
  );

  const totalCount = results?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  const handleChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <StaticTable
        data={results?.data || []}
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
