"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import { Spinner } from "@nextui-org/spinner";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/dropdown";
import { Input } from "@nextui-org/input";
import { Task } from "@/types/task";
import { User } from "@/types/user";
import { useUserRoles } from "@/hooks/useUserRoles";
import { searchUsers } from "@/lib/api/users";
import { assignTask, unassignTask } from "@/lib/api/tasks";

interface TaskAssignmentProps {
  task: Task;
  onAssigned?: (task: Task) => void;
}

export function TaskAssignment({ task, onAssigned }: TaskAssignmentProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { canAssignTasksForProject, isLoading: rolesLoading } = useUserRoles();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const projectId = task.project?.id ?? null;
  const canAssign = canAssignTasksForProject(projectId);

  // Don't render if user can't assign
  if (!session || rolesLoading || !canAssign) {
    return null;
  }

  const handleSearch = async () => {
    if (!session?.accessToken || !searchQuery.trim()) return;

    setIsSearching(true);
    setError(null);
    try {
      const results = await searchUsers(
        { query: searchQuery.trim(), limit: 5 },
        session.accessToken as string
      );
      setUsers(results);
    } catch (err) {
      setError("Failed to search users");
    } finally {
      setIsSearching(false);
    }
  };

  const handleAssign = async (userId: number) => {
    if (!session?.accessToken) return;

    setIsAssigning(true);
    setError(null);
    try {
      const updatedTask = await assignTask(
        task.id,
        userId,
        session.accessToken as string
      );
      onAssigned?.(updatedTask);
      setIsOpen(false);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to assign task");
    } finally {
      setIsAssigning(false);
    }
  };

  const handleUnassign = async () => {
    if (!session?.accessToken) return;

    setIsAssigning(true);
    setError(null);
    try {
      const updatedTask = await unassignTask(task.id, session.accessToken as string);
      onAssigned?.(updatedTask);
      setIsOpen(false);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to unassign task");
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
      <DropdownTrigger>
        <Button
          size="sm"
          variant="flat"
          color={task.assignee ? "primary" : "default"}
          isLoading={isAssigning}
          onClick={(e) => e.stopPropagation()}
        >
          {task.assignee ? "Reassign" : "Assign"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Task assignment"
        closeOnSelect={false}
        onClick={(e) => e.stopPropagation()}
      >
        {task.assignee && (
          <DropdownSection title="Current Assignee" showDivider>
            <DropdownItem
              key="current"
              startContent={
                <Avatar
                  src={task.assignee.avatar}
                  name={task.assignee.username}
                  size="sm"
                />
              }
              endContent={
                <Button
                  size="sm"
                  color="danger"
                  variant="flat"
                  onPress={handleUnassign}
                  isLoading={isAssigning}
                >
                  Remove
                </Button>
              }
            >
              {task.assignee.username}
            </DropdownItem>
          </DropdownSection>
        )}

        <DropdownSection title="Search Users">
          <DropdownItem key="search" isReadOnly className="cursor-default">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  size="sm"
                  placeholder="Search by username..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch();
                    }
                    e.stopPropagation();
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1"
                />
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  onPress={handleSearch}
                  isLoading={isSearching}
                >
                  Search
                </Button>
              </div>
              {error && <p className="text-danger text-tiny">{error}</p>}
            </div>
          </DropdownItem>
        </DropdownSection>

        {users.length > 0 && (
          <DropdownSection title="Results">
            {users.map((user) => (
              <DropdownItem
                key={user.id}
                startContent={
                  <Avatar src={user.avatar} name={user.username} size="sm" />
                }
                onPress={() => handleAssign(user.id)}
              >
                {user.username}
              </DropdownItem>
            ))}
          </DropdownSection>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

export default TaskAssignment;
