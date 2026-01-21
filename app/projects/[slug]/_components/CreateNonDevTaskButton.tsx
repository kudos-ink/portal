"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";
import { CreateNonDevTaskModal } from "./CreateNonDevTaskModal";
import SignIn from "@/components/auth/sign-in";
import { PlusIcon } from "@/assets/icons";

interface CreateNonDevTaskButtonProps {
  projectId: number;
  projectSlug: string;
}

export function CreateNonDevTaskButton({
  projectId,
  projectSlug,
}: CreateNonDevTaskButtonProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session) {
    return <SignIn label="Sign in to create tasks" />;
  }

  return (
    <>
      <Button
        color="primary"
        startContent={<PlusIcon size={16} />}
        onPress={() => setIsOpen(true)}
      >
        Create Task
      </Button>
      <CreateNonDevTaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        projectId={projectId}
        projectSlug={projectSlug}
      />
    </>
  );
}
