"use client";
import React from "react";
import { Skeleton } from "@nextui-org/skeleton";
import {
  Table as NuiTable,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

interface ITableSkeletonProps {
  pageSize: number;
}

export const TableSkeleton = ({ pageSize }: ITableSkeletonProps) => {
  const placeholderItems = Array.from({ length: pageSize }, (_, index) => ({
    id: index + 1,
  }));

  return (
    <>
      <NuiTable
        layout="fixed"
        hideHeader
        fullWidth
        aria-label="Table skeleton"
        classNames={{
          table:
            "w-full bg-gradient-to-r from-background to-background-200 to-80% max-w-7xl border-spacing-0 rounded-b-md overflow-hidden",
          wrapper:
            "bg-background overflow-visible p-0 rounded-none border-[1px] rounded-b-md",
          tr: "relative bg-red border-y-small border-y-overlay before:content-[''] before:absolute before:bg-hover-overlay before:opacity-0 before:w-full before:h-full before:transition-opacity before:duration-300 before:ease-in-out sm:before:max-h-[88px] md:before:max-h-[62px] hover:before:opacity-100",
          td: "px-2 sm:px-inherit",
        }}
      >
        <TableHeader>
          <TableColumn>Skeleton</TableColumn>
        </TableHeader>
        <TableBody items={placeholderItems}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell className="w-full">
                <Skeleton className="w-full rounded-lg">
                  <div className="h-12 w-full rounded-lg bg-default-200"></div>
                </Skeleton>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </NuiTable>
    </>
  );
};

export default TableSkeleton;
