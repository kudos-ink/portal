"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Table as NuiTable,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";
import { Contribution, PaginatedContributions } from "@/types/contribution";
import { ExternalLink, Content, Time, Project } from "./row";

import { useContributions } from "@/hooks/useContributions";
import { KudosQueryParameters } from "@/lib/notion/types";
import dynamic from "next/dynamic";
const Labels = dynamic(() => import("./row").then((m) => m.Labels), {
  ssr: false,
});

interface IColumn {
  name: string;
  uid: string;
}

interface ITableProps {
  items: PaginatedContributions;
  queries?: Partial<KudosQueryParameters>;
}
export const Table = ({ items, queries = {} }: ITableProps) => {
  const [columns, setColumns] = useState<IColumn[]>([
    { name: "PROJECT", uid: "project" },
    { name: "CONTENT", uid: "content" },
    { name: "LABELS", uid: "labels" },
    { name: "DATE", uid: "date" },
    { name: "ACTIONS", uid: "actions" },
  ]);

  const {
    data: results,
    fetchNextPage,
    hasNextPage,
  } = useContributions(items, queries);

  const isMobile = useMediaQuery({ maxWidth: 639 }); // tailwind lg default: 640px
  const isLaptop = useMediaQuery({ minWidth: 1024 }); // tailwind lg default: 1024px

  const loaderRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  const contributions = React.useMemo(() => {
    return results?.pages.flatMap((page) => page.data) || [];
  }, [results]);

  const renderCell = React.useCallback(
    (item: Contribution, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof Contribution];

      switch (columnKey) {
        case "project":
          return (
            <Project
              avatarSrc={item.avatar}
              name={item.project}
              organization={item.organization}
              repository={item.repository}
            />
          );
        case "content":
          return (
            <Content
              title={item.title}
              project={item.project}
              repository={item.repository}
              url={item.url}
            />
          );
        case "labels":
          return (
            <Labels
              languages={item.languages}
              organization={item.organization}
              repository={item.repository}
            />
          );
        case "date":
          return (
            <div className="flex flex-col items-center gap-2">
              <div className="block sm:hidden">
                <ExternalLink
                  href={item.url}
                  title={`Open "${item.title}" on Github`}
                />
              </div>
              <Time timestamp={item.timestamp} />
            </div>
          );
        case "actions":
          return (
            <ExternalLink
              href={item.url}
              title={`Open "${item.title}" on Github`}
            />
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingRef.current) return;

    const loaderElement = loaderRef.current;
    if (loaderElement) {
      const rect = loaderElement.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        isFetchingRef.current = true;
        fetchNextPage().then(() => {
          isFetchingRef.current = false;
        });
      }
    }
  }, [hasNextPage, fetchNextPage]);

  useEffect(() => {
    setColumns([
      { name: "PROJECT", uid: "project" },
      { name: "CONTENT", uid: "content" },
      ...(isLaptop ? [{ name: "LABELS", uid: "labels" }] : []),
      { name: "DATE", uid: "date" },
      ...(isMobile ? [] : [{ name: "ACTIONS", uid: "actions" }]),
    ]);
  }, [isMobile, isLaptop]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <NuiTable
        hideHeader
        aria-label="Example table with infinite pagination"
        classNames={{
          table:
            "w-full bg-gradient-to-r from-background to-background-200 to-80% max-w-7xl border-spacing-0 rounded-b-md overflow-hidden",
          wrapper:
            "bg-background overflow-visible p-0 rounded-none border-small rounded-b-md",
          tr: "relative bg-red border-y-small border-y-overlay before:content-[''] before:absolute before:bg-hover-overlay before:opacity-0 before:w-full before:h-full before:transition-opacity before:duration-300 before:ease-in-out sm:before:max-h-[88px] md:before:max-h-[62px] hover:before:opacity-100",
          td: "px-2 sm:px-inherit",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={contributions}
          emptyContent="No contributions to display."
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </NuiTable>
      {hasNextPage && (
        <div className="flex w-full justify-center pt-8">
          <Spinner ref={loaderRef} color="white" />
        </div>
      )}
    </>
  );
};

export default Table;
