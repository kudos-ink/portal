"use client";

import { useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Chip } from "@nextui-org/chip";
import { TaskType } from "@/types/task";
import PaginatedTable from "@/components/table/paginated-table";
import { DEFAULT_PAGINATION } from "@/data/fetch";
import { CreateNonDevTaskButton } from "./CreateNonDevTaskButton";
import { useUserRoles } from "@/hooks/useUserRoles";

interface ProjectTasksTabsProps {
  projectSlug: string;
  projectId: number;
  devCount?: number;
  wishCount?: number;
  nonDevCount?: number;
}

type TabKey = "dev" | "wish" | "non-dev";

export function ProjectTasksTabs({
  projectSlug,
  projectId,
  devCount = 0,
  wishCount = 0,
  nonDevCount = 0,
}: ProjectTasksTabsProps) {
  const [selectedTab, setSelectedTab] = useState<TabKey>("dev");
  const { canManageProjectById, canCreateNonDev } = useUserRoles();

  const canManage = canManageProjectById(projectId);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as TabKey)}
          aria-label="Task types"
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6",
            cursor: "w-full bg-primary",
            tab: "max-w-fit px-0 h-12",
          }}
        >
          <Tab
            key="dev"
            title={
              <div className="flex items-center gap-2">
                <span>Dev Tasks</span>
                {devCount > 0 && (
                  <Chip size="sm" variant="flat" color="default">
                    {devCount}
                  </Chip>
                )}
              </div>
            }
          />
          <Tab
            key="wish"
            title={
              <div className="flex items-center gap-2">
                <span>Community Wishlist</span>
                {wishCount > 0 && (
                  <Chip size="sm" variant="flat" color="default">
                    {wishCount}
                  </Chip>
                )}
              </div>
            }
          />
          <Tab
            key="non-dev"
            title={
              <div className="flex items-center gap-2">
                <span>Non-Dev Tasks</span>
                {nonDevCount > 0 && (
                  <Chip size="sm" variant="flat" color="default">
                    {nonDevCount}
                  </Chip>
                )}
              </div>
            }
          />
        </Tabs>

        {canCreateNonDev && selectedTab === "non-dev" && (
          <CreateNonDevTaskButton projectId={projectId} projectSlug={projectSlug} />
        )}
      </div>

      <div className="mt-4">
        {selectedTab === "dev" && (
          <PaginatedTable
            query={{
              projects: [projectSlug],
              type_: "dev",
            }}
            pagination={DEFAULT_PAGINATION}
            withProjectData={false}
            emptyContent="No development tasks found for this project."
          />
        )}

        {selectedTab === "wish" && (
          <PaginatedTable
            query={{
              projects: [projectSlug],
              type_: "wish",
            }}
            pagination={DEFAULT_PAGINATION}
            withProjectData={false}
            emptyContent="No community wishes for this project yet."
          />
        )}

        {selectedTab === "non-dev" && (
          <PaginatedTable
            query={{
              projects: [projectSlug],
              type_: "non-dev",
            }}
            pagination={DEFAULT_PAGINATION}
            withProjectData={false}
            emptyContent="No non-dev tasks for this project yet."
          />
        )}
      </div>
    </div>
  );
}
