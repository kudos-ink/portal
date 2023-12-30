"use client";
import React from "react";
import {
  Table as NuiTable,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";
import { Contribution } from "@/types/contribution";
import { Actions, Content, Labels, OpenedDate, Project } from "./row";

interface ITableProps {
  items: Contribution[];
}
export const Table = ({ items }: ITableProps) => {
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
          return <Content title={item.title} language={item.language} />;
        case "labels":
          return <Labels labels={item.labels} />;
        case "date":
          return <OpenedDate timestamp={item.timestamp} />;
        case "actions":
          return <Actions href={item.url} />;
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <>
      <div className="py-4 px-3 bg-default-100 border-small border-b-0 rounded-t-md">
        <span className="text-lg font-bold">Good First Contributions</span>
      </div>
      <NuiTable
        hideHeader
        aria-label="Example table with infinite pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Spinner color="white" />
          </div>
        }
        classNames={{
          base: "max-h-[520px]",
          table: "min-h-[400px]",
          wrapper: "p-0 rounded-none border-small border-t-0",
          tr: "bg-gradient-to-r from-background to-background-200 to-80% border-y-small",
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
        <TableBody items={items} loadingContent={<Spinner color="white" />}>
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

const COLUMNS = [
  { name: "PROJECT", uid: "project" },
  { name: "CONTENT", uid: "content" },
  { name: "LABELS", uid: "labels" },
  { name: "DATE", uid: "date" },
  { name: "ACTIONS", uid: "actions" },
];
