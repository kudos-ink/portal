"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { createTeam } from "@/lib/api/teams";

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTeamModal({ isOpen, onClose }: CreateTeamModalProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!session?.accessToken) return;
    if (!name.trim()) {
      setError("Team name is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const team = await createTeam(
        {
          name: name.trim(),
          description: description.trim() || undefined,
        },
        session.accessToken as string
      );

      // Reset form
      setName("");
      setDescription("");
      onClose();

      // Navigate to the new team page
      router.push(`/teams/${team.id}`);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to create team");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose} placement="top-center" size="lg">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Create a New Team</ModalHeader>
        <ModalBody>
          <p className="text-default-500 text-sm mb-4">
            Teams help you collaborate with others on projects across the ecosystem.
          </p>

          <Input
            label="Team Name"
            placeholder="Enter team name"
            value={name}
            onValueChange={setName}
            variant="bordered"
            isRequired
            maxLength={100}
          />

          <Textarea
            label="Description"
            placeholder="What is this team about?"
            value={description}
            onValueChange={setDescription}
            variant="bordered"
            minRows={3}
            maxLength={500}
            description={`${description.length}/500`}
          />

          {error && <p className="text-danger text-sm">{error}</p>}
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={handleClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleSubmit}
            isLoading={isLoading}
            isDisabled={!name.trim()}
          >
            Create Team
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
