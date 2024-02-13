"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Table as NextUITable,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Contribution } from "@/types/contribution";
import { ExternalLink, Content, Time, Project } from "./row";

import dynamic from "next/dynamic";
import { useFilters } from "@/contexts/filters";
import { extractRepositoryUrlFromIssue } from "@/utils/github";
const Labels = dynamic(() => import("./row").then((m) => m.Labels), {
  ssr: false,
});

interface IColumn {
  name: string;
  uid: string;
}

interface RepositoryMap {
  [key: string]: string;
}

interface IStaticTableProps {
  data: Contribution[];
}

const StaticTable = ({ data }: IStaticTableProps) => {
  const { filterOptions } = useFilters();
  const isMobile = useMediaQuery({ maxWidth: 639 }); // tailwind lg default: 640px
  const isLaptop = useMediaQuery({ minWidth: 1024 }); // tailwind lg default: 1024px

  const [columns, setColumns] = useState<IColumn[]>([
    { name: "PROJECT", uid: "project" },
    { name: "CONTENT", uid: "content" },
    { name: "LABELS", uid: "labels" },
    { name: "DATE", uid: "date" },
    { name: "ACTIONS", uid: "actions" },
  ]);

  const repositoryIconMap: RepositoryMap = useMemo(() => {
    const map: RepositoryMap = {};
    filterOptions.repositories.forEach((repository) => {
      map[repository.repository_url] = repository.repository_url
        .toLowerCase()
        .includes("polkadot")
        ? "/images/polkadot-logo.png"
        : repository.icon;
    });
    return map;
  }, [filterOptions.repositories]);

  const useGetIconByRepositoryUrl = (repositoryIconMap: RepositoryMap) => {
    const getIconByRepositoryUrl = useCallback(
      (repositoryUrl: string): string | null => {
        return repositoryIconMap[repositoryUrl];
      },
      [repositoryIconMap],
    );

    return getIconByRepositoryUrl;
  };

  const getIconByRepositoryUrl = useGetIconByRepositoryUrl(repositoryIconMap);

  const renderCell = React.useCallback(
    (item: Contribution, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof Contribution];
      const repository = extractRepositoryUrlFromIssue(item.url);
      const avatar = !!repository ? getIconByRepositoryUrl(repository) : null;
      switch (columnKey) {
        case "project":
          return (
            <Project
              avatarSrc={avatar}
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
              gitLabels={item.labels}
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
    [getIconByRepositoryUrl],
  );

  useEffect(() => {
    setColumns([
      { name: "PROJECT", uid: "project" },
      { name: "CONTENT", uid: "content" },
      ...(isLaptop ? [{ name: "LABELS", uid: "labels" }] : []),
      { name: "DATE", uid: "date" },
      ...(isMobile ? [] : [{ name: "ACTIONS", uid: "actions" }]),
    ]);
  }, [isMobile, isLaptop]);

  return (
    <NextUITable
      hideHeader
      aria-label="Open contributions list"
      classNames={{
        table:
          "w-full bg-gradient-to-r from-background to-background-200 to-80% max-w-7xl border-spacing-0 rounded-b-md overflow-hidden",
        wrapper:
          "bg-background overflow-visible p-0 rounded-none border-small rounded-b-md",
        tr: "relative bg-red border-y-small border-y-overlay lg:before:content-[''] lg:before:absolute lg:before:bg-hover-overlay lg:before:opacity-0 lg:before:w-full lg:before:h-full lg:before:transition-opacity lg:before:duration-300 lg:before:ease-in-out lg:before:max-h-[62px] lg:hover:before:opacity-100",
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
      <TableBody items={data} emptyContent="No contributions to display.">
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </NextUITable>
  );
};

export default StaticTable;
