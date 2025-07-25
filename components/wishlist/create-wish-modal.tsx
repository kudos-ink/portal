"use client";

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { CreateWishForm } from "./create-wish-form";
import { Project } from "@/types/project";

interface CreateWishModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  projects: Project[];
}

export const CreateWishModal = ({ isOpen, onOpenChange, projects }: CreateWishModalProps) => {
  const handleSuccess = (newTask: any) => {
    console.log("Wish created successfully!", newTask);
    // Here you would typically trigger a toast notification and/or a refetch of the wishlist data
    onOpenChange(false); // Close the modal on success
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