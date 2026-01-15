"use client";

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { CreateWishForm } from "./create-wish-form";
import { Project } from "@/types/project";
import { Task, TaskDto } from "@/types/task";
import { dtoToRepository, dtoToTask } from "@/api/core/_transformers";

interface CreateWishModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  projects: Project[];
  onWishCreated: (task: Task) => void;
}

export const CreateWishModal = ({ isOpen, onOpenChange, projects, onWishCreated }: CreateWishModalProps) => {
  const handleSuccess = (newTask: TaskDto) => {
    console.log("Wish created successfully!", newTask);
    onWishCreated(dtoToTask(newTask));
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl">
              Submit Your Idea to the Wishlist
            </ModalHeader>
            <ModalBody>
              <p className="text-default-500">
                Have an idea for a new feature or project? Share it with the community! Ideas with strong support may get prioritized for development.
              </p>
              <CreateWishForm projects={projects} onSuccess={handleSuccess} onClose={onClose} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};