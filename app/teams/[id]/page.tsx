import { container, title } from "@/components/primitives";
import { fetchTeamById } from "@/lib/api/teams";
import { TeamDetail } from "@/components/teams/team-detail";
import { notFound } from "next/navigation";

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function TeamDetailPage(props: IProps) {
  const params = await props.params;
  const teamId = parseInt(params.id, 10);

  if (isNaN(teamId)) {
    notFound();
  }

  const team = await fetchTeamById(teamId);

  if (!team) {
    notFound();
  }

  return (
    <section className={`flex flex-col pt-10 pb-24 ${container()}`}>
      <TeamDetail team={team} />
    </section>
  );
}
