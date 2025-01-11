"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { Modal } from "@nextui-org/modal";
import {
  Table as NextUITable,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Task } from "@/types/task";

import TaskModal from "./task-modal";
import { ExternalLink, Content, Time, Project, ApplyButton } from "./row";
import { getIconSrc } from "@/utils/icons";

const DEFAULT_EMPTY = "No contributions to display yet";

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

interface IStaticTableProps {
  data: Task[];
  emptyContent?: string;
  withProjectData?: boolean;
  clickableLabels?: boolean;
}

const StaticTable = ({
  data,
  emptyContent,
  withProjectData = true,
  clickableLabels = false,
}: IStaticTableProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const pathname = usePathname();
  const isMobile = useMediaQuery({ maxWidth: 639 }); // tailwind lg default: 640px
  const isLaptop = useMediaQuery({ minWidth: 1024 }); // tailwind lg default: 1024px

  const [columns, setColumns] = useState<IColumn[]>([
    { name: "PROJECT", uid: "project" },
    { name: "CONTENT", uid: "content" },
    { name: "LABELS", uid: "labels" },
    { name: "DATE", uid: "date" },
    { name: "ACTIONS", uid: "actions" },
  ]);

  const renderCell = React.useCallback(
    (item: Task, columnKey: React.Key) => {
      switch (columnKey) {
        case "project": {
          const { project, repository } = item;
          return (
            <Project
              avatarSrc={
                project.avatar && getIconSrc(project.slug, project.avatar)
              }
              slug={project.slug}
              name={project.name}
              repository={repository}
              withProjectData={withProjectData}
            />
          );
        }
        case "content": {
          const { id, title, repository, project } = item;
          const isCertified =
            (item.labels.includes("kudos") || item.isCertified) &&
            pathname !== "/carnival" &&
            !pathname.includes("certified");

          return (
            title && (
              <Content
                id={id}
                title={title}
                projectName={withProjectData ? project.name : undefined}
                repositoryName={repository?.name}
                isCertified={isCertified}
              />
            )
          );
        }
        case "labels": {
          const { labels, project } = item;
          return (
            <Labels
              gitLabels={labels}
              technologies={project.technologies}
              purposes={withProjectData ? project.purposes : []}
              clickable={clickableLabels}
            />
          );
        }
        case "date":
          return (
            <div className="flex flex-col items-center gap-2">
              <div className="block sm:hidden">
                <ExternalLink
                  href={item.url}
                  title={`Open "${item.title}" on Github`}
                />
              </div>
              <Time timestamp={item.createdAt} />
            </div>
          );
        case "actions": {
          return <ApplyButton onOpen={() => setSelectedTask(item)} />;
        }
        default:
          return null;
      }
    },
    [withProjectData, clickableLabels, pathname],
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
    <>
      <NextUITable
        hideHeader
        aria-label="Open contributions list"
        classNames={{
          table:
            "w-full bg-gradient-to-r from-background to-background-200 to-80% max-w-7xl border-spacing-0 rounded-b-md overflow-hidden",
          wrapper:
            "bg-background overflow-visible p-0 rounded-none border-[1px] rounded-b-md",
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
        <TableBody items={data} emptyContent={emptyContent ?? DEFAULT_EMPTY}>
          {(item) => {
            const isHighlighted =
              (item.labels.includes("kudos") || item.isCertified) &&
              pathname !== "/carnival" &&
              !pathname.includes("certified");

            return (
              <TableRow
                key={item.id}
                className={`cursor-pointer group
                ${
                  isHighlighted
                    ? ` bg-[#1e3054] hover:bg-[#284070] relative overflow-hidden whitespace-nowrap ${KUDOS_HIGHLIGHT_STYLES}`
                    : ""
                }`}
                onClick={() => setSelectedTask(item)}
              >
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            );
          }}
        </TableBody>
      </NextUITable>
      <Modal
        isOpen={selectedTask !== null}
        onOpenChange={() => setSelectedTask(null)}
        classNames={{
          closeButton: selectedTask?.isCertified ? "z-1000 mt-20 md:mt-16" : "",
        }}
        size="lg"
        placement={isMobile ? "bottom" : "auto"}
      >
        {selectedTask && <TaskModal task={selectedTask} />}
      </Modal>
    </>
  );
};

export default StaticTable;
