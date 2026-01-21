"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Team } from "@/types/team";
import { TeamCard } from "./team-card";
import { Spinner } from "@nextui-org/spinner";
import { Input } from "@nextui-org/input";

interface TeamsListProps {
  initialTeams: Team[];
}

export function TeamsList({ initialTeams }: TeamsListProps) {
  const { data: session } = useSession();
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [search, setSearch] = useState("");

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase()) ||
    team.description?.toLowerCase().includes(search.toLowerCase())
  );

  if (teams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-default-500 text-lg">No teams yet.</p>
        <p className="text-default-400 text-sm mt-2">
          Create a team to start collaborating with others.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Input
        placeholder="Search teams..."
        value={search}
        onValueChange={setSearch}
        className="max-w-md"
        variant="bordered"
        size="sm"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>

      {filteredTeams.length === 0 && search && (
        <p className="text-default-500 text-center py-8">
          No teams found matching &quot;{search}&quot;
        </p>
      )}
    </div>
  );
}
