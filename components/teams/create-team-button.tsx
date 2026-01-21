"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";
import { CreateTeamModal } from "./create-team-modal";
import SignIn from "@/components/auth/sign-in";

export function CreateTeamButton() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session) {
    return <SignIn label="Sign in to create a team" />;
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
