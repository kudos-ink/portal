"use client";
import React from "react";
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
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { Contribution, PaginatedContributions } from "@/types/contribution";
import { ExternalLink, Content, Labels, Time, Project } from "./row";
import { useContributions } from "@/hooks/useContributions";
import { KudosQueryParameters } from "@/lib/notion/types";
import { isNotNull } from "@/utils/type-guard";

interface ITableProps {
  items: PaginatedContributions;
  queries?: Partial<KudosQueryParameters>;
}
export const Table = ({ items, queries = {} }: ITableProps) => {
  const {
    data: results,
    fetchNextPage,
    hasNextPage,
  } = useContributions(items, queries);
  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore: hasNextPage,
    onLoadMore: fetchNextPage,
  });

  const contributions = React.useMemo(() => {
    return results?.pages.flatMap((page) => page.data) || [];
  }, [results]);

  const isMobile = useMediaQuery({ maxWidth: 639 }); // tailwind lg default: 640px
  const isLaptop = useMediaQuery({ minWidth: 1024 }); // tailwind lg default: 1024px
  const COLUMNS = [
    { name: "PROJECT", uid: "project" },
    { name: "CONTENT", uid: "content" },
    isLaptop ? { name: "LABELS", uid: "labels" } : null,
    { name: "DATE", uid: "date" },
    isMobile ? null : { name: "ACTIONS", uid: "actions" },
  ].filter(isNotNull);

  const renderCell = React.useCallback(
    (item: Contribution, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof Contribution];

      switch (columnKey) {
        case "project":
          return (
            <Project
              avatarSrc={item.avatar}
              name={item.project}
              repository={item.repository}
            />
          );
        case "content":
          return (
            <Content
              title={item.title}
              project={item.project}
              repository={item.repository}
              languages={item.languages}
            />
          );
        case "labels":
          return <Labels labels={item.labels} />;
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

  return (
    <>
      <div className="py-4 px-3 bg-default-100 border-small rounded-t-md">
        <span className="text-lg font-bold">Good First Contributions</span>
      </div>
      <NuiTable
        hideHeader
        aria-label="Example table with infinite pagination"
        baseRef={scrollerRef}
        bottomContent={
          hasNextPage ? (
            <div className="flex w-full justify-center">
              <Spinner ref={loaderRef} color="white" />
            </div>
          ) : null
        }
        classNames={{
          table: "w-full max-w-7xl border-spacing-0",
          wrapper:
            "bg-background overflow-visible p-0 rounded-none border-small border-y-0",
          tr: "relative bg-gradient-to-r from-background to-background-200 to-80% border-y-small border-y-overlay before:content-[''] before:absolute before:bg-hover-overlay before:opacity-0 before:w-full before:h-full before:transition-opacity before:duration-300 before:ease-in-out hover:before:opacity-100",
          td: "px-2 sm:px-inherit",
        }}
      >
        <TableHeader columns={COLUMNS}>
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
          loadingContent={<Spinner color="white" />}
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
    </>
  );
};

export default Table;
