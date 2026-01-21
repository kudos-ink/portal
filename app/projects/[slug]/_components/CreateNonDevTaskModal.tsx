"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Chip } from "@nextui-org/chip";
import { createTask } from "@/lib/api/tasks";
import { NewTaskPayload, TaskStatus } from "@/types/task";

interface CreateNonDevTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: number;
  projectSlug: string;
}

const SKILL_OPTIONS = [
  "Design",
  "Marketing",
  "Content Writing",
  "Community Management",
  "Translation",
  "Documentation",
  "Research",
  "Project Management",
  "QA/Testing",
  "Other",
];

const FUNDING_OPTIONS = [
  "Bounty",
  "Grant",
  "Volunteer",
  "Negotiable",
];

export function CreateNonDevTaskModal({
  isOpen,
  onClose,
  projectId,
  projectSlug,
}: CreateNonDevTaskModalProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bounty, setBounty] = useState("");
  const [contact, setContact] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedFunding, setSelectedFunding] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!session?.accessToken) return;
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload: NewTaskPayload = {
        title: title.trim(),
        description: description.trim() || undefined,
        type_: "non-dev",
        project_id: projectId,
        status: "open",
        bounty: bounty ? parseInt(bounty, 10) : undefined,
        skills: selectedSkills.length > 0 ? selectedSkills : undefined,
        contact: contact.trim() || undefined,
        funding_options: selectedFunding.length > 0 ? selectedFunding : undefined,
      };

      await createTask(payload, session.accessToken as string);

      handleClose();
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to create task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setBounty("");
    setContact("");
    setSelectedSkills([]);
    setSelectedFunding([]);
    setError(null);
    onClose();
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const toggleFunding = (option: string) => {
    setSelectedFunding((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
      placement="top-center"
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Create Non-Dev Task
        </ModalHeader>
        <ModalBody>
          <p className="text-default-500 text-sm mb-4">
            Create a non-development task for marketing, design, community
            management, or other project needs.
          </p>

          <div className="flex flex-col gap-4">
            <Input
              label="Title"
              placeholder="Enter task title"
              value={title}
              onValueChange={setTitle}
              variant="bordered"
              isRequired
              maxLength={200}
            />

            <Textarea
              label="Description"
              placeholder="Describe the task in detail..."
              value={description}
              onValueChange={setDescription}
              variant="bordered"
              minRows={4}
              maxLength={2000}
            />

            <div>
              <p className="text-sm font-medium mb-2">Required Skills</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_OPTIONS.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <Chip
                      key={skill}
                      variant={isSelected ? "solid" : "bordered"}
                      color={isSelected ? "primary" : "default"}
                      className="cursor-pointer"
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Chip>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Funding Options</p>
              <div className="flex flex-wrap gap-2">
                {FUNDING_OPTIONS.map((option) => {
                  const isSelected = selectedFunding.includes(option);
                  return (
                    <Chip
                      key={option}
                      variant={isSelected ? "solid" : "bordered"}
                      color={isSelected ? "secondary" : "default"}
                      className="cursor-pointer"
                      onClick={() => toggleFunding(option)}
                    >
                      {option}
                    </Chip>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Bounty (USD)"
                placeholder="e.g., 100"
                value={bounty}
                onValueChange={(v) => setBounty(v.replace(/\D/g, ""))}
                variant="bordered"
                type="text"
                startContent={
                  <span className="text-default-400 text-small">$</span>
                }
              />

              <Input
                label="Contact"
                placeholder="Telegram handle or email"
                value={contact}
                onValueChange={setContact}
                variant="bordered"
              />
            </div>
          </div>

          {error && <p className="text-danger text-sm mt-4">{error}</p>}
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={handleClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleSubmit}
            isLoading={isLoading}
            isDisabled={!title.trim()}
          >
            Create Task
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
