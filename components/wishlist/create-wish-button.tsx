"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { CreateWishModal } from "./create-wish-modal";
import { Project } from "@/types/project";
import { FeedbackIcon } from "@/assets/icons"; // Using an existing icon

interface CreateWishButtonProps {
  onPress: () => void;
}

export const CreateWishButton = ({ onPress }: CreateWishButtonProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button 
        onPress={onPress} 
        color="primary" 
        size="lg"
        className="font-semibold"
        startContent={<FeedbackIcon className="text-background" />}
      >
        Submit an Idea
      </Button>
    </>
  );
};