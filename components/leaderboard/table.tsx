"use client";

import React from "react";
import {
  Table as NextUITable,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

import { Leaderboard } from "@/types/leaderboard";
import { Contributor } from "./row";

interface IColumn {
  name: string;
  uid: string;
}

interface IStaticTableProps {
  data: Leaderboard[];
}

const COLUMNS: IColumn[] = [
  { name: "#", uid: "rank" },
  { name: "Contributor", uid: "contributor" },
  { name: "Score", uid: "score" },
];

const LeaderboardTable = ({ data }: IStaticTableProps) => {
  const renderCell = React.useCallback(
    (item: Leaderboard, columnKey: React.Key) => {
      switch (columnKey) {
        case "rank": {
          return item.id;
        }
        case "contributor": {
          const { id, avatar, name, username } = item;
          return (
            <Contributor
              id={id}
              avatarSrc={avatar}
              username={username}
              name={name}
            />
          );
        }
        case "score": {
          return (
            <div className="text-white text-base font-bold" color="foreground">
              {item.score}
            </div>
          );
        }
        default:
          return null;
      }
    },
    [],
  );

  return (
    <NextUITable
      hideHeader
      aria-label="Leaderboard"
      classNames={{
        table:
          "w-full max-w-7xl border-spacing-0 rounded-b-md overflow-hidden border-none",
        th: "flex items-center",
        wrapper: "bg-background overflow-visible p-0 rounded-none rounded-b-md",
        tr: "flex items-center relative",
      }}
    >
      <TableHeader columns={COLUMNS}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={
              column.uid === "rank"
                ? "center"
                : column.uid === "score"
                  ? "end"
                  : "start"
            }
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data} emptyContent="No users..">
        {(item) => (
          <TableRow key={item.username}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </NextUITable>
  );
};

export default LeaderboardTable;
