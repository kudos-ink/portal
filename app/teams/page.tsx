import { container, title, subtitle } from "@/components/primitives";
import { TeamsList } from "@/components/teams/teams-list";
import { CreateTeamButton } from "@/components/teams/create-team-button";
import { fetchTeams } from "@/lib/api/teams";

export default async function TeamsPage() {
  const teams = await fetchTeams();

  return (
    <section className={`flex flex-col pt-10 pb-24 ${container()}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className={title()}>
            <span className="text-primary">Teams</span>
          </h1>
          <p className={`mt-4 ${subtitle()}`}>
            Create and manage teams to collaborate on projects across the ecosystem.
          </p>
        </div>
        <CreateTeamButton />
      </div>

      <TeamsList initialTeams={teams} />
    </section>
  );
}
