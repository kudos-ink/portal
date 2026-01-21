"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Team } from "@/types/team";
import { title } from "@/components/primitives";
import { TeamMembersList } from "./team-members-list";
import { AddMemberModal } from "./add-member-modal";
import { deleteTeam } from "@/lib/api/teams";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

interface TeamDetailProps {
  team: Team;
}

export function TeamDetail({ team: initialTeam }: TeamDetailProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [team, setTeam] = useState(initialTeam);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check if current user is the team creator or a lead
  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;
  const isCreator = team.createdByUserId === currentUserId;
  const isLead = team.members?.some(
    (m) => m.userId === currentUserId && m.role === "lead"
  ) ?? false;
  const canManage = isCreator || isLead;

  const handleDelete = async () => {
    if (!session?.accessToken) return;

    setIsDeleting(true);
    try {
      await deleteTeam(team.id, session.accessToken as string);
      router.push("/teams");
      router.refresh();
    } catch (err) {
      console.error("Failed to delete team:", err);
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  const handleMemberAdded = () => {
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className={title()}>{team.name}</h1>
          {team.description && (
            <p className="text-default-500 mt-4 max-w-2xl">{team.description}</p>
          )}
          <div className="flex items-center gap-2 mt-4">
            <Chip size="sm" variant="flat" color="default">
              {team.members?.length ?? 0} member
              {(team.members?.length ?? 0) !== 1 ? "s" : ""}
            </Chip>
            <span className="text-tiny text-default-400">
              Created {new Date(team.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {canManage && (
          <div className="flex gap-2">
            <Button
              color="primary"
              variant="flat"
              onPress={() => setIsAddMemberOpen(true)}
            >
              Add Member
            </Button>
            <Button
              color="danger"
              variant="flat"
              onPress={() => setIsDeleteOpen(true)}
            >
              Delete Team
            </Button>
          </div>
        )}
      </div>

      <Divider />

      {/* Members */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Members</h2>
        <TeamMembersList
          team={team}
          canManage={canManage}
          onMemberRemoved={() => router.refresh()}
        />
      </div>

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        teamId={team.id}
        onMemberAdded={handleMemberAdded}
      />

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <ModalContent>
          <ModalHeader>Delete Team</ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to delete <strong>{team.name}</strong>? This
              action cannot be undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={handleDelete}
              isLoading={isDeleting}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
