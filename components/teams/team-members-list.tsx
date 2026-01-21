"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Team, TeamMemberRole } from "@/types/team";
import { removeTeamMember, updateTeamMember } from "@/lib/api/teams";

interface TeamMembersListProps {
  team: Team;
  canManage: boolean;
  onMemberRemoved: () => void;
}

export function TeamMembersList({
  team,
  canManage,
  onMemberRemoved,
}: TeamMembersListProps) {
  const { data: session } = useSession();
  const [loadingMemberId, setLoadingMemberId] = useState<number | null>(null);

  const handleRoleChange = async (memberId: number, newRole: TeamMemberRole) => {
    if (!session?.accessToken) return;

    setLoadingMemberId(memberId);
    try {
      await updateTeamMember(team.id, memberId, { role: newRole }, session.accessToken as string);
      onMemberRemoved(); // Triggers refresh
    } catch (err) {
      console.error("Failed to update member role:", err);
    } finally {
      setLoadingMemberId(null);
    }
  };

  const handleRemove = async (memberId: number) => {
    if (!session?.accessToken) return;

    setLoadingMemberId(memberId);
    try {
      await removeTeamMember(team.id, memberId, session.accessToken as string);
      onMemberRemoved();
    } catch (err) {
      console.error("Failed to remove member:", err);
    } finally {
      setLoadingMemberId(null);
    }
  };

  if (!team.members || team.members.length === 0) {
    return (
      <p className="text-default-500">No members in this team yet.</p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {team.members.map((member) => {
        const isLoading = loadingMemberId === member.id;
        const user = member.user;

        return (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-background to-background-200 to-80% border-[1px] rounded-md"
          >
            <div className="flex items-center gap-3">
              <Avatar
                src={user?.avatar}
                name={user?.username || `User ${member.userId}`}
                size="sm"
              />
              <div>
                <p className="font-medium">
                  {user?.username || `User #${member.userId}`}
                </p>
                <p className="text-tiny text-default-400">
                  Joined {new Date(member.joinedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Chip
                size="sm"
                variant="flat"
                color={member.role === "lead" ? "primary" : "default"}
              >
                {member.role}
              </Chip>

              {canManage && (
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      size="sm"
                      variant="flat"
                      isLoading={isLoading}
                    >
                      Manage
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Member actions">
                    {member.role === "member" ? (
                      <DropdownItem
                        key="promote"
                        onPress={() => handleRoleChange(member.id, "lead")}
                      >
                        Promote to Lead
                      </DropdownItem>
                    ) : (
                      <DropdownItem
                        key="demote"
                        onPress={() => handleRoleChange(member.id, "member")}
                      >
                        Demote to Member
                      </DropdownItem>
                    )}
                    <DropdownItem
                      key="remove"
                      color="danger"
                      className="text-danger"
                      onPress={() => handleRemove(member.id)}
                    >
                      Remove from Team
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
