"use client";

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import { Team } from "@/types/team";
import { UsersIcon } from "@/assets/icons";

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  const memberCount = team.members?.length ?? 0;

  return (
    <Card
      as={Link}
      href={`/teams/${team.id}`}
      className="bg-gradient-to-r from-background to-background-200 to-80% border-[1px] hover:border-primary transition-colors"
      isPressable
    >
      <CardBody className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground">{team.name}</h3>
          <Chip size="sm" variant="flat" color="default">
            <span className="flex items-center gap-1">
              <UsersIcon size={14} />
              {memberCount}
            </span>
          </Chip>
        </div>
        {team.description && (
          <p className="text-default-500 text-sm mt-2 line-clamp-2">
            {team.description}
          </p>
        )}
      </CardBody>
      <CardFooter className="pt-0 px-4 pb-4">
        <p className="text-tiny text-default-400">
          Created {new Date(team.createdAt).toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
}
