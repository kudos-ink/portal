"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@nextui-org/button";
import { CreateTeamModal } from "./create-team-modal";

export function CreateTeamButton() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session) {
    return (
      <Button
        color="primary"
        variant="flat"
        onPress={() => signIn("github")}
      >
        Sign in to create a team
      </Button>
    );
  }

  return (
    <>
      <Button color="primary" onPress={() => setIsOpen(true)}>
        Create Team
      </Button>
      <CreateTeamModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
