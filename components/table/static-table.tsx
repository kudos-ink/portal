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
import { KUDOS_ISSUE_KEY } from "@/data/filters";

const KUDOS_HIGHLIGHT_STYLES = `before:absolute before:content-['']
  before:bg-[conic-gradient(transparent_270deg,_#BABABC,_transparent)]
  before:-translate-x-1/2 before:-translate-y-1/2
  before:top-1/2 before:left-1/2
  before:w-full before:aspect-square
  before:animate-kudos-highlight

  after:absolute after:content-['']
  after:bg-inherit after:border-inherit
  after:inset-[1px] after:h-[calc(100%_-_2px)] after:w-[calc(100%_-_2px)]
`;

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
  const { filters, filterOptions } = useFilters();
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
      map[repository.repository_url] =
        repository.project?.toLowerCase() == "polkadot"
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
              isCertified={item.isCertified}
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
        tr: "flex items-center relative border-y-small border-y-overlay hover:bg-hover-overlay",
        td: "px-2 sm:px-inherit z-10",
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
        {(item) => {
          const isHighlighted = item.isCertified && !filters[KUDOS_ISSUE_KEY];
          return (
            <TableRow
              key={item.id}
              className={
                isHighlighted
                  ? `bg-[#1e3054] hover:bg-[#284070] relative overflow-hidden whitespace-nowrap ${KUDOS_HIGHLIGHT_STYLES}`
                  : ""
              }
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          );
        }}
      </TableBody>
    </NextUITable>
  );
};

export default StaticTable;
