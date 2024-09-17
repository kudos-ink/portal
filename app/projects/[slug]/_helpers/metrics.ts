import { ProjectInfos } from "@/types/project";

export async function constructProjectMetrics(
  infos: ProjectInfos,
  issuesCount: number,
): Promise<{ metrics: { label: string; value: number }[]; stats: any }> {
  const repositories = infos.links?.repository || [];

  const metrics = [
    { label: "Repositories", value: repositories.length },
    { label: "Active Issues", value: issuesCount },
    { label: "Curators", value: infos.curators?.length ?? 0 },
    { label: "Contributors", value: 0 }, // TODO once leaderboard is ready
  ];

  return { metrics, stats: [] };
}
