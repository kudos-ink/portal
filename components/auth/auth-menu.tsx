"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Skeleton } from "@nextui-org/skeleton";

import { GithubIcon } from "@/assets/icons";

const AuthMenu: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  return (
    <div>
      {session ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            {/* TODO: Support no image placeholder */}
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              src={session.user?.image}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {
              <DropdownItem key="profile" className="h-14 gap-2" showDivider>
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session.user?.name}</p>
              </DropdownItem>
            }
            <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button
          size="sm"
          aria-label="Login"
          color="default"
          variant="faded"
          className="capitalize font-semibold"
          onPress={() => signIn("github")}
          startContent={<GithubIcon size={20} />}
        >
          <p>Login</p>
        </Button>
      )}
    </div>
  );
};

export default AuthMenu;
